<template>
  <div class="MyData">
    <ul>
      <li>
        <span>用户头像</span>
        <img :src="headimg" alt="headimg" />
      </li>
      <li>
        <span>账号</span>
        <p>{{ email }}</p>
      </li>
      <li>
        <span>昵称</span>
        <input type="text" v-model="nickname" />
      </li>
      <li>
        <span>收件人</span>
        <input type="text" v-model="recipient" />
      </li>
      <li>
        <span>收件地址</span>
        <input type="text" class="long" v-model="address" />
      </li>
      <li>
        <span>联系电话</span>
        <input type="text" v-model="phone" />
      </li>
      <li>
        <span>密码</span>
        <button @click="showPopup">修改密码</button>
      </li>
    </ul>
    <button @click="updateUserData" class="saveBtn">保存</button>
    <Popup title="修改密码" @popupClose="closePopup" v-show="popupShow">
      <slot name="popupContent">
        <div class="popupContent">
          <input type="password" v-model="oldPwd" placeholder="请输入原密码" />
          <input type="password" v-model="newPwd" placeholder="请输入新密码" />
          <input type="password" v-model="confirmPwd" placeholder="请再次输入新密码" />
          <button @click="updatePwd">确认修改</button>
        </div>
      </slot>
    </Popup>
  </div>
</template>

<script lang="ts" setup>
import { getUserData, updateUserData, updatePwd } from '@/api/client'
import Popup from '@/components/pop-up/index.vue'

const id = ref('')
const headimg = ref('')
const email = ref('')
const nickname = ref('')
const recipient = ref('')
const address = ref('')
const phone = ref('')
const popupShow = ref(false)
const oldPwd = ref('')
const newPwd = ref('')
const confirmPwd = ref('')

const updateUserDatas = () => {
  // const res = updateUserData({
  //   id: id.value,
  //   nickname: nickname.value,
  //   recipient: recipient.value,
  //   address: address.value,
  //   phone: phone.value
  // })
  // res
  //   .then(() => {
  //     alert('修改成功!')
  //     setClientName(nickname.value)
  //   })
  //   .catch((e) => {
  //     alert(e)
  //   })
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
const clientToken = ref('')
onMounted(() => {
  const res = getUserData(clientToken.value)
  res
    .then((data: any) => {
      id.value = data.id
      headimg.value = data.headimg
      email.value = data.email
      nickname.value = data.nickname
      recipient.value = data.recipient
      address.value = data.address
      phone.value = data.phone
    })
    .catch((e: HTMLElement) => {
      alert(e)
    })
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
