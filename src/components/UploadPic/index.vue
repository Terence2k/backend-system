<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :class="{disable:limitNum}"
      :on-remove="handleRemove"
      :on-change="change"
      :before-upload="vailInfo"
      :http-request="uploadPic"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="isShow">
      <img :src="imgURL" alt="pic">
    </el-dialog>
    <el-progress v-if="Show" style="width:200px" :percentage="onloaded" />
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { cloudConfig } from '@/private'
const cos = new COS(cloudConfig)
export default {
  data() {
    return {
      onloaded: 0,
      isShow: false,
      Show: false,
      fileList: [

      ],
      imgURL: '',
      currentId: ''
    }
  },
  computed: {
    limitNum() {
      return this.fileList.length === 1
    }
  },
  methods: {

    uploadPic(params) {
      cos.putObject({
        Bucket: 'web-storage-1304560197', /* 必须 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
        Key: params.file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: params.file, // 上传文件对象
        onProgress: (progressData) => {
          console.log(JSON.stringify(progressData))
          this.onloaded = progressData.percent * 100
        }
      }, (err, data) => {
        console.log(err || data)
        this.Show = false
        if (!err && data.statusCode === 200) {
          this.fileList = this.fileList.map(item => {
            console.log(item.id, this.currentId, item.id === this.currentId, 'item.upload55555555555555555555555555555555555555555555')
            if (item.uid === this.currentId) {
              item.url = 'http://' + data.Location
              item.upload = true
            }
            return item
          })

          // this.fileList = [{ ...this.fileList, upload: false }]
        }
      })
    },
    onPreview(file) {
      this.isShow = true
      this.imgURL = file.url
      console.log(this.imgURL)
    },
    handleRemove(file, fileList) {
      this.fileList = [...fileList]
    },
    change(file, fileList) {
      this.fileList = [...fileList]
    },
    vailInfo(file, fileList) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']

      if (!types.includes(file.type)) {
        this.$message.error('只接受图片格式')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('超过2M')
        return false
      }
      this.Show = true
      this.currentId = file.uid
      console.log(this.currentId = file.uid, this.currentId, file.uid)
      return true
    }
  }

}
</script>

<style lang="scss" scoped>
    ::v-deep .disable .el-upload.el-upload--picture-card{
        display: none;
    }
   ::v-deep img{
    //    display: none;

        object-fit:contain;
    }
</style>
