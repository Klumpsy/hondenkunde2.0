"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Fix: Next.js / webpack breaks Leaflet's default marker icon resolution.
// Deleting _getIconUrl prevents the large broken default marker from appearing.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: "", iconRetinaUrl: "", shadowUrl: "" });

export interface TravelLocation {
  id: string;
  title: string;
  slug: string;
  country: string;
  countrySlug: string;
  location: string;
  latitude: number;
  longitude: number;
}

interface TravelMapProps {
  travels: TravelLocation[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  interactive?: boolean;
}

const pawIcon = L.divIcon({
  html: `<div style="position:relative;width:28px;height:40px;cursor:pointer;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" style="position:absolute;top:0;left:0;width:28px;height:40px;">
      <path d="M14 0C6.3 0 0 6.3 0 14c0 9.8 14 26 14 26s14-16.2 14-26C28 6.3 21.7 0 14 0z" fill="#da9e00" stroke="#14446c" stroke-width="2"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="position:absolute;top:2px;left:50%;transform:translateX(-50%);width:22px;height:22px;display:block;">
      <ellipse cx="12" cy="16" rx="6" ry="5" fill="white"/>
      <ellipse cx="5"  cy="10" rx="3" ry="3.5" fill="white"/>
      <ellipse cx="10" cy="7"  rx="3" ry="3.5" fill="white"/>
      <ellipse cx="14" cy="7"  rx="3" ry="3.5" fill="white"/>
      <ellipse cx="19" cy="10" rx="3" ry="3.5" fill="white"/>
    </svg>
  </div>`,
  className: "",
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40],
});

const TravelMap = ({
  travels,
  center = [51.5, 8.0],
  zoom = 5,
  height = "500px",
  interactive = true,
}: TravelMapProps) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height, width: "100%", borderRadius: "1rem", zIndex: 0 }}
      scrollWheelZoom={false}
      dragging={interactive}
      zoomControl={interactive}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>-bijdragers © <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      {travels.map((travel) => (
        <Marker
          key={travel.id}
          position={[travel.latitude, travel.longitude]}
          icon={pawIcon}
        >
          <Popup>
            <div style={{ textAlign: "center", fontFamily: "sans-serif", minWidth: "140px" }}>
              <strong style={{ display: "block", marginBottom: "4px", color: "#14446c", fontSize: "14px" }}>
                {travel.title}
              </strong>
              <span style={{ color: "#888", fontSize: "12px" }}>
                {travel.location}, {travel.country}
              </span>
              <br />
              <Link
                href={`/vakantie-met-hond/${travel.countrySlug}/${travel.slug}`}
                style={{ color: "#da9e00", fontWeight: "700", textDecoration: "none", marginTop: "8px", display: "inline-block", fontSize: "13px" }}
              >
                Bekijk de reis →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TravelMap;
