import convertKelvinToCelsius from "../utils/convertKelvinToCelsius"
import WeatherDetails from "./WeatherDetails"
import WeatherIcon from "./WeatherIcon"

const ForecastWeatherDetails = ({
  weatherIcon,
  date,
  day,
  temp,
  feels_like,
  description,
  temp_max,
  temp_min,
  visibility,
  humidity,
  windSpeed,
  airPressure,
  sunrise,
  sunset,
}) => {
  return (
    <div className='w-full bg-white border rounded-xl py-4 flex gap-4 shadow-md'>
      <section className='flex gap-4 items-center px-4'>
        <div className='flex flex-col gap-1 items-center'>
          <div className='relative h-20 w-20'>
            <WeatherIcon iconName={weatherIcon} />
          </div>
          <p>{date}</p>
          <p className='text-sm'>{day}</p>
        </div>
        <div className='flex flex-col gap-1 px-4'>
          <span className='text-5xl'>{convertKelvinToCelsius(temp)}°</span>
          <p className='text-xs space-x-1 whitespace-nowrap'>
            <span> Feels like</span>
            <span>{convertKelvinToCelsius(feels_like)}°</span>
          </p>
          <p className='text-xs space-x-2 whitespace-nowrap'>
            <span>{convertKelvinToCelsius(temp_min)}°↓</span>
            <span>{convertKelvinToCelsius(temp_max)}°↑</span>
          </p>
          <div className='flex flex-col'>
            {description.split(" ").map((word, index) => (
              <p key={index} className='capitalize'>
                {word}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className=' overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10'>
        <WeatherDetails
          visibility={visibility}
          humidity={humidity}
          windSpeed={windSpeed}
          airPressure={airPressure}
          sunrise={sunrise}
          sunset={sunset}
        />
      </section>
    </div>
  )
}

export default ForecastWeatherDetails
