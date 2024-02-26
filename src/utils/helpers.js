import { MOVES } from "./constants";

const weathers = {
    WEATHER_SUN: 'Sun',
    WEATHER_RAIN: 'Rain',
    WEATHER_SNOW: 'Snow',
    WEATHER_COLD: 'Cold'
}

// Returns a random weather inspired by the season in the form of weather number + name"""
export const randomWeather = (year, weather, weatherAge, force = false) => {

    const season_weather = (Math.floor(year) * 4) % 4

    if (force || (weather !== season_weather && (Math.floor(Math.random() * 3) === 0 || weatherAge > 8))) {
        const new_weather = season_weather
        return [new_weather, 0, weathers[new_weather]]
    } else {
        return [weather, weatherAge + 1, weathers[weather]]
    }
}

//Returns a random direction in the form of vpos/hpos coords"""
export const randomDirection = (vpos, hpos) => {
    const direction = Math.floor(Math.random() * 4) + 1
    const move = MOVES[direction]
    return { 'vpos': vpos + move[0], 'hpos': hpos + move[1], 'direction': direction }
}

export const getUniqueKey = (prefix) => {
    return Math.floor(prefix * 1000000000 + Math.random() * 999999999);
} 