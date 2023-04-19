import countries from '@forkly/assets/countries.json'
import { Country } from '@forkly/assets/types'
import parsePhoneNumberFromString, { CountryCode, format, getCountries, getCountryCallingCode, parse, parseIncompletePhoneNumber } from 'libphonenumber-js'
import { useState } from 'react'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
}

export default function PhoneInput() {
  const [Phone, setPhone] = useState<string>('');
  const [SelectedCountry, setSelectedCountry] = useState<Country | undefined>();

  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value as CountryCode;
    setSelectedCountry(countries.countries.find((country) => country.countryCode === countryCode));
    setPhone(`+${getCountryCallingCode(countryCode)} `);
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = parsePhoneNumberFromString(`${Phone}${e.target.value}`, SelectedCountry?.countryCode!);
    setPhone(format(phoneNumber, 'INTERNATIONAL'));
  };

  return (
    <div>
      <select name="country" id="countrySelect" value={SelectedCountry?.countryCode} onChange={handleCountrySelect}>
        <option value="">Select a country</option>
        {countries.countries.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.name} (+{getCountryCallingCode(country.countryCode as CountryCode)})
          </option>
        ))}
      </select>
      <input type="text" placeholder="Phone" name="phone" value={Phone} onChange={handlePhoneInput} />
      <div>Formatted Phone Number: {Phone}</div>
    </div>
  );
}