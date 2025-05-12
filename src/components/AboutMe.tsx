import { useEffect } from "react";
import TypeIt from "typeit";
import { Download, Briefcase } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
}

export default function About({
  title = "Conoce más sobre mí",
  description = "Soy desarrollador Full-Stack con experiencia en React.js, Node.js, TypeScript, MongoDB, PostgreSQL, orientado al trabajo en equipo y la mejora continua. Me destaco por mi comunicación clara, adaptabilidad y enfoque en la resolución de problemas. Aspiro a crecer como desarrollador de software, aportando en proyectos con impacto real y aprendiendo de entornos colaborativos."
}: Props) {
  useEffect(() => {
    new TypeIt("#typewriter", {
      speed: 80,
      loop: true,
      waitUntilVisible: true,
    })
      .type("Mi nombre es Jose M. Candia")
      .pause(1000)
      .delete()
      .type("Desarrollador Fullstack.")
      .pause(1500)
      .delete()
      .go();
  }, []);

  return (
    <section id="about" className="py-24 px-4 max-w-4xl mx-auto text-center">
      <div className="mb-10">
        <h1
          id="typewriter"
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 mb-2"
        ></h1>
        <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"></h2>
      </div>

      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 tracking-tight">
        {title}
      </h2>

      <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
        {description}
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <a
          href="/micv.pdf"
          download="Mi-CV-Candia.pdf"
          className="inline-flex items-center gap-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm bg-white/5"
        >
          <Download className="w-5 h-5" />
          Descargar CV
        </a>

        <a
          href="#projects"
          className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-gray-900 transition px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm bg-white/5"
        >
          <Briefcase className="w-5 h-5" />
          Ver Proyectos
        </a>
      </div>
    </section>
  );
}
