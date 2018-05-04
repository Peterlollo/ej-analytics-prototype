<template>
  <div>
    <h1>Getting more data...</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'MoreData',
  methods: {
    ...mapActions([ 'getMoreData' ])
  },
  created () {
    this.getMoreData()
  }
}
</script>
