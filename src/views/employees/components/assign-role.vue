<template>
  <el-dialog :visible="showRoleDialog" title="角色" @close="cancle">
    {{ checkList }}
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in list " :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>

    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-button type="primary" @click="okBtn">确认</el-button>
      <el-button @click="cancle">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserInfoId } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      defalut: false
    },
    userId: {
      type: String,
      default: null
    }

  },
  data() {
    return {
      checkList: [],
      list: []

    }
  },
  created() {
    this.getRoleList()
    this.getUserInfoId()
  },
  methods: {
    async okBtn() {
      await assignRoles({ roleIds: this.checkList, id: this.userId })
      this.$message.success('修改成功')
      this.$emit('update:showRoleDialog', false)
    },
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserInfoId(id) {
      const { roleIds } = await getUserInfoId(id)
      this.checkList = roleIds
    },
    cancle() {
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-checkbox{
    margin: 10px;
  }
</style>
