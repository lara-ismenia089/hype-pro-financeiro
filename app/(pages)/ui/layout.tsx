export default async function PagesLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="min-h-screen w-full bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-4">
			<div className="mx-auto max-w-7xl space-y-6">
				{ children }
			</div>
		</main>
	);
}