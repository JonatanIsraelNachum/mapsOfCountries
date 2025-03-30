export class Country {
    constructor(name, capital, population, flags, latlng, languages, borders, area, region, subregion, currencies) {
        this.name = name;
        this.capital = capital;
        this.population = population;
        this.flags = flags;
        this.latlng = latlng;
        this.languages = languages;
        this.borders = borders;
        this.area = area;
        this.region = region;
        this.subregion = subregion;
        this.currencies = currencies;
    }
    render(neighborNames) {
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

    }
}
