const filters = ['Dates', 'Guests', 'Location', 'Transfer type', 'Price'];

export default function Filters() {
	return (
		<div className="mb-6 mt-8 flex flex-wrap justify-center gap-4">
			{filters.map((filter) => (
				<button
					key={filter}
					className="rounded-full border bg-white px-6 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
				>
					{filter}
				</button>
			))}
		</div>
	);
}
