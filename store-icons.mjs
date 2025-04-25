import fs from 'fs'
import fetch from 'node-fetch'

const baseUrl = 'http://localhost:8080/https://finance.kapital.kz'

const iconUrls = [
  '/img/countries/usa.svg',
  '/img/countries/european-union.svg',
  '/img/countries/russia.svg',
  '/img/countries/australia.svg',
  '/img/countries/united-kingdom.svg',
  '/img/countries/denmark.svg',
  '/img/countries/uae.svg',
  '/img/countries/canada.svg',
  '/img/countries/china.svg',
  '/img/countries/kuwait.svg',
  '/img/countries/kyrgyzstan.svg',
  '/img/countries/latvia.svg',
  '/img/countries/moldova.svg',
  '/img/countries/norway.svg',
  '/img/countries/saudi-arabia.svg',
  '/img/countries/XDR.svg',
  '/img/countries/singapore.svg',
  '/img/countries/uzbekistan.svg',
  '/img/countries/ukraine.svg',
  '/img/countries/sweden.svg',
  '/img/countries/switzerland.svg',
  '/img/countries/latvia.svg',
  '/img/countries/south-korea.svg',
  '/img/countries/japan.svg',
  '/img/countries/belarus.svg',
  '/img/countries/poland.svg',
  '/img/countries/south-africa.svg',
  '/img/countries/turkey.svg',
  '/img/countries/hungary.svg',
  '/img/countries/czech-republic.svg',
  '/img/countries/tajikistan.svg',
  '/img/countries/hong-kong.svg',
  '/img/countries/brazil.svg',
  '/img/countries/malaysia.svg',
  '/img/countries/azerbaijan.svg',
  '/img/countries/india.svg',
  '/img/countries/thailand.svg',
  '/img/countries/armenia.svg',
  '/img/countries/georgia.svg',
  '/img/countries/iran.svg',
  '/img/countries/mexico.svg',
]

const storeIcon = async (baseUrl, iconUrl) => {
  const iconPath = iconUrl.split('/').at(-1)
  const url = baseUrl + iconUrl
  fetch(url, {
    headers: {
      'x-requested-with': 'XMLHttpRequest',
    },
  })
    .then((res) => {
      const dest = fs.createWriteStream('ICONS/' + iconPath)
      res.body.pipe(dest)
      console.log('✅ Download complete')
    })
    .catch((err) => {
      console.error('❌ Error:', err.message)
    })
}

iconUrls.forEach((url) => {
  storeIcon(baseUrl, url)
})
