const baseURL = 'https://restcountries.com/v3.1';

// שליפת נתונים מה-API
async function getCountryData(countryName) {
    try {
        const res = await fetch(`${baseURL}/name/${countryName}?fullText=true`);
        if (!res.ok) throw new Error('Country not found');
        const data = await res.json();
        return data[0];
    } catch (error) {
        showError(error.message);
        return null;
    }
}

// שליפת מדינות שכנות
async function getNeighborNames(borders) {
    if (!borders) return [];
    const promises = borders.map(code => fetch(`${baseURL}/alpha/${code}`).then(res => res.json()));
    const results = await Promise.all(promises);
    return results.map(data => data[0].name.common);
}

// חיפוש מדינה
async function searchCountries(query) {  
    const countries = await fetch(`${baseURL}/name/${query}?fullText=true`)
        .then(res => res.json())
        .catch(() => []);
    return countries;
}

// שליפת שמות המדינות מה-API
async function fetchCountryNames() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const countries = await res.json();
        return countries.map(country => country.name.common);
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}

export { getCountryData, getNeighborNames, searchCountries,fetchCountryNames };
