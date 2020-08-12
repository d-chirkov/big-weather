import React, {useState} from "react";
import { HomeView } from "./Home.view";
import {getWeather} from "../../clients/owmClient";
import {useEffectAsync} from "../../common/useEffectAsync";
import {OwmResponse} from "../../models/weatherModel";

type HomeState = { /* your states */ };

export type HomeProps = HomeState;

export const Home: React.FC<HomeProps> = (props) => {
	const [weather, setWeather] = useState<OwmResponse>(null);
	const [city, setCity] = useState("");
	const [error, setError] = useState(null);
	const getWeatherWithCity = async (cityName: string) => {
		try {
			const weather = await getWeather(cityName);
			const noData = !weather || weather.cod === "404";
			setCity(noData ? "Город на найден" : weather.name);
			setError(null);
			setWeather(weather);
		} catch (e) {
			setError("Не удалось получить данные с сервиса погоды");
		}
	}
	const updateCity = async () => {
		await getWeatherWithCity(city);
	}
	useEffectAsync(async () => {
		await getWeatherWithCity("Москва");
	}, [null])
	return <HomeView weather={weather} city={city} setCity={setCity} updateCity={updateCity} error={error}/>
}
