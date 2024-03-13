<template>
  <RouterLink to="/admin">後台首頁</RouterLink> |
  <RouterLink to="/admin/products">產品列表</RouterLink> |
  <RouterLink to="/admin/orders">訂單列表</RouterLink> |
  <RouterLink to="/">返回前台</RouterLink>
  <slot name="logOut"></slot>
</template>
