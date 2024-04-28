import NavBar from "./components/NavBar"
import { Page } from "./components/Page"

const App = () => {
  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <NavBar />
      <Page />
    </div>
  )
}

export default App
