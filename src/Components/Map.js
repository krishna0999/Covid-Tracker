import { MapContainer as LeafletMap,
    TileLayer,
    useMap } from "react-leaflet";
import { showDataOnMap } from "../utils";


function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="h-96 mt-4 shadow-md map">
      <LeafletMap className="h-full rounded-md">
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer
        className="h-full bg-blue-900"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map
