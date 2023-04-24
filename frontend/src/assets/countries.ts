import { CountryCode, getCountries } from 'libphonenumber-js';
import countries from './countries.json';
import { Country } from './types';

export function filterCountries(country: Country) {
  return country.countryCode === getCountries().find((code) => code === country.countryCode);
}

export default function getCountriesData() {
  const filteredCountries = countries.countries.filter(filterCountries);
  return filteredCountries;
}

export function getCountry(code: CountryCode) {
  return countries.countries.find((country) => country.countryCode === code)
}