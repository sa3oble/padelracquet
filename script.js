fetch('racquets.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data loaded successfully:', data);
        new gridjs.Grid({
            columns: [
                "Name",
                {
                    name: "Photo",
                    formatter: (cell) =>
                        gridjs.html(`<img src="${cell}" alt="Racquet Image" style="max-width:50px; height:auto;">`)
                },
                "Brand",
                "Level",
                "Game Type",
                "Weight",
                "Balance",
                {
                    name: "Reviews",
                    formatter: (cell) => `${cell} ⭐`
                },
                {
                    name: "Shop",
                    formatter: (cell) =>
                        gridjs.html(`<a href="${cell}" target="_blank">Buy Now</a>`)
                }
            ],
            data: data.map(item => [
                item.name,
                item.photo,
                item.brand,
                item.level,
                item.gameType,
                item.weight,
                item.balance,
                item.reviews,
                item.shop
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
