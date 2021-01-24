const BASE_URL = `https://restcountries.eu/rest/v2`;

export default function fetchCountryByName(countryName) {
  return fetch(`${BASE_URL}/name/${countryName}`).then(response => {
    return response.json();
  });
}
