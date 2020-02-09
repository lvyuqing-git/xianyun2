<template>
  <el-form :model="registerForm"
           ref="registerForm"
           :rules="rules"
           class="form">
    <el-form-item class="form-item"
                  prop="username">
      <el-input placeholder="用户名手机"
                v-model="registerForm.username">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="verificationcode">
      <el-input placeholder="验证码"
                v-model="registerForm.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="nickname">
      <el-input placeholder="你的名字"
                v-model="registerForm.nickname">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="password">
      <el-input placeholder="密码"
                type="password"
                v-model="registerForm.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item"
                  prop="confirmpassword">
      <el-input placeholder="确认密码"
                type="password"
                v-model="registerForm.confirmpassword">
      </el-input>
    </el-form-item>

    <el-button class="submit"
               type="primary"
               @click="handleRegSubmit">
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    let password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.password !== '') {
          this.$refs.registerForm.validateField('confirmpassword')
        }
        callback()
      }
    }
    let confirmpassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let username = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确格式的手机号码'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      registerForm: {
        username: '15360562781',
        captcha: '000000',
        nickname: '这是用户昵称',
        password: '123456',
        confirmpassword: '123456'
      },
      // 表单规则
      rules: {
        username: [{ validator: username, trigger: 'blur' }],
        verificationcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ validator: password, trigger: 'blur' }],
        confirmpassword: [{ validator: confirmpassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      if (!this.registerForm.username) {
        this.$alert('请输入手机号', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.$store
          .dispatch('user/verificationcode', {
            tel: this.registerForm.username
          })
          .then(res => {
            this.$message({
              message: '验证码发送成功',
              type: 'success'
            })
          })
      }
    },

    // 注册
    handleRegSubmit() {
      let { confirmpassword, ...post } = this.registerForm
      this.$store.dispatch('user/register', post) .then(res => {
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.$router.push('/')
          })
    }
  }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>