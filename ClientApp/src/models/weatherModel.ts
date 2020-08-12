export type WeatherModel = {
    id: number;
    main: string;
    description: string;
}
export type Indicators = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export type OwmResponse = {
    weather: WeatherModel[];
    main: Indicators;
    name: string;
    cod: string;
}