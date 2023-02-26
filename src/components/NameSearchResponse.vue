<template>
  <div class="container">
    <!-- NAME NOT FOUND MODAL -->
    <div v-if="nameNotFound">
      <el-dialog
        v-model="showModalNameNotFound"
        title="We're sorry!"
        width="60%"
        :before-close="closeModalNameNotFound">
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
    <!-- NAME WAS FOUND MODAL -->
    <div v-if="nameFound">
      <el-dialog
        v-model="showModalNameFound"
        title="Congrats!"
        width="60%"
        :before-close="closeModalNameFound">
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
  name: 'NameSearchResponse',
  props: ['name', 'nameNotFound', 'nameFound'],
  data(){
    return {
      showModalNameNotFound: true,
      showModalNameFound: true
    }
  },
  methods: {
    closeModalNameNotFound() {
      // Name was not found; we let the parent component know and close the modal.
      this.$emit('closeModalNameNotFound')
      this.showModalNameNotFound = false;
    },
    closeModalNameFound() {
      // We close the modal.
      this.showModalNameFound = false;
      this.$emit('closeModalNameFound');
    },
    acceptPrize() {
      // Prize has been accepted, we know the parent component know.
      this.$emit('clearNameInput');
    }
  },
  watch: {
    // If nameNotFound prop changes.
    nameNotFound(newValue)
    {
      if(newValue == true)
      {
        // Name was not found, therefore we show the modal.
        console.log('Name was NOT found');
        this.showModalNameNotFound = true;
      }
    },
    // If nameFound prop changes.
    nameFound(valueName)
    {
      if(valueName == true)
      {
        // Name was found, therefore we show the modal.
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
