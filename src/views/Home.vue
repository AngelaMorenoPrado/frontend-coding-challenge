<template>
  <div class="home-container">
    <h1>Welcome, Locoia developer!</h1>
    <h2>Is your name lucky?</h2>
    <p>Welcome to the game where we find out whether your name is one of our lucky names of the day.
       All you have to do is type your name below and we will tell you!</p>
    <NameSearcher />
  </div>
</template>

<script>
import NameSearcher from '@/components/NameSearcher.vue'

export default {
  name: 'Home',
  components: {
    NameSearcher,
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 70vw;
  display: grid;
  justify-items: center;
}
</style>
