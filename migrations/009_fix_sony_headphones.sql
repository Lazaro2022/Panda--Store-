-- Migração: Corrigir especificamente as imagens dos Sony WH-1000XM5
-- Usar URLs diferentes do Unsplash para fones de ouvido

-- Corrigir Sony WH-1000XM5 (ID 8)
UPDATE produtos SET
    imagem_principal = 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 8;

-- Corrigir Sony WH-1000XM5 Midnight Blue (ID 47)
UPDATE produtos SET
    imagem_principal = 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 47;