// src/lib/loadGoogleMaps.ts
export function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();

    if ((window as any).google && (window as any).google.maps) {
      return resolve();
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps="true"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("VITE_GOOGLE_MAPS_API_KEY não encontrada.");
      reject(new Error("Missing Google Maps API key"));
      return;
    }

    const script = document.createElement("script");
    script.setAttribute("data-google-maps", "true");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Erro ao carregar Google Maps"));
    document.head.appendChild(script);
  });
}
