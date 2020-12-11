export const imageerror = {
  inserted(dom, options) {
    dom.onerror = function() {
      console.log('执行错误')
      dom.src = options.value
    }
  }
}
