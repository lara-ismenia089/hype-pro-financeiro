import Image from "next/image";

import {
	Mail,
	Phone,
	Building2,
} from "lucide-react";

export function FooterContent() {
	return (
		<>
			<div className="flex flex-col text-xs text-muted-foreground gap-2">
				<p className="flex gap-2 py-1 font-semibold text-[14px] items-center"><Building2 width={20} height={20} /> IF Consult LTDA</p>
				<span className="flex gap-2 items-center"><Phone width={20} height={20} /> (88) 9205-8544</span>
				<span className="flex gap-2 items-center"><Mail width={20} height={20} /> financeiro01@israelfrota.com.br</span>
			</div>
			<Image src={"/imagem.jpeg"} alt="Logo" width={50} height={50} />
		</>
	);
}