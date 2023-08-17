document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("playButton");
    const operationTypeSelect = document.getElementById("operationType");
    const lineCheckboxes = document.getElementById("lineCheckboxes");
    const playCounterInput = document.getElementById("playCounterInput");
    const languageSelect = document.getElementById("languageSelect");

    const audioPaths = {
        Through: {
            English: {
                starting: "../audio_data/en/miscellaneous/through.mp3",
                ending: "../audio_data/en/miscellaneous/ending.mp3"
            },
            Hindi: {
                starting: "../audio_data/hi/miscellaneous/starting.mp3",
                ending: "../audio_data/hi/miscellaneous/through.mp3"
            },
            Bengali: {
                starting: "../audio_data/bn/miscellaneous/starting.mp3",
                ending: "../audio_data/bn/miscellaneous/through.mp3"
            }
        },
        Arrival: {
            English: {
                starting: "../audio_data/en/miscellaneous/arrival.mp3",
                ending: "../audio_data/en/miscellaneous/ending.mp3"
            },
            Hindi: {
                starting: "../audio_data/hi/miscellaneous/starting.mp3",
                ending: "../audio_data/hi/miscellaneous/arrival.mp3"
            },
            Bengali: {
                starting: "../audio_data/bn/miscellaneous/starting.mp3",
                ending: "../audio_data/bn/miscellaneous/arrival.mp3"
            }
        },
        Departure: {
            English: {
                starting: "../audio_data/en/miscellaneous/departure.mp3",
                ending: "../audio_data/en/miscellaneous/ending.mp3"
            },
            Hindi: {
                starting: "../audio_data/hi/miscellaneous/starting.mp3",
                ending: "../audio_data/hi/miscellaneous/departure.mp3"
            },
            Bengali: {
                starting: "../audio_data/bn/miscellaneous/starting.mp3",
                ending: "../audio_data/bn/miscellaneous/departure.mp3"
            }
        },
        Movement: {
            English: {
                starting: "../audio_data/en/miscellaneous/movement.mp3",
                ending: "../audio_data/en/miscellaneous/ending.mp3"
            },
            Hindi: {
                starting: "../audio_data/hi/miscellaneous/starting.mp3",
                ending: "../audio_data/hi/miscellaneous/movement.mp3"
            },
            Bengali: {
                starting: "../audio_data/bn/miscellaneous/starting.mp3",
                ending: "../audio_data/bn/miscellaneous/movement.mp3"
            }
        }
    };

    let isPlaying = false;
    let audioQueue = [];
    let originalAudioQueue = [];

    function updateLineCheckboxes() {
        lineCheckboxes.innerHTML = "";
        const selectedOperation = operationTypeSelect.value;
        const selectedLanguage = languageSelect.value;
        const lineCount = 6;

        for (let lineNumber = 1; lineNumber <= lineCount; lineNumber++) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = lineNumber;
            checkbox.id = `lineCheckbox${lineNumber}`;
            checkbox.classList.add("line-checkbox");

            const label = document.createElement("label");
            label.htmlFor = `lineCheckbox${lineNumber}`;
            label.innerText = `Line ${lineNumber}`;

            lineCheckboxes.appendChild(checkbox);
            lineCheckboxes.appendChild(label);
        }
    }

    updateLineCheckboxes();

    operationTypeSelect.addEventListener("change", function () {
        updateLineCheckboxes();
    });

    playButton.addEventListener("click", function () {
        if (isPlaying) {
            isPlaying = false;
            playButton.textContent = "Play";
            stopAudio();
        } else {
            const selectedOperation = operationTypeSelect.value;
            const selectedLineNumbers = getSelectedLineNumbers();

            if (selectedLineNumbers.length === 0) {
                alert("Please select line number(s).");
                return;
            }

            const selectedLanguage = languageSelect.value;
            const playCounterValue = parseInt(playCounterInput.value);

            isPlaying = true;
            playButton.textContent = "Stop";
            prepareAudioQueue(selectedOperation, selectedLanguage, selectedLineNumbers);
            originalAudioQueue = [...audioQueue];
            playAudio(playCounterValue);
        }
    });

    function getSelectedLineNumbers() {
        const checkboxes = document.querySelectorAll(".line-checkbox:checked");
        const selectedLineNumbers = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));
        return selectedLineNumbers;
    }

    function prepareAudioQueue(selectedOperation, selectedLanguage, selectedLineNumbers) {
        audioQueue = [];

        const languageCode = {
            English: "en",
            Hindi: "hi",
            Bengali: "bn"
        };

        const allLanguages = ["English", "Hindi", "Bengali"];
        const languagesToProcess = (selectedLanguage === "All") ? allLanguages : [selectedLanguage];

        selectedLineNumbers.forEach(lineNumber => {
			audioQueue.push(new Audio(`../audio_data/alert.mp3`));
			
            languagesToProcess.forEach(language => {
                const operationPaths = audioPaths[selectedOperation][language];
                const startingPath = operationPaths.starting;
                const endingPath = operationPaths.ending;

                audioQueue.push(new Audio(startingPath));
                audioQueue.push(new Audio(`../audio_data/${languageCode[language]}/numbers/${lineNumber}.mp3`));
                audioQueue.push(new Audio(endingPath));
            });
        });
    }

    function playAudio(playCounterValue) {
        const playAudioIteration = () => {
            if (audioQueue.length > 0) {
                const audio = audioQueue.shift();
                audio.addEventListener("ended", playAudioIteration);
                audio.play();
            } else {
                playCounterValue--;

                if (playCounterValue > 0) {
                    audioQueue = originalAudioQueue.slice();
                    playAudioIteration();
                } else {
                    isPlaying = false;
                    playButton.textContent = "Play";
                }
            }
        };

        playAudioIteration();
    }

    function stopAudio() {
        const allAudios = document.querySelectorAll("audio");
        allAudios.forEach(audio => audio.pause());
        audioQueue = [];
    }
});