// src/services/geocode.ts
import axios from "axios";

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export async function geocodeEndereco(enderecoCompleto: string): Promise<{ lat: number; lng: number } | null> {
  try {
    if (!GOOGLE_KEY) {
      console.error("Google API key missing");
      return null;
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      enderecoCompleto
    )}&key=${GOOGLE_KEY}`;

    const res = await axios.get(url, { timeout: 8000 });
    const data = res.data;

    if (!data) return null;
    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      console.warn("Geocode não OK:", data.status, data.error_message || "");
      return null;
    }

    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng };
  } catch (err) {
    console.error("Erro no geocodeAddress:", err);
    return null;
  }
}
