'use client';

import { useState } from 'react';
import SectionFAQ from './SectionFAQ';
import FAQItem from './FAQItem';

const faq = [
	{
		title: 'Bookings',
		questions: [
			{
				question: 'Why has the price for the trip changed?',
				answer:
					"We regret to inform you that you've missed out this time. Our special offers are available for a limited duration, and to secure great deals, it\'as essential to act promptly. Ensure you've subscribed to our email newsletter to stay informed about upcoming sales and promotions.",
			},
			{
				question: 'Booking an individual room',
				answer:
					'Yes, individual room bookings are possible, but they are subject to availability and may incur an additional charge. If you prefer not to share a room, make sure to select the “single room” option during checkout.',
			},
			{
				question: 'Booking an extras',
				answer:
					'Extras such as travel insurance, guided tours, and airport transfers can be added during the booking process. Some extras may have limited availability, so we recommend adding them as early as possible to secure your spot.',
			},
			{
				question: 'Trip cancellations and refund',
				answer:
					'Our cancellation policy allows for a full or partial refund depending on how far in advance you cancel. Cancellations made 30+ days prior to departure typically receive a full refund, minus any non-refundable fees. Please read our cancellation terms carefully before booking.',
			},
		],
	},
	{
		title: 'Payments',
		questions: [
			{
				question: 'Can I pay by debit card?',
				answer:
					"Absolutely. We accept most major debit cards, including Visa and Mastercard. Just make sure your card has sufficient funds and international payments enabled if you're booking from outside the country.",
			},
			{
				question: 'Why do I need to make full payment?',
				answer:
					'Full payment secures your spot and allows us to make necessary arrangements like hotel bookings, permits, and local transportation. It also helps us maintain lower prices by avoiding last-minute changes and uncertainties.',
			},
			{
				question: 'Discounts and vouchers',
				answer:
					'We frequently offer discounts via our newsletter or social media. If you have a voucher code, you can enter it at checkout to redeem your discount. Only one voucher can be used per booking unless stated otherwise.',
			},
		],
	},
	{
		title: 'COVID-19',
		questions: [
			{
				question: 'Are there vaccination requirements for trips?',
				answer:
					'Some destinations require proof of vaccination depending on local regulations. We recommend checking the travel advisories of your destination country and ensuring your vaccinations are up to date before traveling.',
			},
			{
				question: 'Do I have to wear a mask while travelling?',
				answer:
					'Mask requirements vary by destination and local health guidelines. While many countries have lifted mandates, we still encourage wearing masks in crowded or enclosed spaces for your safety and that of others.',
			},
			{
				question: 'Am I eligible for refund if I feel unwell?',
				answer:
					'If you test positive for COVID-19 or feel unwell before departure, please contact us immediately. Depending on your circumstances and the timing, you may be eligible for a refund or travel credit. We recommend purchasing travel insurance that includes COVID-related coverage.',
			},
		],
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(false);

	let globalIndex = 0;

	const toggle = (index) => {
		setOpenIndex(openIndex === index ? false : index);
	};

	return (
		<div className="mx-auto max-w-7xl space-y-10 p-6">
			{faq.map((section) => (
				<SectionFAQ title={section.title} key={section.title}>
					{section.questions.map((q) => (
						<FAQItem
							index={globalIndex++}
							openIndex={openIndex}
							toggle={toggle}
							question={q.question}
							answer={q.answer}
							key={globalIndex++}
						/>
					))}
				</SectionFAQ>
			))}
		</div>
	);
}
