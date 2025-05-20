import Image from 'next/image';
import { Clock, MapPin, Star } from 'lucide-react';

function MainImage({ tour }) {
	return (
		<div className="relative w-full  h-full rounded-xl overflow-hidden">
			<Image
				src={`/img/tours/${tour.imageCover}`}
				alt={tour.name}
				quality={80}
				fill
				priority
				className="object-cover"
			/>

			<div className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center text-center px-4">
				<h1 className="text-4xl md:text-6xl font-bold mb-2">{tour.name}</h1>
				<p className="text-lg md:text-xl">{tour.summary}</p>
				<div className="flex gap-5 text-white mt-4">
					<div className="flex gap-2">
						<Clock />
						{`${tour.duration} days`}
					</div>
					<div className="flex gap-2">
						<MapPin />
						{tour.startLocation.description}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainImage;
