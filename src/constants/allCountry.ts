const allCountry = [
  {
    countryName: 'Andorra',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'United Arab Emirates',
    currency: 'AED',
    symbol: 'AED',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 784,
  },
  {
    countryName: 'Afghanistan',
    currency: 'AFN',
    symbol: 'Af',
    numericCode: 971,
  },
  {
    countryName: 'Antigua and Barbuda',
    currency: 'XCD',
    symbol: 'XCD',
    numericCode: 951,
  },
  {
    countryName: 'Anguilla',
    currency: 'XCD',
    symbol: 'XCD',
    numericCode: 951,
  },
  {
    countryName: 'Albania',
    currency: 'ALL',
    symbol: 'ALL',
    dateFormat: 'yyyy-MM-dd',
    numericCode: 8,
  },
  {
    countryName: 'Armenia',
    currency: 'AMD',
    symbol: 'AMD',
    numericCode: 51,
  },
  {
    countryName: 'Angola',
    currency: 'AOA',
    symbol: 'AOA',
    numericCode: 973,
  },
  {
    countryName: 'Argentina',
    currency: 'ARS',
    symbol: 'AR$',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 32,
  },
  // {
  //   countryName: "American Samoa",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Austria',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Australia',
    currency: 'AUD',
    symbol: '$',
    dateFormat: 'd/MM/yyyy',
    numericCode: 36,
  },
  {
    countryName: 'Aruba',
    currency: 'AWG',
    symbol: 'AWG',
    numericCode: 533,
  },
  {
    countryName: 'Aland Islands',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Azerbaijan',
    currency: 'AZN',
    symbol: 'man.',
    numericCode: 944,
  },
  {
    countryName: 'Bosnia and Herzegovina',
    currency: 'BAM',
    symbol: 'KM',
    dateFormat: 'yyyy-MM-dd',
    numericCode: 977,
  },
  {
    countryName: 'Barbados',
    currency: 'BBD',
    symbol: 'BBD',
    numericCode: 52,
  },
  {
    countryName: 'Bangladesh',
    currency: 'BDT',
    symbol: 'Tk',
    numericCode: 50,
  },
  {
    countryName: 'Belgium',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'd/MM/yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Burkina Faso',
    currency: 'XOF',
    symbol: 'CFA',
    numericCode: 952,
  },
  {
    countryName: 'Bulgaria',
    currency: 'BGN',
    symbol: 'BGN',
    dateFormat: 'yyyy-M-d',
    numericCode: 975,
  },
  {
    countryName: 'Bahrain',
    currency: 'BHD',
    symbol: 'BD',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 48,
  },
  {
    countryName: 'Burundi',
    currency: 'BIF',
    symbol: 'FBu',
    numericCode: 108,
  },
  {
    countryName: 'Benin',
    currency: 'XOF',
    symbol: 'CFA',
    numericCode: 952,
  },
  {
    countryName: 'Saint Barthelemy',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Bermuda',
    currency: 'BMD',
    symbol: 'BMD',
    numericCode: 60,
  },
  {
    countryName: 'Brunei',
    currency: 'BND',
    symbol: 'BN$',
    numericCode: 96,
  },
  {
    countryName: 'Bolivia',
    currency: 'BOB',
    symbol: 'Bs',
    dateFormat: 'dd-MM-yyyy',
    numericCode: 68,
  },
  // {
  //   countryName: "Bonaire, Saint Eustatius and Saba ",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Brazil',
    currency: 'BRL',
    symbol: 'R$',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 986,
  },
  {
    countryName: 'Bahamas',
    currency: 'BSD',
    symbol: 'BSD',
    numericCode: 44,
  },
  {
    countryName: 'Bhutan',
    currency: 'BTN',
    symbol: 'BTN',
    numericCode: 64,
  },
  {
    countryName: 'Bouvet Island',
    currency: 'NOK',
    symbol: 'Nkr',
    numericCode: 578,
  },
  {
    countryName: 'Botswana',
    currency: 'BWP',
    symbol: 'BWP',
    numericCode: 72,
  },
  {
    countryName: 'Belarus',
    currency: 'BYN',
    symbol: 'BYN',
    dateFormat: 'd.M.yyyy',
    numericCode: 933,
  },
  {
    countryName: 'Belize',
    currency: 'BZD',
    symbol: 'BZ$',
    numericCode: 84,
  },
  {
    countryName: 'Canada',
    currency: 'CAD',
    symbol: 'CA$',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 124,
  },
  {
    countryName: 'Cocos Islands',
    currency: 'AUD',
    symbol: 'AU$',
    numericCode: 36,
  },
  {
    countryName: 'Democratic Republic of the Congo',
    currency: 'CDF',
    symbol: 'CDF',
    numericCode: 976,
  },
  {
    countryName: 'Central African Republic',
    currency: 'XAF',
    symbol: 'FCFA',
    numericCode: 950,
  },
  {
    countryName: 'Republic of the Congo',
    currency: 'XAF',
    symbol: 'FCFA',
    numericCode: 950,
  },
  {
    countryName: 'Switzerland',
    currency: 'CHF',
    symbol: 'CHF',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 756,
  },
  {
    countryName: 'Ivory Coast',
    currency: 'XOF',
    symbol: 'CFA',
    numericCode: 952,
  },
  {
    countryName: 'Cook Islands',
    currency: 'NZD',
    symbol: 'NZ$',
    numericCode: 554,
  },
  {
    countryName: 'Chile',
    currency: 'CLP',
    symbol: 'CL$',
    dateFormat: 'dd-MM-yyyy',
    numericCode: 152,
  },
  {
    countryName: 'Cameroon',
    currency: 'XAF',
    symbol: 'FCFA',
    numericCode: 950,
  },
  {
    countryName: 'China',
    currency: 'CNY',
    symbol: 'CN¥',
    dateFormat: 'yyyy-M-d',
    numericCode: 156,
  },
  {
    countryName: 'Colombia',
    currency: 'COP',
    symbol: 'CO$',
    dateFormat: 'd/MM/yyyy',
    numericCode: 170,
  },
  {
    countryName: 'Costa Rica',
    currency: 'CRC',
    symbol: '₡',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 188,
  },
  {
    countryName: 'Cuba',
    currency: 'CUP',
    symbol: 'CUP',
    numericCode: 192,
  },
  {
    countryName: 'Cape Verde',
    currency: 'CVE',
    symbol: 'CV$',
    numericCode: 132,
  },
  {
    countryName: 'Curacao',
    currency: 'ANG',
    symbol: 'ANG',
    numericCode: 532,
  },
  {
    countryName: 'Christmas Island',
    currency: 'AUD',
    symbol: 'AU$',
    numericCode: 36,
  },
  {
    countryName: 'Cyprus',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Czech Republic',
    currency: 'CZK',
    symbol: 'Kč',
    dateFormat: 'd.M.yyyy',
    numericCode: 203,
  },
  {
    countryName: 'Germany',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Djibouti',
    currency: 'DJF',
    symbol: 'Fdj',
    numericCode: 262,
  },
  {
    countryName: 'Denmark',
    currency: 'DKK',
    symbol: 'Dkr',
    dateFormat: 'dd-MM-yyyy',
    numericCode: 208,
  },
  {
    countryName: 'Dominica',
    currency: 'XCD',
    symbol: 'XCD',
    numericCode: 951,
  },
  {
    countryName: 'Dominican Republic',
    currency: 'DOP',
    symbol: 'RD$',
    dateFormat: 'MM/dd/yyyy',
    numericCode: 214,
  },
  {
    countryName: 'Algeria',
    currency: 'DZD',
    symbol: 'DA',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 12,
  },
  // {
  //   countryName: "Ecuador",
  //   currency: "USD",
  //   symbol: "$",
  //   dateFormat: "dd/MM/yyyy",
  //   numericCode: 840,
  // },
  {
    countryName: 'Estonia',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'd.MM.yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Egypt',
    currency: 'EGP',
    symbol: 'EGP',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 818,
  },
  {
    countryName: 'Western Sahara',
    currency: 'MAD',
    symbol: 'MAD',
    numericCode: 504,
  },
  {
    countryName: 'Eritrea',
    currency: 'ERN',
    symbol: 'Nfk',
    numericCode: 232,
  },
  {
    countryName: 'Spain',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Ethiopia',
    currency: 'ETB',
    symbol: 'Br',
    numericCode: 230,
  },
  {
    countryName: 'Finland',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'd.M.yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Fiji',
    currency: 'FJD',
    symbol: 'FJD',
    numericCode: 242,
  },
  {
    countryName: 'Falkland Islands',
    currency: 'FKP',
    symbol: 'FKP',
    numericCode: 238,
  },
  // {
  //   countryName: "Micronesia",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Faroe Islands',
    currency: 'DKK',
    symbol: 'Dkr',
    numericCode: 208,
  },
  {
    countryName: 'France',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Gabon',
    currency: 'XAF',
    symbol: 'FCFA',
    numericCode: 950,
  },
  {
    countryName: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 826,
  },
  {
    countryName: 'Grenada',
    currency: 'XCD',
    symbol: 'XCD',
    numericCode: 951,
  },
  {
    countryName: 'Georgia',
    currency: 'GEL',
    symbol: 'GEL',
    numericCode: 981,
  },
  {
    countryName: 'French Guiana',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Guernsey',
    currency: 'GBP',
    symbol: '£',
    numericCode: 826,
  },
  {
    countryName: 'Ghana',
    currency: 'GHS',
    symbol: 'GH₵',
    numericCode: 936,
  },
  {
    countryName: 'Gibraltar',
    currency: 'GIP',
    symbol: 'GIP',
    numericCode: 292,
  },
  {
    countryName: 'Greenland',
    currency: 'DKK',
    symbol: 'Dkr',
    numericCode: 208,
  },
  {
    countryName: 'Gambia',
    currency: 'GMD',
    symbol: 'GMD',
    numericCode: 270,
  },
  {
    countryName: 'Guinea',
    currency: 'GNF',
    symbol: 'FG',
    numericCode: 324,
  },
  {
    countryName: 'Guadeloupe',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Equatorial Guinea',
    currency: 'XAF',
    symbol: 'FCFA',
    numericCode: 950,
  },
  {
    countryName: 'Greece',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'd/M/yyyy',
    numericCode: 978,
  },
  {
    countryName: 'South Georgia and the South Sandwich Islands',
    currency: 'GBP',
    symbol: '£',
    numericCode: 826,
  },
  {
    countryName: 'Guatemala',
    currency: 'GTQ',
    symbol: 'GTQ',
    dateFormat: 'd/MM/yyyy',
    numericCode: 320,
  },
  // {
  //   countryName: "Guam",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Guinea-Bissau',
    currency: 'XOF',
    symbol: 'CFA',
    numericCode: 952,
  },
  {
    countryName: 'Guyana',
    currency: 'GYD',
    symbol: 'GYD',
    numericCode: 328,
  },
  {
    countryName: 'Hong Kong',
    currency: 'HKD',
    symbol: 'HK$',
    dateFormat: 'yyyy年M月d日',
    numericCode: 344,
  },
  {
    countryName: 'Heard Island and McDonald Islands',
    currency: 'AUD',
    symbol: 'AU$',
    numericCode: 36,
  },
  {
    countryName: 'Honduras',
    currency: 'HNL',
    symbol: 'HNL',
    dateFormat: 'MM-dd-yyyy',
    numericCode: 340,
  },
  {
    countryName: 'Croatia',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd.MM.yyyy.',
    numericCode: 978,
  },
  {
    countryName: 'Haiti',
    currency: 'HTG',
    symbol: 'HTG',
    numericCode: 332,
  },
  {
    countryName: 'Hungary',
    currency: 'HUF',
    symbol: 'Ft',
    dateFormat: 'yyyy.MM.dd.',
    numericCode: 348,
  },
  {
    countryName: 'Indonesia',
    currency: 'IDR',
    symbol: 'Rp',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 360,
  },
  {
    countryName: 'Ireland',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Israel',
    currency: 'ILS',
    symbol: '₪',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 376,
  },
  {
    countryName: 'Isle of Man',
    currency: 'GBP',
    symbol: '£',
    numericCode: 826,
  },
  {
    countryName: 'India',
    currency: 'INR',
    symbol: '₹',
    dateFormat: 'd/M/yyyy',
    numericCode: 356,
  },
  // {
  //   countryName: "British Indian Ocean Territory",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Iraq',
    currency: 'IQD',
    symbol: 'IQD',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 368,
  },
  {
    countryName: 'Iran',
    currency: 'IRR',
    symbol: 'IRR',
    numericCode: 364,
  },
  {
    countryName: 'Iceland',
    currency: 'ISK',
    symbol: 'Ikr',
    dateFormat: 'd.M.yyyy',
    numericCode: 352,
  },
  {
    countryName: 'Italy',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Jersey',
    currency: 'GBP',
    symbol: '£',
    numericCode: 826,
  },
  {
    countryName: 'Jamaica',
    currency: 'JMD',
    symbol: 'J$',
    numericCode: 388,
  },
  {
    countryName: 'Jordan',
    currency: 'JOD',
    symbol: 'JD',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 400,
  },
  {
    countryName: 'Japan',
    currency: 'JPY',
    symbol: '¥',
    dateFormat: 'H24.MM.dd',
    numericCode: 392,
  },
  {
    countryName: 'Kenya',
    currency: 'KES',
    symbol: 'Ksh',
    numericCode: 404,
  },
  {
    countryName: 'Kyrgyzstan',
    currency: 'KGS',
    symbol: 'KGS',
    numericCode: 417,
  },
  {
    countryName: 'Cambodia',
    currency: 'KHR',
    symbol: 'KHR',
    numericCode: 116,
  },
  {
    countryName: 'Kiribati',
    currency: 'AUD',
    symbol: 'AU$',
    numericCode: 36,
  },
  {
    countryName: 'Comoros',
    currency: 'KMF',
    symbol: 'CF',
    numericCode: 174,
  },
  {
    countryName: 'Saint Kitts and Nevis',
    currency: 'XCD',
    symbol: 'XCD',
    numericCode: 951,
  },
  {
    countryName: 'North Korea',
    currency: 'KPW',
    symbol: 'KPW',
    numericCode: 408,
  },
  {
    countryName: 'South Korea',
    currency: 'KRW',
    symbol: '₩',
    dateFormat: 'yyyy. M. d',
    numericCode: 410,
  },
  {
    countryName: 'Kuwait',
    currency: 'KWD',
    symbol: 'KD',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 414,
  },
  {
    countryName: 'Cayman Islands',
    currency: 'KYD',
    symbol: 'KYD',
    numericCode: 136,
  },
  {
    countryName: 'Kazakhstan',
    currency: 'KZT',
    symbol: 'KZT',
    numericCode: 398,
  },
  {
    countryName: 'Laos',
    currency: 'LAK',
    symbol: 'LAK',
    numericCode: 418,
  },
  {
    countryName: 'Lebanon',
    currency: 'LBP',
    symbol: 'LB£',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 422,
  },
  {
    countryName: 'Saint Lucia',
    currency: 'XCD',
    symbol: 'XCD',
    numericCode: 951,
  },
  {
    countryName: 'Liechtenstein',
    currency: 'CHF',
    symbol: 'CHF',
    numericCode: 756,
  },
  {
    countryName: 'Sri Lanka',
    currency: 'LKR',
    symbol: 'SLRs',
    numericCode: 144,
  },
  {
    countryName: 'Liberia',
    currency: 'LRD',
    symbol: 'LRD',
    numericCode: 430,
  },
  {
    countryName: 'Lesotho',
    currency: 'LSL',
    symbol: 'LSL',
    numericCode: 426,
  },
  {
    countryName: 'Lithuania',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'yyyy.M.d',
    numericCode: 978,
  },
  {
    countryName: 'Luxembourg',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Latvia',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'yyyy.d.M',
    numericCode: 978,
  },
  {
    countryName: 'Libya',
    currency: 'LYD',
    symbol: 'LD',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 434,
  },
  {
    countryName: 'Morocco',
    currency: 'MAD',
    symbol: 'MAD',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 504,
  },
  {
    countryName: 'Monaco',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Moldova',
    currency: 'MDL',
    symbol: 'MDL',
    numericCode: 498,
  },
  {
    countryName: 'Montenegro',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'd.M.yyyy.',
    numericCode: 978,
  },
  {
    countryName: 'Saint Martin',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Madagascar',
    currency: 'MGA',
    symbol: 'MGA',
    numericCode: 969,
  },
  // {
  //   countryName: "Marshall Islands",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Macedonia',
    currency: 'MKD',
    symbol: 'MKD',
    dateFormat: 'd.M.yyyy',
    numericCode: 807,
  },
  {
    countryName: 'Mali',
    currency: 'XOF',
    symbol: 'CFA',
    numericCode: 952,
  },
  {
    countryName: 'Myanmar',
    currency: 'MMK',
    symbol: 'MMK',
    numericCode: 104,
  },
  {
    countryName: 'Mongolia',
    currency: 'MNT',
    symbol: 'MNT',
    numericCode: 496,
  },
  {
    countryName: 'Macao',
    currency: 'MOP',
    symbol: 'MOP$',
    numericCode: 446,
  },
  // {
  //   countryName: "Northern Mariana Islands",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Martinique',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Mauritania',
    currency: 'MRU',
    symbol: 'MRU',
    numericCode: 929,
  },
  {
    countryName: 'Montserrat',
    currency: 'XCD',
    symbol: 'XCD',
    numericCode: 951,
  },
  {
    countryName: 'Malta',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Mauritius',
    currency: 'MUR',
    symbol: 'MURs',
    numericCode: 480,
  },
  {
    countryName: 'Maldives',
    currency: 'MVR',
    symbol: 'MVR',
    numericCode: 462,
  },
  {
    countryName: 'Malawi',
    currency: 'MWK',
    symbol: 'MWK',
    numericCode: 454,
  },
  {
    countryName: 'Mexico',
    currency: 'MXN',
    symbol: 'MX$',
    dateFormat: 'd/MM/yyyy',
    numericCode: 484,
  },
  {
    countryName: 'Malaysia',
    currency: 'MYR',
    symbol: 'RM',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 458,
  },
  {
    countryName: 'Mozambique',
    currency: 'MZN',
    symbol: 'MTn',
    numericCode: 943,
  },
  {
    countryName: 'Namibia',
    currency: 'NAD',
    symbol: 'N$',
    numericCode: 516,
  },
  {
    countryName: 'New Caledonia',
    currency: 'XPF',
    symbol: 'XPF',
    numericCode: 953,
  },
  {
    countryName: 'Niger',
    currency: 'XOF',
    symbol: 'CFA',
    numericCode: 952,
  },
  {
    countryName: 'Norfolk Island',
    currency: 'AUD',
    symbol: 'AU$',
    numericCode: 36,
  },
  {
    countryName: 'Nigeria',
    currency: 'NGN',
    symbol: '₦',
    numericCode: 566,
  },
  {
    countryName: 'Nicaragua',
    currency: 'NIO',
    symbol: 'C$',
    dateFormat: 'MM-dd-yyyy',
    numericCode: 558,
  },
  {
    countryName: 'Netherlands',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'd-M-yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Norway',
    currency: 'NOK',
    symbol: 'Nkr',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 578,
  },
  {
    countryName: 'Nepal',
    currency: 'NPR',
    symbol: 'NPRs',
    numericCode: 524,
  },
  {
    countryName: 'Nauru',
    currency: 'AUD',
    symbol: 'AU$',
    numericCode: 36,
  },
  {
    countryName: 'Niue',
    currency: 'NZD',
    symbol: 'NZ$',
    numericCode: 554,
  },
  {
    countryName: 'New Zealand',
    currency: 'NZD',
    symbol: 'NZ$',
    dateFormat: 'd/MM/yyyy',
    numericCode: 554,
  },
  {
    countryName: 'Oman',
    currency: 'OMR',
    symbol: 'OMR',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 512,
  },
  {
    countryName: 'Panama',
    currency: 'PAB',
    symbol: 'B/.',
    dateFormat: 'MM/dd/yyyy',
    numericCode: 590,
  },
  {
    countryName: 'Peru',
    currency: 'PEN',
    symbol: 'S/.',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 604,
  },
  {
    countryName: 'French Polynesia',
    currency: 'XPF',
    symbol: 'XPF',
    numericCode: 953,
  },
  {
    countryName: 'Papua New Guinea',
    currency: 'PGK',
    symbol: 'PGK',
    numericCode: 598,
  },
  {
    countryName: 'Philippines',
    currency: 'PHP',
    symbol: '₱',
    dateFormat: 'M/d/yyyy',
    numericCode: 608,
  },
  {
    countryName: 'Pakistan',
    currency: 'PKR',
    symbol: 'PKRs',
    numericCode: 586,
  },
  {
    countryName: 'Poland',
    currency: 'PLN',
    symbol: 'zł',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 985,
  },
  {
    countryName: 'Saint Pierre and Miquelon',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Pitcairn',
    currency: 'NZD',
    symbol: 'NZ$',
    numericCode: 554,
  },
  // {
  //   countryName: "Puerto Rico",
  //   currency: "USD",
  //   symbol: "$",
  //   dateFormat: "MM-dd-yyyy",
  //   numericCode: 840,
  // },
  {
    countryName: 'Palestinian Territory',
    currency: 'ILS',
    symbol: '₪',
    numericCode: 376,
  },
  {
    countryName: 'Portugal',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'dd-MM-yyyy',
    numericCode: 978,
  },
  // {
  //   countryName: "Palau",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Paraguay',
    currency: 'PYG',
    symbol: '₲',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 600,
  },
  {
    countryName: 'Qatar',
    currency: 'QAR',
    symbol: 'QR',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 634,
  },
  {
    countryName: 'Reunion',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Romania',
    currency: 'RON',
    symbol: 'RON',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 946,
  },
  {
    countryName: 'Serbia',
    currency: 'RSD',
    symbol: 'din.',
    dateFormat: 'd.M.yyyy.',
    numericCode: 941,
  },
  {
    countryName: 'Russia',
    currency: 'RUB',
    symbol: 'RUB',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 643,
  },
  {
    countryName: 'Rwanda',
    currency: 'RWF',
    symbol: 'RWF',
    numericCode: 646,
  },
  {
    countryName: 'Saudi Arabia',
    currency: 'SAR',
    symbol: 'SR',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 682,
  },
  {
    countryName: 'Solomon Islands',
    currency: 'SBD',
    symbol: 'SBD',
    numericCode: 90,
  },
  {
    countryName: 'Seychelles',
    currency: 'SCR',
    symbol: 'SCR',
    numericCode: 690,
  },
  {
    countryName: 'Sudan',
    currency: 'SDG',
    symbol: 'SDG',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 938,
  },
  {
    countryName: 'Sweden',
    currency: 'SEK',
    symbol: 'Skr',
    dateFormat: 'yyyy-MM-dd',
    numericCode: 752,
  },
  {
    countryName: 'Singapore',
    currency: 'SGD',
    symbol: 'S$',
    dateFormat: 'M/d/yyyy',
    numericCode: 702,
  },
  {
    countryName: 'Saint Helena',
    currency: 'SHP',
    symbol: 'SHP',
    numericCode: 654,
  },
  {
    countryName: 'Slovenia',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'd.M.yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Svalbard and Jan Mayen',
    currency: 'NOK',
    symbol: 'Nkr',
    numericCode: 578,
  },
  {
    countryName: 'Slovakia',
    currency: 'EUR',
    symbol: '€',
    dateFormat: 'd.M.yyyy',
    numericCode: 978,
  },
  {
    countryName: 'Sierra Leone',
    currency: 'SLL',
    symbol: 'SLL',
    numericCode: 694,
  },
  {
    countryName: 'San Marino',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Senegal',
    currency: 'XOF',
    symbol: 'CFA',
    numericCode: 952,
  },
  {
    countryName: 'Somalia',
    currency: 'SOS',
    symbol: 'Ssh',
    numericCode: 706,
  },
  {
    countryName: 'Suriname',
    currency: 'SRD',
    symbol: 'SRD',
    numericCode: 968,
  },
  {
    countryName: 'South Sudan',
    currency: 'SSP',
    symbol: 'SSP',
    numericCode: 728,
  },
  {
    countryName: 'Sao Tome and Principe',
    currency: 'STD',
    symbol: 'STD',
    numericCode: 678,
  },
  // {
  //   countryName: "El Salvador",
  //   currency: "USD",
  //   symbol: "$",
  //   dateFormat: "MM-dd-yyyy",
  //   numericCode: 840,
  // },
  {
    countryName: 'Sint Maarten',
    currency: 'ANG',
    symbol: 'ANG',
    numericCode: 532,
  },
  {
    countryName: 'Syria',
    currency: 'SYP',
    symbol: 'SY£',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 760,
  },
  {
    countryName: 'Swaziland',
    currency: 'SZL',
    symbol: 'SZL',
    numericCode: 748,
  },
  // {
  //   countryName: "Turks and Caicos Islands",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Chad',
    currency: 'XAF',
    symbol: 'FCFA',
    numericCode: 950,
  },
  {
    countryName: 'French Southern Territories',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Togo',
    currency: 'XOF',
    symbol: 'CFA',
    numericCode: 952,
  },
  {
    countryName: 'Thailand',
    currency: 'THB',
    symbol: '฿',
    dateFormat: '๓/๖/๒๕๕๕',
    numericCode: 764,
  },
  {
    countryName: 'Tajikistan',
    currency: 'TJS',
    symbol: 'TJS',
    numericCode: 972,
  },
  {
    countryName: 'Tokelau',
    currency: 'NZD',
    symbol: 'NZ$',
    numericCode: 554,
  },
  // {
  //   countryName: "East Timor",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Turkmenistan',
    currency: 'TMT',
    symbol: 'TMT',
    numericCode: 934,
  },
  {
    countryName: 'Tunisia',
    currency: 'TND',
    symbol: 'DT',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 788,
  },
  {
    countryName: 'Tonga',
    currency: 'TOP',
    symbol: 'T$',
    numericCode: 776,
  },
  {
    countryName: 'Turkey',
    currency: 'TRY',
    symbol: '₺',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 949,
  },
  {
    countryName: 'Trinidad and Tobago',
    currency: 'TTD',
    symbol: 'TT$',
    numericCode: 780,
  },
  {
    countryName: 'Tuvalu',
    currency: 'AUD',
    symbol: 'AU$',
    numericCode: 36,
  },
  {
    countryName: 'Taiwan',
    currency: 'TWD',
    symbol: 'NT$',
    dateFormat: 'yyyy/M/d',
    numericCode: 901,
  },
  {
    countryName: 'Tanzania',
    currency: 'TZS',
    symbol: 'TSh',
    numericCode: 834,
  },
  {
    countryName: 'Ukraine',
    currency: 'UAH',
    symbol: '₴',
    dateFormat: 'dd.MM.yyyy',
    numericCode: 980,
  },
  {
    countryName: 'Uganda',
    currency: 'UGX',
    symbol: 'USh',
    numericCode: 800,
  },
  // {
  //   countryName: "United States Minor Outlying Islands",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'United States',
    currency: 'USD',
    symbol: '$',
    dateFormat: 'M/d/yyyy',
    numericCode: 840,
  },
  {
    countryName: 'Uruguay',
    currency: 'UYU',
    symbol: '$U',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 858,
  },
  {
    countryName: 'Uzbekistan',
    currency: 'UZS',
    symbol: 'UZS',
    numericCode: 860,
  },
  {
    countryName: 'Vatican',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Saint Vincent and the Grenadines',
    currency: 'XCD',
    symbol: 'XCD',
    numericCode: 951,
  },
  {
    countryName: 'Venezuela',
    currency: 'VEF',
    symbol: 'Bs.F.',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 937,
  },
  // {
  //   countryName: "British Virgin Islands",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  // {
  //   countryName: "U.S. Virgin Islands",
  //   currency: "USD",
  //   symbol: "$",
  //   numericCode: 840,
  // },
  {
    countryName: 'Vietnam',
    currency: 'VND',
    symbol: '₫',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 704,
  },
  {
    countryName: 'Vanuatu',
    currency: 'VUV',
    symbol: 'VUV',
    numericCode: 548,
  },
  {
    countryName: 'Wallis and Futuna',
    currency: 'XPF',
    symbol: 'XPF',
    numericCode: 953,
  },
  {
    countryName: 'Samoa',
    currency: 'WST',
    symbol: 'WST',
    numericCode: 882,
  },
  {
    countryName: 'Kosovo',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'Yemen',
    currency: 'YER',
    symbol: 'YR',
    dateFormat: 'dd/MM/yyyy',
    numericCode: 886,
  },
  {
    countryName: 'Mayotte',
    currency: 'EUR',
    symbol: '€',
    numericCode: 978,
  },
  {
    countryName: 'South Africa',
    currency: 'ZAR',
    symbol: 'R',
    dateFormat: 'yyyy/MM/dd',
    numericCode: 710,
  },
  {
    countryName: 'Zambia',
    currency: 'ZMW',
    symbol: 'ZK',
    numericCode: 967,
  },
  {
    countryName: 'Zimbabwe',
    currency: 'ZWL',
    symbol: 'ZWL',
    numericCode: 932,
  },
];

export default allCountry;