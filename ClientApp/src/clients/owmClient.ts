import * as config from "./app.config";
import {OwmResponse} from "../models/weatherModel";

let cache = null;

export async function getWeather(city: string) : Promise<OwmResponse> {
    city = city.toLowerCase();
    const cachedCity = localStorage.getItem('weather_city')
    const cachedTime = localStorage.getItem('weather_time')
    const cache = localStorage.getItem('weather_cache')
    const currentDate = new Date()
    const difference = !cachedTime ? null : (currentDate.getTime() - new Date(cachedTime).getTime());
    if (cachedCity !== null && cachedCity === city && cache !== null && difference !== null && difference < 60000)
        return JSON.parse(cache);

    if (!config.apiKey)
        throw "Api key not found in configuration";

    let options = <RequestInit>{
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    };

    return fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=ru&appid=" + config.apiKey, options).then(response => {
        const status = response.status;
        if (status === 200 || status === 404) {
            return response.text().then((_responseText) => {
                let result200: OwmResponse = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText);
                result200 = resultData200 !== undefined ? resultData200 : <OwmResponse>null;
                if (result200) {
                    localStorage.setItem('weather_city', city);
                    localStorage.setItem('weather_time', new Date().toString())
                    localStorage.setItem('weather_cache', _responseText);
                }

                return result200;
            });
        } else if (status !== 200 && status !== 404) {
            return response.text().then((_responseText) => {
                throw "Не удалось подключиться к сервису";
            });
        }
        return Promise.resolve<OwmResponse>(<OwmResponse>null);
    })
}