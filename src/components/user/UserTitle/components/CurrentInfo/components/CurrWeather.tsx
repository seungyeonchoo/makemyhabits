import Spinner from '@/public/svgs/icon _spinner.svg';
import useGetLocation from '@/src/lib/hooks/useGetLocation';
import axios from 'axios';
import { useQuery } from 'react-query';

const ICON: { [key: string]: string } = {
  '01d': '🌞',
  '01n': '🌞',
  '02d': '⛅️',
  '02n': '⛅️',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧',
  '09n': '🌧',
  '10d': '🌦',
  '10n': '🌦',
  '11d': '⛈',
  '11n': '⛈',
  '13d': '🌨',
  '13n': '🌨',
  '50d': '🌫',
  '50n': '🌫',
};

const CurrWeather = () => {
  const { location } = useGetLocation();

  const lat = location?.latitude.toFixed(2);
  const lon = location?.longitude.toFixed(2);

  const appid = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const url = process.env.NEXT_PUBLIC_WEATHER_BASE_URL;

  const getWeather = async () => {
    const res = await axios.get(url as string, {
      params: {
        lat,
        lon,
        appid,
        lang: 'kr',
        units: 'metric',
      },
    });

    return res;
  };

  const { data, isLoading } = useQuery(['weather'], getWeather, {
    enabled: location?.latitude !== undefined && typeof window !== 'undefined',
  });

  if (isLoading || data === undefined)
    return (
      <section className="w-[48%] h-[7rem] bg-primary_weak rounded-[0.75rem] flex items-center">
        <Spinner className="mx-auto animate-spin-slow" />
      </section>
    );

  return (
    <section className="flex justify-evenly items-center p-[0.5rem] w-[48%] h-[7rem] bg-primary_weak rounded-[0.75rem] text-default text-[0.75rem] font-bold">
      <div className="flex flex-col items-center">
        <div className="text-[3rem]">{ICON[data?.data.weather[0].icon]}</div>
        <div>{data?.data.weather[0].description}</div>
      </div>
      <div>
        <div className="my-[0.25rem]">최저 : {data?.data.main.temp_min}℃</div>
        <div className="my-[0.25rem]">최고 : {data?.data.main.temp_max}℃</div>
        <div className="my-[0.25rem]">현재 : {data?.data.main.temp}℃</div>
        <div className="my-[0.25rem]">체감 : {data?.data.main.feels_like}℃</div>
      </div>
    </section>
  );
};

export default CurrWeather;
