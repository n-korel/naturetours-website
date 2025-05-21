'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Иконки по умолчанию
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
	iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Компонент кнопки и логики геолокации
const LocateControl = ({ setUserPosition }) => {
	const map = useMap();

	useEffect(() => {
		const locateBtn = L.control({ position: 'topleft' });

		locateBtn.onAdd = () => {
			const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
			div.innerHTML = '🧭';
			div.style.width = '34px';
			div.style.height = '34px';
			div.style.lineHeight = '34px';
			div.style.textAlign = 'center';
			div.style.cursor = 'pointer';
			div.style.background = 'white';
			div.title = 'Показать мое местоположение';

			div.onclick = () => {
				if (!navigator.geolocation) {
					alert('Геолокация не поддерживается браузером');
					return;
				}

				navigator.geolocation.getCurrentPosition(
					(pos) => {
						const coords = [pos.coords.latitude, pos.coords.longitude];
						setUserPosition(coords);
						map.flyTo(coords, 13);
					},
					(err) => {
						console.error(err);
						alert('Не удалось получить местоположение');
					},
				);
			};

			return div;
		};

		locateBtn.addTo(map);

		return () => {
			locateBtn.remove();
		};
	}, [map, setUserPosition]);

	return null;
};

export default function Map({ locations }) {
	const [userPosition, setUserPosition] = useState(null);
	const center = [locations[0].coordinates[1], locations[0].coordinates[0]];

	return (
		<div className="h-[600px] w-full overflow-hidden rounded-lg">
			<MapContainer center={center} zoom={6} scrollWheelZoom className="h-full w-full">
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{locations.map((loc) => {
					const icon = L.divIcon({
						className: 'custom-div-icon',
						html: `
                                <div class="text-center">
                                    <div class="bg-white px-2 py-1 text-xs font-semibold rounded shadow-md">
                                    День ${loc.day}: ${loc.description}
                                    </div>
                                    <img src="https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png" />
                                </div>
                                `,
						iconSize: [120, 40],
						iconAnchor: [15, 40],
					});

					return (
						<Marker key={loc._id} position={[loc.coordinates[1], loc.coordinates[0]]} icon={icon} />
					);
				})}

				{/* Маркер местоположения */}
				{userPosition && (
					<Marker
						position={userPosition}
						icon={L.divIcon({
							className: 'user-icon',
							html: `
                <div class="text-center">
                  <div class="bg-blue-500 text-white px-2 py-1 rounded shadow text-xs">
                    Вы здесь
                  </div>
                  <img src="https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png" />
                </div>
              `,
							iconSize: [100, 40],
							iconAnchor: [15, 40],
						})}
					/>
				)}

				{/* Кнопка геолокации */}
				<LocateControl setUserPosition={setUserPosition} />
			</MapContainer>
		</div>
	);
}
