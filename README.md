# Webhook Handler - Vercel

Este projeto é uma função serverless que escuta webhooks e envia mensagens para a API da TEIA, baseado em palavra-chave.

## 📦 Estrutura

- `api/webhook.js`: Função que trata o POST.
- `.env.example`: Arquivo com variáveis globais para configurar.

## 🚀 Como usar

1. Clone este repositório.
2. Copie o arquivo `.env.example` para `.env` e ajuste os valores.
3. Instale o Vercel CLI e rode localmente:

```bash
npm install
vercel dev
```

4. Faça deploy com:

```bash
vercel --prod
```

A função ficará disponível em:

```
https://<seu-projeto>.vercel.app/api/webhook
```

## 🔐 Variáveis de ambiente

- `TEIA_API_URL`: URL da API de destino.
- `TEIA_API_TOKEN`: Token Bearer da autenticação.
- `EXTERNAL_KEY`: ID externo de rastreio.
- `KEYWORD`: Palavra-chave para ativar o envio.

