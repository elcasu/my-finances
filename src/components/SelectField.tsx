import Select from "react-select";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type SelectOption<T = string> = {
  label: string;
  value: T;
};

type SelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
  label: string;
  required?: boolean;
  inputId: string;
  className?: string;
  onChange?: (value: string) => void;
};

export default function SelectField<T extends FieldValues>({
  name,
  control,
  options,
  label,
  required,
  inputId,
  className = "",
  onChange,
}: SelectFieldProps<T>) {
  return (
    <div className="input-wrapper">
      <label htmlFor={inputId}>{label}</label>

      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field, fieldState }) => (
          <>
            <Select
              instanceId={inputId}
              options={options}
              isSearchable={false}
              className={className}
              value={options.find((opt) => opt.value === field.value) ?? null}
              onChange={(opt) => {
                field.onChange(opt?.value ?? null);
                if (opt?.value) {
                  onChange?.(opt.value);
                }
              }}
            />

            {fieldState.error && (
              <span className="text-red-500 text-sm">Campo obligatorio</span>
            )}
          </>
        )}
      />
    </div>
  );
}
