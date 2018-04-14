module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'logistic-pro',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [

        ]
    },

    css: [
        { src: '~styles/main.scss', lang: 'scss' },
    ],

    /*
    ** Customize the progress bar color
    */
    loading: { color: '#fff' },

    plugins: [
        './plugins/icon.js',
    ],

    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
