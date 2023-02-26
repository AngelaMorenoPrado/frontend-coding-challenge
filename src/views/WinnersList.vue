<template>
    <div class="winners-list-container" id="list">
        <h1>This is the winners list:</h1>
        <el-table :data="winnersList" style="width: 100%">
            <el-table-column prop="name" label="Name" width="300" />
        </el-table>
    </div>
</template>

<script>

import { getWinnersList } from '@/api/peopleApi';
import { toRaw } from 'vue';

export default {
  name: 'WinnersList',
  components: {
  },
  data() {
      return {
        winnersList: []
      }
  },
  mounted() {
      this.winnersList = toRaw(getWinnersList());
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 50vw;
  display: grid;
  justify-items: center;
}
</style>
