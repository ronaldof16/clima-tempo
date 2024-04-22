const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const APP_KEY = import.meta.env.VITE_KEY_OPEN_WATHER_MAP

const fetchWeatherFromCity = async (cityName) => {
    const resposta = await fetch(`${BASE_URL}?q=${cityName}&units=metric&lang=pt_br&appid=${APP_KEY}`);
    const resJson = await resposta.json();
    if (resJson.cod === "404") {
        throw Error("Cidade não encontrada, digite novamente!");
    }
    return resJson;
}

export {
    fetchWeatherFromCity
}