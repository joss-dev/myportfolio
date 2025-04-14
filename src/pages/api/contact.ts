import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    // Validaciones de campos
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

    await resend.emails.send({
      from: 'Formulario <tu-nombre@resend.dev>',
      to: import.meta.env.EMAIL_TO,
      subject: `Mensaje de ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif;">
          <h2>Nuevo mensaje desde tu formulario</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });
    return new Response(JSON.stringify({ message: "Mensaje enviado con éxito" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Hubo un error al enviar el mensaje" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
