<template>
  <div>
    <h1>Data</h1>
    <h2>{{ isViewing.provider.name }}</h2>
    <ul>
      <li v-for='session in isViewing.sessionsPageviews'
        :key='session.id'
        class='session'
        v-on:click='togglePageview(session.id)'
      >
        <div>{{session.date}}</div>
        <ul v-show='session.id === sessionIdToShow' class='pageviews'>
          <li v-for='view in session.views' :key='view.id'>
            <div><strong>Page:</strong> {{pages.filter((p) => p.id === view.page)[0].path}}</div>
            <div><strong>Time On Page:</strong> {{view.seconds}} seconds</div>
          </li>
        </ul>
    </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Data',
  data () {
    return {
      sessionIdToShow: null
    }
  },
  computed: {
    ...mapGetters([ 'providers', 'isViewing', 'pages' ])
  },
  methods: {
    togglePageview (id) {
      if (this.sessionIdToShow === id) {
        this.sessionIdToShow = null
      } else {
        this.sessionIdToShow = id
      }
    },
    ...mapActions([ 'getData' ])
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
