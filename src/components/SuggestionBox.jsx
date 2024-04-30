import { useDispatch, useSelector } from "react-redux"
import { setCity, setShowSuggestions } from "../features/data/dataSlice"

const Suggestions = () => {
  const suggestions = useSelector((state) => state.data.suggestions)
  const showSuggestions = useSelector((state) => state.data.showSuggestions)
  const error = useSelector((state) => state.data.error)

  const dispatch = useDispatch()

  const handleSuggestionClick = (value) => {
    dispatch(setCity(value))
    dispatch(setShowSuggestions(false))
  }

  return (
    <>
      {((showSuggestions && suggestions[0].length > 1) || error) && (
        <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2'>
          {error && suggestions.length < 1 && (
            <li className='text-red-500 p-1 '> {error}</li>
          )}
          {suggestions[0].map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(item)}
              className='cursor-pointer p-1 rounded   hover:bg-gray-200'
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Suggestions
