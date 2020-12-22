<template>
  <div class="dashboard-container">
    <div class="app-container">
      <TopTools>
        <template slot="after">
          <el-button>新增权限</el-button>
        </template>
      </TopTools>
      <el-card>
        <el-table :data="permissionList" row-key="id">
          <el-table-column label="权限名字" prop="name" />
          <el-table-column label="权限标识" prop="code" />
          <el-table-column label="权限描述" prop="description" />
          <el-table-column label="权限操作">
            <template>
              <el-button>权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
export default {
  data() {
    return {
      permissionList: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.permissionList = await getPermissionList()
      console.log(this.permissionList)
      this.permissionList = this.dealData(this.permissionList, '0')
      console.log(this.permissionList)
    },
    dealData(data, init) {
      const arr = []
      data.forEach(item => {
        if (item.pid === init) {
          const children = this.dealData(data, item.id)
          if (children.length > 0) {
            item.children = children
          }
          arr.push(item)
        }
      })
      return arr
    }

  }
}
</script>

<style>

</style>
