<template>
  <div class="register-style">
    <div class="header"></div>
    <div class="content">
      <div class="content-header">
        <div>注册新用户</div>
        <div>我有账号，去登陆</div>
      </div>
      <div class="input-flex">
        <div class="input-rule">
          <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="rules"
            label-width="100%"
            class="register-form"
            status-icon
          >
            <el-form-item label="1.手机号：" prop="phone">
              <el-input
                v-model.trim="registerForm.phone"
                maxlength="50"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item label="2.邮箱" prop="email">
              <el-input v-model.trim="registerForm.email" maxlength="50" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="3.密码：" prop="password">
              <el-input
                v-model.trim="registerForm.password"
                type="password"
                show-password
                maxlength="50"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item label="4.确认密码" prop="confirmPassword">
              <el-input
                type="password"
                show-password
                v-model.trim="registerForm.confirmPassword"
                maxlength="50"
                placeholder="请再次输入密码"
              />
            </el-form-item>
            <div class="register-bottom">
              <el-button @click="userRegister(registerFormRef)">注册</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="link">
        <ul>
          <li><a href="#">关于我们</a></li>
          <li><a href="#">联系我们</a></li>
          <li><a href="#">联系客服</a></li>
          <li><a href="#">商家入驻</a></li>
          <li><a href="#">营销中心</a></li>
          <li><a href="#">手机品优购</a></li>
          <li><a href="#">友情链接</a></li>
          <li><a href="#">销售联盟</a></li>
          <li><a href="#"> 品优购社区</a></li>
          <li><a href="#">品优购公益</a></li>
          <li><a href="#"> English Site</a></li>
          <li><a href="#">Contact U</a></li>
        </ul>
      </div>
      <div class="coperight">
        <div>
          地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096 电话：400-618-4000
          传真：010-82935100 邮箱: 1056325082@qq.com
        </div>
        <div>京ICP备08001421号京公网安备110108007702</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { validateValue } from '@/utils/validate'
import { register } from '@/api/client/index'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const registerFormRef = ref<FormInstance>()
  const router = useRouter();
const registerForm = ref({
  email: '',
  phone: '',
  confirmPassword: '',
  password: ''
})
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value !== '') {
    const regex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
    validateValue(value, callback, regex, '请输入正确格式的邮箱')
  } else {
    callback()
  }
}
const validatePhone = (rule: any, value: any, callback: any) => {
  const regex = /^1[3-9]\d{9}$/
  if (value !== '') {
    validateValue(value, callback, regex, '请输入正确格式的手机号')
  } else {
    callback()
  }
}

const validor = (rule: any, value: any, callback: any) => {
  if (value !== registerForm.value.password) {
    callback(new Error('两次输入不一致'))
  }
  callback()
}

const rules = reactive<FormRules<any>>({
  phone: [
    { required: true, trigger: 'blur', message: '请输入手机号' },
    {
      validator: validatePhone,
      trigger: 'blur',
      message: '请输入正确格式的手机号'
    }
  ],
  email: [
    { required: true, trigger: 'blur', message: '请输入联系邮箱' },
    {
      validator: validateEmail,
      trigger: 'blur',
      message: '请输入正确格式的邮箱'
    }
  ],
  password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: validor, trigger: 'blur' }
  ]
})

const userRegister = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate((valid: any) => {
    if (valid) {
      register(registerForm.value)
        .then((res) => {
          console.log(res)
          ElMessage.success(res.message)
          router.push({
            path: '/'
          })
        })
        .catch(() => {
          console.log('错误抛出')
        })
    }
  })
}
</script>
<style lang="scss" scoped>
.register-style {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  .el-form {
    margin-top: 50px;
    .el-form-item {
      display: block;
      height: 68px;
      :deep(.el-form-item__label) {
        justify-content: start;
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      :deep(.el-form-item__content) {
        .el-input,
        .el-select {
          width: 100%;
          height: 36px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #e4eaee;
          .el-input__wrapper {
            box-shadow: none;
          }
        }
        .el-select {
          width: 100%;
          border: none;
        }
      }
    }
  }
  .header {
    height: 80px;
    line-height: 80px;
    border-bottom: 2px solid #b1191a;
  }
  .content {
    height: 600px;
    border: 1px solid #dfdfdf;
    margin-top: 18px;
    .content-header {
      line-height: 40px;
      font-size: 18px;
      font-weight: 400;
      padding: 0 5px;
      background-color: #ececec;
      height: 40px;
      border-bottom: 1px solid #dfdfdf;
      display: flex;
      justify-content: space-between;
      div {
        margin-right: 10px;
        margin-left: 10px;
        font-size: 14px;
        cursor: pointer;
      }
      div:nth-child(2):hover {
        color: red;
      }
    }
    .input-flex {
      display: flex;
      justify-content: center;
      .input-rule {
        position: relative;
        width: 800px;
        padding: 0px 80px 0px 80px;

        .register-bottom {
          width: calc(100% + 160px);
          margin-left: -80px;
          height: 115px;
          line-height: 115px;
          text-align: center;
        }
      }

      .el-button {
        width: 446px;
        height: 46px;
        background: #3576c1;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .footer {
    margin: 18px 0;
    text-align: center;
    .coperight {
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .link {
      height: 28px;
      text-align: center;
      margin-left: 115px;
      ul {
        li:hover {
          color: red;
        }
      }
    }
    .link ul li {
      float: left;
      padding: 0 12px;
      font-size: 12px;
      border-right: 1px #cccc solid;
    }

    .link ul li:last-child {
      border-right: 0;
    }
  }
}
</style>
