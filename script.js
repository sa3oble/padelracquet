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
    const level = document.getElementById('level-filter').value;
    const gameType = document.getElementById('game-type-filter').value;
    const racquetType = document.getElementById('racquet-type-filter').value;
    const material = document.getElementById('material-filter').value;

    const filteredData = originalData.filter(item => {
        return (brand === 'all' || item.brand === brand) &&
               (level === 'all' || item.level === level) &&
               (gameType === 'all' || item.gameType === gameType) &&
               (racquetType === 'all' || item.racquetType === racquetType) &&
               (material === 'all' || item.material === material);
    });

    renderTable(filteredData);
}

// Function to render or update the Grid.js table
function renderTable(data) {
    if (grid) {
        // Update the existing grid
        grid.updateConfig({
            data: data.map(item => formatRow(item))
        }).forceRender();
    } else {
        // Create the grid for the first time
        grid = new gridjs.Grid({
            columns: [
                "Name",
                {
                    name: "Photo",
                    formatter: (cell) =>
                        gridjs.html(`<img src="${cell}" alt="Racquet Image" style="max-width:50px; height:auto;">`)
                },
                "Brand",
                "Playing Level",
                "Type of Game",
                "Type of Racquet",
                "Weight",
                "Type of Foam",
                "Material",
                "Balance",
                "Surface Type",
                {
                    name: "Shop",
                    formatter: (cell) =>
                        gridjs.html(`<a href="${cell}" target="_blank">Buy Now</a>`)
                },
                "Color",
                {
                    name: "Reviews",
                    formatter: (cell) => `${cell} ⭐`
                }
            ],
            data: data.map(item => formatRow(item)),
            search: true,
            sort: true,
            pagination: {
                enabled: true,
                limit: 5
            },
            style: {
                th: {
                    'background-color': '#4CAF50',
                    color: '#fff',
                    'text-align': 'center'
                },
                td: {
                    'text-align': 'center'
                }
            }
        }).render(document.getElementById('grid-table'));
    }
}

// Helper function to format data rows for the table
function formatRow(item) {
    return [
        item.name,
        item.photo,
        item.brand,
        item.level,
        item.gameType,
        item.racquetType,
        item.weight,
        item.foam,
        item.material,
        item.balance,
        item.surfaceType,
        item.shop,
        item.color,
        item.reviews
    ];
}
