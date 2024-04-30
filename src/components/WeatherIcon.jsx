// eslint-disable-next-line react/prop-types
export default function WeatherIcon({ iconName }) {
  return (
    <img
      width={100}
      height={100}
      alt='weather-icon'
      className='absolute h-full w-full'
      src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
    />
  )
}
