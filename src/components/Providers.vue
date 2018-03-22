<template>
  <div>
    <h1>Companies</h1>
    <div class='scroll-down'>Scroll Down &#8595;</div>
    <div class='scroll-right'>Scroll Right &#8594;
</div>
    <ul class='provider-list'>
      <li v-for='provider in providersWithPageviews' :key='provider.id'
        class='provider'
        v-on:click='viewProvider(provider.id)'
      >{{ provider.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Providers',
  computed: {
    ...mapGetters([ 'providersWithPageviews' ])
  },
  methods: {
    ...mapActions([ 'getData', 'viewProvider' ])
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
.provider {
  padding: 20px;
  border-bottom: 1px solid #dce0e0;
  margin-left: 10px;
  margin-right: 10px;
}
.provider:hover {
  cursor: pointer;
}
@media (max-width: 767px) {
  .scroll-down {
    display: none;
  }
  .scroll-right {
    display: block;
  }
  ul.provider-list {
    display: flex;
    flex-direction: row;
    max-width: 500px;
    overflow-x: scroll;
    margin: 0 auto;
  }
  .provider-list li {
    border-bottom: none;
    border-right: 1px solid #dce0e0;;
  }
}
</style>
