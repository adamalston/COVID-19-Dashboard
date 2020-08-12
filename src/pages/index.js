import React from 'react';
import { Helmet } from 'react-helmet';
import L from 'leaflet';

import { useTracker } from 'hooks';
import { formatNum, formatDate } from 'lib/util';

import Layout from 'components/Layout';
// import Container from 'components/Container';
import Map from 'components/Map';

const LOCATION = {
  lat: 0,
  lng: 0
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  const { data: stats = {} } = useTracker({
    api: 'all'
  });

  const { data: countries = [] } = useTracker({
    api: 'countries'
  });

  const hasCountries = Array.isArray( countries ) && countries.length > 0;

  const dashboardStats = [
    {
      primary: {
        label: 'Total Cases',
        value: stats ? formatNum( stats?.cases ) : '-'
      },
      secondary: {
        label: 'Per 1 Million',
        value: stats ? formatNum( stats?.casesPerOneMillion ) : '-'
      }
    },
    {
      primary: {
        label: 'Total Deaths',
        value: stats ? formatNum( stats?.deaths ) : '-'
      },
      secondary: {
        label: 'Per 1 Million',
        value: stats ? formatNum( stats?.deathsPerOneMillion ) : '-'
      }
    },
    {
      primary: {
        label: 'Total Tests',
        value: stats ? formatNum( stats?.tests ) : '-'
      },
      secondary: {
        label: 'Per 1 Million',
        value: stats ? formatNum( stats?.testsPerOneMillion ) : '-'
      }
    },
    {
      primary: {
        label: 'Active Cases',
        value: stats ? formatNum( stats?.active ) : '-'
      }
      // secondary: {
      //     label: 'Per 1 Million',
      //     value: stats ? formatNum(stats?.activePerOneMillion) : '-',
      // },
    },
    {
      primary: {
        label: 'Critical Cases',
        value: stats ? formatNum( stats?.critical ) : '-'
      }
      // secondary: {
      //     label: 'Per 1 Million',
      //     value: stats ? formatNum(stats?.criticalPerOneMillion) : '-',
      // },
    },
    {
      primary: {
        label: 'Recovered Cases',
        value: stats ? formatNum( stats?.recovered ) : '-'
      }
      // secondary: {
      //     label: 'Per 1 Million',
      //     value: stats ? formatNum(stats?.recoveredPerOneMillion) : '-',
      // },
    }
  ];

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !hasCountries || !map ) return;

    map.eachLayer(( layer ) => {
      if ( layer?.options?.name === 'OpenStreetMap' ) return;
      map.removeLayer( layer );
    });

    const geoJson = {
      type: 'FeatureCollection',
      features: countries.map(( country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: 'Feature',
          properties: {
            ...country
          },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          }
        };
      })
    };

    const geoJsonLayers = new L.GeoJSON( geoJson, {
      pointToLayer: ( feature = {}, latlng ) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const { country, updated, cases, deaths, recovered } = properties;

        casesString = `${cases}`;

        if ( cases > 1000000 ) {
          casesString = `${casesString.slice( 0, -6 )}M+`;
        } else if ( cases > 1000 ) {
          casesString = `${casesString.slice( 0, -3 )}K+`;
        }
        if ( updated ) {
          updatedFormatted = new Date( updated ).toLocaleString();
        }

        const html = `
                    <span class="icon-marker">
                        <span class="icon-marker-tooltip">
                        <h2>${country}</h2>
                        <ul>
                            <li><strong>Confirmed:</strong> ${formatNum( cases )}</li>
                            <li><strong>Deaths:</strong> ${formatNum( deaths )}</li>
                            <li><strong>Recovered:</strong> ${formatNum( recovered )}</li>
                            <li><strong>Last Update:</strong> ${updatedFormatted}</li>
                        </ul>
                        </span>
                        ${casesString}
                    </span>
                    `;

        return L.marker( latlng, {
          icon: L.divIcon({
            className: 'icon',
            html
          }),
          riseOnHover: true
        });
      }
    });

    geoJsonLayers.addTo( map );
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>COVID-19 Dashboard</title>
      </Helmet>

      <div className="tracker">
        <Map {...mapSettings} />
        <div className="tracker-stats">
          <ul>
            { dashboardStats.map(({ primary = {}, secondary = {} }, i ) => {
              return (
                <li key={`Stat-${i}`} className="tracker-stat">
                  { primary.value && (
                    <p className="tracker-stat-primary">
                      { primary.value }
                      <strong>{ primary.label }</strong>
                    </p>
                  ) }
                  { secondary.value && (
                    <p className="tracker-stat-secondary">
                      { secondary.value }
                      <strong>{ secondary.label }</strong>
                    </p>
                  ) }
                </li>
              );
            }) }
          </ul>
        </div>
        <div className="tracker-last-updated">
          <p>Last Updated: { stats ? formatDate( stats?.updated ) : '-' }</p>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
