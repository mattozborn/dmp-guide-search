// script.js
// matt ozborn 2024.09.01

// set up form submission event listener--run the following code when form is submitted
document.getElementById('form1').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from submitting

    // create our query from the text input
    let query = document.getElementById('input').value;
    console.log('Input query:', query);

    // check that we have valid input
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    // fetch results data from the query
    fetchResults(query);
});

// function to fetch results
async function fetchResults(query) {
    // assign the DOM elements to variables
    const spinner = document.getElementById('spinner');
    const rc = document.getElementById('results');

    // clear any previous results and show the spinner
    document.getElementById('input').value = '';
    rc.innerHTML = '';
    spinner.classList.remove('d-none');
    spinner.classList.add('show');

    // try fetching results from server using query input
    try {

        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (response.ok) {
            const data = await response.json();
            formatResults(data.results);
        } else {
            console.error('Server response status:', response.status);
        }

    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        spinner.classList.remove('show');  // hide spinner after fetching completes
    }
}

// function to format the results and add them to the DOM
function formatResults(results) {
    // create a container within the 'results' div to display the results
    const rc = document.getElementById('results');

    // check that the function has been passed valid results
    if (!Array.isArray(results) || results.length === 0) {
        rc.innerHTML = `<p>No results found.</p>`;
        return;
    }

    // create a column layout for the cards
    const row = document.createElement('div');
    row.classList.add('row', 'g-3');  // mdb grid layout with gutter spacing

    // iterate over each result in the results array
    results.forEach(result => {
        const title = result.title || 'No title available';
        const url = result.url || '#';

        console.log('Title: ', result.title)  // debug: checking title is being parsed correctly
        console.log('URL: ', result.url)  // debug: checking url is being parsed correctly

        // create a column that spans 6-col --results in 2-col layout on >med screens
        const col = document.createElement('div');
        col.classList.add('col-md-6', 'col-sm-12');  // full width on small screens

        // create the card component to add to the DOM
        const card = document.createElement('div');
        card.classList.add('card', 'h-100', 'shadow-5-strong');  // card with full height and heavy shadows

        // set the html that will make up the card component
        card.innerHTML = `
            <div class="card-header d-flex flex-column justify-content-center align-items-center">
                <h6 class="card-title text-center">${title}</h6>
            </div>

            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <div class="d-flex align-items-end">
                    <p class="card-text text-center">
                        <a href="${url}" target="_blank" class="btn custom-card-btn">OPEN</a>
                    </p>
                </div>
            </div>
        `;

        col.appendChild(card);  // append the card to the column
        row.appendChild(col);  // append the column to the row
    });
    rc.appendChild(row);  // append the row to the results container
}
