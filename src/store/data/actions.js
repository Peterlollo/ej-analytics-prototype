import {
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  VIEW_PROVIDER,
  GET_PAGE_PATH_FROM_PARAM_SUCCESS,
  GET_PAGE_PATH_FROM_PARAM_FAILURE
} from './types'
import axios from 'axios'

export const getData = ({commit, dispatch}) => {
  axios.get(`${process.env.API_BASE_URL}/api/data`)
    .then(response => {
      console.log('Response: ', response.data)
      commit(GET_DATA_SUCCESS, response.data)
      dispatch('getPagePathFromParam')
    })
    .catch(e => {
      console.log('Error: ', e)
      commit(GET_DATA_FAILURE, e)
    })
}

export const getMoreData = ({commit}) => {
  axios.get(`${process.env.API_BASE_URL}/api/fetchMoreData`)
    .then(response => {
      console.log('Response: ', response.data)
      commit(GET_DATA_SUCCESS, response.data)
    })
    .catch(e => {
      console.log('Error: ', e)
      commit(GET_DATA_FAILURE, e)
    })
}

export const viewProvider = ({commit}, providerID) => {
  commit(VIEW_PROVIDER, providerID)
}

export const getPagePathFromParam = ({commit, state}) => {
  console.log('getting page path!')
  let parsedUrl = new URL(window.location.href)
  let path = parsedUrl.searchParams.get('path')
  let page = state.data.pages.filter((p) => p.path === path)[0]
  if (page) {
    commit(GET_PAGE_PATH_FROM_PARAM_SUCCESS, path)
  } else {
    commit(GET_PAGE_PATH_FROM_PARAM_FAILURE, path)
  }
}
