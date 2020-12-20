<template>

  <el-dialog title="新增员工" :visible="isShow" @close="cancleBtn">

    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 80%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 80%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 80%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 80%"
          placeholder="请选择"
        >
          <el-option v-for="item in employeesEnum.hireType" :key="item.id" :value="item.id" :label="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 80%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 80%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <div v-if="treeData.length > 0" class="treeWrapper">
          <el-tree
            class="treeDeparment"
            :data="treeData"
            :props="{ label: 'name' , children: 'children'}"
            :default-expand-all="true"
            @node-click="selectNode"
          />
        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 80%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancleBtn">取 消</el-button>
      <el-button type="primary" @click="sureInfo">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
import { getDepartments } from '@/api/user'
import employeesEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  props: {
    isShow: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      employeesEnum,
      treeData: [],
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    selectNode(data) {
      console.log(555, data)
      this.formData.departmentName = data.name
      this.treeData = []
    },
    async getDepartments() {
      const { depts } = await getDepartments()
      this.treeData = this.dealDepartmentData(depts, '')
      console.log(this.treeData)
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
    async sureInfo() {
      await addEmployee(this.formData)
      this.$emit('update:isShow', false)
      this.$emit('addEmployee')
    },
    cancleBtn() {
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.treeWrapper{
  height: 300px;
  width: 80%;
  overflow: hidden;
    position: absolute;
    z-index: 999;
  .treeDeparment{
    height: 300px;
   width:calc(100% + 17px);
    overflow-y: scroll;

  }
}
</style>
