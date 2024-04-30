import { Suspense, useState, useEffect } from "react"
import axios from "axios"
import { format, parseISO } from "date-fns"
// import Container from "./Container"
import Loading from "./Loading"
import convertKelvinToCelsius from "../utils/convertKelvinToCelsius"
import getDayOrNightIcon from "../utils/getDayOrNightIcon"
import WeatherIcon from "./WeatherIcon"
import WeatherDetails from "./WeatherDetails"
import metersToKiloMeters from "../utils/metersToKilometers"
import convertWindSpeed from "../utils/convertWindSpeed"

const getWeatherInfo = async () => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=sylhet&appid=${
        import.meta.env.VITE_WEATHER_KEY
      }&cnt=56`
    )
    console.log("data ", data)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const ViewComponent = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherInfo()
        setWeatherData(data)
      } catch (error) {
        setError(error)
      }
    }

    fetchData()
  }, [])

  if (error) {
    return <div>Error fetching data: {error.message}</div>
  }

  if (!weatherData) {
    return <Loading />
  }

  const firstData = weatherData?.list[0]

  return (
    <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
      <section className='space-y-4'>
        <div className='space-y-2'>
          {/* showing day and date */}
          <div className='flex gap-1 text-2xl items-end'>
            <p>{format(parseISO(firstData.dt_txt), "EEEE")}</p>
            <p className='text-lg'>
              ({format(parseISO(firstData.dt_txt), "dd.MM.yyyy")})
            </p>
          </div>
          {/* showing todays info */}
          <div className='w-full bg-white border rounded-xl py-4 flex shadow-md gap-10 items-center px-6'>
            {/* left */}
            <div className='flex flex-col px-4'>
              <span className='text-5xl'>
                {convertKelvinToCelsius(firstData.main.temp)}°
              </span>
              <p className='text-xs space-x-1 whitespace-nowrap'>
                <span>Feels Like</span>
                <span>{convertKelvinToCelsius(firstData.main.feels_like)}</span>
              </p>
              <p className='text-xs space-x-2'>
                <span>{convertKelvinToCelsius(firstData.main.temp_min)}°↓</span>
                <span>{convertKelvinToCelsius(firstData.main.temp_max)}°↑</span>
              </p>
            </div>

            <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
              {weatherData?.list.map((data, idx) => {
                return (
                  <div
                    key={idx}
                    className='flex flex-col gap-2 justify-between items-center text-xs font-semibold'
                  >
                    <p className='whitespace-nowrap'>
                      {format(parseISO(data?.dt_txt), "h:mm a")}
                    </p>
                    <div className='relative h-20 w-20'>
                      <WeatherIcon
                        iconName={getDayOrNightIcon(
                          data?.weather[0]?.icon,
                          data?.dt_txt
                        )}
                      />
                    </div>
                    <p>{convertKelvinToCelsius(data?.main?.temp ?? 0)}°</p>
                  </div>
                )
              })}
            </div>
          </div>
          {/* showing details */}
          <div className='flex gap-4'>
            {/* left */}
            <div className='w-fit bg-white border rounded-xl px-4 py-4 flex flex-col items-center justify-center shadow-md'>
              <p className=' capitalize text-center'>
                {firstData?.weather[0]?.description}
              </p>
              <div className='relative h-20 w-20'>
                <WeatherIcon
                  iconName={getDayOrNightIcon(
                    firstData?.weather[0].icon,
                    firstData?.dt_txt
                  )}
                />
              </div>
            </div>
            {/* right */}
            <div className='w-full bg-yellow-300/80 border rounded-xl px-6 py-4 flex justify-between overflow-x-auto gap-4 shadow-md'>
              <WeatherDetails
                visibility={metersToKiloMeters(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity}%`}
                sunrise={format(
                  weatherData?.city.sunrise ?? 1702949452,
                  "H:mm"
                )}
                sunset={format(weatherData?.city.sunset ?? 1702517657, "H:mm")}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ViewComponent />
    </Suspense>
  )
}
