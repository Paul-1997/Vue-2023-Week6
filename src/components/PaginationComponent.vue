<template>
  <nav aria-label="navigation">
    <ul class="pagination rounded mx-auto" style="width: fit-content">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="emitGetProduct(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only visually-hidden">Previous</span>
        </a>
      </li>
      <li class="page-item" :class="{ active: pages.current_page === page }" v-for="page in pages.total_pages"
        :key="'pagination' + page">
        <a href="#" class="page-link" @click.prevent="emitGetProduct(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="emitGetProduct(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only visually-hidden">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    emitGetProduct(page) {
      if (page === this.pages.current_page) return;
      this.$emit('emitPagination', page);
    },
  },
};
</script>
