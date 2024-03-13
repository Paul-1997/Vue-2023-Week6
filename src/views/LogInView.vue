<template>
  <div class="wrap">
    <h1 class="login__title h1 fw-bold mb-4 text-center">請先登入</h1>
    <form id="loginForm" action="post" class="p-4 mx-auto">
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="userEmail" placeholder="請輸入帳號" v-model="user.email" @input="clearErrMsg" :class="{'is-invalid' : isEmptyInvalid && user.email === '' }">
        <label for="userEmail">Email address</label>
      </div>
      <div class="form-floating mb-4">
        <input type="password" class="form-control" id="userPassword" placeholder="請輸入密碼" v-model="user.password" @input="clearErrMsg" :class="{'is-invalid' : isEmptyInvalid && user.password === '' }">
        <label for="userPassword">Password</label>
      </div>
      <div class="text-center mb-4">
        <button type="button" class="btn btn-primary col-8 px-3" @click="login">
          登入
        </button>
      </div>
      <div>
        <div class="mx-auto" :class="{ loader:  onLoading && errMsg === '' }">
          <p class="text-danger fs-5 text-center" v-if="errMsg">
            {{ errMsg }}
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrap {
  display: grid;
  place-content: center;
  min-height: 100vh;
}

.login__title {
  text-shadow: 0 0.1rem 4px rgba(0, 0, 0, .5);
}

.loader {
  width: 48px;
  aspect-ratio: 1;
  border-radius: 100vw;
  border: 8px solid transparent;
  border-top-color: gray;
  animation: spin .8s infinite linear;
}

@keyframes spin {
  to {
    rotate: 360deg;
  }
}
</style>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

const { VITE_APP_API_URL: base } = import.meta.env;

export default {
  data() {
    return {
      onLoading: false,
      isEmptyInvalid: false,
      errMsg: '',
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    clearErrMsg() {
      this.isEmptyInvalid = false;
      if (this.errMsg !== '') this.errMsg = '';
    },
    async login() {
      const { email, password } = this.user;
      if (email === '' || password === '') {
        this.isEmptyInvalid = true;
        this.errMsg = '請輸入信箱或密碼！';
        return;
      }
      try {
        this.onLoading = true;
        const result = await axios.post(`${base}/v2/admin/signin`, { username: email, password });
        if (result.data.success) {
          const { token, expired } = result.data;
          this.onLoading = false;
          // 寫入資訊後跳轉頁面
          Cookies.set('hexW6Token', token, { expires: expired });
          localStorage.setItem('isLogin', true);
          this.$router.push('/admin');
        }
      } catch (err) {
        this.onLoading = false;
        const { status } = err.response;

        if (status === 400) this.errMsg = '信箱或密碼有誤！';
      }
    },
  },
};
</script>
