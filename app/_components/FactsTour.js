import { Calendar, Clock, DollarSign, DollarSignIcon, Star, TrendingUp, User } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

function FactsTour({ tour }) {
	return (
		<div className="flex h-full flex-row items-start justify-center gap-24">
			<div className="mb-8">
				<h2 className="mb-4 text-lg font-bold uppercase text-orange">Quick facts</h2>

				<ul className="space-y-4 text-sm">
					<li className="flex items-center gap-3">
						<Calendar className="h-5 w-5 text-textdark" />
						<span className="font-medium">Next Date:</span>
						<span>{format(new Date(tour.startDates[0]), 'MMMM yyyy')}</span>
					</li>
					<li className="flex items-center gap-3">
						<Clock className="h-5 w-5 text-textdark" />
						<span className="font-medium">Duration:</span>
						<span>{`${tour.duration} days`}</span>
					</li>
					<li className="flex items-center gap-3">
						<TrendingUp className="h-5 w-5 text-textdark" />
						<span className="font-medium">Difficulty:</span>
						<span>{tour.difficulty}</span>
					</li>
					<li className="flex items-center gap-3">
						<User className="h-5 w-5 text-textdark" />
						<span className="font-medium">Participants:</span>
						<span>{tour.maxGroupSize} people</span>
					</li>
					<li className="flex items-center gap-3">
						<Star className="h-5 w-5 text-textdark" />
						<span className="font-medium">Rating:</span>
						<span>{tour.ratingsAverage} / 5</span>
					</li>
					<li className="flex items-center gap-3">
						<DollarSignIcon className="h-5 w-5 text-textdark" />
						<span className="font-medium">Price:</span>
						<span>{tour.price} $</span>
					</li>
				</ul>
			</div>

			<div>
				<h2 className="mb-4 text-lg font-bold uppercase text-orange">Your tour guides</h2>

				<ul className="space-y-4 text-sm">
					{tour.guides.map((guide) => (
						<li key={guide._id} className="flex items-center gap-4">
							<Image
								src={`/img/users/${guide.photo}`}
								alt={guide.name}
								width={40}
								height={40}
								className="h-10 w-10 rounded-full object-cover"
							/>
							<div>
								<p className="font-medium capitalize">{guide.role}</p>
								<p>{guide.name}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default FactsTour;
