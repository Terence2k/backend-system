import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const timeKey = 'hrproject-timestamp-key'
export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}

export function getTimeStamp() {
  return Cookies.get(timeKey)
}
export function removeTimeStamp() {
  return Cookies.remove(timeKey)
}
