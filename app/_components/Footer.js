function Footer() {
	return (
		<footer className="bg-forest text-white px-6 py-4 mt-20">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-2xl font-medium mb-4">Подпишись на нашу рассылку!</h2>

				<form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<input
						type="email"
						placeholder="you@email.com"
						className="px-4 py-2 rounded-full w-full sm:w-96 text-black focus:outline-none"
					/>
					<button
						type="submit"
						className="bg-orange text-white px-6 py-2 rounded-full hover:bg-orange/90 transition"
					>
						Subscribe
					</button>
				</form>

				<p className="text-sm mt-10 text-lightgray">© 2025 by Nick Korelskiy</p>
			</div>
		</footer>
	);
}

export default Footer;
