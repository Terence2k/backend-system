<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        <el-card>
          <!-- tab切换 -->
          <el-tabs v-model="activeName">
            <!-- role -->
            <el-tab-pane name="role" label="roleMessage">
              <el-row>
                <el-col>

                  <el-button type="primary">create role</el-button>
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

                    <el-button type="primary">create</el-button>
                    <el-button type="primary">del</el-button>

                  </el-table-column>

                </el-table>
                <!-- 跳转栏 -->
                <el-row type="flex" justify="end">

                  <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageSetting.total"
                    :page-size="pageSetting.pagesize"
                    :page-sizes="[2, 5, 10, 20]"
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
      </h2>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyDetail } from '@/api/setting'

export default {
  data() {
    return {
      activeName: 'role',
      datalist: [],
      pageSetting: {
        total: 5,
        pagesize: 8,
        page: 1
      },
      companyInfo: []
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
    async getRoleListFn() {
      const { rows, total } = await getRoleList(this.pageSetting)
      console.log(rows, total)
      this.datalist = rows
      this.pageSetting.total = total
    }
  }
}
</script>

<style>

</style>
