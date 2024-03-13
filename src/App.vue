<script>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  computed: {
    isLoginPage() {
      return this.$route.path.endsWith('login');
    },
  },
  components: {
    HeaderComponent,
    RouterView,
  },
};
</script>

<template>
  <HeaderComponent v-if="!isLoginPage" />
  <div class="container mt-3">
    <RouterView />
  </div>
</template>
