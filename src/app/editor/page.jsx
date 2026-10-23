"use client";
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const templates = [
  "/OOOOOOMaecompraanajulia.jpg",
  "/vovodofubafazendosupino.jpg",
  "/caralhoeutomuitobrasileira.jpg",
  "/IRMAOOOOOOO.jpg",
  "/abixxxxxqueveiiiiiii.jpg",
  "/FRIDGEEEED.jpg",
];

export default function Editor() {
  const router = useRouter();

  const [selecionadas, setSelecionadas] = useState([]);
  const [texto1, setTexto1] = useState("");
  const [texto2, setTexto2] = useState("");

  function selecionarImagem(imagem) {
    if (selecionadas.includes(imagem)) {
      setSelecionadas(
        selecionadas.filter((item) => item !== imagem)
      );
      return;
    }

    if (selecionadas.length < 2) {
      setSelecionadas([...selecionadas, imagem]);
    } else {
      setSelecionadas([selecionadas[1], imagem]);
    }
  }

  function criarMeme() {
    if (selecionadas.length !== 2) {
      alert("BROTHER, selecione duas imagens primeiro!");
      return;
    }

    const dados = {
      imagem1: selecionadas[0],
      imagem2: selecionadas[1],
      texto1,
      texto2,
    };

    sessionStorage.setItem("memeCriado", JSON.stringify(dados));
    router.push("/resultado");
  }

  return (
    <main className="min-h-screen bg-gray-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center text-4xl font-black">
          GERADOR DE MEMES 🐩
        </h1>

        <p className="mb-8 mt-3 text-center text-gray-400">
          Escolha dois memes e junte tudo em um só!
        </p>

        <h2 className="mb-4 text-2xl font-bold">
          1. Escolha suas imagens
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {templates.map((imagem) => {
            const selecionada = selecionadas.includes(imagem);

            return (
              <button
                key={imagem}
                type="button"
                onClick={() => selecionarImagem(imagem)}
                className={`overflow-hidden rounded-xl border-4 text-left transition ${selecionada
                    ? "border-purple-500 scale-[0.98]"
                    : "border-gray-800 hover:border-purple-300"
                  }`}
              >
                <img
                  src={imagem}
                  alt="Modelo de meme"
                  className="h-40 w-full object-cover sm:h-56"
                />

                <p className="bg-gray-900 p-3 text-center text-sm font-bold">
                  {selecionada
                    ? `Selecionada ${selecionadas.indexOf(imagem) + 1} ✓`
                    : "Selecionar"}
                </p>
              </button>
            );
          })}
        </div>

        <h2 className="mb-4 mt-10 text-2xl font-bold">
          2. Edite seu meme
        </h2>

        {selecionadas.length === 2 ? (
  <div className="mx-auto grid max-w-4xl grid-cols-2 items-stretch overflow-hidden rounded-xl border-4 border-purple-500 bg-black">
    {selecionadas.map((imagem, indice) => (
      <div
        key={imagem}
        className="relative min-w-0"
      >
        <img
          src={imagem}
          alt={`Parte ${indice + 1} do meme`}
          className="block aspect-square h-full w-full object-cover"
        />

        <p className="absolute bottom-3 left-1 right-1 text-center text-sm font-black uppercase text-white [text-shadow:2px_2px_3px_black,-2px_-2px_3px_black] sm:text-xl">
          {indice === 0
            ? texto1 || "Seu primeiro texto"
            : texto2 || "Seu segundo texto"}
        </p>
      </div>
    ))}
  </div>
) : (
  <div className="rounded-xl bg-gray-800 p-8 text-center text-gray-300">
    Selecione duas imagens acima para ver seu meme montado!
  </div>
)}


        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="font-semibold">
            Texto da primeira imagem
            <input
              value={texto1}
              onChange={(e) => setTexto1(e.target.value)}
              placeholder="Digite o primeiro texto..."
              className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white outline-none focus:border-purple-500"
            />
          </label>

          <label className="font-semibold">
            Texto da segunda imagem
            <input
              value={texto2}
              onChange={(e) => setTexto2(e.target.value)}
              placeholder="Digite o segundo texto..."
              className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white outline-none focus:border-purple-500"
            />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-xl bg-gray-700 px-6 py-3 font-bold hover:bg-gray-600"
          >
            Voltar ao início
          </button>

          <button
            type="button"
            onClick={criarMeme}
            className="rounded-xl bg-purple-600 px-10 py-3 font-black hover:bg-purple-500"
          >
            CRIAR MEME 🔥
          </button>
        </div>
      </div>
    </main>
  );
}