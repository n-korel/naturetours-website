import Image from 'next/image';
import naturetours from '@/public/naturetours.jpg';
import Link from 'next/link';

export default function Page() {
	return (
		<main className="bg-beige text-textdark font-sans">
			<section className="relative max-w-7xl mx-auto px-6 py-16">
				<div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
					<Image
						src={naturetours}
						alt="Mountain landscape"
						placeholder="blur"
						quality={80}
						fill
						priority
						className="object-cover"
					/>

					<div className="absolute top-0 left-0 bg-forest/90 text-white p-10 max-w-[400px] h-full flex flex-col justify-center">
						<h1 className="text-4xl lg:text-4xl font-bold leading-tight mb-6">
							Исследуйте мир вместе с нами
						</h1>
						<p className="text-lg mb-8">Открой для себя путешествия!</p>
						<Link
							href="/tours"
							className="inline-flex items-center justify-center bg-orange text-white px-6 py-2 rounded-full font-medium text-lg hover:bg-orange/90 transition"
						>
							Изучать
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
