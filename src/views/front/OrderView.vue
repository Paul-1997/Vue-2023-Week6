<!-- eslint-disable max-len -->g
<template>
    <div id="cartList" class="container mt-4">
        <div class="text-end mb-3">
            <button class="btn btn-outline-danger" type="button" @click="removeAllCart">
                清空購物車
            </button>
        </div>
        <div>
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th></th>
                        <th>品名</th>
                        <th style="width: 150px">數量/單位</th>
                        <th class="text-end">總價</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!cart.carts.length">
                        <VueLoading :active="isLoading" />
                        <td colspan="4">
                            <p class="fw-bold fs-4 py-2 text-secondary text-center">購物車裡面沒有任何商品喔!(◞‸◟)</p>
                        </td>
                    </tr>
                    <tr v-for="item in cart.carts" :key="item.id">
                        <td>
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCart(item.id)">x
                            </button>
                        </td>
                        <td>
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">
                                已套用優惠券
                            </div>
                        </td>
                        <td>
                            <div class="input-group input-group-sm">
                                <div class="input-group mb-3">
                                    <input v-model.number="item.qty" @blur="updateCart(item,item.product.price)"
                                        class="form-control" />
                                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                                </div>
                            </div>
                        </td>
                        <td class="text-end">
                            <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                            {{ item.final_total }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-end">總計</td>
                        <td class="text-end">{{ getTotal }}</td>
                    </tr>
                    <tr v-if="cart.final_total !== cart.total">
                        <td colspan="3" class="text-end text-success">折扣價</td>
                        <td class="text-end text-success">{{ cart.final_total }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div id="orderForm" class="my-5 row justify-content-center">
        <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
            <!-- email -->
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <v-field id="email" name="email" type="email" class="form-control"
                    :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
                    v-model="formData.userEmail"></v-field>
                <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <!-- name -->
            <div class="mb-3">
                <label for="name" class="form-label">收件人姓名</label>
                <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名" rules="required" v-model.trim="formData.userName"></v-field>
                <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>
            <!-- tel -->
            <div class="mb-3">
                <label for="tel" class="form-label">收件人電話</label>
                <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話" rules="required|min:8|max:10" v-model="formData.userTel"></v-field>
                <error-message name="電話" class="invalid-feedback"></error-message>
            </div>
            <!-- address -->
            <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址" rules="required" v-model.trim="formData.userAddress"></v-field>
                <error-message name="地址" class="invalid-feedback"></error-message>
            </div>
            <!-- userMsg -->
            <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea id="message" class="form-control" cols="30" rows="10" v-model.trim="formData.message"
                    style="resize: none;"></textarea>
            </div>
            <div class="text-end">
                <button type="submit" class="btn btn-danger">送出訂單</button>
            </div>
        </v-form>
    </div>
</template>
<!-- eslint-disable import/no-extraneous-dependencies -->
<script>
import axios from 'axios';
import { showErrorMsg, showStatusMsgToast, formatNum } from '@/assets/js/helper';
import Swal from 'sweetalert2';

const { VITE_APP_API_NAME: path, VITE_APP_API_URL: base } = import.meta.env;
export default {
  data() {
    return {
      isLoading: false,
      cart: {
        carts: [],
      },
      formData: {
        userName: '',
        userEmail: '',
        userTel: '',
        userAddress: '',
        userMsg: '',
      },
    };
  },
  methods: {
    async getCarts() {
      try {
        const CartsData = await axios.get(`${base}/v2/api/${path}/cart`);
        if (CartsData.data.success) {
          this.cart = CartsData.data.data;
        }
      } catch (err) {
        const msg = err?.response?.data?.message ?? '出錯了٩(ŏ﹏ŏ、)۶';
        showErrorMsg(msg);
      }
    },
    async updateCart({
      id, product_id: productId, qty, final_total: finalTotal,
    }, price) {
      // 若數量一樣
      if (qty * price === finalTotal) return;
      const data = {
        data: {
          product_id: productId,
          qty,
        },
      };
      try {
        const result = await axios.put(
          `${base}/v2/api/${path}/cart/${id}`,
          data,
        );
        showStatusMsgToast(result.data.message);
        this.getCarts();
      } catch (err) {
        const msg = err?.response?.data?.message ?? '出錯了٩(ŏ﹏ŏ、)۶';
        showErrorMsg(msg);
      }
    },
    async removeCart(id) {
      try {
        const result = await axios.delete(`${base}/v2/api/${path}/cart/${id}`);
        if (result.data.success) {
          showStatusMsgToast(`該品項${result.data.message}`);
          this.getCarts();
        }
      } catch (err) {
        const msg = err?.response?.data?.message ?? '出錯了٩(ŏ﹏ŏ、)۶';
        showErrorMsg(msg);
      }
    },
    async removeAllCart() {
      try {
        const result = await axios.delete(`${base}/v2/api/${path}/carts`);
        if (result.data.success) {
          showStatusMsgToast('購物車已清空(๑•̀ㅂ•́)و✧');
          this.getCarts();
        }
      } catch (err) {
        const msg = err?.response?.data?.message ?? '出錯了٩(ŏ﹏ŏ、)۶';
        showErrorMsg(msg);
      }
    },
    async createOrder() {
      const order = {
        data: {
          user: {
            name: this.formData.userName,
            email: this.formData.userEmail,
            tel: this.formData.userTel,
            address: this.formData.userAddress,
          },
          message: this.formData.userMsg,
        },
      };
      try {
        this.isLoading = true;
        const result = await axios.post(`${base}/v2/api/${path}/order`, order);
        if (result.data.success) {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: '已送出表單!',
            showConfirmButton: false,
            timer: 1000,
          });

          this.getCarts();
        }
      } catch (err) {
        if (this.isLoading) this.isLoading = false;
        const msg = err?.response?.data?.message ?? '出錯了٩(ŏ﹏ŏ、)۶';
        showErrorMsg(msg);
      }
    },
  },
  computed: {
    getTotal() {
      if (!this.cart.total) return '';
      return formatNum(+this.cart.total) || '$ 0 元';
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
