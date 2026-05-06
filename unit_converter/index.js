// Get elements
const nightToggle = document.getElementById('nightToggle');
const body = document.body;

// Check if user has a saved preference
const savedMode = localStorage.getItem('nightMode');
if (savedMode === 'enabled') {
    body.classList.add('night-mode');
    updateToggleButtonText();
}

// Toggle night mode on button click
nightToggle.addEventListener('click', () => {
    body.classList.toggle('night-mode');
    
    // Save preference
    if (body.classList.contains('night-mode')) {
        localStorage.setItem('nightMode', 'enabled');
    } else {
        localStorage.setItem('nightMode', 'disabled');
    }
    
    updateToggleButtonText();
});

// Update button text based on mode
function updateToggleButtonText() {
    if (body.classList.contains('night-mode')) {
        nightToggle.textContent = '☀️ Day Mode';
    } else {
        nightToggle.textContent = '🌙 Night Mode';
    }
}

// Conversion Logic
const inputEL = document.getElementById('inputEL');
const submitBtn = document.getElementById('submit');
const resultBoxes = document.querySelectorAll('#box p');

submitBtn.addEventListener('click', () => {
    const inputValue = parseFloat(inputEL.value);
    
    if (isNaN(inputValue) || inputValue === '') {
        alert('Please enter a valid number');
        return;
    }
    
    // Conversion factors
    const meterToFeet = inputValue * 3.28084;
    const litersToGallons = inputValue * 0.264172;
    const kilogramsToPounds = inputValue * 2.20462;
    
    // Display results
    resultBoxes[0].textContent = `${inputValue} meters = ${meterToFeet.toFixed(2)} feet`;
    resultBoxes[1].textContent = `${inputValue} liters = ${litersToGallons.toFixed(2)} gallons`;
    resultBoxes[2].textContent = `${inputValue} kilograms = ${kilogramsToPounds.toFixed(2)} pounds`;
});

// Allow Enter key to trigger conversion
inputEL.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitBtn.click();
    }
});
