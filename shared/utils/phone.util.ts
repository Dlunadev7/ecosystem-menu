import parsePhoneNumber, { CountryCode } from 'libphonenumber-js'

export function ValidatePhoneNumber(phone: string, country: CountryCode = 'AR') {
  const phoneNumber = parsePhoneNumber(phone, country)

  if (!phoneNumber) {
    return {
      isValid: false,
      isPossible: false,
      number: '',
      national: phone,
    }
  }

  return {
    isValid: phoneNumber.isValid(),
    isPossible: phoneNumber.isPossible(),
    number: phoneNumber.number,
    national: phoneNumber.nationalNumber,
  }
}