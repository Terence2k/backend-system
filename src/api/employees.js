import request from '@/utils/request'

export function employees() {
  return request({
    url: '/sys/user/simple'
  })
}

export function getUserList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
