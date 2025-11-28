
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { loadGoogleMaps } from "@/lib/loadGoogleMaps";
declare global {
  interface Window {
    google: any;
  }
}
interface Props {
  lat: number;
  lng: number;
  zoom?: number;
}
const ImoveisMap = ({ lat, lng, zoom = 16 }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  useEffect(() => {
    let mounted = true;
    async function setup() {
      try {
        await loadGoogleMaps();
        if (!mounted || !ref.current) return;
        const center = { lat, lng };
        if (mapRef.current) {
          mapRef.current.setCenter(center);
          mapRef.current.setZoom(zoom);
        } else {
          mapRef.current = new window.google.maps.Map(ref.current, {
            center,
            zoom,
            mapTypeControl: false,
            streetViewControl: false,
          });
        }
        new window.google.maps.Marker({
          position: center,
          map: mapRef.current,
        });
      } catch (e) {
        console.error("Erro ao inicializar Google Maps:", e);
      }
    }
    setup();
    return () => {
      mounted = false;
    };
  }, [lat, lng, zoom]);

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Localização</h2>
        <div
          ref={ref}
          className="h-[400px] w-full rounded-lg overflow-hidden border"
          style={{ minHeight: 300 }}
        />
      </CardContent>
    </Card>
  );
};

export default ImoveisMap;
