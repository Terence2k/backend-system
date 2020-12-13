import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'

  })
}

export function getUserInfoId(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
