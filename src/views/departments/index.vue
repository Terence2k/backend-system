<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-card class="box-card">

      <TreeTools :data="company" style="height: 40px;" :is-root="true" />
      <hr>
      <el-tree :data="departments" :props="defaultProps">

        <TreeTools slot-scope="scope" :data="scope.data" style="height: 40px;width:100%;" />
      </el-tree>
    </el-card>
    <!-- <Addlist :dialog-form-visible="true" /> -->
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
      data: [
        {
          name: '总裁办',
          hr: '皇帝',
          children: [
            {
              name: '董事会',
              hr: '皇子'
            }
          ]
        },
        {
          name: '行政部',
          hr: '太监'
        },
        {
          name: '人事部',
          hr: '东窗'
        },
        {
          name: '财政部'

        }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人'
      },
      departments: []

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
      console.log(res.depts, 'department')
      this.departments = this.dealDepartmentData(res.depts, '')
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
