"use client";

import {
	useEffect,
	useState,
} from "react";

import {
	InteractiveGridPattern
} from "@/components/ui/interactive-grid-pattern";


type ContainerProps = {
	children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
	const [grid, setGrid] = useState<[number, number]>([42, 18]);

	useEffect(() => {
		const updateGrid = () => {
			const squareSize = window.innerWidth < 768 ? 50 : 40;

			const horizontal = Math.ceil(window.innerWidth / squareSize);
			const vertical = Math.ceil(window.innerHeight / squareSize);

			setGrid([horizontal, vertical]);
		};

		updateGrid();
		window.addEventListener("resize", updateGrid);

		return () => window.removeEventListener("resize", updateGrid);
	}, []);

	return (
		<div className="relative w-full min-h-screen flex justify-center items-center bg-black">
			<InteractiveGridPattern
				className="absolute inset-0 w-full h-full opacity-40"
				squares={grid}
				width={40}
				height={40}
				squaresClassName="stroke-white/10"
			/>

			<div className="relative z-10">
				{children}
			</div>
		</div>
	);
};

export { Container };