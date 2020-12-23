import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

export function getCompanyDetail(campanyId) {
  return request({
    url: '/company/' + campanyId
  })
}

export function delRole(roleId) {
  return request({
    url: '/sys/role/' + roleId,
    method: 'delete'
  })
}

export function getRoleDetail(id) {
  return request({
    url: '/sys/role/' + id
  })
}

export function updateRole(data) {
  return request({
    method: 'put',
    url: '/sys/role/' + data.id,
    data
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
