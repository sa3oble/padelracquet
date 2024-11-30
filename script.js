let originalData = [];
let grid;

// Fields to filter by
const filterFields = [
    { id: 'brand', label: 'Brand' },
    { id: 'level', label: 'Playing Level' },
    { id: 'gameType', label: 'Type of Game' },
    { id: 'racquetType', label: 'Type of Racquet' },
    { id: 'weight', label: 'Weight' },
    { id: 'foam', label: 'Type of Foam' },
    { id: 'material', label: 'Material' },
    { id: 'balance', label: 'Balance' },
    { id: 'surfaceType', label: 'Surface Type' },
    { id: 'color', label: 'Color' }
];

// Fetch JSON data and initialize the app
fetch('racquets.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        originalData = data; // Save the original data
        createFilters(data); // Create dropdown filters
        renderTable(data); // Render the initial table
    })
    .catch(error => console.error('Error loading data:', error));

// Function to create dropdown filters dynamically
function createFilters(data) {
    const filtersContainer = document.getElementById('filters');

    filterFields.forEach(field => {
        // Get unique values for this field
        const uniqueValues = Array.from(new Set(data.map(item => item[field.id]))).sort();

        // Create label and select elements
        const label = document.createElement('label');
        label.textContent = `${field.label}:`;

        const select = document.createElement('select');
        select.id = `${field.id}-filter`;
        select.innerHTML = `<option value="all">All</option>` + 
            uniqueValues.map(value => `<option value="${value}">${value}</option>`).join('');
        
        // Attach change event to filter data
        select.addEventListener('change', applyFilters);

        // Append label and select to filters container
        filtersContainer.appendChild(label);
        filtersContainer.appendChild(select);
    });
}

// Function to filter data and re-render the table
function applyFilters() {
    // Get the selected values from all dropdowns
    const filters = filterFields.reduce((acc, field) => {
        const value = document.getElementById(`${field.id}-filter`).value;
        acc[field.id] = value === 'all' ? null : value; // Use `null` for "All"
        return acc;
    }, {});

    // Filter the original data based on selected values
    const filteredData = originalData.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            return value === null || item[key] === value;
        });
    });

    // Re-render the table with filtered data
    renderTable(filteredData);
}

// Function to render or update the Grid.js table
function renderTable(data) {
    if (grid) {
        // Update the table with new data
        grid.updateConfig({
            data: data.map(item => formatRow(item))
        }).forceRender();
    } else {
        // Create the table for the first time
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
