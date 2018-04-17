import auth from './auth';
import parcels from './parcels';

export default {
    modules: {
        auth,
        parcels,
    },

    actions: {
        /**
         * Достаёт из кук токены доступа и вытаскивает профайл пользователя
         * @param commit
         * @param dispatch
         * @param reject
         * @param req
         * @returns {Promise<any>}
         */
        nuxtServerInit({ commit, dispatch, reject }, { req }) {
            return new Promise(resolve => {
                if (typeof req.headers.cookie === 'string') {
                    let token = /token[^;]+/.exec(req.headers.cookie);
                    token = decodeURIComponent(!!token ? token.toString().replace(/^[^=]+./, '') : '');

                    try {
                        token = JSON.parse(token);
                    } catch (e) {
                        token = null;
                    }

                    if (token) {
                        commit('auth/setToken', token);
                        dispatch('auth/getProfile')
                            .then(user => resolve(true))
                            .catch(() => resolve(false));
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            });
        },
    },
};
