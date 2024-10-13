document.getElementById('searchQuerySubmit').addEventListener('click', function() {
    const query = document.getElementById('searchQueryInput').value.toLowerCase();

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const results = data.filter(item => item.name.toLowerCase().includes(query));
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayResults(results) {
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
    } else {
        results.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('result-item');
            
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <h2>${item.name}</h2>
                <p>${item.price}</p>
            `;
            
            resultsContainer.appendChild(itemDiv);
        });
    }

    // Clear previous results
    const existingResults = document.querySelector('.results');
    if (existingResults) {
        existingResults.remove();
    }

    document.body.appendChild(resultsContainer);
}
