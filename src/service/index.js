import axios from 'axios'
import { apiErrorToast } from '../utility/Utils'

const axiosClient = axios.create({
  baseURL: 'https://bikini-server-v2.herokuapp.com'
  // withCredentials: true
})

axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('accessToken') || ''
  config.headers['Authorization'] = 'Bearer ' + token.replace(/^"(.*)"$/, '$1')

  return config
})

const handleResponseError = (response) => {
  const { err, msg_vn, msg_en } = formatResponse(response.data)
  if (err !== 0 && err !== 2402 && err !== 5003) {
    apiErrorToast(msg_vn || msg_en)
  }
  console.log()
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
    'Content-type': 'application/json'
  }
) => {
  const config = { method, url, headers }

  if (method.toLowerCase() === 'get') config.params = params
  else config.data = params

  let response = null
  try {
    response = await axiosClient(config)
  } catch (error) {
    console.log(error)
  }

  return response
}

export const upload = (url, files) => {
  const formData = new FormData()
  // for (const [key, file] of Object.entries(files)) {
  //
  // }
  formData.append('images', files)

  return fetch('post', url, formData, {
    'Content-type': 'multipart/form-data'
  })
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
