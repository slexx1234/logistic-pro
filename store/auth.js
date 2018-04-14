import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    namespaced: true,
    state() {
        return {
            user: null,
            accessToken: null,
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setToken(state, token) {
            state.token = token;
            Cookies.set('token', JSON.stringify(token));
        },

        removeUser(state) {
            state.user = null;
        },

        removeToken(state) {
            state.token = null;
            Cookies.remove('token');
        },
    },

    actions: {
        getProfile({ state, commit }) {
            return new Promise((resolve, reject) => {
                if (state.tokens === null) {
                    resolve(null);
                }

                if (state.user !== null) {
                    resolve(state.user);
                }

                axios
                    .get('user', {
                        headers: {
                            Authorization: ' ' + state.accessToken,
                        }
                    })
                    .then(result => {
                        commit('setUser', result.data);
                        resolve(result.data);
                    })
                    .catch(reject);
            });
        },

        logout({ commit }) {
            commit('removeUser');
            commit('removeToken');
        },

        login({ commit, dispatch }, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('login', data)
                    .then(result => {
                        commit('setToken', result.data.accessToken);
                        dispatch('getProfile')
                            .then(profile => {
                                resolve(profile);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            })
        },
    },
}