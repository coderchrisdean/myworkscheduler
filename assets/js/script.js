// global variables
var schedule = $("#schedule");
var currentMilitaryTime = dayjs().format("H");
var totalHours = 10;
var currentTime = dayjs().format("h");

// setting the current date in the header using dayJS
function setHeaderDate() {
  var headerDateEl = $("#current-day");
  var headerCurrentDate = dayjs().format("dddd, MMM D[th]");
  headerDateEl.text(headerCurrentDate);
}
setHeaderDate();

//dom work day scheduler

// create div to hold hour blocks for schedule
function buildHourBlocks() {
  // the main div which contains the time, task writing area and save button
  var hourBlock = $(
    "<div id='hour-block' class='row time-block inactive-block'></div>"
  );

  // the time shown on each block
  var hour = $("<div class='col-2 col-md-1 hour text-center py-3'></div>");
  hourBlock.append(hour);

  // the task writing area
  var scheduleItem = $(
    "<textarea class='col-8 col-md-10 description' rows='3' placeholder='Enter Item Here'></textarea>"
  );
  hourBlock.append(scheduleItem);

  // savebtn and saveicon
  var saveBtn = $(
    "<button class='btn saveBtn col-2 col-md-1' aria-label='save'></button>"
  );
  var saveIcon = $("<i class='fas fa-save' aria-hidden='true'></i>");
  saveBtn.append(saveIcon);
  hourBlock.append(saveBtn);

  // append the entire hour block to the schedule div
  schedule.append(hourBlock);
}

// use holding div to build blocks in the work day
function buildWorkDay() {
  // for each work hour, create an hour block (each is appended to the schedule as it is created)
  for (i = 0; i < totalHours; i++) {
    buildHourBlocks();
  }
}
buildWorkDay();

// Now we have blocks in the schedule representing each hour of the work day. Next, we have to give descriptions and style them.

// First we are going to set the time description for each hour block based on the 12 hour clock.
function setHourBlockTime() {
  var thisHour;
  var amStart = 8;
  var pmStart = 0;
  var milDayStart = 8;

  // for each hour of the work day (the # of hour blocks in the schedule)
  for (i = 0; i <= totalHours; i++) {
    // find the current hour block as a child of the schedule
    var hourBlock = $("#schedule").children()[i];

    // iterate through the times (9-12, and 1-5) for each child and set the description;
    if (amStart <= 11) {
      // add to morning start until it is noon, then begin the afternoon times.
      amStart++;
      thisHour = amStart;
      $(hourBlock)
        .find("div")
        .text(thisHour + " A.M.");
    } else {
      pmStart++;
      thisHour = pmStart;
      $(hourBlock)
        .find("div")
        .text(thisHour + " P.M.");
    }

    // after we set the visible time description for the block, in the same function we are creating an important data attribute
    // for each hour block.
    milDayStart++;

    $(hourBlock).attr("data-work-hour", milDayStart);
  }
}
setHourBlockTime();

// Second, we are going to set styling to change based on whether the work hour block is past, the current work hour, or in the future.
function setPastPresentFuture() {
  // the working hours of the day in military time
  var workingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  // The below if statement checks; if our working hours includes the current military time, then we are going to start styling the blocks.
  // I have it set so that one hour after the work day is over, the blocks reset to an inactive style, to be reactivated one hour
  // before the next workday.
  if (workingHours.includes(parseInt(currentMilitaryTime))) {
    for (i = 0; i <= totalHours; i++) {
      var hourBlock = $("#schedule").children()[i];
      // find the value of the work hour data attribute we set for each block. It should start at 9.
      var hourBlockTimeData = $(hourBlock).attr("data-work-hour");

      // Then, check to see if the work hour data is less than, equal to, or greater than the current military time.
      // the style will be set by appending and removing the appropriate class.
      if (parseInt(hourBlockTimeData) < parseInt(currentMilitaryTime)) {
        $(hourBlock).removeClass("present");
        $(hourBlock).removeClass("future");
        $(hourBlock).addClass("past");
      } else if (
        parseInt(hourBlockTimeData) === parseInt(currentMilitaryTime)
      ) {
        $(hourBlock).removeClass("past");
        $(hourBlock).removeClass("future");
        $(hourBlock).addClass("present");
      } else if (parseInt(hourBlockTimeData) > parseInt(currentMilitaryTime)) {
        $(hourBlock).removeClass("past");
        $(hourBlock).removeClass("present");
        $(hourBlock).addClass("future");
      } else if (parseInt(currentMilitaryTime) > 18) {
        $(hourBlock).removeClass("past");
      }
    }
  }
}
setPastPresentFuture();

// Now that we have descriptions and styles for each block, next we are going to write code to let us save the tasks.

// First, we create a variable representing the save buttons on the page
var saveButton = $("button");

// We then create an empty array containing an object representing each hour block, with a blank task.
// We will be setting and getting this array from local storage to save and display tasks.
var stored = [
  {
    hourBlock: 9,
    task: "",
  },
  {
    hourBlock: 10,
    task: "",
  },
  {
    hourBlock: 11,
    task: "",
  },
  {
    hourBlock: 12,
    task: "",
  },
  {
    hourBlock: 1,
    task: "",
  },
  {
    hourBlock: 2,
    task: "",
  },
  {
    hourBlock: 3,
    task: "",
  },
  {
    hourBlock: 4,
    task: "",
  },
  {
    hourBlock: 5,
    task: "",
  },
  {
    hourBlock: 6,
    task: "",
  },
  {
    hourBlock: 7,
    task: "",
  },
  {
    hourBlock: 8,
    task: "",
  },
  {
    hourBlock: 9,
    task: "",
  },
];

// savebutton click
$(saveButton).click(function (event) {
  event.preventDefault();

  var element = event.target;

  // if the user clicks the save icon, then set the element to the save button
  if (element.matches("i")) {
    element = $(element).parent();
  }

  // Find the associated text area of the hour block, based on the save button the user clicked.
  var textArea = $(element).parent().find("textarea");
  // Set textAreaInput to the value of the text area
  var textAreaInput = $(textArea).val();
  // find the index of the parent hour block in the schedule (very important!)
  var textAreaIndex = $(element).parent().index();

 if (localStorage.getItem(stored) === null) {
    // Since the stored array has the same number of indexes as the schedule (which contains the hour blocks)
    // value of the index of the hour block to set the appropriate task in stored tasks.
    stored[textAreaIndex].task = $.trim(textAreaInput);
    localStorage.setItem(stored, JSON.stringify(stored));

    // If  stored array, retreive from storage, add and save to local storage
  } else {
    stored = JSON.parse(localStorage.getItem(stored));
    stored[textAreaIndex].task = $.trim(textAreaInput);
    $(textArea).val(stored[textAreaIndex].task);
    localStorage.setItem(stored, JSON.stringify(stored));
  }
});

//get stored tasks on page reload
function getStored() {
  if (localStorage.getItem(stored) !== null) {
    for (i = 0; i <= totalHours; i++) {
      var hourBlockTextarea = $("#schedule").children()[i];
      stored = JSON.parse(localStorage.getItem(stored));

      $(hourBlockTextarea).find("textarea").val(stored[i].task);
    }
  }
}
getStored();

// A helper function which resets the stored tasks array back to its blank state. If the user has not saved
// a task before, it will alert them that they have to save a task.
function clearStoredTasks() {
  if (localStorage.getItem(stored) !== null) {
    stored = [
      {
        hourBlock: 9,
        task: "",
      },
      {
        hourBlock: 10,
        task: "",
      },
      {
        hourBlock: 11,
        task: "",
      },
      {
        hourBlock: 12,
        task: "",
      },
      {
        hourBlock: 1,
        task: "",
      },
      {
        hourBlock: 2,
        task: "",
      },
      {
        hourBlock: 3,
        task: "",
      },
      {
        hourBlock: 4,
        task: "",
      },
      {
        hourBlock: 5,
        task: "",
      },
    ];
    localStorage.setItem(stored, JSON.stringify(stored));
  } else {
    window.alert("You have not saved any tasks!");
  }
}

// On click of the clear tasks button, confirm with user then clear the tasks.
$("#clear-stored-tasks").click(function (event) {
  event.preventDefault();
  var confirmClear = window.confirm(
    "This will clear all of the tasks for today. Are you sure you want to continue?"
  );
  if (confirmClear) {
    clearStoredTasks();
    location.reload();
  }
  return;
});

// At the start of a new work day(1 am), clear the tasks from the previous day.
function startNewWorkDay() {
  if (parseInt(currentMilitaryTime) === 1) {
    clearStoredTasks();
    location.reload();
  }
}
startNewWorkDay();
