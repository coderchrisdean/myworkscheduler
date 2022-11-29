// global variables
var currentDay = dayjs().format('dddd, MMMM D');
var currentHour = dayjs().format("H");
var currentTime = dayjs().format("h:mm A");

var schedule = $("schedule");
var workHours = 12;

// 

// user opens page, current date/time should show
// dayjs().format(the day of the week and date)
// there should be time blocks for work hours in day (setting to 12)
//separate blocks with divs
//time block needs to be coded by colors to identify what is past, present, and future
//create function to apply to share id to the current hour of each block.



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//inputs time into the header
$(document).ready(function () {

  $("#currentDay").text(currentDay)
  $("#currentTime").text(currentTime)
  console.log (currentHour) //check work
});

//create divs for blocks of time (DOM)

//creates base div

function buildHourBlock() 
{
  // base div w/ time, text input + save btn

  var hourBlock = $("<div id= 'hour-block' class='row time-block inactive-block'></div>")
  var hour = $("<div class='col-2 col-md-1 hour text-center py-3'></div>")
  hourBlock.append(hour)

  //text-input

  var scheduleItem = $("<textarea class='col-8 col-md-10 description' rows='3'> </textarea>");
  hourBlock.append(scheduleItem)

  //save btn/icon

  var saveBtn = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save"></button>');
  var saveIcon = $('<i class="fas fa-save" aria-hidden="true"></i>');
  hourBlock.append(saveBtn)
  hourBlock.append(saveIcon)

  // append entire block into div
  schedule.append(hourBlock);
}




  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
