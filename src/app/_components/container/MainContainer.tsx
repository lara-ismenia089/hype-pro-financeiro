export function MainContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-6">
			<div className="mx-auto max-w-7xl space-y-6">
				{children}
			</div>
		</div>
	);
}