<template>
  <div ref="tc" class="echarts" />
</template>

<script>
const echarts = require('echarts')
export default {
  mounted() {
    const EchartsInstants = echarts.init(this.$refs.tc)

    const option = {

      tooltip: {},

      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: 'a', max: 3000 },
          { name: 'b', max: 3000 },
          { name: 'c Techology）', max: 3000 },
          { name: 'd Support）', max: 3800 },
          { name: 'e', max: 3000 },
          { name: 'f', max: 3000 }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [1000, 2000, 2000, 1000, 4000, 3000],
            name: '预算分配（Allocated Budget）'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销（Actual Spending）'
          }
        ]
      }]
    }
    EchartsInstants.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
.echarts{
    width: 600px;
    height: 400px;
}
</style>
