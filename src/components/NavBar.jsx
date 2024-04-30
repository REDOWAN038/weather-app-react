import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md"
import SearchBox from "./SearchBox"

const NavBar = () => {
  return (
    <>
      <nav className='sticky left-0 top-0 bg-white shadow-sm z-50'>
        <div className='h-20 flex justify-between items-center w-full max-w-7xl mx-auto px-3'>
          <div className='flex items-center justify-center gap-2'>
            <h2 className='text-3xl text-gray-500'>Weather</h2>
            <MdWbSunny className='text-yellow-300 text-3xl mt-1' />
          </div>
          <section className='flex gap-2 items-center'>
            <MdMyLocation className='text-gray-400 cursor-pointer text-2xl hover:opacity-80' />
            <MdOutlineLocationOn className='text-2xl cursor-pointer' />
            <p className='text-sm text-slate-900/80'>Bangladesh</p>
            <div className='relative hidden sm:flex'>
              <SearchBox />
            </div>
          </section>
        </div>
      </nav>
      <section className='flex max-w-7xl px-3 sm:hidden'>
        <div className='relative'>
          <SearchBox />
        </div>
      </section>
    </>
  )
}

export default NavBar
