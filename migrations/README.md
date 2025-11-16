# 🗂️ Migrações do Banco de Dados - Panda Store

## 📋 Ordem de Execução das Migrações

Execute as migrações na ordem abaixo para configurar o banco do zero:

### 1️⃣ Configuração Inicial
```bash
# 001 - Criar estrutura das tabelas
npx wrangler d1 execute panda-store --remote --file=migrations/001_create_tables.sql

# 002 - Inserir dados iniciais (14 produtos + 8 categorias)
npx wrangler d1 execute panda-store --remote --file=migrations/002_seed_data.sql
```

### 2️⃣ Produtos Adicionais
```bash
# 005 - Inserir 21 produtos adicionais (IDs 29-52)
npx wrangler d1 execute panda-store --remote --file=migrations/005_insert_additional_products.sql
```

### 3️⃣ Correções de Imagens (Ordem Cronológica)
```bash
# 004 - Atualizar imagens produtos originais (IDs 1-14)
npx wrangler d1 execute panda-store --remote --file=migrations/004_update_existing_product_images.sql

# 007 - Corrigir imagens quebradas com URLs Unsplash
npx wrangler d1 execute panda-store --remote --file=migrations/007_fix_broken_images.sql

# 008 - Simplificar URLs Unsplash
npx wrangler d1 execute panda-store --remote --file=migrations/008_fix_unsplash_urls.sql

# 009 - Corrigir Sony WH-1000XM5
npx wrangler d1 execute panda-store --remote --file=migrations/009_fix_sony_headphones.sql

# 010 - Corrigir Apple Watch Series 9
npx wrangler d1 execute panda-store --remote --file=migrations/010_fix_apple_watch.sql
```

### ❌ Migrações Obsoletas (NÃO EXECUTAR)
```bash
# 003 - ERRO: Tentou atualizar IDs inexistentes
# 006 - OBSOLETA: Correção PlayStation já incluída em outras migrações
```

## 🚀 Script de Setup Completo

Para configurar um banco novo do zero:

```bash
#!/bin/bash
echo "🔧 Configurando banco Panda Store..."

echo "📋 1. Criando tabelas..."
npx wrangler d1 execute panda-store --remote --file=migrations/001_create_tables.sql

echo "📦 2. Inserindo dados iniciais..."
npx wrangler d1 execute panda-store --remote --file=migrations/002_seed_data.sql

echo "🛍️ 3. Adicionando produtos extras..."
npx wrangler d1 execute panda-store --remote --file=migrations/005_insert_additional_products.sql

echo "🖼️ 4. Corrigindo imagens..."
npx wrangler d1 execute panda-store --remote --file=migrations/004_update_existing_product_images.sql
npx wrangler d1 execute panda-store --remote --file=migrations/007_fix_broken_images.sql
npx wrangler d1 execute panda-store --remote --file=migrations/008_fix_unsplash_urls.sql
npx wrangler d1 execute panda-store --remote --file=migrations/009_fix_sony_headphones.sql
npx wrangler d1 execute panda-store --remote --file=migrations/010_fix_apple_watch.sql

echo "✅ Setup completo! Verificando..."
npx wrangler d1 execute panda-store --remote --command="SELECT COUNT(*) as total_produtos FROM produtos;"
npx wrangler d1 execute panda-store --remote --command="SELECT COUNT(*) as total_categorias FROM categorias;"

echo "🎉 Panda Store configurada com sucesso!"
```

## 🧪 Testar Após Setup

```bash
# Testar imagens
node test-images.js

# Verificar site local
npm run dev
# Acessar: http://localhost:5173/

# Deploy para produção
npm run build
npx wrangler deploy
```

## 📊 Estado Final Esperado

- **35 produtos** no banco
- **8 categorias** no banco
- **Todas as imagens funcionando** (URLs Unsplash)
- **Site local e produção operacionais**

---

*Última atualização: 16/11/2025*