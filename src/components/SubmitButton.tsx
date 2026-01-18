type ButtonProps = {
  isSubmitting?: boolean;
  value?: string;
  submittingValue?: string;
};

const SubmitButton = ({
  isSubmitting = false,
  value = "Enviar",
  submittingValue = "Enviando...",
}: ButtonProps) => {
  return (
    <input
      type="submit"
      className="p-5 bg-orange-500 text-gray-800 font-bold uppercase rounded-lg w-full"
      value={isSubmitting ? submittingValue : value}
      disabled={isSubmitting}
    />
  );
};

export default SubmitButton;
