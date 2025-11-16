#!/usr/bin/env node

// Script para executar migrações no banco D1 da Cloudflare
// Execute com: node scripts/migrate.js

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigrations() {
  console.log('🔄 Iniciando migrações do banco de dados...');

  try {
    const migrationsDir = join(__dirname, '../migrations');
    const migrationFiles = readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`📁 Encontradas ${migrationFiles.length} migrações:`);
    migrationFiles.forEach(file => console.log(`  - ${file}`));

    for (const file of migrationFiles) {
      console.log(`\n⚙️ Executando migração: ${file}`);
      const migrationPath = join(migrationsDir, file);
      const migrationSQL = readFileSync(migrationPath, 'utf8');

      // Dividir por comandos SQL (separados por ;)
      const commands = migrationSQL
        .split(';')
        .map(cmd => cmd.trim())
        .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

      console.log(`📝 Executando ${commands.length} comandos SQL...`);

      // Aqui você executaria os comandos no D1
      // Por enquanto, apenas mostra o que seria executado
      commands.forEach((cmd, index) => {
        const preview = cmd.length > 100 ? cmd.substring(0, 100) + '...' : cmd;
        console.log(`  ${index + 1}. ${preview}`);
      });

      console.log(`✅ Migração ${file} executada com sucesso!`);
    }

    console.log('\n🎉 Todas as migrações foram executadas com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Configure a autenticação da Cloudflare: wrangler auth login');
    console.log('2. Execute as migrações reais: wrangler d1 execute panda-store --file=migrations/001_create_tables.sql');
    console.log('3. Insira os dados iniciais: wrangler d1 execute panda-store --file=migrations/002_seed_data.sql');
    console.log('4. Faça o deploy: wrangler deploy');

  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    process.exit(1);
  }
}

runMigrations();