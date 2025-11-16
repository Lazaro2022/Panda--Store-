
CREATE TABLE produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco REAL NOT NULL,
  preco_promocional REAL,
  categoria_id INTEGER,
  marca TEXT,
  estoque INTEGER DEFAULT 0,
  especificacoes TEXT,
  is_ativo BOOLEAN DEFAULT 1,
  is_destaque BOOLEAN DEFAULT 0,
  imagem_principal TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_produtos_categoria ON produtos(categoria_id);
CREATE INDEX idx_produtos_ativo ON produtos(is_ativo);
CREATE INDEX idx_produtos_destaque ON produtos(is_destaque);
