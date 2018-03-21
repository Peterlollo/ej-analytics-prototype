import {
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  VIEW_PROVIDER
} from './types'

const state = {
  error: null,
  isViewing: null,
  filters: [],
  providers: [],
  pages: [],
  sessions: [],
  pageviews: []
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
    state.isViewing = providerID
  }

}

export default { state, mutations }
