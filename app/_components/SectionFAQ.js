export default function SectionFAQ({ title, children }) {
	return (
		<div>
			<h2 className="mb-4 text-2xl font-semibold text-textdark">{title}</h2>
			<div className="space-y-3">{children}</div>
		</div>
	);
}
