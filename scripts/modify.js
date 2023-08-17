const trainList = document.getElementById('trainList');
const addButton = document.getElementById('addButton');
const saveAllButton = document.getElementById('saveAllButton'); // Added saveAllButton
const editModal = document.getElementById('editModal');
const editTextarea = document.getElementById('editTextarea');
const saveButton = document.getElementById('saveButton');
const closeSpan = document.getElementsByClassName('close')[0];

let selectedIndex = -1;

function renderData(data) {
    trainList.innerHTML = '';
    data.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <div class="entry-serial">${index + 1}</div>
            <div class="train-info">
                <strong>Train No.:</strong> ${entry["Train No."]} |
                <strong>Train Name:</strong> ${entry["Train Name"]} |
                <strong>Time:</strong> ${entry["Time"]} |
                <strong>Schedule:</strong> ${entry["Schedule"]}
            </div>
            <div class="entry-actions">
                <button onclick="openEditModal(${index})">Edit</button>
                <button onclick="removeEntry(${index})">Remove</button>
            </div>
        `;
        trainList.appendChild(entryDiv);
    });
}

function openEditModal(index) {
    selectedIndex = index;
    if (index !== -1) {
        editTextarea.value = JSON.stringify(data[index], null, 2);
    } else {
        editTextarea.value = ''; // Clear any previous content
        editTextarea.placeholder = 'Add your JSON data here...'; // Set the placeholder text
    }
    editModal.style.display = 'block';
}

function closeEditModal() {
    editModal.style.display = 'none';
    editTextarea.value = '';
    selectedIndex = -1;
}

function saveEntry() {
    if (selectedIndex !== -1) {
        const newData = JSON.parse(editTextarea.value);
        data[selectedIndex] = newData;
    } else {
        const newData = JSON.parse(editTextarea.value);
        data.push(newData);
    }
    renderData(data);
    closeEditModal();
}

function saveAllData() {
    const jsonData = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'data.js';
    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

function removeEntry(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        renderData(data);
    }
}

addButton.addEventListener('click', () => {
    openEditModal(-1);
});

saveButton.addEventListener('click', saveEntry);
saveAllButton.addEventListener('click', saveAllData); // Added saveAllButton event listener
closeSpan.addEventListener('click', closeEditModal);

renderData(data);