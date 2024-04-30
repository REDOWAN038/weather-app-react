const SingleWeatherDetail = ({ information, icon, value }) => {
  return (
    <div className='flex flex-col items-center justify-between gap-2 text-xs text-black/80 font-semibold'>
      <p className='whitespace-nowrap'>{information}</p>
      <div className='text-3xl'>{icon}</div>
      <p>{value}</p>
    </div>
  )
}

export default SingleWeatherDetail
