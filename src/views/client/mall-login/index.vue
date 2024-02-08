<template>
  <div class="login">
    <div class="login-content">
      <div class="login-c-title">中小型网上商城</div>
      <div class="logo">
        <img src="../../assets/logo.png" fit="contain" />
      </div>
      <div style="display: flex">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="login-form">
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="请输入密码"
              @keyup.enter="login()"
              show-password
            />
          </el-form-item>
          <el-button class="login-btn" @click="loginFnc()">登 录</el-button>
          <div class="registerUser" @click="openRegister">注册新用户</div>
          <p class="tip">如忘记密码，请联系管理员重置密码</p>
        </el-form>
        <div id="qiyeweixin"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getUserMessage, login, register } from '@/api/client'
import type { FormRules } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'

const router = useRouter()
const ruleFormRef = ref()
const signEmailRef = ref<any>(null)
const signNameRef = ref<any>(null)
const signPwdRef = ref<any>(null)
const signRecipientRef = ref<any>(null)
const signAddressRef = ref<any>(null)
const signPhoneRef = ref<any>(null)
const userStore = useUserStore()
let ruleForm = ref({
  email: 'asd@qq.com',
  password: 'xxl'
})
const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})
// 登录逻辑，登录成功后拿到token，将token作为请求头里面的参数传递给后端拿到当前用户信息，根据当前用户的信息来进行登录
const loginFnc = () => {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      login(ruleForm.value).then((res: any) => {
        console.log(userStore.getToken)
        if (res.code === 200) {
          userStore.setToken(res.data.token)
          // 获取当前用户所有信息
          getUserMessage().then((res: any) => {
            console.log('kasbf', res)
            userStore.setAuthInfo(res.data)
            router.push('/mall-index')
          })
        }
      })
    }
  })

  // const account = accountRef.value.value
  // const pwd = pwdRef.value.value
  // const res = login({
  //   account: account,
  //   pwd: pwd
  // })
  // res
  //   .then((data) => {
  //     setClientName(data.name)
  //     setClientToken(data.token)
  //     router.push('/')
  //   })
  //   .catch((e) => {
  //     alert(e)
  //   })
}
const openRegister = () => {
  router.push({ path: '/register' })
}
const signup = () => {
  const res = register({
    email: signEmailRef.value,
    nickname: signNameRef.value,
    pwd: signPwdRef.value,
    recipient: signRecipientRef.value,
    address: signAddressRef.value,
    phone: signPhoneRef.value
  })
  // res
  //   .then((data) => {
  //     setClientName(data.name)
  //     setClientToken(data.token)
  //     router.push('/')
  //   })
  //   .catch((e) => {
  //     alert(e)
  //   })
}
// export default {

//   methods: {
//     ...mapMutations({
//       setClientName: 'SET_CLIENT_NAME',
//       setClientToken: 'SET_CLIENT_TOKEN'
//     }),

//   }
// }
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('@/assets/loginBg.png') no-repeat;
  background-size: 100% 100%;

  .login-content {
    width: 520px;
    height: 380px;
    background: #ffffff;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -190px;
    margin-left: -260px;
    .login-c-title {
      width: 264px;
      height: 54px;
      line-height: 54px;
      background: #4a9eff;
      text-align: center;
      font-size: 19px;
      font-weight: 600;
      color: #fff;
      margin: -27px auto 0 auto;
      clip-path: polygon(25px 0, 239px 0, 264px 27px, 239px 54px, 25px 54px, 0 27px);
    }
    .logo {
      width: 142px;
      height: 42px;
      margin: 27px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-form {
      width: 264px;
      margin: 0 auto;

      .el-form-item {
        width: 100%;
        height: 40px;
        .el-input {
          width: 100%;
          height: 40px;
          margin-bottom: 20px;
          :deep(.el-input__wrapper) {
            background: #f3f3f3;
            box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
          }
          // border-bottom: 1px solid #d9d9d9;
        }
      }
      .login-btn {
        width: 260px;
        height: 52px;
        margin: 10px auto 20px;
        background: #4a9eff;
        box-shadow: 0px 2px 9px 0px rgba(8, 45, 44, 0.59);
        border: none;
        border-radius: 5px;
        font-size: 18px;
        color: #fff;
      }

      .other-login {
        display: flex;
        align-items: center;
        p {
          margin: 0;
          padding: 0;
          color: #515767;
        }
        div {
          cursor: pointer;
          border-radius: 50%;
          background-color: #f2f3f5;
          justify-content: center;
          margin-right: 8px;
          height: 30px;
          width: 30px;
          svg {
            transform: translate(20%, 20%);
          }
        }
      }
      .registerUser {
        cursor: pointer;
        color: #515767;
        font-size: 14px;
      }
      .registerUser:hover {
        color: red;
      }
      .tip {
        margin: 0;
        width: 100%;
        text-align: center;
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        margin-top: 10px;
      }
    }
  }
}
</style>
