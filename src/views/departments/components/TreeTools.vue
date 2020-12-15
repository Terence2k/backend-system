<template>
  <div class="tree-container">

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
          this.$emit('showdialog', this.data)
        } else if (type === 'del') {
          console.log('del')
          await this.$confirm('确定删除该部门吗')
          await delDepartment(this.data.id)
          this.$emit('reload')
        } else if (type === 'edit') {
          console.log('edit id ', this.data.name)
          this.$emit('edit', this.data)
        }
      } catch (error) {
        console.log('?')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
