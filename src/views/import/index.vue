<template>
  <div>
    excel
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployees } from '@/api/employees'
export default {
  methods: {

    async  onSuccess({ header, results }) {
      console.log('excel')
      const dictionary = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      console.log(header, results)
      const data = results.map(item => {
        return this.chToEn(item, dictionary)
      })

      if (this.$route.query.type === 'employee') {
        await importEmployees(data)
        this.$message.success('导入success')
        setTimeout(() => {
          this.$router.back()
        }, 800)
      } else {
        this.$message.error('未知错误')
      }
    },
    chToEn(item, dictionary) {
      const newArr = {}
      for (const key in item) {
        /*    console.log(key, item[key], '数据')
        console.log(dictionary[key], '字典') */
        const newKey = dictionary[key]
        let newValue = item[key]
        if (newKey === 'correctionTime' || newKey === 'timeOfEntry') {
          newValue = new Date(this.formatDate(newValue, '/'))
        }
        newArr[newKey] = newValue
      }
      return newArr
    },
    // 专用于导入excel后时间处理
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }

  }
}
</script>

<style>

</style>
