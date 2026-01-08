import UserInputForm from "@/src/components/UserInputForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-700">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-5 px-0">
        <h1 className="text-2xl border-b border-b-blue-300 w-full flex items-center justify-center pb-5">
          Control de gastos
        </h1>
        <div className="pt-6 w-full px-6">
          <UserInputForm />
        </div>
      </main>
    </div>
  );
}
