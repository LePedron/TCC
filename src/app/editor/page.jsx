"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const templates = [
    "/OOOOOOMaecompraanajulia.jpg",
    "/NOWYOUNEVERGONNAPOOPAGAIN.jpg",
    "/OOOOOOMaeecomprairanrafael.jpg",
    "/IRMAOOOOOOO.jpg",
    "/AREVOLUCAOOOOOOOOO.jpg",
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
        }

    }

    function criarMeme() {
        if (selecionadas.length !== 2) {
            alert("Selecione exatamente duas imagens!");
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
        <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-2 text-4xl font-black">
                    Criador de Memes
                </h1>

                <p className="mb-8 text-gray-400">
                    Selecione duas imagens e escreva suas legendas.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {templates.map((imagem) => (
                        <button
                            key={imagem}
                            onClick={() => selecionarImagem(imagem)}
                            className={`overflow-hidden rounded-xl border-4 ${selecionadas.includes(imagem)
                                    ? "border-purple-500"
                                    : "border-transparent"
                                }`}
                        >
                            <img
                                src={imagem}
                                alt="Template de meme"
                                className="h-44 w-full object-cover"
                            />
                            <span className="block bg-gray-900 p-2 text-sm">
                                {selecionadas.includes(imagem)
                                    ? "Selecionada ✓"
                                    : "Selecionar"}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                        Texto da primeira imagem
                        <input
                            value={texto1}
                            onChange={(e) => setTexto1(e.target.value)}
                            placeholder="Digite o primeiro texto"
                            className="mt-2 w-full rounded-lg bg-gray-800 p-3 text-white"
                        />
                    </label>

                    <label className="block">
                        Texto da segunda imagem
                        <input
                            value={texto2}
                            onChange={(e) => setTexto2(e.target.value)}
                            placeholder="Digite o segundo texto"
                            className="mt-2 w-full rounded-lg bg-gray-800 p-3 text-white"
                        />
                    </label>
                </div>

                <button
                    onClick={criarMeme}
                    className="mt-8 rounded-xl bg-purple-600 px-8 py-3 font-bold hover:bg-purple-500"
                >
                    Criar
                </button>
            </div>
        </main>

    );
}