<template>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const { VITE_APP_API_URL: base } = import.meta.env;
const authToken = {
  headers: {
    Authorization: Cookies.get('hexW6Token') ?? '',
  },
};
export default {
  methods: {
    async checkUser() {
      try {
        const result = await axios.post(`${base}/v2/api/user/check`, {}, authToken);
        if (result.data.success) {
          localStorage.setItem('isLogin', true);
        }
      } catch (err) {
        const { status } = err.response;
        if (status === 403 || status === 401) {
          const result = await Swal.fire({
            title: '認證失效，請重新登入',
            icon: 'info',
            showConfirmButton: true,
          });
          if (result.isConfirmed) {
            localStorage.removeItem('isLogin');
            this.$router.push('/login');
          }
        }
      }
    },
  },
  mounted() {
    this.checkUser();
  },
};
</script>
