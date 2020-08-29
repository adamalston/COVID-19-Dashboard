import { mapServices } from 'data/map-services';

// get all preconfigured services
export function getMapServices() {
  return mapServices || [];
}

export function getMapServiceByName( name, userServices = []) {
  const services = [...getMapServices(), ...userServices];
  return services.find(( service ) => service.name === name );
}
