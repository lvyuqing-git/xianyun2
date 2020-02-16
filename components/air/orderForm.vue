<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item"
             v-for="(item,index) in form.users"
             :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名"
                      class="input-with-select"
                      v-model="form.users[index].username">
              <el-select slot="prepend"
                         value="1"
                         placeholder="请选择">
                <el-option label="成人"
                           value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码"
                      class="input-with-select"
                      v-model="form.users[index].id">
              <el-select slot="prepend"
                         value="1"
                         placeholder="请选择">
                <el-option label="身份证"
                           value="1"
                           :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user"
                @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member"
                 type='primary'
                 @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item"
             v-for="(item,index) in airTicketInfo.insurances"
             :key="index">
          <el-checkbox :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
                       border
                       @change="insuranceChoice(item.id)">
          </el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容"
                      v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning"
                   class="submit"
                   @click="handleSubmit()">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //机票信息
      airTicketInfo: {},

      form: {
        //乘机人
        users: [
          {
            username: '乘机人',
            id: '440811199811210390'
          }
        ],
        //保险
        insurances: [],
        //联系人名
        contactName: '名字',
        //联系电话
        contactPhone: '15360562781',
        //手机验证码
        captcha: '000000',
        //是否需要发票
        invoice: false,
        //座位id
        seat_xid: this.$route.query.seat_xid,
        //航班id
        air: this.$route.query.id
      }
    }
  },
  methods: {
    //选择保险
    insuranceChoice(id) {
      let index = this.form.insurances.indexOf(id)
      if (index === -1) {
        this.form.insurances.push(id)
      } else {
        this.form.insurances.splice(index, 1)
      }
    },
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({
        username: '',
        id: ''
      })
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1)
    },

    // 发送手机验证码
    handleSendCaptcha() {
      this.$store
        .dispatch('user/verificationcode', { tel: this.form.contactPhone })
        .then(res => {
          this.$message.success('发送成功')
        })
    },

    // 提交订单
    handleSubmit() {
      //表单验证
      let rules = {
        users: {
          errMessage: '乘机人信息不能为空',
          validator: () => {
            let valid = ture
            this.form.users.forEach(item => {
              if (!item.id || !item.username) {
                valid = false
              }
            })
            return valid
          }
        },
        contactName: {
          errMessage: '联系人不能为空',
          validator: () => {
            return !this.form.contactName
          }
        },

        contactPhone: {
          errMessage: '联系电话不能为空',
          validator: () => {
            return !this.form.contactPhone
          }
        },

        captcha: {
          errMessage: '验证码',
          validator: () => {
            return !this.form.captcha
          }
        }
      }
      let arr = Object.keys(rules)
      let valid = true
      arr.forEach(item => {
        if (!valid) return
        if (!rules[item].validator) {
          valid = false
          this.$message(rules[item].errMessage)
        }
      })
      if (valid) {
        this.$axios({
          url: '/airorders',
          method: 'POST',
          data: this.form,
          headers: {
            // Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
            
          }
        }).then(res => {
          this.$message.success(res.data.message)
        })
      }
    }
  },
  mounted() {
    const { id, seat_xid } = this.$route.query
    this.$axios({
      url: '/airs/' + id,
      params: seat_xid
    }).then(res => {
      this.airTicketInfo = res.data
    })
  }
}
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>