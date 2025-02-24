"use client";

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import { UseFormSetValue } from "react-hook-form";
import { paymentZodSchema } from "@/lib/z/z-payment-schema";
import { z } from "zod";
import useLocation from "@/lib/geo-location/location-hooks";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps {
  setValue: UseFormSetValue<z.infer<typeof paymentZodSchema>>;
  lat: number;
  lng: number;
}

const PaymentLocationPicker = ({ setValue, lat, lng }: MapProps) => {
  const defaultCenterAndMarker: LatLngTuple = [lat, lng];
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple>(
    defaultCenterAndMarker
  );
  const currentZoom = lat !== 0 && lng !== 0 ? 18 : 1;

  const { location, isLoading, error, getLocation } = useLocation();

  useEffect(() => {
    if (!error && !isLoading && !!location) {
      setMarkerPosition(location);
    }
  }, [isLoading]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        setValue("latitude", lat);
        setValue("longitude", lng);
      },
    });
    return null;
  };

  return (
    <div
      style={{
        height: "400px",
        width: "100%",
        overflow: "hidden",
        border: "1px solid green",
        borderRadius: "10px",
        // aspectRatio: DEFAULT_WIDTH / DEFAULT_HEIGHT,
      }}
    >
      <MapContainer
        center={markerPosition}
        zoom={currentZoom}
        scrollWheelZoom={true}
        dragging={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        {markerPosition && <Marker position={markerPosition} />}
      </MapContainer>
    </div>
  );
};

export default PaymentLocationPicker;
