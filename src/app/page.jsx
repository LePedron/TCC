"use client";

import { useRouter } from "next/navigation";

export default function Home() {
const router = useRouter();

return (
<main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-6 text-center text-white">
<h1 className="mb-4 text-5xl font-black">
MEME GENERATOR
</h1>

  <p className="mb-8 max-w-md text-gray-400">
    Escolha suas imagens, crie combinações e faça seus próprios memes.
  </p>

  <button
    onClick={() => router.push("/editor")}
    className="rounded-xl bg-purple-600 px-10 py-4 font-bold transition hover:bg-purple-500"
  >
    Acessar
  </button>
</main>

);
}
