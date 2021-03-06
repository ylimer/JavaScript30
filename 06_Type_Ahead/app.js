{
    const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
    const cities = [];

    fetch(endpoint) // returns a promise
        .then(blob => blob.json()) // blob.json returns another promise
        .then(data => cities.push(...data)) // spread appends elements from iterable

    function findMatches(wordToMatch, cities) {
        return cities.filter(place => {
            // figure out if the city or state matches what was searched
            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex) || place.state.match(regex);
        });
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function displayMatches() {
        const matchedArray = findMatches(this.value, cities);
        const html = matchedArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            // highlight the searched portion
            const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
            const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

            return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${numberWithCommas(place.population)}</span>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html;    
    }


    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    searchInput.addEventListener('change', displayMatches); 
    searchInput.addEventListener('keyup', displayMatches); 
}

/*
fetch: 
- interface for fetching resources
- returns a promise

const prom = fetch(endpoint);

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
*/
