<template>
  <div class="dashboard-container">

    <el-row :data="data" type="flex" justify="space-between" align="middle" style="height: 40px;width:100%;">
      <el-col>
        <span>{{ data.name }}</span>
      </el-col>
      <el-col :span="6">
        <el-row type="flex" justify="end">
          <!-- 两个内容 -->
          <el-col>{{ data.manager }}</el-col>
          <el-col>
            <!-- 下拉菜单 element -->
            <el-dropdown @command="operateDepts">
              <span>
                操作<i class="el-icon-arrow-down" />
              </span>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { delDepartment } from '@/api/user'

export default {

  props: {
    data: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean
    }
  },
  methods: {
    async  operateDepts(type) {
      try {
        if (type === 'add') {
          console.log(1)
        } else if (type === 'del') {
          const res = await delDepartment(this.data.id)
          console.log(res)
          console.log('del')
        } else if (type === 'edit') {
          console.log(2)
        }
      } catch (error) {
        console.log(error)
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
