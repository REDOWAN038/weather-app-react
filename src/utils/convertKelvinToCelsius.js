export default function convertKelvinToCelsius(tempInKelvin) {
    const tempInCelsius = tempInKelvin - 273.15
    return Math.floor(tempInCelsius)
}