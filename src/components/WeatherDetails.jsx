import { LuEye, LuSunrise, LuSunset } from "react-icons/lu"
import { FiDroplet } from "react-icons/fi"
import { MdAir } from "react-icons/md"
import { ImMeter } from "react-icons/im"
import SingleWeatherDetail from "./SingleWeatherDetail"

const WeatherDetails = ({
  visibility,
  humidity,
  windSpeed,
  airPressure,
  sunrise,
  sunset,
}) => {
  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information='Visibility'
        value={visibility}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information='Humidity'
        value={humidity}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information='Wind Speed'
        value={windSpeed}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        information='Air Pressure'
        value={airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information='Sunrise'
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information='Sunset'
        value={sunset}
      />
    </>
  )
}

export default WeatherDetails
