/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import './assets/main.scss';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router/index';

const app = createApp(App);

// veeValidate
Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});
configure({
  generateMessage: localize({
    zh_TW,
  }),
});
setLocale('zh_TW');

app.use(createPinia());
app.use(router);

app.component('VueLoading', Loading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
