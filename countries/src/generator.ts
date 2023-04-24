import { Country, Currency, Root } from "./types"
import Capital from './data/capital.json'
import cCountries from './data/cCountries.json'
import alanguages from './data/languages.json'
import Name from './data/name.json'
import Phone from './data/phone.json'
import CurrencyNames from './data/currencyNames.json'
import fs from 'node:fs'

/**
 * @name generateCountryData
 * @description generates country data based on the schema
 * @returns countryData[]
 *  */
function generateCountryData() {
  const countries: Country[] = []

  for (let cc in Capital) {
    const elanguages = cCountries[cc]['languages']
    const newLang = elanguages.map((e) => alanguages[e])

    const eMoney = cCountries[cc]['currency']
    const newCr: Currency[] = []
    eMoney.forEach((e) => {
      newCr.push({
        code: e,
        name: CurrencyNames[e]
      })
    })
    countries.push({
      countryCode: `${cc}`,
      name: `${Name[cc]}`,
      native: `${cCountries[cc]['native']}`,
      phone: `${Phone[cc]}`,
      continent: `${cCountries[cc]['continent']}`,
      capital: `${Capital[cc]}`,
      currency: newCr,
      language: newLang
    })
  }
  const json = {
    countries: countries
  }

  fs.writeFileSync('./result/countries.json', JSON.stringify(json))
  return countries
}