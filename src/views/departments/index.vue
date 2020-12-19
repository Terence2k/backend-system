<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-card class="box-card">

      <TreeTools :data="company" style="height: 40px;" :is-root="true" />
      <hr>
      <el-tree :data="departments" :props="defaultProps" :default-expand-all="true">

        <TreeTools
          slot-scope="scope"
          :data="scope.data"
          style="height: 40px;width:100%;"

          @showdialog="showDialog"
          @reload="getDepartment"
          @edit="editDepartment"
        />
      </el-tree>
    </el-card>
    <Addlist ref="addList" :is-show.sync="isShow" :info="info" @reload="getDepartment" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/user'
import { mapGetters } from 'vuex'
import TreeTools from './components/TreeTools'
import Addlist from './components/addList'

export default {
  name: 'Dashboard',
  components: {
    TreeTools,
    Addlist
  },

  data() {
    return {

      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人'
      },
      departments: [],
      isShow: false,
      info: {}

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])

  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const res = await getDepartments()
      this.departments = this.dealDepartmentData(res.depts, '')
      console.log(this.departments)
      // this.departments = res.depts
    },
    dealDepartmentData(data, init) {
      const arr = []
      data.forEach(item => {
        if (item.pid === init) {
          const children = this.dealDepartmentData(data, item.id)
          if (children.length > 0) {
            item.children = children
          }
          arr.push(item)
        }
      })
      return arr
    },
    showDialog(info) {
      this.isShow = true

      this.info = info
    },
    editDepartment(info) {
      this.isShow = true
      this.info = info

      this.$nextTick(() => {
        this.$refs.addList.getDepartmentDetails()
      })
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
