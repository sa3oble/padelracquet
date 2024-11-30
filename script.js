let originalData = [];

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

// Populate filters dynamically
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
        const uniqueValues = Array.from(new Set(data.map(item => item[filter.field])));
        dropdown.innerHTML = `<option value="all">All</option>` + uniqueValues.map(value => `<option value="${value}">${value}</option>`).join('');
        dropdown.addEventListener('change', applyFilters);
    });
}

// Apply filters and render the filtered table
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

// Render the Grid.js table
function renderTable(data) {
    document.getElementById('grid-table').innerHTML = ''; // Clear previous table
    new gridjs.Grid({
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
        data: data.map(item => [
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
        ]),
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

