<template>
  <div>
    <div v-if='pagePathFromParamStatus === "success"'>
      <h1>Page: {{ isViewingPage.path }}</h1>
      <h2>Important Visitors: {{ currentPageWithTimesKeyProviders.length }}</h2>
      <ul>
        <li v-for='providerTime in currentPageWithTimesKeyProviders' v-bind:key='providerTime[0]'>
          <div><strong>Provider:</strong> {{ getProviderFromID(providerTime[0]).name }}</div>
          <div><strong>Sector:</strong> {{ getProviderFromID(providerTime[0]).sector }}</div>
          <div><strong>Time On Page:</strong> {{ providerTime[1] }} seconds</div>
          <button v-on:click='whitelistAddOrRemoveProvider({ action: "remove", id: providerTime[0] })'>Remove From Whitelist</button>
          <button>Change Sector</button>
        </li>
      </ul>
      <h2>NON Important Visitors: {{ currentPageWithTimesNotKeyProviders.length }}</h2>
      <ul>
        <li v-for='providerTime in currentPageWithTimesNotKeyProviders' v-bind:key='providerTime[0]'>
          <div><strong>Provider:</strong> {{ getProviderFromID(providerTime[0]).name }}</div>
          <div><strong>Time On Page:</strong> {{ providerTime[1] }} seconds</div>
          <button v-on:click='whitelistAddOrRemoveProvider({ action: "add", id: providerTime[0] })'>Add To Whitelist</button>
          <button>Change Sector</button>
        </li>
      </ul>
    </div>
    <div v-else-if='pagePathFromParamStatus === "fail"'>
      <h1>Could Not Find That Page Path</h1>
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
      'providersAndTimesGroupedForViewsOfCurrentPage',
      'keyProviderIds',
      'currentPageWithTimesKeyProviders',
      'currentPageWithTimesNotKeyProviders'
    ])
  },
  methods: {
    getProviderNameFromID (id) {
      return this.providers.filter((p) => p.id === id)[0].name
    },
    getProviderFromID (id) {
      return this.providers.filter((p) => p.id === id)[0]
    },
    ...mapActions([
      'getData',
      'getPagePathFromParam',
      'whitelistAddOrRemoveProvider'
    ])
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
