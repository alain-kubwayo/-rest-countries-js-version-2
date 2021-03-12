// add click event to filter to show the dropdown to show the menu
const dropdown = document.getElementById('dropdown');
const menu = document.getElementById('menu');

dropdown.addEventListener('click', () => {
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
});

// Grab the search element 
const searchField = document.getElementById('search');

// Grab all li's to add click event to them
const regions = document.querySelectorAll('li');

// To-Do List: API call, display countries, search countries and filter by region

// Get info from the api with async function

// Get countriesContainer to hold all countries
let countriesContainer = document.getElementById('countries-container');

getCountries();

async function getCountries() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const countriesData = await response.json();
    // console.log(countriesData);
    displayAllCountries(countriesData);
}

function displayAllCountries(someCountriesData) {
    countriesContainer.innerHTML = '';
    someCountriesData.forEach(someCountry => {
        let countryDiv = document.createElement('div');
        countryDiv.classList.add('w-full', 'bg-white', 'shadow-md', 'rounded-md', 'overflow-hidden', 'mb-4', 'md:mb-0', 'overflow-scroll');
        let countryFlag = document.createElement('img');
        countryFlag.classList.add('md:h-40', 'w-full')
        countryFlag.src = `${someCountry.flag}`;
        countryFlag.alt = `Flag of ${someCountry.name}`;

        let countryName = document.createElement('p');
        countryName.classList.add('uppercase', 'font-bold', 'italic', 'country-name')
        countryName.innerHTML = `${someCountry.name}`;

        let capitalName = document.createElement('p');
        capitalName.innerHTML = `<strong>Capital: </strong> ${someCountry.capital}`;

        let currencies = document.createElement('p');
        let allCurrencies = someCountry.currencies.filter(currency => currency.name).map(currency => `${currency.name} (${currency.code})`).join(', ');
        currencies.innerHTML = `<strong>Currencies: </strong> ${allCurrencies}`;

        let population = document.createElement('p');
        population.innerHTML = `<strong>Population: </strong> ${someCountry.population}`;

        let region = document.createElement('p');
        region.classList.add('country-region');
        region.innerHTML = `<strong>Region: </strong> ${someCountry.region}`;

        let subregion = document.createElement('p');
        subregion.innerHTML = `<strong>Subregion: </strong> ${someCountry.subregion}`;

        let languages = document.createElement('p');
        let allLanguages = someCountry.languages.map(language => language.name).join(', ');
        languages.innerHTML = `<strong>Languages: </strong> ${allLanguages}`;

        countryDiv.appendChild(countryFlag);
        countryDiv.appendChild(countryName);
        countryDiv.appendChild(capitalName);
        countryDiv.appendChild(currencies);
        countryDiv.appendChild(population);
        countryDiv.appendChild(region);
        countryDiv.appendChild(subregion);
        countryDiv.appendChild(languages);
        countriesContainer.appendChild(countryDiv);
    });
}

// Search
searchField.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    // const { value } = e.target;

    // Add class to p holding country name and select all paragraphs to get country names to compare with inputValue
    const countryName = document.querySelectorAll('.country-name');
    countryName.forEach(name => {
        if (name.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
            name.parentElement.style.display = 'block';
        } else {
            name.parentElement.style.display = 'none';
        }
    });
})

// Filter by region

// Add class of country-region to p holding country region
regions.forEach(liRegion => {
    liRegion.addEventListener('click', () => {
        const selectedRegion = liRegion.innerText;
        // Grab the paragraph with country-region class
        const countryRegion = document.querySelectorAll('.country-region');
        // console.log(region.innerText);
        countryRegion.forEach(region => {
            if (region.innerText.toLowerCase().includes(selectedRegion.toLowerCase())) {
                region.parentElement.style.display = 'block';
            } else {
                region.parentElement.style.display = 'none';
            }
        });
    });
})







