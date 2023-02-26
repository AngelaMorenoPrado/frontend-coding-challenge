<template>
  <div id="nav" class='nav'>
    <router-link to="/">Home</router-link>
    <router-link to="/winnersList">Winners List</router-link>
    <router-link to="/luckyNamesPerDay">Lucky names per day</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  justify-items: center;
}

.nav
{
  min-width: 100%;
  max-width: 100%;
}

.nav > a:-webkit-any-link
{
  color: var(--el-menu-text-color);
  text-decoration: none;
  margin-right: 2vh;
}
</style>
