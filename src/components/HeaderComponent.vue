<template>
  <header class="py-3 container">
    <div class="d-flex justify-content-center align-items-center flex-column">
      <div id="logo">
        <RouterLink to="/">
          <img src="/logo.png" alt="" height="100" width="100" />
        </RouterLink>
      </div>
      <nav class="nav__link">
        <FrontNavComponent v-if="!isAdmin"></FrontNavComponent>
        <DashboardNavComponent v-else>
          <template #logOut>
            | <a href="#" @click.prevent="logOut" v-if="isLogin">登出</a>
          </template>
        </DashboardNavComponent>
      </nav>
    </div>
  </header>
</template>
<style lang="scss">
@import '../assets/main.scss';

.nav__link {
  &>* {
    padding-inline: .5rem;

    &.link--active {
      font-weight: bold;
      color: $red-500;
    }

    &:not(.link--active):hover {
      color: $blue-500;
    }
  }

}
</style>
<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import { showStatusMsgToast } from '@/assets/js/helper';
import DashboardNavComponent from './DashboardNavComponent.vue';
import FrontNavComponent from './FrontNavComponent.vue';

const { VITE_APP_API_URL: base } = import.meta.env;
export default {

  computed: {
    isAdmin() {
      return this.$route.path.startsWith('/admin');
    },
    isLogin() {
      return localStorage.getItem('isLogin') ?? false;
    },
  },
  methods: {
    async logOut() {
      const authToken = {
        headers: {
          Authorization: Cookies.get('hexW6Token') ?? '',
        },
      };
      try {
        const result = await axios.post(`${base}/v2/logout`, {}, authToken);
        if (result.data.success) {
          showStatusMsgToast('已成功登出!', 0);
          localStorage.removeItem('isLogin');
          Cookies.remove('hexW6Token');
          this.$router.push('/');
        }
      } catch (err) {
        Swal.fire({
          title: 'OOps!',
          icon: 'error',
          text: '操作失敗，請重新再試',
        });
      }
    },
  },
  components: {
    DashboardNavComponent,
    FrontNavComponent,
  },
};
</script>
