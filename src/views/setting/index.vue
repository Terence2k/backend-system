<template>
  <div class="dashboard-container">
    <div class="app-container">

      <el-card>
        <!-- tab切换 -->
        <el-tabs v-model="activeName">
          <!-- role -->
          <el-tab-pane name="role" label="roleMessage">
            <el-row>
              <!-- 新增角色 -->
              <el-col>
                <el-button type="primary" @click="createRole">create role</el-button>
              </el-col>
              <!-- 表格 -->
              <el-table :data="datalist">
                <el-table-column prop="id" label="num">
                  <template slot-scope="index">
                    {{ index.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="name" />
                <el-table-column prop="description" label="描述" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="dealPermission(scope.row.id)">权限分配</el-button>
                    <el-button type="primary" @click="delRole(scope.row.id)">del</el-button>
                    <el-button type="primary" @click="editRole(scope.row.id)">edit</el-button>
                  </template>

                </el-table-column>

              </el-table>
              <!-- 跳转栏 -->
              <el-row type="flex" justify="end">

                <el-pagination
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageSetting.total"
                  :page-size="pageSetting.pagesize"
                  :page-sizes="[2, 5, 10, 20]"
                  @current-change="currentChange"
                  @size-change="sizeChange"
                />

              </el-row>
            </el-row>

          </el-tab-pane>
          <!-- company -->
          <el-tab-pane name="company" label="companyIntroduce">
            <el-alert title="这是公示信息，不要泄露修改" type="info" show-icon />
            <el-form label-width="130px" style="margin-top:10px">
              <el-form-item label="名称">
                <el-input v-model="companyInfo.name" style="width:400px" disabled />
              </el-form-item>
              <el-form-item label="口号">
                <el-input v-model="companyInfo.remarks" style="width:400px" disabled />
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="companyInfo.companyAddress" style="width:400px" disabled />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="companyInfo.companyPhone" style="width:400px" disabled />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 弹出表格 -->
      <el-dialog :title="title" :visible.sync="isShow">
        <el-form ref="formRole" :model="roleFormData">
          <el-form-item label="角色" prop="name">
            <el-input v-model="roleFormData.name" style="width:500px" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="roleFormData.description" style="width:500px" />
          </el-form-item>
        </el-form>
        <template>
          <el-button type="primary" @click="sureBtn">确认</el-button>
          <el-button @click="cancleBtn">取消</el-button>

        </template>
      </el-dialog>

      <!-- 权限弹窗 -->
      <el-dialog :visible="pShow" title="分配权限" @close="btnCancelPerm">

        <el-tree
          ref="permTree"
          node-key="id"
          :data="treedata"
          :props="{ label: 'name' }"
          :show-checkbox="true"
          :check-strictly="true"

          :default-checked-keys="selectCheck"
        />
        <el-row>
          <el-button type="primary" @click="btnOkPerm">确认</el-button>
          <el-button @click="btnCancelPerm">取消</el-button>
        </el-row>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList,
  getCompanyDetail,
  delRole,
  addRole,
  getRoleDetail,
  updateRole,
  assignPerm } from '@/api/setting'
import { getPermissionList } from '@/api/permission'

export default {
  data() {
    return {
      activeName: 'role',
      datalist: [],
      pageSetting: {
        total: 0,
        pagesize: 5,
        page: 1
      },
      companyInfo: [],
      isShow: false,
      formLabelWidth: '',
      roleFormData: {
        name: '',
        description: ''
      },
      pShow: false,
      treedata: [],
      selectCheck: [],
      roleId: ''

    }
  },
  computed: {
    title() {
      return this.roleFormData.id ? '编辑' : '新增'
    }
  },
  watch: {
    '$store.getters.companyId': {
      async handler() {
        this.companyInfo = await getCompanyDetail(this.$store.getters.companyId)
        console.log(this.companyInfo, ',companyinfo')
      },
      immediate: true
    }
  },
  created() {
    this.getRoleListFn()
  },
  methods: {
    async btnOkPerm() {
      // 发送请求, 拿到两个东西,
      // 1. 当前选中的角色id值
      const id = this.roleId
      // 2. 用户改掉的权限勾选数组
      // console.log(this.selectCheck)
      // console.log('--------------')
      console.log(this.$refs.permTree.getCheckedNodes(), 'node')
      console.log(this.$refs.permTree.getCheckedKeys(), 'keys')
      const permIds = this.$refs.permTree.getCheckedKeys()
      const data = {
        id,
        permIds
      }
      await assignPerm(data)
      this.$message.success('修改成功')
      this.pShow = false
    },
    btnCancelPerm() {
      this.selectCheck = []
      this.pShow = false
    },
    async dealPermission(id) {
      this.roleId = id
      const { permIds } = await getRoleDetail(id)
      this.selectCheck = permIds
      console.log(permIds, 222222222222222222222)
      const data = await getPermissionList(id)
      this.pShow = true
      this.treedata = this.dealData(data, '0')
    },
    cancleBtn() {
      this.roleFormData = {
        name: '',
        description: ''
      }
      this.$refs.formRole.resetFields()
      this.isShow = false
    },
    async sureBtn() {
      if (this.roleFormData.id) {
        const res = await updateRole(this.roleFormData)
        console.log(res, 'edit')
      } else {
        const res = await addRole(this.roleFormData)
        console.log(res, 'result')
      }

      this.cancleBtn()
      this.getRoleListFn()
    },
    async delRole(id) {
      console.log(id)
      try {
        await this.$confirm('确定删除该部门吗')
        console.log('dek')
        await delRole(id)
        this.$message.success('删除成功')
        this.getRoleListFn()
      } catch (error) {
        console.log(error)
      }
    },
    async  editRole(id) {
      console.log(id)
      this.isShow = true
      const data = await getRoleDetail(id)
      this.roleFormData = data
    },
    createRole() {
      this.isShow = true
    },
    async getRoleListFn() {
      const { rows, total } = await getRoleList(this.pageSetting)
      console.log(rows, total)
      this.datalist = rows
      this.pageSetting.total = total
    },
    currentChange(value) {
      this.pageSetting.page = value
      this.getRoleListFn()
    },
    sizeChange(value) {
      this.pageSetting.pagesize = value
      this.getRoleListFn()
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
