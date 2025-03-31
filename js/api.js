const baseURL = 'https://restcountries.com/v3.1';

// שליפת נתונים מה-API
const getCountryData = async (countryName)=> {
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
const getNeighborNames = async (borders) => {
    if (!borders) return [];
    const promises = borders.map(code => fetch(`${baseURL}/alpha/${code}`).then(res => res.json()));
    const results = await Promise.all(promises);
    return results.map(data => data[0].name.common);
}
// חיפוש מדינה
const searchCountries = async (query) => {  
    const countries = await fetch(`${baseURL}/name/${query}?fullText=true`)
        .then(res => res.json())
        .catch(() => []);
    return countries;
}
// שליפת שמות המדינות מה-API
const fetchCountryNames = async () => {
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
