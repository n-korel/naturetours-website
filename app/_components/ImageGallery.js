'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ImageGallery({ tour }) {
	const [selectedImage, setSelectedImage] = useState(tour.images[0]);

	return (
		<div>
			<div className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-md">
				<Image
					src={`/img/tours/${selectedImage}`}
					alt={tour.name}
					fill
					className="object-cover transition duration-300 ease-in-out"
				/>
			</div>

			<div className={`mt-2 grid grid-cols-3 gap-2`}>
				{tour.images.map((img, index) => (
					<button
						type="button"
						key={index}
						onClick={() => setSelectedImage(img)}
						className={`relative h-20 overflow-hidden rounded border shadow-sm transition hover:opacity-80 ${
							selectedImage === img ? 'ring-primary ring-2' : 'border-gray-200'
						}`}
						aria-label={`Выбрать изображение ${index + 1}`}
					>
						<Image
							src={`/img/tours/${img}`}
							alt={`${tour.name} ${index + 1}`}
							fill
							className="object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	);
}
