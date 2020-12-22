<template>
  <div class="dashboard-container">
    <div class="app-container">
      <TopTools>
        <template slot="after">
          <el-button type="primary" @click="createPermission(1,'0')">新增权限</el-button>
        </template>
      </TopTools>
      <el-card>
        <el-table :data="permissionList" row-key="id" :default-expand-all="true">
          <el-table-column label="权限名字" prop="name" />
          <el-table-column align="center" label="权限标识" prop="code" />
          <el-table-column align="center" label="权限描述" prop="description" />
          <el-table-column align="center" label="权限操作">
            <template slot-scope="{row}">

              <el-button v-if="row.type===1" type="text" @click="createPermission(2,row.id)"> 添加权限</el-button>
              <el-button type="text" @click="editPermission(row.id)">编辑权限</el-button>
              <el-button type="text" @click="delPermission(row.id)">删除权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog :visible="isShow" :title="title" :destory-on-close="true" @close="cancle">
        <el-form label-width="80px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="激活状态">
            <el-switch
              v-model="formData.enVisible"
              active-color="red"
              inactive-color="#e4e4e4"
              active-value="1"
              inactive-value="0"
            />
            {{ formData.enVisible }}
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-button type="primary" @click="sureCreate">确认</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission, getPermissionDetail, updatePermission, delPermission } from '@/api/permission'
export default {
  data() {
    return {
      permissionList: [],
      isShow: false,
      formData: {
        name: '',
        code: '',
        enVisible: '',
        description: '',
        type: 1,
        pid: ''
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async delPermission(id) {
      await delPermission(id)
      this.$message.success('删除成功')
      this.getPermissionList()
    },
    cancle() {
      this.formData = {
        enVisible: '',
        name: '',
        code: '',
        description: '',
        type: 1,
        pid: ''
      }
      this.isShow = false
    },
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.isShow = true
    },
    async sureCreate() {
      console.log(this.formData, 'formdata')
      if (this.formData.id) {
        await updatePermission(this.formData)
      } else {
        await addPermission(this.formData)
      }
      this.isShow = false
      this.$message.success(this.formData.id ? '编辑成功' : '新增成功')
      this.getPermissionList()
    },
    createPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.isShow = true
    },
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
