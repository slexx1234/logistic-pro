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
            selected: [],
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

        select(state, id) {
            state.selected.push(id);
        },

        clearSelected(state) {
            state.selected = [];
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
        }
    },
};
