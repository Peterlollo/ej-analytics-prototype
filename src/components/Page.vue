<template>
  <div>
    <div v-if='pagePathFromParamStatus === "success"'>
      <h1 class='title'>Page: {{ isViewingPage.path }}</h1>
      <h1 class='visitors'>Important Visitors: {{ currentPageWithTimesKeyProviders.length }}</h1>
      <ul>
        <li v-for='providerTime in currentPageWithTimesKeyProviders' v-bind:key='providerTime[0]'>
          <div><strong>Provider:</strong> {{ getProviderFromID(providerTime[0]).name }}</div>
          <div><strong>Sector:</strong> {{ getProviderFromID(providerTime[0]).sector }}</div>
          <div><strong>Time On Page:</strong> {{ providerTime[1] }} seconds</div>
          <button v-on:click='whitelistAddOrRemoveProvider({ action: "remove", id: providerTime[0] })'>Remove From Whitelist</button>
        </li>
      </ul>
      <h1 class='visitors'>Non-Important Visitors: {{ currentPageWithTimesNotKeyProviders.length }}</h1>
      <ul>
        <li v-for='providerTime in currentPageWithTimesNotKeyProviders' v-bind:key='providerTime[0]'>
          <div><strong>Provider:</strong> {{ getProviderFromID(providerTime[0]).name }}</div>
          <div><strong>Time On Page:</strong> {{ providerTime[1] }} seconds</div>
          <button v-on:click='whitelistAddOrRemoveProvider({ action: "add", id: providerTime[0] })'>Add To Whitelist</button>
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
.title {
  margin-top: 50px;
}
.visitors {
  color: rgb(0, 132, 137);
  margin-top: 60px;
}
h1 {
  font-weight: 700;
}
ul {
  border: solid 1px #dce0e0;
  font-size: 16px;
}
li {
  padding: 20px;
  border-bottom: 1px solid #dce0e0;
  margin-left: 10px;
  margin-right: 10px;
}
.pageviews, .pageviews li {
  border: none;
}
.pageviews li {
  background-color: #eee;
}
li > * {
  margin: 5px;
}
button {
  font-size: 14px;
  font-weight: 700;
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
  background-color: #384249;
  color: #fff;
}
button:hover {
  cursor: pointer;
}
</style>
