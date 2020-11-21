import { AxiosInstance } from 'axios'
import { GetRequestData, PostRequestData, PutRequestData, DeleteRequestData } from './apiRequestDataTypes'

export default class MainApi {
  #axios: AxiosInstance

  constructor (axios: AxiosInstance) {
    this.#axios = axios
  }

  get ({ path, query }: GetRequestData) {
    return this.#axios.get(path, { params: query })
  }

  post ({ path, data, options }: PostRequestData) {
    return this.#axios.post(path, data, options)
  }

  put ({ path, id, data, options }: PutRequestData) {
    return this.#axios.put(`${path}/${id}`, data, options)
  }

  delete ({ path, id, query }: DeleteRequestData) {
    return this.#axios.delete(`${path}/${id}`, { params: query })
  }
}
