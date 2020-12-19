<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 账号信息 -->
          <el-tab-pane label="账号信息">
            <el-row type="flex" justify="center" align="middle">

              <el-form label-width="50px">
                <el-form-item label="名字">
                  <el-input v-model="formData.username" style="width:100%;" />
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="formData.newPassword" type="password" />
                </el-form-item>
                <el-form-item>

                  <el-button type="primary" @click="uploadInfo">保存</el-button>
                  <el-button>cancle</el-button>
                </el-form-item>
              </el-form>

            </el-row>
          </el-tab-pane>
          <!-- 个人详情 -->
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="center" align="middle">
              <UserInfo />
            </el-row>
          </el-tab-pane>
          <!-- 岗位详情 -->
          <el-tab-pane label="岗位详情">
            <el-row type="flex" justify="center" align="middle">
              <JobInfo />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfoId } from '@/api/user'

import UserInfo from './detail/detail-userInfo'
import JobInfo from './detail/detail-jobInfo'
import { saveUserDetailById } from '@/api/employees'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userId: this.$route.params.id,
      formData: {
        username: '',
        newPassword: ''
      }
    }
  },
  created() {
    this.getUserMes()
  },
  methods: {
    async getUserMes() {
    //   console.log(this.userId)
      const res = await getUserInfoId(this.userId)
      console.log(res)
      this.formData = res
    },
    async  uploadInfo() {
      this.formData = { ...this.formData, password: this.formData.newPassword }
      console.log('upload', 55555555555555555555555)
      await saveUserDetailById(this.formData)
    }
  }
}
</script>

<style>

</style>
