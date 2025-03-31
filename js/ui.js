import { getNeighborNames,getCountryData,fetchCountryNames } from "./api.js";
const containerCard = document.querySelector('.container_card')
const countryContainer = document.querySelector('#country-container');
const mapContainer = document.querySelector('#map');
const errorContainer = document.querySelector('#error');
const dataList = document.querySelector('#countries-list');
const spinner = document.querySelector("#spinner");
let map;
// הצגת הודעת שגיאה
function showError(message) {
    errorContainer.innerText = message;
    errorContainer.style.display = 'block';
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 3000);
}
// הצגת מדינה בדף עם אנימציה
const displayCountry = async (country, showMap = true) => {
    if (!country) return;
    displaySpinner(true)
    const { name, capital, population, flags, latlng, languages, borders, area, region, subregion, currencies } = country;
    const neighborNames = await getNeighborNames(borders);

    const countryCard = document.createElement('div');
    countryCard.classList.add('country-card');
    countryCard.innerHTML = `
        <h2>${name.common}</h2>
        <img src="${flags.png}" alt="Flag of ${name.common}" width="150">
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population.toLocaleString()}</p>
        <p><strong>Area:</strong> ${area.toLocaleString()} km²</p>
        <p><strong>Region:</strong> ${region} - ${subregion}</p>
        <p><strong>Currency:</strong> ${Object.values(currencies).map(c => c.name).join(', ')}</p>
        <p><strong>Language:</strong> ${Object.values(languages).join(', ')}</p>
        <p><strong>Neighbors:</strong> ${neighborNames.length ? neighborNames.map(n => `<button class='neighbor-btn' data-country='${n}'>${n}</button>`).join(', ') : 'None'}</p>
    `;
    // הצגת אנימציה
    countryCard.style.opacity = '0';
    countryCard.style.transform = 'scale(0.9)';
    setTimeout(() => {
        countryCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        countryCard.style.opacity = '1';
        countryCard.style.transform = 'scale(1)';
    }, 100);
    // הוספת האזנה לכפתורים של השכנים (באמצעות Event Delegation)
    countryContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('neighbor-btn')) {
            const countryName = event.target.getAttribute('data-country');
            const neighborCountry = await getCountryData(countryName);
            displayCountry(neighborCountry);  // הצגת כרטיס המדינה השכנה
        }
    });
    // אם נדרש, הצגת המפה
    if (showMap) {
        displayMap(latlng, name.common);
    }

    countryContainer.innerHTML = '';
    displaySpinner(false)
    countryContainer.appendChild(countryCard);
}
// הצגת המפה
const displayMap = ([lat, lon], countryName = "") => {
    if (map) map.remove();
    map = L.map('map', {
        center: [lat, lon],
        zoom: 7,
        scrollWheelZoom: false // מונע גלילה אוטומטית
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<b>${countryName}</b>`)
        .openPopup();
}
const displaySpinner = (display)=>{
if (display) {
    spinner.style.display = "flex";
    mapContainer.style.display = "none";
    containerCard.style.display = "none"
}else{
    spinner.style.display = "none";
    containerCard.style.display = "block";
    mapContainer.style.display = "block";
    map.invalidateSize();
}
}
//הצגת רשימת חיפוש
const populateDatalist = async (query) => {
    const countryNames = await fetchCountryNames();
    dataList.innerHTML = ''; // ניקוי רשימה קודמת
if (query != "") {   
    countryNames
    .filter(name => name.toLowerCase().startsWith(query.toLowerCase())) // מסנן רק התאמות שמתחילות באותיות שהוקלדו
    .forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        dataList.appendChild(option);
    });
}
}
export { displayCountry, showError ,populateDatalist};
