<template>
  <div class="MyData">
    <ul>
      <li>
        <span>用户头像</span>
        <img :src="headimg" alt="headimg" />
      </li>
      <li>
        <span>账号</span>
        <p>{{ userMessage?.email }}</p>
      </li>
      <li>
        <span>昵称</span>
        <input type="text" v-model="userMessage!.nickname" />
      </li>
      <li>
        <span>收件人</span>
        <input type="text" v-model="userMessage!.recipient" />
      </li>
      <li>
        <span>收件地址</span>
        <input type="text" class="long" v-model="userMessage!.shippingAddress" />
      </li>
      <li>
        <span>联系电话</span>
        <input type="text" v-model="userMessage!.phone" />
      </li>
      <li>
        <span>密码</span>
        <button @click="showPopup">修改密码</button>
      </li>
    </ul>
    <button @click="updateUserDatas" class="saveBtn">保存</button>
    <Popup title="修改密码" @popupClose="closePopup" v-show="popupShow">
      <template #popupContent>
        <div class="popupContent">
          <input type="password" v-model="oldPwd" placeholder="请输入原密码" />
          <input type="password" v-model="newPwd" placeholder="请输入新密码" />
          <input type="password" v-model="confirmPwd" placeholder="请再次输入新密码" />
          <button @click="updatePwd">确认修改</button>
        </div>
      </template>
    </Popup>
  </div>
</template>

<script lang="ts" setup>
import { changeUserMessage, getUserMessage, updatePwd } from '@/api/client'
import Popup from '@/components/pop-up/index.vue'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()
const userMessage = ref<AuthInfoType>({
  nickname: '',
  recipient: '',
  shippingAddress: '',
  phone: '',
  email: ''
})
const id = ref('')
const headimg = ref('')
const popupShow = ref(false)
const oldPwd = ref('')
const newPwd = ref('')
const confirmPwd = ref('')

const updateUserDatas = () => {
  changeUserMessage({
    nickname: userMessage.value.nickname,
    recipient: userMessage.value.recipient,
    shippingAddress: userMessage.value.shippingAddress,
    phone: userMessage.value.phone
  }).then((res: any) => {
    if (res.code === 200) {
      getUserMessage()
    }
  })
}

const closePopup = () => {
  popupShow.value = false
}

const showPopup = () => {
  popupShow.value = true
}

const updatePwds = () => {
  if (newPwd.value !== confirmPwd.value) {
    alert('两次输入的密码不一致！')
    return
  }
  const res = updatePwd({
    id: id.value,
    oldPwd: oldPwd.value,
    newPwd: newPwd.value,
    confirmPwd: confirmPwd.value
  })
  res
    .then(() => {
      oldPwd.value = ''
      newPwd.value = ''
      confirmPwd.value = ''
      closePopup()
      alert('修改密码成功!')
    })
    .catch((e: HTMLElement) => {
      alert(e)
    })
}
onMounted(() => {
  userMessage.value = userStore.getAuthInfo
  console.log('userMessage', userMessage.value)
})

//   computed:{
//     ...mapState([
//       'clientToken'
//     ]),
//   },

//   methods:{
//     ...mapMutations({
//       setClientName: 'SET_CLIENT_NAME',
//     }),

//   },
</script>

<style scoped lang="less">
@import '../../../assets/css/var.less';
.MyData {
  ul {
    width: 100%;
    overflow: hidden;
    li {
      margin-bottom: 30px;
      &:first-child {
        height: 60px;
        line-height: 60px;
        span {
          position: relative;
          bottom: 18px;
        }
      }
      span {
        display: inline-block;
        width: 100px;
        height: 20px;
      }
      img {
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      p {
        display: inline-block;
      }
      input {
        width: 280px;
        border: none;
        text-align: center;
        border-bottom: 2px solid @thirdColor;
      }
      .long {
      }
      button {
        background-color: white;
        border: 1px solid @thirdColor;
        color: @thirdColor;
        width: 80px;
        height: 30px;
      }
    }
  }
  .saveBtn {
    background-color: @thirdColor;
    border: none;
    color: white;
    width: 110px;
    height: 35px;
    display: block;
    margin: 10px auto;
  }
  .popupContent {
    padding: 20px;
    input {
      display: block;
      border: none;
      border-bottom: 1px solid #313541;
      margin-bottom: 16px;
      font-size: 13px;
      padding: 5px;
      width: 200px;
    }
    button {
      background-color: #333333;
      border: none;
      color: white;
      width: 80px;
      height: 32px;
      display: block;
      margin: 20px auto 5px;
    }
  }
}
</style>
