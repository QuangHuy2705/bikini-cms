import axios from 'axios'
import { apiErrorToast } from '../utility/Utils'

const axiosClient = axios.create({
  baseURL: '/api'
  // withCredentials: true
})

const handleResponseError = (response) => {
  const { err, msg_vn, msg_en } = formatResponse(response.data)
  if (err !== 0 && err !== 2402 && err !== 5003) {
    apiErrorToast(msg_vn || msg_en)
  }
}

axiosClient.interceptors.response.use(
  function (response) {
    // handleResponseError(response)
    return response.data
  },
  function (error) {
    // if (error.response.status === 401) store.dispatch(authActions.logout())
    // else
    apiErrorToast('Đã có lỗi xảy ra. Vui lòng thử lại sau!') // TODO: Support I18n
    return Promise.reject(error)
  }
)

export const fetch = async (
  method,
  url,
  params,
  headers = {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmE3NTdjMGI1NDk5ZTMwOGFiODQwNDEiLCJpYXQiOjE2NTYxMzQzOTMsImV4cCI6MTY3NDEzNDM5MywidHlwZSI6ImFjY2VzcyJ9.4Unqk4t_ekSmlTaiOfBsOO1x68baN9JXPJy2e7NdhZQ'
  }
) => {
  const config = { method, url, headers }

  if (method.toLowerCase() === 'get') config.params = params
  else config.data = params

  let response = null
  try {
    response = await axiosClient(config)
  } catch (error) {}

  return response
}

export default axiosClient

export const customFetch = async (config = {}) => {
  const res = await axiosClient({
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers
    }
  })

  return res
}
