import { type AxiosError, type AxiosResponse } from 'axios'
import { router } from '@/router'
import type { BackendServiceResult, RequestServiceError } from '@/hooks/content/types'
import { useUser } from '@/stores'

import {
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
  ERROR_STATUS,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG
} from '@/config'
import { showErrorMsg } from '@/utils/toast'

/**
 * 后端逻辑code报错处理
 * @param backendServiceResult 后端传来错误信息
 */
export function handleBackendError(backendServiceResult: BackendServiceResult) {
  const error: RequestServiceError = {
    type: 'backend',
    code: backendServiceResult.code,
    msg: backendServiceResult.message
  }
  showErrorMsg(error)
  return Promise.reject(backendServiceResult)
}

/**
 * 处理请求成功后错误
 */
export function handleResponseError(response: AxiosResponse) {
  const error: RequestServiceError = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  }

  if (!window.navigator.onLine) {
    // 网路错误
    Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG })
  } else {
    // 请求成功的状态码非200的错误
    const errorCode: ErrorStatus = response.status as ErrorStatus
    const msg = ERROR_STATUS[errorCode] || DEFAULT_REQUEST_ERROR_MSG
    Object.assign(error, { type: 'backend', code: errorCode, msg })
  }
  showErrorMsg(error)

  return Promise.reject(response)
}

/**
 * 处理请求失败
 */
type ErrorStatus = keyof typeof ERROR_STATUS;

export function handleRequestError(axiosError: AxiosError) {
  const error: RequestServiceError = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  }
  // 网络错误
  if (!window.navigator.onLine || axiosError.message === 'Network Error') {
    Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG })
  }
  // 请求超时
  else if (axiosError.code === REQUEST_TIMEOUT_CODE && axiosError.message.includes('timeout')) {
    /** 超时错误 */
    Object.assign(error, { code: REQUEST_TIMEOUT_CODE, msg: REQUEST_TIMEOUT_MSG })
  }
  // 请求出错,如404， 403
  else {
    const errorCode: ErrorStatus = axiosError.response?.status as ErrorStatus
    const msg = ERROR_STATUS[errorCode] || DEFAULT_REQUEST_ERROR_MSG
    Object.assign(error, { code: errorCode || DEFAULT_REQUEST_ERROR_CODE, msg })
    showErrorMsg(error)
    // 鉴权错误
    if (axiosError.response?.status === 403) {
      useService403()
    }
  }

  return Promise.reject(axiosError.response)
}

// 403鉴权错误
function useService403() {
  useUser().logoutAction()
  router.replace('/login')
}
