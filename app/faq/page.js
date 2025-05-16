import Image from 'next/image';
import faq from '@/public/faq.jpg';

export const metadata = {
	title: 'FAQ',
};

export default function Page() {
	return (
		<main className="bg-beige">
			<section className="relative max-w-6xl mx-auto px-6 py-16">
				<div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
					<Image
						src={faq}
						alt="FAQ"
						placeholder="blur"
						quality={80}
						fill
						priority
						className="object-cover"
					/>
				</div>
			</section>
		</main>
	);
}
