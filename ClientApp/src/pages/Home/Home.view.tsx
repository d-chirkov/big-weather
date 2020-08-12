import styles from "./Home.style.css";

import React from "react";
import {OwmResponse} from "../../models/weatherModel";

type HomeViewProps = {
	weather: OwmResponse;
	city: string;
	setCity: (string) => void;
	updateCity: () => void;
	error: string;
}

const getWeatherIcon = (main: string) => {
	return styles.weatherIcon + " " + getSpecWeatherIcon(main);
}

const getSpecWeatherIcon = (main: string) => {
	switch (main) {
		case "Clouds":
			return styles.clouds;
		case "Clear":
			return styles.clear;
		case "Snow":
			return styles.snow;
		case "Rain":
			return styles.rain;
		case "Drizzle":
			return styles.rain;
		case "Thunderstorm":
			return styles.rain;
		default:
			return styles.clear;
	}
}

const getAdvise = (main: string, temp: number) => {
	switch (main) {
		case "Clouds":
			return temp < 0 ? "Лучше надеть куртку потеплее" :
				temp >= 0 && temp < 20 ? "Можно надеть ветровку" :
					"Можно надеть легку одежду";
		case "Clear":
			return temp < 0 ? "Лучше надеть куртку потеплее" :
				temp >= 0 && temp < 20 ? "Можно надеть толстовку" :
					"Лучше надеть шорты и майку";
		case "Snow":
			return temp < 0 ? "Одеваем теплую зимнюю одежду" : "Скоро будет мокро, поэтому лучше надеть непромокаемую обувь";
		case "Rain":
			return temp < 0 ? "На улице лучше вообще не выходить" :
				temp >= 0 && temp < 20 ? "Берем зонтик и одеваемся потеплее" :
					"Зонтик бы не помешал";
		case "Drizzle":
			return temp < 0 ? "На улице лучше вообще не выходить" :
				temp >= 0 && temp < 20 ? "Берем зонтик и одеваемся потеплее" :
					"Зонтик бы не помешал";
		case "Thunderstorm":
			return "На улице не спокойно, сидим дома";
		default:
			return "Здесь могла быть Ваша реклама";
	}
}

export const HomeView: React.FC<HomeViewProps> = (props) => {
	if (props.error) {
		return (<div className={styles.container}>
			<p className={styles.message}>
				{props.error}
			</p>
		</div>);
	}
	if (props.weather === null) {
		return <div className={styles.container}>
			<p className={styles.message}>
				Загрузка
			</p>
		</div>
	}

	const r = props.weather;
	const noData = !r || r.cod === "404";
	const temp = noData ? null : Math.trunc(r.main.temp - 273.15);
	console.log(noData);

	return (
		<div className={styles.container}>
            <div className={styles.left}>
				<div className={styles.temperatureCtr}>
					<div className={styles.temperature}>
						{temp ?? ""}
						<div className={styles.celsius + (noData ? (" " + styles.hidden) : "")} />
					</div>
				</div>
				<div className={styles.advise}>
					<div className={styles.adviseIcon}/>
					<p className={styles.adviseText}>{noData ? "Тут могла быть ваша реклама" : getAdvise(r.weather[0].main, temp)}</p>
				</div>
			</div>
			<div className={styles.right}>
				<div className={getWeatherIcon(noData ? null : r.weather[0].main)}/>
				<p className={styles.description}>{noData ? "" : r.weather[0].description}</p>
				<div className={styles.city} />
				<input className={styles.cityName} onChange={e => props.setCity(e.currentTarget.value)} value={props.city} onKeyUp={(e) => {
					if (e.keyCode === 13) {
						e.preventDefault();
						props.updateCity();
					}
				}} />
			</div>
		</div>
	);
}
