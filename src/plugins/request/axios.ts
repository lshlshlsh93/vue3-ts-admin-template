import axios, { type AxiosInstance, type RawAxiosRequestConfig } from 'axios'
import type { BackendServiceResult } from '@/hooks/content/types'
import { transformRequestData } from '@/utils'
import { useUser } from '@/stores'
import { handleBackendError, handleRequestError, handleResponseError } from './error'

export default class CustomRequest {

  private instance: AxiosInstance

  constructor(axiosConfig: RawAxiosRequestConfig) {
    this.instance = axios.create(axiosConfig)
    this.setRequestInterceptor()
    this.setResponseInterceptor()
  }

  /**
   * 设置请求拦截器
   */
  private setRequestInterceptor() {
    this.instance.interceptors.request.use(async config => {
      const handleConfig = { ...config }

      const userStore = useUser()
      const accessToken = userStore.accessToken

      if (handleConfig.headers) {
        // 对于请求数据进行数据转换
        const contentType = handleConfig.headers['Content-Type'] as string
        // 进行数据转换
        handleConfig.data = await transformRequestData(handleConfig.data, contentType)
      }
      if (accessToken) {
        handleConfig.headers['x-user-token'] = accessToken
      }
      return handleConfig
    }, error => {
      return handleRequestError(error)
    })
  }

  /**
   * 设置响应拦截器
   */
  private setResponseInterceptor() {
    this.instance.interceptors.response.use(response => {
      if (response.status >= 200 && response.status < 300) {
        const backendResult = response.data as BackendServiceResult
        // 约定响应状态码：200和0为请求成功
        if (
          backendResult.code
          && backendResult.code !== 200
          && backendResult.code !== 0
        ) {
          // 处理后端错误
          return handleBackendError(backendResult)
        }
        return response.data
      } else {
        // 处理请求成功后错误
        return handleResponseError(response)
      }
    }, error => {
      // 处理请求错误
      return handleRequestError(error)
    })
  }

  /**
   * 请求函数
   * 1. 传入泛型T，T为后端返回的data类型，默认any
   * 2. 传出一个Promise类型的BackendServiceResult<T>，具体为：
   *  {
   *    code:string,
   *    data:T,
   *    message:string
   *  }
   */
  public request<T = any>(config: RawAxiosRequestConfig): Promise<BackendServiceResult<T>> {
    return new Promise((resolve, reject) => {
      this.instance.request<any, BackendServiceResult<T>>(config)
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }

}
