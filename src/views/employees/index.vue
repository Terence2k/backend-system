<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        员工
      </h2>
      <TopTools :left="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="isShow=true">新增员工</el-button>
        </template>
      </TopTools>
      <el-card>

        <el-table :data="list">
          <el-table-column label="序号" sortable="" prop="username">
            <template slot-scope="{$index}">

              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="用户名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间">
            <template slot-scope="{row}">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="庄户状态" sortable="" prop="enableState">
            <template slot-scope="{row}">

              <el-switch :value="row.enableState===1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" prop="id" width="300px">
            <template slot-scope="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delRole(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" align="middle" style="height: 60px;">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageSetting.total"
            :page-size="pageSetting.size"
            :page-sizes="[2,8,10,20,50]"
            @current-change="currentChange"
            @size-change="sizeChange"
          />
        </el-row>
      </el-card>
      <AddEmployees :is-show.sync="isShow" />
    </div>
  </div>
</template>

<script>
import { getUserList, delEmployee } from '@/api/employees'
import EmploymentEnum from '@/api/constant/employees'
import AddEmployees from './components/AddEmployees'
export default {
  components: {
    AddEmployees
  },
  data() {
    return {
      list: [],
      pageSetting: {
        page: 1,
        size: 8,
        total: 20
      },
      isShow: false
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async delRole(id) {
      try {
        await this.$comfirm('sure del?')
        const res = await delEmployee()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    async  getUserInfo() {
      const { rows, total } = await getUserList(this.pageSetting)
      this.pageSetting.total = total
      this.list = rows
    },
    currentChange(val) {
      this.pageSetting.page = val
      this.getUserInfo()
    },
    sizeChange(val) {
      this.pageSetting.size = val
      this.getUserInfo()
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmploymentEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : 'error'
    }
  }
}
</script>

<style>

</style>
