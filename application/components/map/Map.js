"use client";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

const redIcon = new L.Icon({
    iconUrl: "https://www.freeiconspng.com/uploads/red-location-icon-map-png-4.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const blueIcon = new L.Icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

export default function MapComponent() {
    const [position, setPosition] = useState([28.6139, 77.2090]);
    const [searchQuery, setSearchQuery] = useState("");
    const [markerPosition, setMarkerPosition] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [route, setRoute] = useState([]);
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const coords = [latitude, longitude];
                setCurrentLocation(coords);
                setPosition(coords);
            },
            (err) => {
                console.error("Error getting location:", err.message);
                alert("Unable to retrieve your location. Please enable location services and try again.");
            },
            { enableHighAccuracy: true }
        );
    }, []);

    const searchLocation = async () => {
        if (!searchQuery) return;
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
            );
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const newPosition = [parseFloat(lat), parseFloat(lon)];
                setMarkerPosition(newPosition);
                setPosition(newPosition);
                drawRoute(newPosition);
            } else {
                alert("Location not found!");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    const drawRoute = async (destination) => {
        if (!currentLocation) {
            alert("Current location not found!");
            return;
        }
        try {
            const response = await axios.get(
                `https://router.project-osrm.org/route/v1/driving/${currentLocation[1]},${currentLocation[0]};${destination[1]},${destination[0]}?geometries=geojson`
            );
            if (response.data.routes.length > 0) {
                const coordinates = response.data.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]);
                setRoute(coordinates);

                const distanceMeters = response.data.routes[0].distance;
                const distanceKm = (distanceMeters / 1000).toFixed(2);
                setDistance(distanceKm);
            } else {
                alert("Route not found!");
            }
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={searchLocation}
                >
                    Search
                </button>
            </div>

            {distance !== null && (
                <p className="text-lg font-semibold text-blue-600">
                    Distance: {distance} km
                </p>
            )}

            <MapContainer center={position} zoom={12} className="w-[100%] h-[300px] xl:h-[390px] lg:h-[280px]" >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <ChangeView center={position} />

                {currentLocation && (
                    <Marker position={currentLocation} icon={blueIcon}>
                        <Popup>You are here!</Popup>
                    </Marker>
                )}

                {markerPosition && (
                    <Marker position={markerPosition} icon={redIcon}>
                        <Popup>
                            <b>Latitude:</b> {markerPosition[0]}, <b>Longitude:</b> {markerPosition[1]}
                        </Popup>
                    </Marker>
                )}

                {route.length > 0 && (
                    <Polyline
                        positions={route}
                        color="red"
                        weight={5}
                        opacity={0.8}
                        lineJoin="round"
                    />
                )}
            </MapContainer>
        </div>
    );
}

function ChangeView({ center }) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
}
