#!/usr/bin/env node

/**
 * Script de Setup Automático do Banco de Dados - Panda Store
 *
 * Este script executa todas as migrações necessárias na ordem correta
 * para configurar um banco Cloudflare D1 do zero.
 *
 * Uso: node scripts/setup-database.js [--local]
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurações
const DATABASE_NAME = 'panda-store';
const isLocal = process.argv.includes('--local');
const remoteFlag = isLocal ? '' : '--remote';

// Ordem correta das migrações
const MIGRATION_ORDER = [
  '001_create_tables.sql',
  '002_seed_data.sql',
  '005_insert_additional_products.sql',
  '004_update_existing_product_images.sql',
  '007_fix_broken_images.sql',
  '008_fix_unsplash_urls.sql',
  '009_fix_sony_headphones.sql',
  '010_fix_apple_watch.sql'
];

// Cores para output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function executeCommand(command, description) {
  try {
    log(`🔄 ${description}...`, 'blue');
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    log(`✅ ${description} - Sucesso`, 'green');
    return result;
  } catch (error) {
    log(`❌ ${description} - Erro: ${error.message}`, 'red');
    throw error;
  }
}

function executeMigration(migrationFile) {
  const migrationPath = join(__dirname, '../migrations', migrationFile);
  const command = `npx wrangler d1 execute ${DATABASE_NAME} ${remoteFlag} --file=${migrationPath}`;

  try {
    executeCommand(command, `Executando ${migrationFile}`);
    return true;
  } catch (error) {
    log(`⚠️ Falha na migração ${migrationFile}: ${error.message}`, 'yellow');
    return false;
  }
}

async function setupDatabase() {
  const target = isLocal ? 'LOCAL' : 'REMOTO';

  log(`🚀 Iniciando setup do banco ${target} da Panda Store...`, 'bold');
  log(`Database: ${DATABASE_NAME}`, 'blue');

  let successCount = 0;
  let errorCount = 0;

  // Executar migrações na ordem
  for (const migration of MIGRATION_ORDER) {
    if (executeMigration(migration)) {
      successCount++;
    } else {
      errorCount++;
    }
  }

  // Verificar resultado final
  log(`\n📊 Verificando estado final do banco...`, 'blue');

  try {
    const produtosResult = executeCommand(
      `npx wrangler d1 execute ${DATABASE_NAME} ${remoteFlag} --command="SELECT COUNT(*) as total FROM produtos;"`,
      'Contando produtos'
    );

    const categoriasResult = executeCommand(
      `npx wrangler d1 execute ${DATABASE_NAME} ${remoteFlag} --command="SELECT COUNT(*) as total FROM categorias;"`,
      'Contando categorias'
    );

    log(`\n🎉 Setup concluído!`, 'green');
    log(`✅ Migrações executadas: ${successCount}`, 'green');
    if (errorCount > 0) {
      log(`⚠️ Migrações com erro: ${errorCount}`, 'yellow');
    }

    log(`\n📋 Próximos passos:`, 'bold');
    log(`1. Testar imagens: node test-images.js`, 'blue');
    log(`2. Iniciar dev server: npm run dev`, 'blue');
    log(`3. Acessar: http://localhost:5173/`, 'blue');

    if (!isLocal) {
      log(`4. Deploy produção: npm run build && npx wrangler deploy`, 'blue');
    }

  } catch (error) {
    log(`❌ Erro na verificação final: ${error.message}`, 'red');
  }
}

// Executar script
setupDatabase().catch((error) => {
  log(`💥 Erro fatal: ${error.message}`, 'red');
  process.exit(1);
});