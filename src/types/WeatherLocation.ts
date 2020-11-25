export default interface WeatherLocation {
  id: number;
  city: string;
  country: string;
  temperature: number;
  weatherIcon: string;
  isVisibleBy: {
    country: boolean;
    tempRange: boolean;
  };
}
