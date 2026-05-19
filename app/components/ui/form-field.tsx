import {
	Control,
	Controller,
	FieldValues,
	Path,
} from "react-hook-form";

import {
	Field,
	FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";


type FormFieldProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	type?: string;
	placeholder?: string;
};

function FormField<T extends FieldValues>({
	name,
	control,
	type = "text",
	placeholder,
}: FormFieldProps<T>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field>
					<Input
						{ ...field }
						type={type}
						placeholder={placeholder}
						className="text-white bg-[#262626] border border-transparent focus:border-[#00a8ff] focus:ring-1 focus:ring-[#00a8ff]"
					/>
					{fieldState.error && (
						<FieldError
							errors={[fieldState.error]}
							className="
								flex justify-center
								bg-red-500/10
								border border-red-500/30
								text-red-400
								text-sm
								py-2 px-3
								rounded-md
								animate-in fade-in"
						/>
					)}
				</Field>
			)}
		/>
	);
};

export { FormField };