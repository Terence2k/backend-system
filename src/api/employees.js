import request from '@/utils/request'

export function employees() {
  return request({
    url: '/sys/user/simple'
  })
}
