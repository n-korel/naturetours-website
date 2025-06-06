import { ChevronDown } from 'lucide-react';

export default function FAQItem({ index, openIndex, toggle, question, answer }) {
	const isOpen = openIndex === index;

	return (
		<div
			onClick={() => toggle(index)}
			className="cursor-pointer rounded-2xl bg-[#e5dbc4] p-6 transition-all duration-300 hover:bg-[#e1d4bc]"
		>
			<div className="flex items-center justify-between text-base font-semibold text-textdark">
				<span>{question}</span>
				<span>{isOpen ? <ChevronDown /> : ''}</span>
			</div>

			{isOpen && answer && <p className="mt-2 text-sm text-gray-700">{answer}</p>}
		</div>
	);
}
