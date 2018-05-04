<template>
  <div>
    <h1>Page Data</h1>
    <div v-if='pagePathFromParamStatus === "success"'>
      <h2>Page: {{ isViewingPage.path }}</h2>
      <h4>All Views Of Page</h4>
      <ul>
        <li v-for='providerTime in providersAndTimesGroupedForViewsOfCurrentPage' v-bind:key='providerTime[0]'>
          <div>Provider: {{ getProviderNameFromID(Number(providerTime[0])) }}</div>
          <div>Time On Page (seconds): {{ providerTime[1] }}</div>
        </li>
      </ul>
    </div>
    <div v-else-if='pagePathFromParamStatus === "fail"'>
      <h2>Could Not Find That Page Path</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Page',
  computed: {
    ...mapGetters([
      'providers',
      'isViewingPage',
      'pagePathFromParamStatus',
      'pages',
      'allViewsOfCurrentPage',
      'providersAndTimesGroupedForViewsOfCurrentPage'
    ])
  },
  methods: {
    getProviderNameFromID (id) {
      return this.providers.filter((p) => p.id === id)[0].name
    },
    ...mapActions([ 'getData', 'getPagePathFromParam' ])
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

ul {
  border: solid 1px #dce0e0;
}
li {
  padding: 20px;
  border-bottom: 1px solid #dce0e0;
  margin-left: 10px;
  margin-right: 10px;
}
li:hover {
  cursor: pointer;
}
.pageviews, .pageviews li {
  border: none;
}
.pageviews li {
  background-color: #eee;
}
</style>
