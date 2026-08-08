import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = import.meta.env.RESEND_API_KEY;
    const emailTo = import.meta.env.EMAIL_TO;

    if (!apiKey || !emailTo) {
      console.error("Faltan variables de entorno para Resend (RESEND_API_KEY o EMAIL_TO).");
      return new Response(JSON.stringify({ error: "El servicio de mensajería no está disponible temporalmente" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(apiKey);
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    // Validaciones de campos requeridos
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Campos obligatorios faltantes" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (message.length > 1000 || name.length > 100 || email.length > 100) {
      return new Response(JSON.stringify({ error: "Los campos tienen un tamaño excesivo" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Correo electrónico no válido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitizar texto para evitar inyecciones HTML en el email
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await resend.emails.send({
      from: 'Formulario <onboarding@resend.dev>',
      to: emailTo,
      subject: `Nuevo mensaje de portafolio: ${safeName}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0284c7;">Nuevo mensaje desde el formulario de contacto</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <hr style="border: 0; border-top: 1px solid #ccc;" />
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background: #f9f9f9; border-left: 4px solid #0284c7; margin: 0; padding: 10px 15px;">
            ${safeMessage}
          </blockquote>
        </div>
      `,
    });

    return new Response(JSON.stringify({ message: "Mensaje enviado con éxito" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return new Response(JSON.stringify({ error: "Hubo un error al enviar el mensaje" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
