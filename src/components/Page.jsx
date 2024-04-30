import { Suspense, useState, useEffect } from "react"
import axios from "axios"
import { format, fromUnixTime, parseISO } from "date-fns"
// import Container from "./Container"
import Loading from "./Loading"
import convertKelvinToCelsius from "../utils/convertKelvinToCelsius"
import getDayOrNightIcon from "../utils/getDayOrNightIcon"
import WeatherIcon from "./WeatherIcon"
import WeatherDetails from "./WeatherDetails"
import metersToKiloMeters from "../utils/metersToKilometers"
import convertWindSpeed from "../utils/convertWindSpeed"
import ForecastWeatherDetails from "./ForecastWeatherDetails"
import { useSelector } from "react-redux"

const getWeatherInfo = async (place = "Sylhet") => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${
        import.meta.env.VITE_WEATHER_KEY
      }&cnt=56`
    )
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const ViewComponent = () => {
  const place = useSelector((state) => state.data.place)
  const loading = useSelector((state) => state.data.loading)
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherInfo(place)
        setWeatherData(data)
      } catch (error) {
        setError(error)
      }
    }

    if (place) {
      fetchData()
    }
  }, [place])

  if (error) {
    return <div>Error fetching data: {error.message}</div>
  }

  if (!weatherData) {
    return <Loading />
  }

  const firstData = weatherData?.list[0]

  const uniqueDates = [
    ...new Set(
      weatherData?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ]

  const firstDataForEachDate = uniqueDates.map((date) => {
    return weatherData?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0]
      const entryTime = new Date(entry.dt * 1000).getHours()
      return entryDate === date && entryTime >= 6
    })
  })

  return loading ? (
    <Loading />
  ) : (
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
                  fromUnixTime(weatherData?.city.sunrise),
                  "H:mm"
                )}
                sunset={format(fromUnixTime(weatherData?.city.sunset), "H:mm")}
                windSpeed={convertWindSpeed(firstData?.wind.speed)}
              />
            </div>
          </div>
          {/* forecast */}
          <div className='flex flex-col gap-4 w-full'>
            <p className='text-2xl mt-10'>Forecast (6 days)</p>
            {firstDataForEachDate.map((data, idx) => {
              return (
                <ForecastWeatherDetails
                  key={idx}
                  description={data?.weather[0].description}
                  weatherIcon={data?.weather[0].icon}
                  date={format(parseISO(data.dt_txt), "dd.MM")}
                  day={format(parseISO(data?.dt_txt), "EEEE")}
                  feels_like={data?.main.feels_like}
                  temp={data?.main.temp}
                  temp_max={data?.main.temp_max}
                  temp_min={data?.main.temp_min}
                  airPressure={`${data?.main.pressure} hPa `}
                  humidity={`${data?.main.humidity}% `}
                  sunrise={format(
                    fromUnixTime(weatherData?.city.sunrise),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(weatherData?.city.sunset),
                    "H:mm"
                  )}
                  visibility={`${metersToKiloMeters(data?.visibility)} `}
                  windSpeed={`${convertWindSpeed(data?.wind.speed)} `}
                />
              )
            })}
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
