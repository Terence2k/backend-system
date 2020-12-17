
// import pageTools from '@/components/pageTools'
import pageTools from '@/components/pageTools'
import UploadExcel from '@/components/UploadExcel'
export default {
  install(Vue) {
    Vue.component('TopTools', pageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
