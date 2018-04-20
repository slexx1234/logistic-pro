import axios from 'axios';

export default {
    namespaced: true,

    state() {
        return {
            // ключ номер посялки, значение посылка
            cache: {},

            // ключ фраза поиска, значение массив номеров посылок
            search: {},

            // ключ номер страница, значение массив номеров посылок
            pages: {},
            totalItems: 0,
            totalPages: 1,
            currentPage: 1,

            // Массив текущих посылок на странице
            currentParcels: [],
            isLoading: true,

            // ключ номер посылки, значение boolean
            selected: {},

            // {
            //     [номер посылки]: {
            //         [ключ модели]: [массив записей истории...]
            //     }
            // }
            history: {},
        };
    },

    mutations: {
        setLoading(state, isLoading) {
            state.isLoading = isLoading;
        },

        toggleLoading(state) {
            state.isLoading = !state.isLoading;
        },

        setTotalItems(state, totalItems) {
            state.totalItems = totalItems;
        },

        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },

        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage;

            let parcels = [];
            for(let id of state.pages[currentPage]) {
                parcels.push(state.cache[id]);
            }

            state.currentParcels = parcels;
        },

        addPage(state, { page, parcels }) {
            let ids = [];
            for(let parcel of parcels) {
                ids.push(parcel.key);
                state.cache[parcel.key] = parcel;
            }
            state.pages[page] = ids;
        },

        appendCache(state, parcels) {
            for(let parcel of parcels) {
                state.cache[parcel.key] = parcel;
            }
        },

        select(state, { id, value }) {
            state.selected[id] = value;
        },

        clearSelected(state) {
            let selected = {};
            for(let parcel of state.currentParcels) {
                selected[parcel.key] = false;
            }
            state.selected = selected;
        },

        selectAll(state) {
            for(let key in state.selected) {
                state.selected[key] = true;
            }
        },

        clearCache(state) {
            state.isLoading = true;
            state.cache = {};
            state.pages = {};
            state.currentParcels = [];
            state.selected = {};
            state.currentPage = 1;
            state.totalPages = 1;
            state.totalItems = 0;
        },

        update(state, { id, status, location }) {
            let i = 0;
            for(let parcel of state.currentParcels) {
                if (parcel.key == id) {
                    state.currentParcels[i].status = status;
                    state.currentParcels[i].location = location;
                }
                i++;
            }
            if (typeof state.cache[id] !== 'undefined') {
                state.cache[id].status = status;
                state.cache[id].location = location;
            }
        },

        saveSearchResult(state, { query, parcels }) {
            for(let parcel of parcels) {
                state.cache[parcel.key] = parcel;
            }
            state.search[query] = parcels.map(parcel => parcel.key);
        },

        saveHistory(state, { id, key, history }) {
            if (typeof state.history[id] === 'undefined') {
                state.history[id] = {};
            }

            state.history[id][key] = history;
        },
    },

    actions: {
        loadPage({ state, rootState, commit }, page) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true);

                if (typeof state.pages[page] !== 'undefined') {
                    let parcels = [];
                    for(let id of state.pages[page]) {
                        parcels.push(state.cache[id]);
                    }
                    commit('setCurrentPage', page);
                    commit('setLoading', false);
                    commit('clearSelected');
                    resolve(parcels);
                } else {
                    axios
                        .get('parcels', {
                            params: {
                                page,
                            },
                            headers: {
                                Authorization: 'Bearer ' + rootState.auth.accessToken,
                            }
                        })
                        .then(result => {
                            let parcels = result.data.data;
                            commit('addPage', { page, parcels });
                            commit('setCurrentPage', page);
                            commit('setLoading', false);
                            commit('setTotalPages', result.data.meta.pagination.total_pages);
                            commit('setTotalItems', result.data.meta.pagination.total);
                            commit('clearSelected');
                            resolve(parcels);
                        })
                        .catch(reject);
                }
            })
        },

        remove({ state, rootState, commit, dispatch }, { ids }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true);
                const next = () => {
                    if (ids.length == 0) {
                        const currentPage = state.currentPage;
                        commit('clearCache');
                        dispatch('loadPage', currentPage);
                        resolve(true);
                    } else {
                        const id = ids[0];
                        ids.splice(0, 1);
                        axios
                            .delete('parcels/' + id, {
                                headers: {
                                    Authorization: 'Bearer ' + rootState.auth.accessToken,
                                },
                            })
                            .then(() => next())
                            .catch(e => {
                                commit('setLoading', false);
                                console.log(e);
                                resolve(false);
                            });
                    }
                };
                next();
            });
        },

        update({ state, rootState, commit, dispatch }, { ids, status, location }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true);
                const next = () => {
                    if (ids.length == 0) {
                        commit('clearSelected');
                        commit('setLoading', false);
                        resolve(true);
                    } else {
                        const id = ids[0];
                        ids.splice(0, 1);
                        axios
                            .post('parcels/' + id, {status, location}, {
                                headers: {
                                    Authorization: 'Bearer ' + rootState.auth.accessToken,
                                },
                            })
                            .then(() => {
                                commit('update', { id, status, location });
                                next();
                            })
                            .catch(e => {
                                commit('setLoading', false);
                                console.log(e);
                                resolve(false);
                            });
                    }
                };
                next();
            });
        },

        getById({ state, commit, dispatch, rootState }, id) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true);
                if (typeof state.cache[id] !== 'undefined') {
                    commit('setLoading', false);
                    resolve(state.cache[id]);
                } else {
                    axios
                        .get('parcels/' + id, {
                            headers: {
                                Authorization: 'Bearer ' + rootState.auth.accessToken,
                            },
                        })
                        .then(result => {
                            const parcel = result.data.data;
                            commit('appendCache', [parcel]);
                            commit('setLoading', false);
                            resolve(parcel);
                        })
                        .catch(e => {
                            commit('setLoading', false);
                            console.log(e);
                            resolve(null);
                        });
                }
            });
        },

        /**
         * Поиск посылок
         * @param state
         * @param commit
         * @param rootState
         * @param query
         * @returns {Promise<any>}
         */
        search({ state, commit, rootState }, query) {
            return new Promise((resolve, reject) => {
                if (typeof state.search[query] !== 'undefined') {
                    let result = [];
                    for(let id of state.search[query]) {
                        result.push(state.cache[id]);
                    }
                    resolve(result);
                } else {
                    axios
                        .get('/parcels', {
                            params: {
                                query,
                            },
                            headers: {
                                Authorization: 'Bearer ' + rootState.auth.accessToken,
                            }
                        })
                        .then(result => {
                            let parcels = result.data.data;
                            commit('saveSearchResult', { query, parcels });
                            resolve(parcels);
                        })
                        .catch(e => {
                            console.log(e);
                            resolve([]);
                        });
                }
            });
        },

        /**
         * Получение записей истории
         * @param state
         * @param rootState
         * @param commit
         * @param id
         * @param key
         * @returns {Promise<any>}
         * @example:
         * // Получение истории изменения локации посылки
         * this.$store.dispatch('parcels/getHistory', {
         *     id: this.$route.params.id,
         *     key: 'location',
         * });
         */
        getHistory({ state, rootState, commit }, { id, key }) {
            return new Promise((resolve, reject) => {
                if (typeof state.history[id] === 'object' && typeof state.history[id][key] !== 'undefined') {
                    resolve(state.history[id][key]);
                } else {
                    axios
                        .get('/history', {
                            params: {
                                parcel: id,
                                key,
                            },
                            headers: {
                                Authorization: 'Bearer ' + rootState.auth.accessToken,
                            }
                        })
                        .then(result => {
                            let history = result.data.data;
                            commit('saveHistory', { id, key, history });
                            resolve(history);
                        })
                        .catch(e => {
                            console.log(e);
                            resolve([]);
                        });
                }
            })
        },
    },
};
