<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        员工
      </h2>
      <TopTools :left="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import?type=employee')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
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
          <el-table-column label="头像">
            <template slot-scope="{row}">
              <img
                v-imageerror="require('@/assets/common/0.jpg')"
                style="border-radius:50%;width:100px;height:100px;padding:10px;"
                :src="row.staffPhoto"
                alt="pic"
                @click="row.staffPhoto? popCode(row.staffPhoto):(showCodeDialog= false)"
              >
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
              <el-button type="text" size="small" @click="$router.push('/employees/detail/'+row.id)">查看</el-button>
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
      <AddEmployees :is-show.sync="isShow" @addEmployee="getUserInfo" />
      <el-dialog title="二维码" :visible.sync="showCodeDialog" @opened="showQRcode">
        <el-row type="flex" justify="center">
          {{ imgURL }}
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUserList, delEmployee } from '@/api/employees'
import EmploymentEnum from '@/api/constant/employees'
import AddEmployees from './components/AddEmployees'
import employeesEnum from '@/api/constant/employees'
import { formatDate } from '@/filters'
export default {
  components: {
    AddEmployees
  },
  data() {
    return {
      imgURL: '',
      list: [],
      pageSetting: {
        page: 1,
        size: 8,
        total: 20
      },
      isShow: false,
      showCodeDialog: false

    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    popCode(url) {
      this.showCodeDialog = true
      this.imgURL = url
    },
    showQRcode() {
    },
    async exportData() {
      // 表头字典
      const headersEnum = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      const pageSetting = {
        page: 1,
        size: this.pageSetting.total
      }
      const { rows } = await getUserList(pageSetting)

      const header = Object.keys(headersEnum)
      const data = rows.map(item => {
        return this.obj2Array(item, headersEnum)
      })
      console.log(data)
      /*  excel.export_json_to_excel({
        header: tHeader, // 表头 必填
        data, // 具体数据 必填
        filename: 'excel-list', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      }) */
      const excel = await import('@/vendor/Export2Excel')
      excel.export_json_to_excel({
        header,
        data
      })
    },
    obj2Array(item, dictionary) {
      // console.log('555555555555555555', item)

      const arr = []
      for (const key in dictionary) {
        const name = dictionary[key]
        // console.log(name, 'name')
        let newkey = item[name]
        // console.log(item[name], 'newkey')
        if (name === 'correctionTime' || name === 'timeOfEntry') {
          newkey = formatDate(newkey)
        }
        if (name === 'formOfEmployment') {
          const obj = employeesEnum.hireType.find(item => item.id === newkey)
          newkey = obj ? obj.value : '不确定的临时工'
        }
        arr.push(newkey)
      }

      return arr
    },

    async delRole(id) {
      try {
        await this.$confirm('sure del?')
        const res = await delEmployee()
        console.log(res, 'res:')
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
