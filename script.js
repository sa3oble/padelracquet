fetch('racquets.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
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
        }).render(document.getElementById("grid-table"));
    })
    .catch(error => console.error('Error loading data:', error));
