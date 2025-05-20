'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ImageGallery({ tour }) {
	const [selectedImage, setSelectedImage] = useState(tour.images[0]);

	return (
		<div className="mt-8">
			<div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md">
				<Image
					src={`/img/tours/${selectedImage}`}
					alt={tour.name}
					fill
					className="object-cover transition duration-300 ease-in-out"
				/>
			</div>

			<div className={`grid gap-2 grid-cols-3`}>
				{tour.images.map((img, index) => (
					<button
						type="button"
						key={index}
						onClick={() => setSelectedImage(img)}
						className={`relative h-20 rounded overflow-hidden shadow-sm border transition hover:opacity-80 ${
							selectedImage === img ? 'ring-2 ring-primary' : 'border-gray-200'
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
