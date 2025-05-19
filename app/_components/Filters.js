const filters = ['Dates', 'Guests', 'Location', 'Transfer type', 'Price'];

export default function Filters() {
	return (
		<div className="flex gap-4 justify-center flex-wrap mt-8 mb-6">
			{filters.map((filter) => (
				<button
					key={filter}
					className="bg-white rounded-full border px-6 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
				>
					{filter}
				</button>
			))}
		</div>
	);
}
