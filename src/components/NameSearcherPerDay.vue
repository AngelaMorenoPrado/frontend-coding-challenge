<template>
  <div class="container" id="NameSearcherPerDay">
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
    <div class="row">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="Validate the api call"
            placement="top"
            >
            <el-button type="primary" @click="getAllList()">Get all button</el-button>
        </el-tooltip>
        <el-button type="primary" @click="backPreviousDay()" :disabled="disabledPrev">Previous day</el-button>
        <el-button type="primary" @click="createNextDay()">Next day</el-button>
    </div>
    <!-- Date -->
    <p>Actual date: {{dateFormat}}</p>
  </div>
  <NameSearchResponsePerDay :name="capitalizeFirstLetter(inputName)" :nameNotFound="nameNotFound" :nameFound="nameFound" @closeModalNameNotFound="changeNameNotFound()" @closeModalNameFound="changeNameFound()" @clearNameInput="getWinners" :date="dateFormat" />
</template>

<script>
// Imports
import NameSearchResponsePerDay from '@/components/NameSearchResponse.vue';
import { getAll, returnDate, checkIfThereIsDate, getWinnersListWithDate, addNameWithDate, checkListOfWinnersWithDate, createDictForDay, createDictForDayWithPrevious } from '@/api/peopleApi';
import { ElNotification } from 'element-plus';

export default {
  name: 'NameSearcherPerDay',
  components: {
    NameSearchResponsePerDay,
  },
  data() {
    return {
      inputName: '',
      nameNotFound: false,
      nameFound: false,
      listWinners: [],
      disabled: true,
      value: false,
      day: '',
      date: '',
      dateFormat: '',
      previousDate: '',
      disabledPrev: true,
      today: '',
      todayFormat: ''
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
      let value = checkListOfWinnersWithDate(this.capitalizeFirstLetter(this.inputName), this.dateFormat);
      if(value == true)
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
        // If the value is 'not_found', it means the name was not found, therefore we open the modal letting the user know.
        // Otherwise, we open the other modal so the user can choose whether they want to accept or reject the prize.
        value === 'not_found' ? this.nameNotFound = true : this.nameFound = true;
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
      // Add the name to the list and display it through the screen.
      this.listWinners.push({'name': this.capitalizeFirstLetter(this.inputName)});
      // We store, using the name and the date, that the prize has been claimed.
      addNameWithDate(this.capitalizeFirstLetter(this.inputName.trim()), this.dateFormat);
      // Clear the input.
      this.inputName = '';
      this.disabled = true;
    },
    checkNumberOrEnter(e)
    {
      // If the Enter key is pressed and the button is not disabled (length > 2)
      if(e.key == 'Enter' && this.disabled == false)
      {
        // We check the name.
        this.checkInputName();
      }
      else if(e.key == 'Enter' && this.disabled == true)
      {
        // Otherwise, if the button is disabled (length <= 2) we let the user know that the name is not long enough.
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
    },
    createNextDay()
    {
        // Create the dict for the next day.
        // Empty the winners list.
        this.listWinners = [];
        this.previousDate = this.dateFormat;
        // Get the next date (previousDate + 1)
        this.date.setDate(this.date.getDate() + 1);
        var dd = String(this.date.getDate()).padStart(2, '0');
        var mm = String(this.date.getMonth() + 1).padStart(2, '0');
        var yyyy = this.date.getFullYear();

        this.dateFormat = dd + '/' + mm + '/' + yyyy;

        // Check if the key in the dict already exists (which means, the day was already created)
        if(checkIfThereIsDate(this.dateFormat) == false)
        {
          // If it doesn't, we create the key in the dict.
          createDictForDayWithPrevious(this.previousDate, this.dateFormat, this.date);
        }
        else
        {
          // Otherwise, we simply get the winners for the next day.
          this.listWinners = getWinnersListWithDate(this.dateFormat);
        }

        // We allow the user to go to the previous day.
        this.disabledPrev = false;
    },
    backPreviousDay()
    {
        // The user is trying to go to the previous day.
        // We empty the list of winners.
        this.listWinners = [];
        // Get the previous date.
        this.date.setDate(this.date.getDate() - 1);
        var dd = String(this.date.getDate()).padStart(2, '0');
        var mm = String(this.date.getMonth() + 1).padStart(2, '0');
        var yyyy = this.date.getFullYear();

        this.dateFormat = dd + '/' + mm + '/' + yyyy;

        // Get the list of winners for that specific date.
        this.listWinners = getWinnersListWithDate(this.dateFormat);

        // If the date is equal to today, we disable the button that allows the user to go to the previous date
        // since they can not go back in time.
        if(this.todayFormat == this.dateFormat)
        {
            this.disabledPrev = true;
        }
        else
        {
            // The previous day button keeps being enabled.
            this.disabledPrev = false;
        }
    }
  },
  mounted() {
        // We get the actual date.
        this.today = new Date();
        var day = String(this.today.getDate()).padStart(2, '0');
        var month = String(this.today.getMonth() + 1).padStart(2, '0');
        var year = this.today.getFullYear();

        this.todayFormat = day + '/' + month + '/' + year;

        // Checks if todays date and the one stored are equal.
        if(this.todayFormat != returnDate() && returnDate() != "")
        {
            let returned_date = returnDate();
            day = String(returned_date.getDate()).padStart(2, '0');
            month = String(returned_date.getMonth() + 1).padStart(2, '0');
            year = returned_date.getFullYear();

            returned_date = day + '/' + month + '/' + year;

            // If they are equal, previous day's button is disabled.
            if(this.todayFormat == returned_date)
            {
              this.disabledPrev = true;
            }
            else
            {
              // Otherwise, we enable it.
              this.disabledPrev = false;
            }
        }

        // If the date stored is not empty:
        if(returnDate() != '')
        {
            // We get the stored date
            this.date = returnDate();
            var dd = String(this.date.getDate()).padStart(2, '0');
            var mm = String(this.date.getMonth() + 1).padStart(2, '0');
            var yyyy = this.date.getFullYear();

            this.dateFormat = dd + '/' + mm + '/' + yyyy;

            // Show the winners for that date through screen.
            this.listWinners = getWinnersListWithDate(this.dateFormat);
        }
        else
        {
            // Else, we create the dict for the day.
            this.dateFormat = this.todayFormat;
            this.date = new Date();
            createDictForDay(this.todayFormat, this.today);
        }
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
