-- Migração: Corrigir imagem do PlayStation 5 Slim
-- Atualizar com uma nova URL da imagem do CDN

UPDATE produtos SET
    imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/ps5-slim.png',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 12;