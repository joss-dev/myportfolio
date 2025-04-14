import { useState } from "react";

export default function ContactForm({ title = "Contacto" }) {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
  
    const form = e.currentTarget; 
    const formData = new FormData(form);
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
  
      let data: { message?: string; error?: string } = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.warn("Error al parsear JSON:", jsonError);
        }
      }
  
      if (response.ok) {
        setSuccessMessage(data?.message || "Mensaje enviado con éxito");
        form.reset(); 
      } else {
        setErrorMessage(data?.error || "Hubo un error al enviar el mensaje");
      }
    } catch (error) {
      setErrorMessage("Hubo un error al enviar el mensaje");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 4000);
    }
  };
  

  return (
    <section id="contact" className="py-10 px-4 max-w-2xl mx-auto text-center scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>

      <form
        id="contact-form"
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 space-y-6 text-left"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-600 transition disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white" />
              <span>Cargando...</span>
            </div>
          ) : (
            "Enviar Mensaje"
          )}
        </button>
      </form>

      {successMessage && (
        <div className="text-green-500 bg-green-100 p-3 mt-4 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="text-red-500 bg-red-100 p-3 mt-4 rounded-md">
          {errorMessage}
        </div>
      )}
    </section>
  );
}
