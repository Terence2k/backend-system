<template>
  <div class="dashboard-container">

    <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <el-col>
          <div v-if="left">

            <i class="el-icon-info" />
            <slot name="before" />
          </div>
        </el-col>
        <el-col>
          <el-row type="flex" justify="end">
            <slot name="after" />
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script>
export default {

}
</script>

<style>

</style>
