import { IoSearch } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import {
  setCity,
  setError,
  setLoading,
  setPlace,
  setShowSuggestions,
  setSuggestions,
} from "../features/data/dataSlice"
import axios from "axios"

const SearchBox = () => {
  const city = useSelector((state) => state.data.city)
  const suggestions = useSelector((state) => state.data.suggestions)
  const dispatch = useDispatch()

  const handleChange = async (value) => {
    dispatch(setCity(value))
    if (value.length > 3) {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${
            import.meta.env.VITE_WEATHER_KEY
          }`
        )

        const itemNames = data?.list?.map((item) => item.name)
        dispatch(setSuggestions(itemNames))
        dispatch(setError(""))
        dispatch(setShowSuggestions(true))
      } catch (error) {
        dispatch(setSuggestions([]))
        dispatch(setShowSuggestions(true))
      }
    } else {
      dispatch(setSuggestions([]))
      dispatch(setShowSuggestions(true))
    }
  }

  const handleSubmit = (e) => {
    dispatch(setLoading(true))
    e.preventDefault()

    if (suggestions[0] == []) {
      dispatch(setError("Location not found"))
      dispatch(setLoading(false))
    } else {
      dispatch(setError(""))
      setTimeout(() => {
        dispatch(setLoading(false))
        dispatch(setPlace(city))
        dispatch(setShowSuggestions(false))
      }, 500)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex relative items-center justify-center h-10'
    >
      <input
        type='text'
        value={city}
        onChange={(e) => handleChange(e.target.value)}
        placeholder='Search location..'
        className='px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none  focus:border-blue-500 h-full'
      />
      <button
        className='px-4 py-3 bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600  h-full'
        onClick={handleSubmit}
      >
        <IoSearch />
      </button>
    </form>
  )
}

export default SearchBox
