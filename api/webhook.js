import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Envie um metodo POST via WhatsTEIA' });
  }

  const body = req.body;
  const message = body?.message?.body?.toLowerCase() || '';
  const rawPhone = body?.ticket?.contact?.number; // O número já estará no formato correto
  const keyword = process.env.KEYWORD?.toLowerCase();

  // Log para verificar a estrutura do webhook e o número
  console.log('Estrutura completa do webhook:', body);
  console.log('Número recebido no webhook:', rawPhone);

  if (message.includes(keyword)) {
    try {
      const response = await fetch(process.env.TEIA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.TEIA_API_TOKEN}`
        },
        body: JSON.stringify({
          body: `Uhuuuu! fico feliz que você tenha testado a nossa IA VENDEDOR VIRTUAL.\n\nContrate a sua falando agora com minha equipe no link abaixo:\n\n*wa.me/5511950266656*\n\nótimas vendas, @joaocarlosvendas`,
          number: rawPhone, // Envio direto do número sem nenhuma modificação
          externalKey: process.env.EXTERNAL_KEY,
          note: {
            body: "Mensagem automática via webhook por *_Júnior Santos_*",
            mediaUrl: ""
          }
        })
      });

      const result = await response.json();
      return res.status(200).json({ success: true, sent: true, number: rawPhone, result });

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return res.status(500).json({ error: 'Erro ao enviar a mensagem', details: error.message });
    }
  }

  return res.status(200).json({ success: true, sent: false });
}
