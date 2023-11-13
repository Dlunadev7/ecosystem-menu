import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

const ResizeMap = () => {
  const map = useMap();
  map.invalidateSize();
  return null;
};

export default function Map({ latitude, longitude }: { latitude: number, longitude: number }) {
  
  return (
    <div style={{ width: '100%', height: 300}}>
      <MapContainer center={[-34.60376, -58.38162]} zoom={16} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
        <ResizeMap />
        <TileLayer
          // url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          // attribution="&copy; <a href='https://stadiamaps.com/'>Stadia Maps</a>, &copy; <a href='https://openmaptiles.org/'>OpenMapTiles</a> &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={[-34.60376, -58.38162]}>

        </Marker>
      </MapContainer>
    </div>
  )
}