import { createProdMockServer } from 'vite-plugin-mock/client'

import userModule from './modules/user'

export function setupMockServer() {
  createProdMockServer([...userModule])
}
