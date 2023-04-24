import getCountriesData, { filterCountries, getCountry } from '@forkly/assets/countries';
import { Country } from '@forkly/assets/types';
import { CountryCode, ParsedNumber, format, getCountryCallingCode, parseNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import { useState } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PhoneInput() {
  const [phone, setPhone] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
  const data = getCountriesData();

  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value as CountryCode;
    setSelectedCountry(data.find((country) => country.countryCode === countryCode));
    setPhone(`+${getCountryCallingCode(countryCode)} `);
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    console.log(e.target.value, phone)
    const phoneNumber = parseNumber(`${phone}${e.target.value}`, selectedCountry?.countryCode! as CountryCode);
    if (phoneNumber) {
      console.log(e.target.value, phone, 'if1')

      setSelectedCountry(getCountry((phoneNumber as ParsedNumber).country))
          console.log(e.target.value, phone, 'if2')


      setPhone(format(phoneNumber as ParsedNumber, 'INTERNATIONAL'));
      console.log(e.target.value, phone, 'if3')


    } else {
      console.log(e.target.value, phone, 'else')
      setPhone(e.target.value);
    }
  };

  return (
    <div>
      <select
        name="country"
        id="countrySelect"
        value={selectedCountry?.countryCode}
        onChange={handleCountrySelect}>
        <option value="">Select a country</option>
        {data.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.name} (+{getCountryCallingCode(country.countryCode as CountryCode)})
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={(e) => handlePhoneInput(e)} />
      <div>Formatted Phone Number: {phone}</div>
      <div>country: {selectedCountry?.name}</div>
    </div>
  );
}
