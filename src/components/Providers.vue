<template>
  <div>
    <h1>Companies</h1>
    <ul>
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
</style>
