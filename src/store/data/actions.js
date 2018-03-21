import {
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  VIEW_PROVIDER
} from './types'
import axios from 'axios'

export const getData = ({commit}) => {
  axios.get(`${process.env.API_BASE_URL}/api/data`)
    .then(response => {
      console.log('Response: ', response.data)
      commit(GET_DATA_SUCCESS, response.data)
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
