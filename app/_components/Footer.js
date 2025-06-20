function Footer() {
	return (
		<footer className="mt-20 bg-forest px-6 py-4 text-white">
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="mb-4 text-2xl font-medium">Подпишись на нашу рассылку!</h2>

				<form className="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<input
						type="email"
						placeholder="you@email.com"
						className="w-full rounded-full px-4 py-2 text-black focus:outline-none sm:w-96"
					/>
					<button
						type="submit"
						className="rounded-full bg-orange px-6 py-2 text-white transition hover:bg-orange/90"
					>
						Subscribe
					</button>
				</form>

				<p className="mt-10 text-sm text-lightgray">© 2025 by Nick Korelsky</p>
			</div>
		</footer>
	);
}

export default Footer;
