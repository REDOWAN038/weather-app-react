import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md"
import SearchBox from "./SearchBox"
import SuggestionBox from "./SuggestionBox"
import { useDispatch, useSelector } from "react-redux"
import { setCity, setLoading, setPlace } from "../features/data/dataSlice"
import axios from "axios"

const NavBar = () => {
  const place = useSelector((state) => state.data.place)
  const dispatch = useDispatch()

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        try {
          dispatch(setLoading(true))
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
              import.meta.env.VITE_WEATHER_KEY
            }`
          )
          setTimeout(() => {
            dispatch(setLoading(false))
            dispatch(setPlace(response.data.name))
            dispatch(setCity(response.data.name))
          }, 500)
        } catch (error) {
          dispatch(setLoading(false))
        }
      })
    }
  }
  return (
    <>
      <nav className='sticky left-0 top-0 bg-white shadow-sm z-50'>
        <div className='h-20 flex justify-between items-center w-full max-w-7xl mx-auto px-3'>
          <div className='flex items-center justify-center gap-2'>
            <h2 className='text-3xl text-gray-500'>Weather</h2>
            <MdWbSunny className='text-yellow-300 text-3xl mt-1' />
          </div>
          <section className='flex gap-2 items-center'>
            <MdMyLocation
              title='Your Current Location'
              onClick={handleCurrentLocation}
              className='text-gray-400 cursor-pointer text-2xl hover:opacity-80'
            />
            <MdOutlineLocationOn
              title='Current View Place'
              className='text-2xl cursor-pointer'
            />
            <p className='text-sm text-slate-900/80'>{place}</p>
            <div className='relative hidden sm:flex'>
              <SearchBox />
              <SuggestionBox />
            </div>
          </section>
        </div>
      </nav>
      <section className='flex max-w-7xl px-3 sm:hidden'>
        <div className='relative'>
          <SearchBox />
          <SuggestionBox />
        </div>
      </section>
    </>
  )
}

export default NavBar
