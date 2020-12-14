<template>
  <div class="add-container">
    <!-- Form -->
    <el-dialog title="新增部门" :visible="isShow" :close-on-click-modal="false" @close="cancleBtn">
      <el-form ref="biaoge" :model="formData" :rules="rules">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="formData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部门编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="formData.code" autocomplete="off" />
        </el-form-item>

        <el-form-item label="部门负责人" :label-width="formLabelWidth">
          <el-select v-model="formData.manager" placeholder="请选择负责人" prop="manager" @focus="getEmployees">
            <el-option v-for="item in employeesInfo" :key="item.id" :label="item.username" :value="item.username" />

          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" :label-width="formLabelWidth" prop="introduce">
          <el-input v-model="formData.introduce" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleBtn">取 消</el-button>
        <el-button type="primary" @click="sureInfo">确 定</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { employees } from '@/api/employees'
import { addDepartments, getDepartments, getDepartmentDetails } from '@/api/user'

export default {

  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    const validateDeptsName = (rule, value, callback) => {
      getDepartments().then(data => {
        const { depts } = data

        depts.some(item => item.name === value && item.pid === this.info.id)
          ? callback(new Error('名字重复了'))
          : callback()
      })
    }
    const validataCode = async(rule, value, callback) => {
      const res = await getDepartments()
      console.log(res.depts, 'res')
      res.depts.some(item => item.code === value && item.pid === this.info.id)
        ? callback(new Error('code重复了'))
        : callback()
    }
    return {
      employeesInfo: [],
      formData: {
        name: '',
        manager: '',
        code: '',
        introduce: ''
      },
      formLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: '部门名称不空', trigger: 'blur' },
          { min: 1, max: 50, message: '1-50位' },
          { trigger: 'blur', validator: validateDeptsName }
        ],
        code: [
          { required: true, message: '部门编码不空', trigger: 'blur' },
          { min: 1, max: 50, message: '1-50位' },
          { trigger: 'blur', validator: validataCode }
        ],
        introduce: [
          { required: true, message: '部门介绍不空', min: 1, max: 300, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '负责人不空', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    async sureInfo() {
      try {
        console.log('点击了确认按钮')
        // console.log(this.$refs.biaoge)
        const isValid = await this.$refs.biaoge.validate()

        if (isValid) {
          console.log(this.formData)
          const data = { ...this.formData, pid: this.info.id }
          await addDepartments(data)
          this.$refs.biaoge.resetFields()
          this.$emit('update:isShow', false)
          this.$emit('reload')
        }
      } catch (error) {
        console.log(error)
      }
    },
    cancleBtn() {
      this.$refs.biaoge.resetFields()
      this.$emit('update:isShow', false)
    },
    async getEmployees() {
      console.log('focus')
      const res = await employees()
      console.log(res)
      this.employeesInfo = res
    },
    async getDepartmentDetails() {
      // 这里是回显函数
      // 最简单的是直接将外面传进来的回显
      // this.formData = this.data
      // 更加准确应该是重新获取
      const data = await getDepartmentDetails(this.data.id)
      this.formData = data
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
