import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Envie um metodo POST via WhatsTEIA' });
  }

  const body = req.body;

  const message = body?.message?.body?.toLowerCase() || '';
  const rawPhone = body?.ticket?.contact?.number || '';
  const keyword = process.env.KEYWORD?.toLowerCase();

  // Limpa qualquer caractere não numérico e monta o número no formato internacional
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const phone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

  // Log do número para debugar
  console.log('Número formatado:', phone);

  if (message.includes(keyword)) {
    const response = await fetch(process.env.TEIA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.TEIA_API_TOKEN}`
      },
      body: JSON.stringify({
        body: `Uhuuuu!
fico feliz que você tenha testado a nossa IA VENDEDOR VIRTUAL.

Contrate a sua falando agora com minha equipe no link abaixo:

*wa.me/5511950266656*

ótimas vendas, @joaocarlosvendas`,
        number: phone,
        externalKey: process.env.EXTERNAL_KEY,
        note: {
          body: "Mensagem automática via webhook por *_Júnior Santos_*",
          mediaUrl: ""
        }
      })
    });

    const result = await response.json();
    return res.status(200).json({ success: true, sent: true, number: phone, result });
  }

  return res.status(200).json({ success: true, sent: false });
}
