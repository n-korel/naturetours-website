import Image from 'next/image';
import naturetours from '@/public/naturetours.jpg';
import Link from 'next/link';
import TravelCategories from './_components/TravelCategories';
import HotOffer from './_components/HotOffer';
import Top5CheapTours from './_components/Top5CheapTours';

export default function Page() {
	return (
		<main className="bg-beige font-sans text-textdark">
			<section className="relative mx-auto max-w-7xl px-6 py-16">
				<div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-xl">
					<Image
						src={naturetours}
						alt="Mountain landscape"
						placeholder="blur"
						quality={80}
						fill
						priority
						className="object-cover"
					/>

					<div className="absolute left-0 top-0 flex h-full max-w-[400px] flex-col justify-center bg-forest/90 p-10 text-white">
						<h1 className="mb-6 text-4xl font-bold leading-tight lg:text-4xl">
							Исследуйте мир вместе с нами
						</h1>
						<p className="mb-8 text-lg">Открой для себя путешествия!</p>
						<Link
							href="/tours"
							className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-2 text-lg font-medium text-white transition hover:bg-orange/90"
						>
							Изучать
						</Link>
					</div>
				</div>
			</section>
			<TravelCategories />
			<HotOffer />
			<Top5CheapTours />
		</main>
	);
}
