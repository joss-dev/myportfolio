// src/components/About.tsx
import { Briefcase, Download } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  description?: string;
}

export default function About({
  title = "Conoce más sobre mí",
  description = "Software Developer enfocado en backend, integración de APIs e inteligencia artificial. También desarrollo frontend con React/Next.js y trabajo con PostgreSQL y MongoDB para construir soluciones escalables orientadas a negocio.",
}: Props) {
  return (
    <section
      id="about"
      className="relative py-24 px-4 max-w-4xl mx-auto text-center"
    >
      {/* Fondo animado sutil */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] animate-pulse opacity-20 blur-2xl rounded-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 mb-2">
          <TypeAnimation
            sequence={[
              "Mi nombre es Jose M. Candia",
              1500,
              "Desarrollador Fullstack.",
              1500,
              "Apasionado por la tecnología.",
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 tracking-tight"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
      >
        {description}
      </motion.p>

      <motion.div
        className="flex justify-center gap-4 flex-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <a
          href="/micv.pdf"
          download="Mi-CV-Candia.pdf"
          className="group relative inline-flex items-center gap-2 border border-cyan-400 text-cyan-400 hover:text-gray-900 transition px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm bg-white/5 overflow-hidden"
        >
          <span className="absolute inset-0 bg-cyan-400 opacity-10 blur-md transition duration-300 group-hover:opacity-30" />
          <Download className="w-5 h-5 z-10" />
          <span className="z-10">Descargar CV</span>
        </a>

        <a
          href="#projects"
          className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-gray-900 transition px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm bg-white/5"
        >
          <Briefcase className="w-5 h-5" />
          Ver Proyectos
        </a>
      </motion.div>
    </section>
  );
}
