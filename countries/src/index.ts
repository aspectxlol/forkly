import { countryFilter } from "./types";

/**
 * @name checkIsGenerated
 * @description check if the data is generated
 * @returns boolean
 * 
 */
function checkIsGenerated() {
  const data = await import('../countries.json')
}

export function getCountry({ code, phone }: countryFilter) {
  if code
}

