import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Envie um metodo POST via WhatsTEIA' });
  }

  const body = req.body;
  const firstMessage = body?.ticket?.firstMessage?.toLowerCase() || '';  // Pegando o 'firstMessage'
  const rawPhone = body?.ticket?.contact?.number;  // Número extraído corretamente
  const keyword = process.env.KEYWORD?.toLowerCase();  // A palavra-chave definida

  // Verificando se o 'firstMessage' contém a palavra-chave
  if (firstMessage.includes(keyword)) {
    try {
      console.log('Enviando para a API TEIA:', rawPhone);  // Log de verificação

      const response = await fetch(process.env.TEIA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.TEIA_API_TOKEN}`
        },
        body: JSON.stringify({
          body: `Uhuuuu! fico feliz que você tenha testado a nossa IA VENDEDOR VIRTUAL.\n\nContrate a sua falando agora com minha equipe no link abaixo:\n\n*wa.me/5511950266656*\n\nótimas vendas, @joaocarlosvendas`,
          number: rawPhone,  // Enviando o número corretamente
          externalKey: process.env.EXTERNAL_KEY,
          note: {
            body: "Mensagem automática via webhook por *_Júnior Santos_*",
            mediaUrl: ""
          }
        })
      });

      // Logando status da resposta e o JSON recebido
      const result = await response.json();
      console.log('Resultado da API:', result);

      if (response.ok) {
        return res.status(200).json({ success: true, sent: true, number: rawPhone, result });
      } else {
        console.error('Erro na requisição para a API', result);
        return res.status(response.status).json({ error: 'Erro na requisição para a API', details: result });
      }

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return res.status(500).json({ error: 'Erro ao enviar a mensagem', details: error.message });
    }
  }

  return res.status(200).json({ success: true, sent: false });
}
