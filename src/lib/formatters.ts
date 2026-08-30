/**
 * VentStride Formatters & Calculation Utilities
 */

export interface PaceResult {
  minutes: number
  seconds: number
  formatted: string // e.g. 5:24 /km or 5'24"
}

/**
 * Calculates pace per km from distance in km and moving time in seconds.
 */
export function calcPace(distanceKm: number, movingTimeSec: number): PaceResult {
  if (!distanceKm || distanceKm <= 0 || !movingTimeSec || movingTimeSec <= 0) {
    return { minutes: 0, seconds: 0, formatted: '0:00' }
  }

  const secPerKm = movingTimeSec / distanceKm
  let minutes = Math.floor(secPerKm / 60)
  let seconds = Math.round(secPerKm % 60)

  if (seconds === 60) {
    minutes += 1
    seconds = 0
  }

  // Guard against unreasonable numbers
  if (minutes > 99) {
    return { minutes: 99, seconds: 59, formatted: '99:59' }
  }

  const formattedSec = seconds < 10 ? `0${seconds}` : `${seconds}`
  return {
    minutes,
    seconds,
    formatted: `${minutes}:${formattedSec}`
  }
}

/**
 * Format time in Strava-like style: "1h 34m" or "42m 15s"
 */
export function formatTime(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return '0m'

  const hours = Math.floor(totalSeconds / 3600)
  const remainderSec = totalSeconds % 3600
  const minutes = Math.floor(remainderSec / 60)
  const seconds = Math.round(remainderSec % 60)

  if (hours > 0) {
    if (minutes === 0) return `${hours}h`
    return `${hours}h ${minutes}m`
  }

  if (seconds === 0) {
    return `${minutes}m`
  }

  return `${minutes}m ${seconds}s`
}

/**
 * Format distance in km with 1 or 2 decimals
 */
export function formatDistance(distanceKm: number): string {
  if (!distanceKm || isNaN(distanceKm)) return '0.00'
  // If it has decimal places, show up to 2, e.g. 10.50 or 5.2
  return Number(distanceKm).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

/**
 * Format date string into human readable date: e.g. "Sunday, Aug 30, 2026"
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}
