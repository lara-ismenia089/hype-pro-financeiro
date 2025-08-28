import Image from "next/image";

type HeaderProps = {
	title: string;
	subtitle: string;
};

export function Header(headerProps: HeaderProps) {
	return (
		<div>
			<Image src="/hype_logo.png" alt="logo" width={100} height={100} />
			<h1 className="text-2xl font-semibold tracking-tight">{headerProps.title}</h1>
			<p className="text-sm text-muted-foreground">
				{headerProps.subtitle}
			</p>
		</div>
	)
}