import Image from 'next/image';
import beach from '@/public/beach.jpg';
import FAQ from '../_components/FAQ';

export const metadata = {
	title: 'FAQ',
};

export default function Page() {
	return (
		<main className="bg-beige">
			<section className="relative mx-auto max-w-7xl px-6 py-16">
				<div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-xl">
					<Image
						src={beach}
						alt="Beach landscape"
						placeholder="blur"
						quality={80}
						fill
						priority
						className="object-cover"
					/>

					<div className="absolute left-0 top-0 flex h-full max-w-[400px] flex-col items-center justify-center bg-orange/90 p-10 text-white">
						<h1 className="mb-6 text-7xl font-bold leading-tight">FAQ</h1>
						<p className="mb-8 text-lg">Search for answers here!</p>
					</div>
				</div>
			</section>
			<section>
				<FAQ />
			</section>
		</main>
	);
}
