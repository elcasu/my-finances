import { getServerSession } from "next-auth";
import UserInputForm from "@/src/components/UserInputForm";
import { getOperationCategories } from "../lib/sheets";

export default async function Home() {
  const session = await getServerSession();
  const operationCategories = (await getOperationCategories()) as Record<
    string,
    string[]
  >;
  if (!session) {
    return (
      <form
        action="/api/auth/signin/google"
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <button className="bg-red-500 p-5 rounded-2xl font-bold">
          Ingresar con Google
        </button>
      </form>
    );
  }

  if (!operationCategories) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-5 px-0">
        <h1 className="text-2xl border-b border-b-blue-300 w-full flex items-center justify-center pb-5">
          Mis Finanzas
        </h1>
        <div className="pt-6 w-full px-6">
          <UserInputForm categories={operationCategories} />
        </div>
      </main>
    </div>
  );
}
