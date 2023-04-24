export interface Root {
  countries: Country[]
}

export interface Country {
  countryCode: string
  name: string
  native: string
  phone: string
  continent: string
  capital: string
  currency: Currency[]
  language: Language[]
}

export interface Currency {
  code: string
  name?: string
}

export interface Language {
  name: string
  native: string
  rtl?: number
}

export interface countryFilter {
  code?: string,
  phone?: string,
}