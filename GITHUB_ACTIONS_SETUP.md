# Configuração do GitHub Actions para Deploy Automático

Este projeto está configurado para fazer deploy automático no Cloudflare Workers sempre que houver um push para a branch `main`.

## 🔧 Pré-requisitos

Você precisa configurar 2 secrets no GitHub para que o deploy automático funcione:

### 1. CLOUDFLARE_API_TOKEN

Este é o token de API do Cloudflare que permite o GitHub Actions fazer deploy.

**Como obter:**

1. Acesse: https://dash.cloudflare.com/profile/api-tokens
2. Clique em **"Create Token"**
3. Use o template **"Edit Cloudflare Workers"** ou crie um custom token com as permissões:
   - `Account.Cloudflare Workers Scripts:Edit`
   - `Account.Account Settings:Read`
   - `Zone.Workers Routes:Edit`
4. Copie o token gerado (você só verá ele uma vez!)

### 2. CLOUDFLARE_ACCOUNT_ID

Este é o ID da sua conta Cloudflare.

**Como obter:**

1. Acesse: https://dash.cloudflare.com/
2. No menu lateral, clique em **"Workers & Pages"**
3. O Account ID está no lado direito da página, algo como: `abc123def456...`

OU

Execute no terminal:
```bash
npx wrangler whoami
```

O Account ID será exibido na saída.

## 📝 Como Adicionar os Secrets no GitHub

1. Vá para o repositório no GitHub: https://github.com/Lazaro2022/Panda--Store-
2. Clique em **Settings** (Configurações)
3. No menu lateral esquerdo, clique em **Secrets and variables** → **Actions**
4. Clique em **"New repository secret"**
5. Adicione cada secret:

   **Secret 1:**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: [Cole o token da API aqui]
   - Clique em "Add secret"

   **Secret 2:**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: [Cole o Account ID aqui]
   - Clique em "Add secret"

## ✅ Verificar se está funcionando

Depois de configurar os secrets:

1. Faça qualquer alteração no código
2. Commit e push para a branch `main`:
   ```bash
   git add .
   git commit -m "Test: verificar deploy automático"
   git push origin main
   ```
3. Vá para a aba **Actions** no GitHub: https://github.com/Lazaro2022/Panda--Store-/actions
4. Você verá o workflow "Deploy to Cloudflare" em execução
5. Aguarde alguns minutos até ele completar
6. Se tudo estiver verde ✅, o deploy foi bem-sucedido!

## 🚀 Workflow Automático

O que acontece automaticamente:

1. ✅ **Push para main** → GitHub detecta a mudança
2. ✅ **Install dependencies** → Instala pacotes npm
3. ✅ **Build** → Compila a aplicação (TypeScript + Vite)
4. ✅ **Deploy** → Envia para Cloudflare Workers
5. ✅ **Site atualizado** → Mudanças estão live!

## 🔍 Troubleshooting

### Erro: "Invalid API Token"
- Verifique se o token foi copiado corretamente
- Crie um novo token com as permissões corretas

### Erro: "Account ID not found"
- Confirme o Account ID usando `npx wrangler whoami`
- Verifique se não há espaços extras no secret

### Workflow não executa
- Verifique se os secrets foram adicionados corretamente
- Confirme que está fazendo push para a branch `main`

## 📖 Deploy Manual (Alternativa)

Se preferir fazer deploy manual, você pode continuar usando:

```bash
npm run build
npx wrangler deploy
```

Isso não requer configuração de secrets no GitHub.

## 🎯 Próximos Passos

Depois de configurar os secrets:

1. Teste fazendo um push
2. Verifique a aba Actions
3. Confirme que o site foi atualizado em produção
4. A partir de agora, todo push para `main` fará deploy automático! 🎉
