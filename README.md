# 🦠 COVID-19 Dashboard &middot; [![Circle CI](https://circleci.com/gh/adamalston/COVID-19-Dashboard.svg?style=shield)](https://app.circleci.com/pipelines/github/adamalston/COVID-19-Dashboard) [![Dashboard](https://img.shields.io/website?down_message=down&label=gh-pages&up_message=passing&url=https%3A%2F%2Fadamalston.github.io%2FCOVID-19-Dashboard)](https://adamalston.github.io/COVID-19-Dashboard/)

COVID-19 dashboard and map built with [Gatsby](https://www.gatsbyjs.org/), [React Leaflet](https://react-leaflet.js.org), and [Mapbox](https://www.mapbox.com/).

![COVID Map](src/assets/images/preview.png)

This dashboard includes data related to cases, deaths, and testing efforts. Information at a country level is displayed on cards that are activated on hover. Information at a global level (i.e. sum of all data) is displayed at the bottom of the page.

## 📊 Data

The data sources for this project are [JHU CSSE COVID-19 Data](https://github.com/adamalston/johns-hopkins-covid-data), [The New York Times](https://github.com/adamalston/nyt-covid-data), [Worldometers](https://www.worldometers.info/coronavirus/), and [Apple](https://www.apple.com/covid19/mobility). These sources are updated in real time via the [disease.sh](https://corona.lmao.ninja/) endpoint as case data from around the world is reported.

## 🗒️ Additional Information

-   World Health Organization (WHO): https://www.who.int/
-   US CDC: https://www.cdc.gov/coronavirus/2019-ncov/index.html
-   European Centre for Disease Prevention and Control (ECDC): https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases
