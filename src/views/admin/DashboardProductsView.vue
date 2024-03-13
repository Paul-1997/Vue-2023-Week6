<template>
  <div class="py-5"  v-if="products !== null">
    <table class="table table-striped table-hover align-middle mb-5">
    <tr>
      <th class="ps-2 fs-5 fw-bold">圖片</th>
      <th class="ps-2 fs-5 fw-bold">產品名稱</th>
      <th class="ps-2 fs-5 fw-bold">售價</th>
      <th class="fs-5 fw-bold">是否啟用</th>
      <th class="ps-2">
        <div class=" fs-5 fw-bold text-end">
          <button type="button" class="btn btn-primary col-5" @click="getProductDetail()">新增產品</button>
        </div>
      </th>
    </tr>
    <tbody>
      <tr v-for="product in sortProducts" :key="product.id">
        <td width="250"><img :src="product.imageUrl" alt="產品圖片" class="productImg"></td>
        <td>{{ product.title }}</td>
        <td>{{ `${product.price} 元` }}</td>
        <td :class="+product.is_enabled ? 'text-success' : 'text-danger'" width="100">{{ +product.is_enabled ? '已啟用' :
        '未啟用' }}</td>
        <td class="text-end">
          <div class="btn-group">
            <button type="button" class="btn px-3 py-1 btn-outline-secondary"
              @click="getProductDetail(product, true)">編輯</button>
            <button type="button" class="btn px-3 py-1 btn-outline-danger" @click="getDeleteModal(product)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginationComponent :pages="pagination" @emit-pagination="getProducts"></PaginationComponent>
</div>
<ProductModalComponent :temp-product='tempProduct' @submit-product="updateProduct" ref="productModal" />
<DeleteProductModalComponent :temp-product='tempProduct' @delete-product="deleteProduct" ref="deleteModal" />
</template>
<style scoped>
.productImg {
  aspect-ratio: 3 / 2;
  width: 150px;
}
</style>
<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import { showErrorMsg, showStatusMsgToast } from '@/assets/js/helper';
import ProductModalComponent from '@/components/ProductModalComponent.vue';
import DeleteProductModalComponent from '@/components/DeleteProductModalComponent.vue';
import PaginationComponent from '../../components/PaginationComponent.vue';

// showStatusMsgToast
const { VITE_APP_API_NAME: path, VITE_APP_API_URL: base } = import.meta.env;
const authToken = {
  headers: {
    Authorization: Cookies.get('hexW6Token') ?? '',
  },
};
export default {
  data() {
    return {
      products: null,
      tempProduct: {
        imagesUrl: [],
      },
      pagination: '',
    };
  },
  methods: {
    async getProducts(page = 1) {
      try {
        const result = await axios.get(`${base}/v2/api/${path}/admin/products?page=${page}`, authToken);
        if (result.data.success) {
          this.products = result.data.products;
          this.pagination = result.data.pagination;
        }
      } catch (err) {
        const msg = err?.response?.data?.message ?? '出錯了٩(ŏ﹏ŏ、)۶';
        showErrorMsg(msg);
      }
    },
    async updateProduct(product) {
      this.$refs.productModal.closeModal();
      try {
        const methods = product.id ? 'put' : 'post';
        const result = await axios[methods](`${base}/v2/api/${path}/admin/product/${product.id ? product.id : ''}`, { data: product }, authToken);
        showStatusMsgToast(result.data?.message);
        this.getProducts();
      } catch (err) {
        showErrorMsg(err.response.data.message ?? 'error');
      }
    },
    async deleteProduct(id) {
      this.$refs.deleteModal.closeModal();
      try {
        const result = await axios.delete(`${base}/v2/api/${path}/admin/product/${id}`, authToken);
        showStatusMsgToast(result.data?.message);
        this.getProducts();
      } catch (err) {
        showErrorMsg(err.response.data.message ?? 'error');
      }
    },
    getProductDetail(product = { imagesUrl: [] }, isNew = false) {
      this.tempProduct = { isNew, ...product };
      this.$refs.productModal.openModal();
    },
    getDeleteModal(product) {
      this.tempProduct = product;
      this.$refs.deleteModal.openModal();
    },
  },
  computed: {
    sortProducts() {
      return [...this.products].sort((a, b) => {
        if (a.category === b.category) return a.price - b.price;
        return a.category > b.category ? 1 : -1;
      });
    },
  },
  mounted() {
    this.getProducts();
  },
  components: {
    ProductModalComponent,
    DeleteProductModalComponent,
    PaginationComponent,
  },
};
</script>
