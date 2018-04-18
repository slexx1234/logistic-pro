import axios from 'axios';

export default {
    namespaced: true,

    state() {
        return {
            cache: {},
            pages: {},
            totalItems: 0,
            totalPages: 1,
            currentPage: 1,
            currentParcels: [],
            isLoading: true,
            selected: {},
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
    },
};
