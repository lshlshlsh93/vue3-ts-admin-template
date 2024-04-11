import CustomRequest from './axios'

/**
 * 导出Request示例
 */
const request = new CustomRequest({
  baseURL: '',
  timeout: 1000 * 60
})

export default request
