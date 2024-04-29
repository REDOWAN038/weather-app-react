import { cn } from "../utils/cn"

export default function Container(props) {
  return (
    <div
      className={cn(
        "w-full bg-white border rounded-xl py-4 flex shadow-md",
        props
      )}
    />
  )
}
