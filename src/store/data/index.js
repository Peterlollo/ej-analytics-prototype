import {
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  VIEW_PROVIDER,
  GET_PAGE_PATH_FROM_PARAM_SUCCESS,
  GET_PAGE_PATH_FROM_PARAM_FAILURE,
  WHITELIST_PROVIDER_FAILURE,
  WHITELIST_PROVIDER_SUCCESS,
  WHITELIST_CHANGE_PROVIDER_SECTOR_SUCCESS,
  WHITELIST_CHANGE_PROVIDER_SECTOR_FAILURE
} from './types'

const state = {
  error: null,
  isViewingProvider: null,
  isViewingPage: {
    id: null,
    path: null
  },
  filters: [],
  providers: [],
  pages: [],
  sessions: [],
  pageviews: [],
  pagePathFromParam: null,
  pagePathFromParamStatus: null,
  whitelistSectors: []
}

const mutations = {

  [GET_DATA_SUCCESS] (state, { providers, pages, sessions, pageviews }) {
    state.providers = state.providers.concat(providers)
    state.pages = state.pages.concat(pages)
    state.sessions = state.sessions.concat(sessions)
    state.pageviews = state.pageviews.concat(pageviews)
  },

  [GET_DATA_FAILURE] (state, error) {
    state.error = error
  },

  [VIEW_PROVIDER] (state, providerID) {
    state.isViewingProvider = providerID
  },

  [GET_PAGE_PATH_FROM_PARAM_SUCCESS] (state, path) {
    state.pagePathFromParam = path
    state.pagePathFromParamStatus = 'success'
    state.isViewingPage = state.pages.filter((p) => p.path === path)[0]
  },

  [GET_PAGE_PATH_FROM_PARAM_FAILURE] (state, path) {
    state.pagePathFromParam = path
    state.pagePathFromParamStatus = 'fail'
  },

  [WHITELIST_PROVIDER_FAILURE] (state) {
  },

  [WHITELIST_PROVIDER_SUCCESS] (state, provider) {
    state.providers = state.providers.map((p) => {
      return p.id === provider.id ? provider : p
    })
  },

  [WHITELIST_CHANGE_PROVIDER_SECTOR_SUCCESS] (state, provider) {
    state.providers = state.providers.map((p) => {
      return p.id === provider.id ? provider : p
    })
  },

  [WHITELIST_CHANGE_PROVIDER_SECTOR_FAILURE] (state) {
  }

}

export default { state, mutations }
