/**
 * @fileoverview General utility functions for the RouteCraft application.
 */

window.RouteCraft = window.RouteCraft || {};

/**
 * Creates a debounced version of a function that delays its execution until
 * after a specified amount of time has elapsed since the last call.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} A debounced version of the input function.
 */
window.RouteCraft.debounce = function debounce(fn, delay) {
  let timer = null;
  return function debounced(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

/**
 * Generates a Google Maps URL for one or more stops.
 * @param {Object[]} stops - Array of stop objects.
 * @returns {string} The formatted Google Maps URL.
 */
window.RouteCraft.generateGmapsUrl = function generateGmapsUrl(stops) {
  if (!stops || stops.length === 0) return "";

  const baseUrl = "https://www.google.com/maps/";

  if (stops.length === 1) {
    const stop = stops[0];
    const query = encodeURIComponent(`${stop.latitude},${stop.longitude}`);
    return `${baseUrl}search/?api=1&query=${query}`;
  }

  // Directions for 2+ stops
  const origin = encodeURIComponent(`${stops[0].latitude},${stops[0].longitude}`);
  const destination = encodeURIComponent(`${stops[stops.length - 1].latitude},${stops[stops.length - 1].longitude}`);

  let url = `${baseUrl}dir/?api=1&origin=${origin}&destination=${destination}`;

  if (stops.length > 2) {
    const waypoints = stops.slice(1, -1)
      .map(s => `${s.latitude},${s.longitude}`)
      .join("|");
    url += `&waypoints=${encodeURIComponent(waypoints)}`;
  }

  return url;
};
