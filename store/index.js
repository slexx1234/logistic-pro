import auth from './auth';

export default {
    modules: {
        auth,
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
                    let tokens = /token[^;]+/.exec(req.headers.cookie);
                    tokens = decodeURIComponent(!!tokens ? tokens.toString().replace(/^[^=]+./, '') : '');

                    try {
                        tokens = JSON.parse(tokens);
                    } catch (e) {
                        tokens = null;
                    }

                    if (tokens) {
                        commit('auth/setToken', tokens);
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
