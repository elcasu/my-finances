import { UseFormRegister } from "react-hook-form";

type MoneyFieldProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
};

import { InputNumberFormat } from "@react-input/number-format";
import { FieldValues, Path } from "react-hook-form";

export default function MoneyField<T extends FieldValues>({
  name,
  register,
  label,
  required,
  placeholder = "$ 0",
}: MoneyFieldProps<T>) {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>

      <InputNumberFormat
        id="amount"
        locales="en"
        maximumFractionDigits={2}
        inputMode="decimal"
        placeholder={placeholder}
        {...register(name, {
          required,
          setValueAs: (value) => {
            if (!value) return 0;
            return Number(value.replace(/,/g, ""));
          },
        })}
      />
    </div>
  );
}
