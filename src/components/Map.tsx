import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FC } from 'react';
import { LatLngTuple } from 'leaflet';

interface IMapProps {
  latitude: number;
  longitude: number;
}

const Map: FC<IMapProps> = ({ latitude, longitude }) => {
  const position: LatLngTuple = [latitude, longitude];

  return (
    <MapContainer
      center={position}
      scrollWheelZoom={false}
      zoomControl={true}
      zoom={13}
      style={{
        height: '250px',
        minWidth: '228px',
        padding: '0.5rem',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>Hotel Location</Popup>
      </Marker>
    </MapContainer>
  );
};
export default Map;
