-- Migração: Corrigir imagem do Apple Watch Series 9 45mm GPS
-- Usar URL diferente do Unsplash para smartwatch

UPDATE produtos SET
    imagem_principal = 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 44;