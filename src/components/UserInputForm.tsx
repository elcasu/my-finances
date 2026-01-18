"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Operation } from "@/types";
import { useForm } from "react-hook-form";
import { submitOperationForm } from "@/src/app/actions";
import SelectField from "./SelectField";
import MoneyField from "./MoneyField";
import SubmitButton from "./SubmitButton";

const operationTypeLabels = ["Gasto diario", "Gasto fijo", "Ingreso"] as const;

type UserInputFormProps = {
  categories: Record<string, string[]>;
};

const UserInputForm = ({ categories }: UserInputFormProps) => {
  const categoryTypes = Object.keys(categories);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryType, setCategoryType] = useState(categoryTypes[0]);

  const operationTypeOptions = categoryTypes.map((type, i) => ({
    value: type,
    label: operationTypeLabels[i],
  }));

  const { register, control, reset, handleSubmit } = useForm<Operation>({
    defaultValues: {
      type: operationTypeOptions[0]!.value,
      category: null,
    },
  });
  const categoryOptions = categories[categoryType].map((category) => ({
    value: category,
    label: category,
  }));

  const handleTypeChange = (value: string) => {
    setCategoryType(value);
  };

  const action: () => void = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      await submitOperationForm(data);
      toast.success("Movimiento guardado");
      reset();
      setIsSubmitting(false);
    } catch (e) {
      toast.error("Error al guardar el movimiento");
      console.error(e);
      setIsSubmitting(false);
    }
  });

  return (
    <form action={action} className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-5">
        <MoneyField name="amount" label="Monto" register={register} required />

        <SelectField
          name="type"
          label="Tipo"
          control={control}
          className="text-blue-800"
          options={operationTypeOptions}
          required
          inputId="type"
          onChange={handleTypeChange}
        />

        <SelectField
          name="category"
          label="Categoría"
          control={control}
          className="text-blue-800"
          options={categoryOptions}
          required
          inputId="category"
        />

        <div className="input-wrapper">
          <label htmlFor="notes">Nota</label>
          <input id="notes" {...register("notes")} />
        </div>
      </div>

      <div className="mt-10">
        <SubmitButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
};

export default UserInputForm;
