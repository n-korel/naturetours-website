import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';

function Logo() {
	return (
		<Link href="/" className="z-10 flex items-center gap-4">
			<Image
				src={logo}
				quality={100}
				alt="Nature Tours logo"
				width={60}
				height={60}
				className="rounded-full"
			/>
			<span className="text-xl font-semibold text-orange">Nature Tours</span>
		</Link>
	);
}

export default Logo;
