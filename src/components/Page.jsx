import { Suspense } from "react"
import Loading from "./Loading"
import View from "./View"

export const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <View />
    </Suspense>
  )
}
