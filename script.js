let originalData = [];
let grid;

fetch('racquets.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        originalData = data; // Save the original data
        populateFilters(data); // Populate filter dropdowns
        renderTable(data); // Render the table
    })
    .catch(error => console.error('Error loading data:', error));

// Function to populate filter dropdowns
function populateFilters(data) {
    const filters = [
        { id: 'brand-filter', field: 'brand' },
        { id: 'level-filter', field: 'level' },
        { id: 'game-type-filter', field: 'gameType' },
        { id: 'racquet-type-filter', field: 'racquetType' },
        { id: 'material-filter', field: 'material' }
    ];

    filters.forEach(filter => {
        const dropdown = document.getElementById(filter.id);
        if (dropdown) {
            const uniqueValues = Array.from(new Set(data.map(item => item[filter.field]))).sort();
            dropdown.innerHTML = `<option value="all">All</option>` + uniqueValues.map(value => `<option value="${value}">${value}</option>`).join('');
            dropdown.addEventListener('change', applyFilters);
        } else {
            console.error(`Dropdown with ID ${filter.id} not found.`);
        }
    });
}

// Function to apply filters and re-render the table
function applyFilters() {
    const brand = document.getElementById('brand-filter').value;
    const level = docume
