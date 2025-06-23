'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// ✅ Настройка иконок Leaflet только на клиенте
function useLeafletIcons() {
	useEffect(() => {
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
			iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
			shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
		});
	}, []);
}

// 🔘 Компонент кнопки геолокации
const LocateControl = ({ setUserPosition }) => {
	const map = useMap();

	useEffect(() => {
		const locateBtn = L.control({ position: 'topleft' });

		locateBtn.onAdd = () => {
			const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
			div.innerHTML = '🧭';
			Object.assign(div.style, {
				width: '34px',
				height: '34px',
				lineHeight: '34px',
				textAlign: 'center',
				cursor: 'pointer',
				background: 'white',
			});
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

// 📌 Основной компонент карты
export default function Map({ locations }) {
	useLeafletIcons(); // ✅ Применяем клиентскую инициализацию
	const [userPosition, setUserPosition] = useState(null);

	// Центр карты — первая точка маршрута
	const center = [
		locations[0].coordinates[1], // latitude
		locations[0].coordinates[0], // longitude
	];

	return (
		<div className="h-[600px] w-full overflow-hidden rounded-lg">
			<MapContainer center={center} zoom={6} scrollWheelZoom className="h-full w-full">
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{/* Маркеры тура */}
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

				{/* Маркер пользователя */}
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
