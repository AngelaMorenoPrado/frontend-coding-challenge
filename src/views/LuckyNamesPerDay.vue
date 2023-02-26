<template>
  <div class="lucky-names-container">
    <h1>Welcome, Locoia developer!</h1>
    <h2>Is your name lucky?</h2>
    <p>Welcome to the game where we find out whether your name is one of our lucky names of the day.
       All you have to do is type your name below and we will tell you!</p>
    <NameSearcherPerDay />
  </div>
</template>

<script>
import NameSearcherPerDay from '@/components/NameSearcherPerDay.vue'

export default {
  name: 'LuckyNamesPerDay',
  components: {
    NameSearcherPerDay,
  }
}
</script>

<style lang="scss" scoped>
.lucky-names-container {
  width: 70vw;
  display: grid;
  justify-items: center;
}
</style>
