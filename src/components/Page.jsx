import { useEffect, useState } from "react"
import axios from "axios"

import Loading from "./Loading"

export const Page = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const getWeatherInfo = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=sylhet&appid=${
          import.meta.env.VITE_WEATHER_KEY
        }&cnt=56`
      )

      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  console.log("data ", data)

  useEffect(() => {
    getWeatherInfo()
  }, [])

  return isLoading ? <Loading /> : <div>Page</div>
}
