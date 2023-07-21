// Get the current date and time in YYYY-MM-DDTHH:mm format
function getCurrentDateTime() {
  var currentDate = new Date();
  return (
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    currentDate.getDate().toString().padStart(2, "0") +
    "T" +
    currentDate.getHours().toString().padStart(2, "0") +
    ":" +
    currentDate.getMinutes().toString().padStart(2, "0")
  );
}

// Get the current date in YYYY-MM-DD format
function getTodayDate() {
  var currentDate = new Date();
  return (
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    currentDate.getDate().toString().padStart(2, "0")
  );
}

// Get the next valid date
function getNextValidDate(date) {
  var nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);

  // Get the current month and year
  var currentMonth = date.getMonth();
  var currentYear = date.getFullYear();

  // Check if the next day's date is valid
  // If it's the first day of the next month, set it to the first day of the next month
  if (nextDay.getDate() === 1) {
    nextDay.setDate(1);
    nextDay.setMonth(currentMonth + 1);

    // Check if the next month is valid
    // If it's January of the next year, set it to January of the next year
    if (nextDay.getMonth() === 0) {
      nextDay.setMonth(0);
      nextDay.setFullYear(currentYear + 1);
    }
  }

  return nextDay;
}

// Get the time range from the provided 'fromTime' and 'toTime'
function getTimeRange(fromTimeStr, toTimeStr) {
  var todayDate = getTodayDate();
  var currentTime = new Date(getCurrentDateTime());
  var fromTime = new Date(todayDate + "T" + fromTimeStr);
  var toTime = new Date(todayDate + "T" + toTimeStr);

  return [fromTime, toTime];
}

// Create the announcement display for a given train
function createAnnouncement(trainData) {
  var announcementDiv = document.createElement("div");
  announcementDiv.className = "announcement";
  announcementDiv.setAttribute("data-train", trainData["Train No."]);

  var platformSelectLabel = document.createElement("label");
  platformSelectLabel.textContent = "Select Platform:";
  platformSelectLabel.setAttribute(
    "for",
    "platformSelect_" + trainData["Train No."]
  );

  var platformSelect = document.createElement("select");
  platformSelect.className = "platform-select";
  platformSelect.setAttribute(
    "id",
    "platformSelect_" + trainData["Train No."]
  );
  // platformSelect.addEventListener("change", function () {
  //   updateAnnouncement(trainData);
  // });

  var platformOptions = ["1", "2", "3", "4"]; // You can add more options if needed
  for (var i = 0; i < platformOptions.length; i++) {
    var platformOption = document.createElement("option");
    platformOption.textContent = platformOptions[i];
    platformSelect.appendChild(platformOption);
  }

  // Add 2 tabs after the platformSelect combo box
  announcementDiv.appendChild(document.createTextNode("\t\t\t"));

  var statusSelectLabel = document.createElement("label");
  statusSelectLabel.textContent = "Select Status:";
  statusSelectLabel.setAttribute(
    "for",
    "statusSelect_" + trainData["Train No."]
  );

  var statusSelect = document.createElement("select");
  statusSelect.className = "status-select";
  statusSelect.setAttribute("id", "statusSelect_" + trainData["Train No."]);

  var statusOptions = ["Arriving", "Cancelled"]; // Add more statuses if needed
  for (var i = 0; i < statusOptions.length; i++) {
    var statusOption = document.createElement("option");
    statusOption.textContent = statusOptions[i];
    statusSelect.appendChild(statusOption);
  }

  // Add 2 tabs after the statusSelect combo box
  announcementDiv.appendChild(document.createTextNode("\t\t\t"));

  var languageSelectLabel = document.createElement("label");
  languageSelectLabel.textContent = "Select Language:";
  languageSelectLabel.setAttribute(
    "for",
    "languageSelect_" + trainData["Train No."]
  );

  var languageSelect = document.createElement("select");
  languageSelect.className = "language-select";
  languageSelect.setAttribute(
    "id",
    "languageSelect_" + trainData["Train No."]
  );

  var languageOptions = ["All", "English", "Hindi", "Bengali"]; // Add more languages if needed
  for (var i = 0; i < languageOptions.length; i++) {
    var languageOption = document.createElement("option");
    languageOption.textContent = languageOptions[i];
    languageSelect.appendChild(languageOption);
  }

  // Add 2 tabs after the languageSelect combo box
  announcementDiv.appendChild(document.createTextNode("\t\t\t"));

  var platformCheckboxLabel = document.createElement("label");
  platformCheckboxLabel.textContent = "Select Train:";
  platformCheckboxLabel.setAttribute(
    "for",
    "platformCheckbox_" + trainData["Train No."]
  );

  var platformCheckbox = document.createElement("input");
  platformCheckbox.className = "platform-checkbox";
  platformCheckbox.setAttribute("type", "checkbox");
  platformCheckbox.setAttribute(
    "id",
    "platformCheckbox_" + trainData["Train No."]
  );

  var trainDirection =
    trainData["Train No."] % 2 === 0 ? "DOWN" : "UP";

  announcementDiv.innerHTML =
    "<h1>" +
    trainData["Train No."] +
    " " +
    trainDirection +
    " <i>" +
    trainData["Train Name"] +
    "</i></h1><h2>" +
    trainData["Time"] +
    "</h2>";

  announcementDiv.appendChild(platformSelectLabel);
  announcementDiv.appendChild(platformSelect);

  announcementDiv.appendChild(document.createTextNode("\t\t\t"));

  announcementDiv.appendChild(statusSelectLabel);
  announcementDiv.appendChild(statusSelect);

  announcementDiv.appendChild(document.createTextNode("\t\t\t"));

  announcementDiv.appendChild(languageSelectLabel);
  announcementDiv.appendChild(languageSelect);

  announcementDiv.appendChild(document.createTextNode("\t\t\t"));

  announcementDiv.appendChild(platformCheckboxLabel);
  announcementDiv.appendChild(platformCheckbox);

  announcementContainer.appendChild(announcementDiv);
}

// Display the information of selected rows
function displaySelectedRows() {
  selectedRowsContainer.innerHTML = ""; // Clear the previous content
  var selectedRows = data.filter(function (train) {
    var trainNo = train["Train No."];
    var platformCheckbox = document.getElementById(
      "platformCheckbox_" + trainNo
    );
    return platformCheckbox.checked;
  });

  if (selectedRows.length > 0) {
    var heading = document.createElement("h2");
    heading.textContent = "Selected Rows Information";
    selectedRowsContainer.appendChild(heading);

    for (var i = 0; i < selectedRows.length; i++) {
      var train = selectedRows[i];
      var platformSelect = document.getElementById(
        "platformSelect_" + train["Train No."]
      );
      var platformNumber = platformSelect.value;
      var trainDirection =
        train["Train No."] % 2 === 0 ? "DOWN" : "UP";
      var selectedRowInfo = document.createElement("p");
      selectedRowInfo.textContent =
        train["Train No."] +
        " " +
        trainDirection +
        " " +
        train["Train Name"] +
        ", Platform: " +
        platformNumber;
      selectedRowsContainer.appendChild(selectedRowInfo);
    }
  } else {
    var noRowsMessage = document.createElement("p");
    noRowsMessage.textContent = "No rows selected.";
    selectedRowsContainer.appendChild(noRowsMessage);
  }
}

let audioQueue = [];
// Toggle play/stop audio functionality
function togglePlay() {
  if (!isPlaying) {
    playButton.textContent = "Stop";
    isPlaying = true;
   audioQueue = [];
    var announcementDivs = document.querySelectorAll(".announcement");
    announcementDivs.forEach(function (announcementDiv) {
      var trainNo = announcementDiv.getAttribute("data-train");
      var trainData = data.find((train) => train["Train No."] === trainNo);
      var platformCheckbox = document.getElementById(
        "platformCheckbox_" + trainNo
      );
      if (platformCheckbox.checked) {
        var platformSelect = document.getElementById(
          "platformSelect_" + trainNo
        );
        var platformNumber = platformSelect.value;
        var languageSelect = document.getElementById(
          "languageSelect_" + trainNo
        );
        var selectedLanguage = languageSelect.value;
        var statusSelect = document.getElementById(
          "statusSelect_" + trainNo
        );
        var selectedStatus = statusSelect.value;

        if (selectedLanguage === "All") {
          playAudio("English", trainData, platformNumber, selectedStatus);
		  playAudio("Hindi", trainData, platformNumber, selectedStatus);
		  playAudio("Bengali", trainData, platformNumber, selectedStatus);
        } else {
          playAudio(
            selectedLanguage,
            trainData,
            platformNumber,
            selectedStatus
          );
        }
      }
    });
	playNextAudio();
  } else {
    stopAudio();
  }
}

function getLanguagePath(language) {
  switch (language) {
    case "English":
      return "en";
    case "Hindi":
      return "hi";
    case "Bengali":
      return "bn";
    default:
      return "en";
  }
}

function constructAudioFileName(
  language,
  trainData,
  platformNumber,
  status
) {
  var audioLanguagePath = getLanguagePath(language);
  var audioPath = `audio_data/${audioLanguagePath}`;

  // Construct the audio file path based on the provided logic
  var trainNo = trainData["Train No."];
  var trainDigits = trainNo.split("").map(Number);
  var trainDirection =
    trainNo % 2 === 0 ? "down" : "up";
  var trainNameParts = trainData["Train Name"].split("-");
  var station1 = trainNameParts[0].trim().toLowerCase();
  var station2 = trainNameParts[1].trim().toLowerCase();
  var trainType = station2.split(" ")[1].toLowerCase();
  var viaStations = trainData["Via"];

  var audioFileNameArray = [
    `${audioPath}/opening.mp3`,
    ...trainDigits.map((digit) => `${audioPath}/numbers/${digit}.mp3`),
    `${audioPath}/directions/${trainDirection}.mp3`,
    `${audioPath}/stations/${station1}.mp3`,
    `${audioPath}/stations/${station2.split(" ")[0].toLowerCase()}.mp3`,
    `${audioPath}/types/${trainType}.mp3`,
  ];

  if (status === "Arriving") {
    if (viaStations && viaStations.length > 0) {
      audioFileNameArray.push(`${audioPath}/via.mp3`);
      audioFileNameArray.push(
        ...viaStations.map(
          (viaStation) =>
            `${audioPath}/stations/${viaStation.trim().toLowerCase()}.mp3`
        )
      );
    }
    if (audioLanguagePath === "hi") {
      audioFileNameArray.push(`${audioPath}/status/arriving_pt1.mp3`);
	  audioFileNameArray.push(
        `${audioPath}/numbers/${platformNumber}.mp3`
      );
	  audioFileNameArray.push(`${audioPath}/status/arriving_pt2.mp3`);
    } else {
      if (audioLanguagePath === "bn") {
        audioFileNameArray.push(
          `${audioPath}/numbers/${platformNumber}.mp3`
        );
      }
      audioFileNameArray.push(`${audioPath}/status/arriving.mp3`);
    }
  } else if (status === "Cancelled") {
    audioFileNameArray.push(`${audioPath}/status/cancelled.mp3`);
  }

  if (audioLanguagePath === "en" && status === "Arriving") {
    audioFileNameArray.push(`${audioPath}/numbers/${platformNumber}.mp3`);
  }

  return audioFileNameArray;
}

function playAudio(language, trainData, platformNumber, status) {
  // Replace the path logic here based on the language and other parameters
  var audioFileNameArray = constructAudioFileName(
    language,
    trainData,
    platformNumber,
    status
  );

  for (var i = 0; i < audioFileNameArray.length; i++) {
    var audioElement = new Audio(audioFileNameArray[i]);
    audioQueue.push(audioElement);
  }
}

// Play the next audio file in the queue
function playNextAudio() {
  let currentIndex = 0;
  
 function playNext() {
	  if (currentIndex >= audioQueue.length) {
		isPlaying = false;
		playButton.textContent = "Play";
        return;
      }
	  
	  const audio = audioQueue[currentIndex];
	  
	  audio.addEventListener('ended', () => {
	    currentIndex++;
        playNext();
	  });
	  audio.play();
	}
	playNext();
}

// Stop the currently playing audio
function stopAudio() {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
  isPlaying = false;
  playButton.textContent = "Play";
  audioQueue = [];
  var audioBars = document.querySelectorAll(".audio-bar");
  for (var i = 0; i < audioBars.length; i++) {
    audioBars[i].remove();
  }
}

let refreshIntervalId;

// Load grid data and update announcements
function loadGridData() {
  if (!fromTimeInput.value || !toTimeInput.value) {
    alert("Please enter both From Time and To Time.");
    return;
  }

  // Disable the interval by clearing it using the stored interval ID
  clearInterval(refreshIntervalId);

  var fromTimeStr = fromTimeInput.value;
  var toTimeStr = toTimeInput.value;
  var timeRange = getTimeRange(fromTimeStr, toTimeStr);
  var fromTime = timeRange[0];
  var toTime = timeRange[1];

  announcementContainer.innerHTML = "";
  selectedRowsContainer.innerHTML = "";

  var noModificationTrains = [];
  var adjustmentTrains = [];

  for (var i = 0; i < data.length; i++) {
    var train = data[i];
    var tt = getTodayDate() + "T" + train["Time"];
    var trainTime = new Date(tt);

    if (trainTime >= fromTime && trainTime <= toTime) {
      if ((train["Remarks"] === "Saturday only" && trainTime.getDay() === 6) || (train["Remarks"] === "Except Sunday" && trainTime.getDay() !== 0) || train["Remarks"] === "Everyday") {
        noModificationTrains.push(train);
      } 
    }

    if (toTime < fromTime && trainTime < toTime) {
      trainTime = getNextValidDate(trainTime);
      train["Time"] = trainTime.getHours().toString().padStart(2, "0") + ":" + trainTime.getMinutes().toString().padStart(2, "0");
      
      if ((train["Remarks"] === "Saturday only" && trainTime.getDay() === 6) || (train["Remarks"] === "Except Sunday" && trainTime.getDay() !== 0) || train["Remarks"] === "Everyday") {
        adjustmentTrains.push(train);
      }
    }
  }

  // Display train entries that don't need modification
  for (var j = 0; j < noModificationTrains.length; j++) {
    var train = noModificationTrains[j];
    createAnnouncement(train);
  }

  // Display train entries that need modification after modification
  for (var k = 0; k < adjustmentTrains.length; k++) {
    var train = adjustmentTrains[k];
    createAnnouncement(train);
  }
}

function getOneHourBeforeAndAfterDates() {
  const currentDate = new Date();
  const oneHourBefore = new Date(currentDate.getTime() - 60 * 60 * 1000);
  const oneHourAfter = new Date(currentDate.getTime() + 60 * 60 * 1000);

  if (oneHourBefore.getDate() !== currentDate.getDate()) {
    oneHourBefore.setDate(currentDate.getDate());
    oneHourBefore.setMonth(currentDate.getMonth());
    oneHourBefore.setFullYear(currentDate.getFullYear());

    oneHourBefore.setDate(oneHourBefore.getDate() - 1);
  }

  if (oneHourAfter.getDate() !== currentDate.getDate()) {
    oneHourAfter.setDate(currentDate.getDate());
    oneHourAfter.setMonth(currentDate.getMonth());
    oneHourAfter.setFullYear(currentDate.getFullYear());

    oneHourAfter.setDate(oneHourAfter.getDate() + 1);
  }

  return [oneHourBefore, oneHourAfter];
}

var comboState = {};
var checkboxState = {};

// Function to fetch announcement data and create announcements for the current time range
function fetchAnnouncementData() {
  var timeRange = getOneHourBeforeAndAfterDates();
  var fromTime = timeRange[0];
  var toTime = timeRange[1];

  // Clear the current announcements
  announcementContainer.innerHTML = "";
  selectedRowsContainer.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    var train = data[i];
    var tt = getTodayDate() + "T" + train["Time"];
    var trainTime = new Date(tt);

    if (trainTime >= fromTime && trainTime <= toTime) {
      if (
        (train["Remarks"] === "Saturday only" && trainTime.getDay() === 6) ||
        (train["Remarks"] === "Except Sunday" && trainTime.getDay() !== 0) ||
        train["Remarks"] === "Everyday"
      ) {
        // Create announcements for the train entries that fulfill the condition
        createAnnouncement(train);

        // Restore the state of combo boxes and checkboxes for the displayed train entry
        restoreComboState(train);
        restoreCheckboxState(train);

        // Add event listeners to combo boxes and checkboxes to save their state when changed
        addComboChangeListener(train);
        addCheckboxChangeListener(train);

        // Save the current state of combo boxes and checkboxes
        saveComboState(train);
        saveCheckboxState(train);
      }
    }
  }
}

// Function to save the state of the combo box for a specific train entry
function saveComboState(train) {
  var languageSelect = document.getElementById("languageSelect_" + train["Train No."]);
  var platformSelect = document.getElementById("platformSelect_" + train["Train No."]);
  var statusSelect = document.getElementById("statusSelect_" + train["Train No."]);

  if (languageSelect && platformSelect && statusSelect) {
    var state = {
      language: languageSelect.value,
      platform: platformSelect.value,
      status: statusSelect.value
    };
    comboState[train["Train No."]] = state;
  }
}

// Function to save the state of the checkbox for a specific train entry
function saveCheckboxState(train) {
  var platformCheckbox = document.getElementById("platformCheckbox_" + train["Train No."]);
  if (platformCheckbox) {
    checkboxState[train["Train No."]] = platformCheckbox.checked;
  }
}

// Function to restore the state of the combo box for a specific train entry from localStorage
function restoreComboState(train) {
  var languageSelect = document.getElementById("languageSelect_" + train["Train No."]);
  var platformSelect = document.getElementById("platformSelect_" + train["Train No."]);
  var statusSelect = document.getElementById("statusSelect_" + train["Train No."]);

  if (languageSelect && platformSelect && statusSelect) {
    var state = comboState[train["Train No."]];
    if (state) {
      languageSelect.value = state.language;
      platformSelect.value = state.platform;
      statusSelect.value = state.status;
    }
  }
}

// Function to restore the state of the checkbox for a specific train entry from localStorage
function restoreCheckboxState(train) {
  var platformCheckbox = document.getElementById("platformCheckbox_" + train["Train No."]);
  if (platformCheckbox) {
    var isChecked = checkboxState[train["Train No."]];
    platformCheckbox.checked = isChecked || false;
  }
}

// Function to add an event listener to the combo box of a specific train entry
function addComboChangeListener(train) {
  var languageSelect = document.getElementById("languageSelect_" + train["Train No."]);
  var platformSelect = document.getElementById("platformSelect_" + train["Train No."]);
  var statusSelect = document.getElementById("statusSelect_" + train["Train No."]);

  if (languageSelect) {
    languageSelect.addEventListener("change", function () {
      saveComboState(train);
    });
  }

  if (platformSelect) {
    platformSelect.addEventListener("change", function () {
      saveComboState(train);
    });
  }

  if (statusSelect) {
    statusSelect.addEventListener("change", function () {
      saveComboState(train);
    });
  }
}

// Function to add an event listener to the checkbox of a specific train entry
function addCheckboxChangeListener(train) {
  var platformCheckbox = document.getElementById("platformCheckbox_" + train["Train No."]);
  if (platformCheckbox) {
    platformCheckbox.addEventListener("change", function () {
      saveCheckboxState(train);
    });
  }
}

// Function to refresh the data and update announcements
function refreshData() {
  // Clear the current announcements
  announcementContainer.innerHTML = "";
  selectedRowsContainer.innerHTML = "";

  // Fetch new announcement data and create announcements for the current time range
  fetchAnnouncementData();
}

// Function to update the clock with the current system time
function updateClock() {
  var currentDate = new Date();
  var hours = currentDate.getHours().toString().padStart(2, "0");
  var minutes = currentDate.getMinutes().toString().padStart(2, "0");
  var seconds = currentDate.getSeconds().toString().padStart(2, "0");
  var currentTimeString = hours + ":" + minutes + ":" + seconds;

  var clockContainer = document.getElementById("clockContainer");
  clockContainer.textContent = "System Time: " + currentTimeString;
}

// Main entry point when the page loads
document.addEventListener("DOMContentLoaded", function () {
  announcementContainer = document.getElementById("announcementContainer");
  selectedRowsContainer = document.getElementById("selectedRowsContainer");
  // Update the clock every second
  setInterval(updateClock, 1000);
  playButton = document.getElementById("playButton");
  fromTimeInput = document.getElementById("fromTimeInput");
  toTimeInput = document.getElementById("toTimeInput");
  loadGridButton = document.getElementById("loadGridButton");
  isPlaying = false;
  audioQueue = [];
  audioElement = null;

  fetchAnnouncementData();

  // Call the refreshData function every 10 seconds
  refreshIntervalId = setInterval(refreshData, 10000);
  loadGridButton.addEventListener("click", loadGridData);
  playButton.addEventListener("click", togglePlay);
});