"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Resultado() {
  const router = useRouter();
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    const dados = sessionStorage.getItem("memeCriado");

    if (dados) {
      setMeme(JSON.parse(dados));
    }

  }, []);

  function baixarMeme() {
    if (!meme) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const largura = 600;
    const altura = 600;

    canvas.width = largura * 2;
    canvas.height = altura;

    const carregarImagem = (src) =>
      new Promise((resolve, reject) => {
        const imagem = new Image();
        imagem.onload = () => resolve(imagem);
        imagem.onerror = reject;
        imagem.src = src;
      });

    Promise.all([
      carregarImagem(meme.imagem1),
      carregarImagem(meme.imagem2),
    ])
      .then(([imagem1, imagem2]) => {
        [imagem1, imagem2].forEach((imagem, indice) => {
          const x = indice * largura;

          ctx.drawImage(imagem, x, 0, largura, altura);

          const texto = indice === 0 ? meme.texto1 : meme.texto2;

          ctx.fillStyle = "white";
          ctx.strokeStyle = "black";
          ctx.lineWidth = 5;
          ctx.font = "bold 30px Impact, sans-serif";
          ctx.textAlign = "center";

          ctx.strokeText(texto.toUpperCase(), x + largura / 2, altura - 35);
          ctx.fillText(texto.toUpperCase(), x + largura / 2, altura - 35);
        });

        const link = document.createElement("a");
        link.download = "meu-meme.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      })
      .catch(() => {
        alert("Não foi possível carregar uma das imagens.");
      });

  }

  if (!meme) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <p>Carregando resultado...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-4xl font-black">
          Seu meme está pronto!
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={meme.imagem1}
              alt="Primeira parte do meme"
              className="aspect-square w-full object-cover"
            />
            <p className="absolute bottom-0 w-full bg-black/70 p-4 text-center text-xl font-black uppercase">
              {meme.texto1}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl">
            <img
              src={meme.imagem2}
              alt="Segunda parte do meme"
              className="aspect-square w-full object-cover"
            />
            <p className="absolute bottom-0 w-full bg-black/70 p-4 text-center text-xl font-black uppercase">
              {meme.texto2}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={baixarMeme}
            className="rounded-xl bg-green-600 px-6 py-3 font-bold hover:bg-green-500"
          >
            Baixar meme
          </button>

          <button
            onClick={() => router.push("/editor")}
            className="rounded-xl bg-purple-600 px-6 py-3 font-bold hover:bg-purple-500"
          >
            Criar outro
          </button>
        </div>
      </div>
    </main>

  );
}