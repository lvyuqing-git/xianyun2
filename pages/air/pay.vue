<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{order.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex"
                justify="space-between"
                align="middle"
                class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"
                    ref="canvas"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg"
                 alt="">
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  methods: {
    isPay() {
      this.timer = setInterval(() => {
        const { id, price, orderNo } = this.order
        this.$axios({
          url: '/airorders/checkpay',
          method: 'POST',
          data: {
            id: id,
            nonce_str_: price,
            out_trade_no: orderNo
          },
          headers: {
            Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
          }
        }).then(res => {
          if (res.data.statusTxt === '支付完成') {
               clearInterval(this.timer)
            this.$alert('支付成功', '提示', {
              confirmButtonText: '确定'
            })
           
          }
        })
      }, 3000)
    }
  },
  data() {
    return {
      order: {},
      timer: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.$axios({
        url: `airorders/${this.$route.query.id}`,
        headers: {
          Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        this.order = res.data
        const { code_url } = res.data.payInfo
        QRCode.toDataURL(this.$refs.canvas, 'text', {
          width: 200
        })
      })
    }, 0)
    this.isPay()
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>