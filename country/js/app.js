import { getCountryData, searchCountries } from "./api.js";
import { showError, displayCountry,populateDatalist } from "./ui.js";
const defaultCountries = ['Israel', 'United States', 'Thailand', 'France', 'Germany'];
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#search-btn');

// הצגת מדינות ברירת מחדל
const showDefaultCards = async () => {
    document.querySelector("#map").style.display = "none";
    const countries = await Promise.all(defaultCountries.map(country => getCountryData(country)));
    const validCountries = countries.filter(country => country !== null);
    displayCountries(validCountries, false);  // הצגת רק כרטיסים בלי המפה
};

// חיפוש מדינה
searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query === '') return showError('Please enter a country name');

    const countries = await searchCountries(query);
    if (countries.length > 0) {
        displayCountry(countries[0], true);  // הצגת כרטיסים בלבד
    } else {
        showError('No countries found');
    }
});

// הצגת רשימה של כרטיסים למדינות
function displayCountries(countries, showMap = false) {
    const countryContainer = document.querySelector('#country-container');
    countryContainer.innerHTML = ''; // ניקוי תצוגה לפני הצגת מדינות חדשות
    document.querySelector("#spinner").style.display = "none"
    countries.slice(0, 5).forEach(country => {
        const { name, flags } = country;
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <h2>${name.common}</h2>
            <img src="${flags.png}" alt="Flag of ${name.common}" width="150">
        `;

        countryCard.addEventListener('click', () => {
            displayCountry(country, true);  // הצגת המפה עם כרטיס המדינה
        });

        countryContainer.appendChild(countryCard);
    });
}

document.getElementById('home-btn').addEventListener('click', showDefaultCards);
document.getElementById('israel-btn').addEventListener('click', async () => {
    const country = await getCountryData('Israel');
    displayCountry(country);
});
document.getElementById('usa-btn').addEventListener('click', async () => {
    const country = await getCountryData('United States');
    displayCountry(country);
});
document.getElementById('thailand-btn').addEventListener('click', async () => {
    const country = await getCountryData('Thailand');
    displayCountry(country);
});
document.getElementById('france-btn').addEventListener('click', async () => {
    const country = await getCountryData('France');
    displayCountry(country);
});
document.getElementById('germany-btn').addEventListener('click', async () => {
    const country = await getCountryData('Germany');
    displayCountry(country);
});

// הצגת מדינות ברירת מחדל
window.onload = async () => {
    showDefaultCards();
    // האזנה להקלדה באינפוט ועדכון ההשלמות בזמן אמת
    searchInput.addEventListener('input', (e) => {
        populateDatalist(e.target.value);
    });
};

