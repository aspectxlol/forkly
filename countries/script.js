const capital = require('./capital.json')
const cCountries = require('./cCountries.json')
const currency = require('./currency.json')
const alanguages = require('./languages.json')
const name = require('./name.json')
const phone = require('./phone.json')
const tqdm = require('tqdm');
const fs = require('node:fs')
const currencyNames = require('./currencyNames.json')

const countries = []
// const bar = new tqdm({
//   total: Object.keys(capital).length,
//   unit: 'country'
// })

for (let cc in capital) {
  // console.log(cc)
  const elanguages = cCountries[cc]['languages']
  const newLang = elanguages.map((e) => alanguages[e])

  const eMoney = cCountries[cc]['currency']
  const newCr = []
  eMoney.forEach((e) => {
    newCr.push({
      code: e,
      name: currencyNames[e]
    })
  })
  countries.push({
    countryCode: `${cc}`,
    name: `${name[cc]}`,
    native: `${cCountries[cc]['native']}`,
    phone: `${phone[cc]}`,
    continent: `${cCountries[cc]['continent']}`,
    capital: `${capital[cc]}`,
    currency: newCr,
    language: newLang
  })
}

const json = {
  countries: countries
}

// console.log(countries)
fs.writeFileSync('./countries.json', `${JSON.stringify(json)}`)
// console.log(capital['ID'])
// const schema = {
//   "countries": [
//     {
//       "name": "",
//       "native": "",
//       "phone": "",
//       "continent": "",
//       "capital": "",
//       "currency": {
//         "name": "",
//         "symbol": ""
//       },
//       "languages": [
//         {
//           "name": "",
//           "native": ""
//         }
//       ]
//     }
//   ]
// }

