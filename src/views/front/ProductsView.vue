<template>
  <VueLoading :active="isLoading"/>
  <main>
    <ul class="product">
      <li>
        <h3 class="ms-2 ms-md-4">圖片</h3>
        <h3 class="ms-2 ms-md-4">產品名稱</h3>
        <h3 class="ms-2 ms-md-4">售價</h3>
        <h3 class="ms-2 ms-md-4"></h3>
      </li>
      <li v-for="item in products" :key="item.id" class="mb-3">
        <div class="product__image" :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
        <p class="fs-4 mx-2 mx-md-4"> {{ item.title }} </p>
        <div>
          <del v-if="item.origin_price !== item.price" class="fs-5">{{ `原價${item.origin_price}元` }}</del>
          <p class="fs-4">{{ item.price === item.origin_price ? `售價${item.price}元` : `現在只要${item.price}元` }}</p>
        </div>
        <div>
          <button type="button" class="btn btn-outline-secondary px-2 px-md-3" @click="ChangePage(item.id)">
            <span class="d-none d-md-inline-block">查看更多</span>
            <span class="d-md-none">details</span>
          </button>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped lang="scss">
.product {
  --img-size: 200px;

  &__image {
    background-size: cover;
    background-position: center;
    height: max(100px, calc(var(--img-size) - 50px));
  }
  & > li {
  display: grid;
  align-items: center;
  grid-template-columns: var(--img-size) 2fr 1fr 100px;
}
}

@media (width < 770px) {
  .product{
    --img-size: 100px;

    & > li {
      grid-template-columns: var(--img-size) 1fr 1fr 68px;;
    }
  }
}
</style>

<script>
import axios from 'axios';
import { showErrorMsg } from '@/assets/js/helper';

const { VITE_APP_API_NAME: path, VITE_APP_API_URL: base } = import.meta.env;
export default {
  data() {
    return {
      isLoading: false,
      products: null,
    };
  },
  methods: {
    async getProducts() {
      this.isLoading = true;
      try {
        const product = await axios.get(`${base}/v2/api/${path}/products`);
        if (product.data.success) {
          this.products = product.data.products;
          this.isLoading = false;
        }
      } catch (err) {
        if (this.isLoading) this.isLoading = false;
        const msg = err?.response?.data?.message ?? '出錯了٩(ŏ﹏ŏ、)۶';
        showErrorMsg(msg);
      }
    },
    ChangePage(id) {
      this.$router.push(`${this.$route.path}/${id}`);
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
