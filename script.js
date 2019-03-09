'use strict';

const apiKey = 'nYkZc0p0KAqINI21A0ljEgLqxm0VyXOJLDnAzLaO';
const npsURL = 'https://developer.nps.gov/api/v1/parks'


/*const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };*/

function formatQuery(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParkResults(states, maxResults) {
    const params = {
        stateCode: states,
        limit: maxResults,
        api_key: apiKey
    }

    const formatedSearchQuery = formatQuery(params);
    const searchURL = npsURL + '?' + formatedSearchQuery;

    console.log(searchURL);

    fetch(searchURL)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

function displayResults(responseJson) {
    $('.results-list').empty();
    
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.results-list').append(
            `<div>
            <p class='name'>${responseJson.data[i].fullName}</p>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">Link</a>
            </div>`
        );
    }
}



function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const states = $('#states').val();
        const maxResults = $('#max-results').val();
        getParkResults(states, maxResults);        
    });
}



$(watchForm);