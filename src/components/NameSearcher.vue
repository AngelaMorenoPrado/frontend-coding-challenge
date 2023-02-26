<template>
  <div class="container" id="NameSearcher">
    <!-- INFORMATION INTRODUCED BY THE USER -->
    <section class='userInput__section'>
      <el-input v-model="inputName" placeholder="Please enter your name here" @input="checkInputLength()" v-on:keypress="checkNumberOrEnter($event)" clearable />
      <el-button class="userInput__section-button" type="primary" @click="checkInputName()" :disabled="disabled">Submit</el-button>
    </section>
    <el-divider />
    <!-- TABLE -->
    <section class="table__section">
      <el-table :data="listWinners" style="width: 100%">
        <el-table-column prop="name" label="Name" width="300" />
      </el-table>
    </section>
    <el-divider />
    <!-- Stretch goals -->
    <el-button type="primary" @click="getAllList()">Get all button</el-button>
  </div>
  <!-- Component with props -->
  <NameSearchResponse :name="capitalizeFirstLetter(inputName)" :nameNotFound="nameNotFound" :nameFound="nameFound" @closeModalNameNotFound="changeNameNotFound()" @closeModalNameFound="changeNameFound" @clearNameInput="getWinners" />
</template>

<script>
// Imports
import NameSearchResponse from '@/components/NameSearchResponse.vue';
import { checkName, getAll, getWinnersList, addName, checkListOfWinners } from '@/api/peopleApi';
import { ElNotification } from 'element-plus';

export default {
  name: 'NameSearcher',
  components: {
    NameSearchResponse,
  },
  data() {
    // Variables
    return {
      inputName: '',
      nameNotFound: false,
      nameFound: false,
      listWinners: [],
      disabled: true,
      value: false
    }
  },
  methods: 
  {
    // We capitalize the first letter(s) of the name(s)! - There might be double names.
    // Since both jacob and Jacob are the same name.
    capitalizeFirstLetter(name)
    {
      if(name != "")
      {
        var splitStr = name.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' ');
      }

      return name;
    },
    checkInputName()
    {
      console.log('Starting to check name...');
      // Sending the name introduced by the user as a parameter, we check whether it is in the winners list already;
      // if it is, it means the prize for that name has already been claimed.
      if(checkListOfWinners(this.capitalizeFirstLetter(this.inputName)) == true)
      {
        // Name has already won, therefore we show the message to the user.
        ElNotification({
          title: 'Info',
          message: `I'm sorry, ${this.inputName} has already received their prize today!`,
          type: 'info',
        });
      }
      else
      {
        // If it is not in the winners list, we check if the name introduced is a lucky name.
        console.log(this.capitalizeFirstLetter(this.inputName))
        this.value = checkName(this.capitalizeFirstLetter(this.inputName));
        // If it is not a lucky name, we set the nameNotFound variable to true; otherwise, if it is a lucky name,
        // we set the nameFound variable to true.
        this.value === false ? this.nameNotFound = true : this.nameFound = true;
      }
    },
    changeNameNotFound()
    {
      this.nameNotFound = false;
    },
    changeNameFound()
    {
      this.nameFound = false;
    },
    getWinners()
    {
      // If it is a lucky name and the user accepts the prize, we add the name to the winners list and display
      // it through the screen.
      this.listWinners.push({'name': this.capitalizeFirstLetter(this.inputName.trim())});
      // Input field is cleared.
      this.inputName = "";
      this.disabled = true;
      // Store the name.
      addName(this.listWinners);
    },
    checkNumberOrEnter(e)
    {
      // Press enter to submit the name.
      if(e.key == 'Enter' && this.disabled == false)
      {
        // if the key pressed if 'Enter' and the button to submit it is enabled:
        // we start checking the name.
        this.checkInputName();
      }
      else if(e.key == 'Enter' && this.disabled == true)
      {
        // If the key is enter but the button to submit it is not enabled, it means it is not enough.
        ElNotification({
          title: 'Error',
          message: 'Name is not long enough!',
          type: 'error',
        });
      }

      // Validate the input field to only accept letters:
      // Every time a new character is added into the input, it is checked whether it is a letter or a number.
      if(/^[A-Za-z ]+$/.test(e.key)) return true;
      else
      {
        // if it is a number, it won't be added into the input and a warning notification will be displayed on the screen.
        ElNotification({
          title: 'Warning',
          message: 'Only letters allowed!',
          type: 'warning',
        });
        return e.preventDefault();
      }
    },
    checkInputLength()
    {
      // ... to not be smaller than 2 characters.
      // Submit button is disabled if input.length <= 2
      this.inputName.length > 2 ? this.disabled = false : this.disabled = true;
    },
    getAllList()
    {
      // Validate the api call by passing "canReturnError" ...
      // We catch the error so we can show a message to the user.
      getAll(true).then(response => {
        console.log(response);
      }).catch(e => {
        ElNotification({
          title: 'Error',
          message: 'There has been an error. Try again later.',
          type: 'error',
        });
      });
    }
  },
  mounted() {
      // Every time the page is mounted, we get the list of winners and display it through the screen.
      this.listWinners = getWinnersList();
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 70%;
}

.userInput__section, .table__section
{
  width: 50%;
  margin: 0 auto;
}

.userInput__section-button
{
  margin-top: 1vh;
}
</style>
