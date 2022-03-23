<template>
  <div class="login-container">
    <div class="login-header">个人生活管理系统</div>
    <div class="login-title">登录个人生活管理系统，一起享受有序生活！</div>
    <el-card class="login-card">
      <div class="login-card-title">welcome</div>
      <el-input placeholder="请输入用户名" v-model="userName"></el-input>
      <el-input
        style="margin-top: 20px"
        placeholder="请输入密码"
        v-model="userPassword"
      ></el-input>
      <div class="login-nav">
        <router-link to="{path: ''}">忘记密码？</router-link>|
        <router-link :to="{ path: '/register' }">立即注册</router-link>
      </div>
      <div style="width: 100%; text-align: center">
        <el-button
          :plain="true"
          style="width: 150px; margin-top: 30px"
          type="primary"
          size="medium"
          @click="submit"
          :disabled="btnState"
          >登录</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userPassword: "",
      btnState: true,
    };
  },
  methods: {
    submit() {
      const param = {
        name: this.userName.trim(),
        password: this.userPassword.trim(),
      };
      this.$axios.post("user/login", param).then(
        (res) => {
          if (res.data.state == "fail") {
            this.$message.error(res.data.message);
          }else{
            localStorage.setItem('userId',)
            this.$router.push('/')
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  watch: {
    userName: function (newQuestion) {
      if (newQuestion.trim().length > 0 && this.userPassword.length > 0) {
        this.btnState = false;
      }
    },
    userPassword: function (newQuestion) {
      if (newQuestion.trim().length > 0 && this.userName.length > 0) {
        this.btnState = false;
      }
    },
  },
};
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  background: url("../../assets/login-bg.jpg") no-repeat;
  background-size: 100% 100%;
  .login-title {
    margin: 10px auto;
    color: #fff;
    font-size: 18px;
    text-align: center;
    padding: 20px 0 30px;
  }
  .login-header {
    line-height: 24px;
    font-size: 24px;
    max-width: 1200px;
    padding-top: 30px;
    padding-left: 30px;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
  .login-card {
    width: 336px;
    min-height: 380px;
    background: #ffffff;
    position: relative;
    margin: 0 auto;
    padding: 30px 32px;
    .login-nav {
      text-align: center;
      margin-top: 10px;
    }
  }
  .login-card-title {
    line-height: 30px;
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: 20px;
    color: #3399ff;
  }
}
</style>