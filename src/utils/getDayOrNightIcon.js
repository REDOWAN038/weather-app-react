
export default function getDayOrNightIcon(iconName, dateTimeString) {
    const hours = new Date(dateTimeString).getHours() // Get hours from the given date and time string

    const isDayTime = hours >= 6 && hours < 18 // Consider daytime from 6 AM to 6 PM

    return isDayTime ? iconName.slice(0, -1) + "d" : iconName.slice(0, -1) + "n"
}