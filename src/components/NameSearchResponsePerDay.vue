<template>
  <div class="container">
    <!-- NAME NOT FOUND -->
    <div v-if="nameNotFound">
      <el-dialog
        v-model="showModalNameNotFound"
        title="We're sorry!"
        width="60%">
        <span>I'm sorry, {{name}} is not in today's list of lucky names.</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="closeModalNameNotFound()">
              Ok
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- NAME WAS FOUND -->
    <div v-if="nameFound">
      <el-dialog
        v-model="showModalNameFound"
        title="Congrats!"
        width="60%">
        <span>Congratulations, {{name}} is a lucky name! You've won a prize. Will you accept it?</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="success" @click="acceptPrize(); closeModalNameFound();">Accept</el-button>
            <el-button type="danger" @click="closeModalNameFound()">Reject</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NameSearchResponsePerDay',
  props: ['name', 'nameNotFound', 'nameFound', 'date'],
  data(){
    return {
      showModalNameNotFound: true,
      showModalNameFound: true
    }
  },
  methods: {
    closeModalNameNotFound() {
      this.$emit('closeModalNameNotFound')
      this.showModalNameNotFound = false;
    },
    closeModalNameFound() {
      this.showModalNameFound = false;
      this.$emit('closeModalNameFound');
    },
    acceptPrize() {
      this.$emit('clearNameInput');
    }
  },
  watch: {
    nameNotFound(newValue)
    {
      if(newValue == true)
      {
        console.log('Name was NOT found');
        this.showModalNameNotFound = true;
        
      }
    },
    nameFound(valueName)
    {
      if(valueName == true)
      {
        console.log('Name WAS found');
        this.showModalNameFound = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 50%;
}
</style>
