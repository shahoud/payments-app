"use client";

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useMemo, useEffect } from "react";

// Fix Leaflet default marker icons
import L from "leaflet";
import useLocation from "@/lib/geo-location/location-hooks";
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PaymentLocationPicker = ({
  onMarkerPositionChange,
}: {
  onMarkerPositionChange: (position: LatLngTuple) => void;
}) => {
  // Default center and marker for the map
  const defaultMapCenter: LatLngTuple = [33.5138, 36.2765];

  // Call to useLocation hook
  const { location, isLoading, error } = useLocation();

  // State for marker position and map center
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(
    defaultMapCenter
  ); // Marker position default to map center
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(defaultMapCenter);

  // Update mapCenter when location is fetched
  useEffect(() => {
    if (!error && !isLoading && !!location) {
      setMapCenter(location);
      setMarkerPosition(location); // Optional: Update the marker to the fetched location
    }
  }, [location, isLoading, error]);

  // Handle map clicks and place a marker
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]); // Update marker position
        onMarkerPositionChange([lat, lng]); // Pass position to parent
      },
    });

    return null;
  };

  // Memoize the MapContainer
  const mapContent = useMemo(() => {
    if (!mapCenter) {
      return null; // Avoid rendering the map until the center is determined
    }
    return (
      <MapContainer
        center={mapCenter}
        zoom={1}
        scrollWheelZoom={true}
        dragging={true}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {markerPosition && <Marker position={markerPosition} />}
      </MapContainer>
    );
  }, [mapCenter, markerPosition]);

  return (
    <div style={{ position: "relative" }}>
      {/* {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="loader"></div>
        </div>
      )} */}
      {mapContent}
    </div>
  );
};

export default PaymentLocationPicker;
