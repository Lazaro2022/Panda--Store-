-- Migration: Create initial tables for Panda Store

-- Create categorias table
CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create produtos table
CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco REAL NOT NULL,
  preco_promocional REAL,
  categoria_id INTEGER,
  marca TEXT,
  estoque INTEGER NOT NULL DEFAULT 0,
  especificacoes TEXT,
  is_ativo INTEGER NOT NULL DEFAULT 1,
  is_destaque INTEGER NOT NULL DEFAULT 0,
  imagem_principal TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_produtos_categoria_id ON produtos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_produtos_is_ativo ON produtos(is_ativo);
CREATE INDEX IF NOT EXISTS idx_produtos_is_destaque ON produtos(is_destaque);
CREATE INDEX IF NOT EXISTS idx_categorias_slug ON categorias(slug);