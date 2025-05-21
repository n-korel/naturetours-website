import Image from 'next/image';
import { Clock, MapPin, Star } from 'lucide-react';

function MainImage({ tour }) {
	return (
		<div className="relative h-full w-full overflow-hidden rounded-xl">
			<Image
				src={`/img/tours/${tour.imageCover}`}
				alt={tour.name}
				quality={80}
				fill
				priority
				className="object-cover"
			/>

			<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center text-white">
				<h1 className="mb-2 text-4xl font-bold md:text-6xl">{tour.name}</h1>
				<p className="text-lg md:text-xl">{tour.summary}</p>
				<div className="mt-4 flex gap-5 text-white">
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
