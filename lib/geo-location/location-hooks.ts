import { useState, useEffect } from "react";
import { LatLngTuple } from "leaflet";

interface LocationError {
  code: number;
  message: string;
}

export default function useLocation() {
  const [location, setLocation] = useState<LatLngTuple>([0, 0]);
  const [error, setError] = useState<LocationError | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: "Geolocation is not supported by your browser.",
      });
      setIsLoading(false); // Done loading
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]); // Use `LatLngTuple`
        setError(null); // Clear errors
        setIsLoading(false); // Done loading
      },
      (err) => {
        setError({ code: err.code, message: err.message });
        setLocation([0, 0]); // Use the fallback location
        setIsLoading(false); // Done loading
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation(); // Fetch location on mount
  }, []);

  return { location, error, isLoading, getLocation };
}
