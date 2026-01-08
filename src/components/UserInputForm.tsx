"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CATEGORIES, OperationType, Operation } from "@/types";
import { useForm } from "react-hook-form";
import { submitOperationForm } from "@/src/app/actions";
import SelectField from "./SelectField";
import MoneyField from "./MoneyField";

const categoryOptions = CATEGORIES.map((category) => ({
  value: category,
  label: category,
}));

const operationTypeOptions: { value: OperationType; label: string }[] = [
  { value: "Gasto", label: "Gasto" },
  { value: "Ingreso", label: "Ingreso" },
];

const UserInputForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, control, reset, handleSubmit } = useForm<Operation>({
    defaultValues: {
      type: operationTypeOptions[0]!.value,
      category: null,
    },
  });

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
    <form action={action} className="flex flex-col gap-5">
      <MoneyField name="amount" label="Monto" register={register} required />

      <SelectField
        name="type"
        label="Tipo"
        control={control}
        className="text-blue-800"
        options={operationTypeOptions}
        required
        inputId="type"
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

      <div className="mt-10">
        <input
          type="submit"
          className="p-5 bg-green-800 rounded-lg w-full"
          value={isSubmitting ? "Enviando..." : "Enviar"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default UserInputForm;
