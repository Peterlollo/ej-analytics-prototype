<template>
  <div>
    <h1>Pages</h1>
    <div class='scroll-down'>Scroll Down &#8595;</div>
    <div class='scroll-right'>Scroll Right &#8594;
</div>
    <ul class='page-list'>
      <li v-for='page in pages' :key='pages.indexOf(page)'
        class='page'
        v-on:click='viewPage(page.id)'
      >{{ page.path }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Pages',
  computed: {
    ...mapGetters([ 'pages' ])
  },
  methods: {
    ...mapActions([ 'viewPage' ])
  }
}
</script>

<style scoped>
.scroll-right {
    display: none;
  }
ul {
  border: solid 1px #dce0e0;
}
.page {
  padding: 20px;
  border-bottom: 1px solid #dce0e0;
  margin-left: 10px;
  margin-right: 10px;
}
.page:hover {
  cursor: pointer;
}
@media (max-width: 767px) {
  .scroll-down {
    display: none;
  }
  .scroll-right {
    display: block;
  }
  ul.page-list {
    display: flex;
    flex-direction: row;
    max-width: 500px;
    overflow-x: scroll;
    margin: 0 auto;
  }
  .page-list li {
    border-bottom: none;
    border-right: 1px solid #dce0e0;;
  }
}
</style>
