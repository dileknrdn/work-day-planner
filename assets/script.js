// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localeSettings = {};
dayjs.locale(localeSettings);

$(function () {
  // TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour.
  // The function below will get the hour of the day by using the day.js library.
  const currentHour = dayjs().hour();

  function hourlyColor() {
    $(".time-block").each(function () {
      const blockHour = $(this).attr("id").split("-")[1];
      console.log(blockHour, currentHour);
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour == currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage.
  // The  function below will save the user's input in a textarea to localStorage - only when the corresponding save button has been clicked.
  function textEntry() {
    $(".saveBtn").on("click", function () {
      const key = $(this).parent().attr("id");
      const value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
    });
  }

  // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  // This function will get the user input from the localStorage and set textarea values for each time block.
  $(".time-block").each(function () {
    const key = $(this).attr("id");
    const value = localStorage.getItem(key);
    $(this).children(".description").val(value);
  });

  // TODO: Add code to display the current date in the header of the page.
  // You can find this section in the header of the page!

  function updateTime() {
    const dateElement = $("#date");
    const timeElement = $("#time");
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    const currentTime = dayjs().format("hh:mm:ss A");
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }

  hourlyColor();
  textEntry();
  setInterval(updateTime, 1000);
});
