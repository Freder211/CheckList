import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Checklist',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: process.env.ROUTER_BASE && process.env.ROUTER_BASE + 'favicon.ico' || '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/interceptors.js'  
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy'
  ],

  axios: {
    baseURL: 'http://localhost:8000',
    proxyHeader: false,
    credentials: false,
    proxy: true
  },

  proxy: {
    '/api-token-auth/': {
      target: 'http://localhost:8000',
    },
    '/api/lists/': {
      target: 'http://localhost:8000',
    },
    '/api/list/': {
      target: 'http://localhost:8000',
    }
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {

          login: {
            url:'api-token-auth/',
            method: 'post',
            propertyName: 'data.token',
          },
          logout: false,
          user: false,

        },
        tokenType: '',
        tokenName: 'Authorization',
        autoFetchUser: 'false',
      }
    }
  },

  pwa: {
    icon: {
      source: '~/static/icon.png'
    },
    meta: {
      name: 'CheckList',
    },
    manifest: {
      name: 'CheckList',
      short_name: 'CheckList',
    },
    workbox: {
      importScripts: [
        'notificationsSW.js'
      ],
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: colors.blue,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    base: process.env.ROUTER_BASE
  }
}
