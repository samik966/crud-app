import axios from 'axios'

let signal = axios.CancelToken.source()

/**
 * returns if error is being caused by axios cancel
 * @function
 * @returns {Boolean} - true if the error caused by canceling the request
 */
const areRequestsCanceled = err => {
  return err && axios.isCancel(err)
}

/**
 * cancels every request
 * @function
 */
const cancelRequests = () => {
  signal.cancel({ isCanceled: true, message: 'Requests canceled' })
  signal = axios.CancelToken.source()
}

/**
 * parse error response
 * @function
 * @param {Error} error - Error to parse
 * @returns {Promise} - Contains the error object
 */
function parseError (error) {
  if (error.response) {
    return Promise.reject(error.response.data)
  }

  return Promise.reject(error)
}

/**
 * axios instance
 */
const instance = axios.create({})

// response parse
instance.interceptors.response.use(response => {
  return response
}, parseError)

// request parse
instance.interceptors.request.use(request => {
  request.cancelToken = signal.token
  return request
}, parseError)

export { areRequestsCanceled, cancelRequests }
export default instance
