export function FooterContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col items-start justify-between gap-3 border-t pt-4 sm:flex-row">
			{children}
		</div>
	);
}