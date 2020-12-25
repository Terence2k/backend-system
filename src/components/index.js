
// import pageTools from '@/components/pageTools'
import pageTools from '@/components/pageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadPic from '@/components/UploadPic'
export default {
  install(Vue) {
    Vue.component('TopTools', pageTools)
    Vue.component('pageTools', pageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadPic', UploadPic)
  }
}
