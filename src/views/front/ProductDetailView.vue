<template>
    <VueLoading :active="isLoading" />
    <div class="row my-5">
        <div class="col-md-5 mb-3 mb-md-0">
            <div class="overflow-hidden rounded primary-image">
                <img :src="product.imageUrl" class="d-block w-100" alt="主圖" />
            </div>
        </div>
        <div class="col-md-7 flex-grow-1">
            <div class="card h-100 mb-3">
                <div class="card-body">
                    <h5 class="card-title mb-4">
                        <span class="badge bg-primary me-2">{{ product.category }}</span>
                        <span class="fw-bold h4">{{ product.title }}</span>
                    </h5>
                    <p class="card-text mb-3 text-secondary"><span class="text-black fw-bold">商品描述：</span>{{
                    product.description }}</p>
                    <p class="card-text mb-3 text-secondary"><span class="text-black fw-bold">商品內容：</span>{{
                    product.content }}</p>
                    <div class="d-flex">
                        <p class="card-text text-secondary me-1">
                            <del>{{ product.origin_price }}</del>
                        </p>
                        <p class="card-text me-2">{{ product.price }}</p>
                        元 / {{ product.unit }}
                    </div>
                </div>
                <div class="card-footer border-top-0 mb-2">
                    <div class="input-group col-8">
                        <select name="" class="form-control text-secondary" v-model.number="addProductNum">
                            <option value="" selected disabled class="disabled">請選擇數量</option>
                            <option :value="i" v-for="i in 15" :key="'productNum' + i">{{ i }}</option>
                        </select>
                            <button type="button" class="btn btn-primary px-3 col-4" :disabled="!addProductNum ||processAddCart" @click="addToCart">加入購物車</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@media (width > 768px) {
    .primary-image {
        border: hsla(115, 3%, 60%, 1) 8px solid;

        & img {
            margin: auto;
            max-height: 75vh;

            &:hover{
                transition: .7s all;
            scale: 1.1;
            }
        }
    }
}
</style>
<script>
import axios from 'axios';
import { showErrorMsg, showStatusMsgToast } from '@/assets/js/helper';

const { VITE_APP_API_NAME: path, VITE_APP_API_URL: base } = import.meta.env;

export default {
  data() {
    return {
      processAddCart: false,
      isLoading: false,
      product: {},
      addProductNum: '',
    };
  },
  methods: {
    async getProductDetail() {
      const { id } = this.$route.params;
      this.isLoading = true;
      try {
        const result = await axios.get(`${base}/v2/api/${path}/product/${id}`);
        if (result.data.success) {
          this.product = result.data.product;
          this.isLoading = false;
        }
      } catch (err) {
        if (this.isLoading) this.isLoading = false;
        const msg = err?.response?.data?.message ?? '出錯了٩(ŏ﹏ŏ、)۶';
        showErrorMsg(msg);
      }
    },
    async addToCart() {
      const data = {
        data: {
          product_id: this.product.id,
          qty: +this.addProductNum,
        },
      };
      try {
        this.processAddCart = true;
        const result = await axios.post(`${base}/v2/api/${path}/cart`, data);
        if (result.data.success) {
          showStatusMsgToast(result.data.message);
          this.processAddCart = false;
        }
      } catch (err) {
        this.processAddCart = false;
        const msg = err?.response?.data?.message ?? '出錯了٩(ŏ﹏ŏ、)۶';
        showErrorMsg(msg);
      }
    },
  },
  mounted() {
    this.getProductDetail();
  },
};
</script>
