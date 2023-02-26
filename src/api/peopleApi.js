const people = [
	{"name": "Joseph"},
	{"name": "Ava"},
	{"name": "Olivia"},
	{"name": "Isabella"},
	{"name": "Sophia"},
	{"name": "Mia"},
	{"name": "Charlotte"},
	{"name": "Amelia"},
	{"name": "Harper"},
	{"name": "Evelyn"},
	{"name": "Abigail"},
	{"name": "Emily"},
	{"name": "Elizabeth"},
	{"name": "Avery"},
	{"name": "Liam"},
	{"name": "Noah"},
	{"name": "Ethan"},
	{"name": "Oliver"},
	{"name": "William"},
	{"name": "James"},
	{"name": "Benjamin"},
	{"name": "Lucas"},
	{"name": "Mason"},
	{"name": "Jacob"}
];

// List where the winners are gonna be stored.
let listOfWinners = [];

// Dictionary where the lucky names are gonna be stored.
// The structure for the dict is as follows:
// {date: [{"name": name, "claimed": true/false}]}
// This structure allows us to search by date, and then know whether a name has been claimed (prize accepted) or not.
let dictForDays = {};

// Stores the date.
let dateSaved = "";

/* METHODS WITHOUT DATE */

export function getWinnersList()
{
	// Returns the winners list.
	return listOfWinners;
}

export function addName(list)
{
	// Updates the winners list.
	listOfWinners = list;
}

export function checkListOfWinners(name)
{
	// Goes through the winners list and checks if the name introduced by the user already exists.
	for(var i=0; i<listOfWinners.length; i++)
	{
		if(listOfWinners[i].name == name.trim())
		{
			return true;
		}
	}

	return false;
}

export function checkName(name)
{
	// Goes through the lucky names list and checks if the name introduced by the user is a lucky name or not.
	for(var i=0; i<people.length; i++)
	{
		if(people[i].name == name.trim())
		{
			return true;
		}
	}

	return false;
}

export function getAll(canReturnError = false) {
	return new Promise((resolve, reject) => {
		if (!canReturnError) {
			resolve(people);
		}

		const hasErrorOccurred = (Math.round(Math.random() * 3)) === 0;
		if (hasErrorOccurred) {
			reject(new Error("An error has occurred!"));
		}
    
		resolve(people);
	});
}

/* METHODS WITH DATE */

// Checks if there is a date stored.
export function checkIfThereIsDate(date)
{
	if(dictForDays[date])
	{
		return true;
	}

	return false;
}

// Receives a date as parameter and returns the names for that specific date that have already been claimed.
// Therefore, returns the winners names for a specific date.
export function getWinnersListWithDate(date)
{
	let values = dictForDays[date];
	let namesClaimed = [];

	for(var i=0; i<values.length; i++)
	{
		// Check that they have been claimed.
		if(values[i].claimed == true)
		{
			namesClaimed.push({"name": values[i].name});
		}
	}

	return namesClaimed;
}

// Receives both name and date, finds the name in the dict and sets the 'claimed' variable to true.
export function addNameWithDate(name, date)
{
	let values = dictForDays[date];

	for(var i=0; i<values.length; i++)
	{
		if(values[i]?.name == name)
		{
			values[i].claimed = true;
			break;
		}
	}

	dictForDays[date] = values;
	console.log(dictForDays);
}

// Receives both name and date, and checks if the name has been claimed or not.
export function checkListOfWinnersWithDate(name, date)
{
	let values = dictForDays[date];

	for(var i=0; i<values.length; i++)
	{
		// Name has been found.
		if(values[i]?.name == name.trim())
		{
			// If it hasn't been claimed, returns false. Therefore, allows the user to claim it.
			if(values[i]?.claimed == false)
			{
				return false;
			}

			// Else, it has been claimed.
			return true;
		}
	}

	// The name wasn't found.
	return "not_found";
}

// Receives the previous date and the actual date.
export function createDictForDayWithPrevious(prevDate, date, dateNoFormat)
{
	// We save the actual date as 'actual date'.
	dateSaved = dateNoFormat;
  
	// Number of lucky names for the actual date.
	// Minimum of ONE name per day; maximum 10.
	let value = Math.floor(Math.random() * (11 - 1) + 1);
	let number = 0;
	// We create the dict.
	dictForDays[date] = [];

	let previousNamesList = [];

	// We get in a list the names for the previous date, since "each subsequent day should not repeat a name from the previous day".
	for(var i=0; i<=dictForDays[prevDate].length; i++)
	{
		previousNamesList.push(dictForDays[prevDate][i]?.name);
	}

	// Until we get the total number of names:
	while(dictForDays[date].length < value)
	{
		// We get a random name from the people list.
		number = Math.floor(Math.random() * people.length);
		// If it is NOT included in the previous day list of names:
		if(!previousNamesList.includes(people[number]?.name))
		{
			// We add it to the dict.
			dictForDays[date].push({"name": people[number]?.name, "claimed": false});
			// Add it to the previous names list, so we do not have it duplicated for todays lucky names.
			previousNamesList.push(people[number].name);
		}
	}

	// Print todays names through console for you to be able to see them and try the app :)
	console.log("Todays names: ");
	console.log(dictForDays);
}

// Create the dict for a specific date (no previous day)
export function createDictForDay(date, dateNoFormat)
{
	// We save the date.
	dateSaved = dateNoFormat;
	// Generate random number of names
	// Minimum of ONE name per day; max 10.
	let value = Math.floor(Math.random() * (11 - 1) + 1);
	let number = 0;
	let loop = 0;
	// Create the dict.
	dictForDays[date] = [];
	let previousNamesList = [];

	// Until we reach the value of names.
	while(loop < value)
	{
		// Get a random name from the lucky names list.
		number = Math.floor(Math.random() * people.length);
		// If the previous names list doesn't include the name (which means, it won't be duplicated):
		if(!previousNamesList.includes(people[number]?.name))
		{
			// We add it to the dict.
			dictForDays[date].push({"name": people[number]?.name, "claimed": false});
			// Add it to the list of previous names.
			previousNamesList.push(people[number].name);
			loop = loop + 1;
		}
	}

	// Print the name through the console so you can see them and try the app :)
	console.log("Todays names: ");
	console.log(dictForDays);
}

// Returns the date stored.
export function returnDate()
{
	return dateSaved;
}
