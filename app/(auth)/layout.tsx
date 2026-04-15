import { Container } from "@/app/components/ui/container";

export default async function AuthLayout({ children }: Readonly<{	children: React.ReactNode }>) {
	return (
		<main className="min-h-screen w-full flex item-center justify-center">
			<Container>
				{ children }
			</Container>
		</main>
	);
}