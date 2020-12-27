<template>
  <div>
    <svg-icon icon-class="fullscreen" @click="fullscreen" />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  methods: {
    fullscreen() {
      if (ScreenFull.isEnabled) {
        this.$message.success('切换成功')
        ScreenFull.toggle()
      } else {
        this.$message.warning('此时不支持全屏')
      }
    }
  }
}
</script>

<style>

</style>
