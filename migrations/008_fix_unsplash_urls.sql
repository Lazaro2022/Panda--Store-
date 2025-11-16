-- Migração: Corrigir URLs do Unsplash com formato simples
-- Usar URLs diretas do Unsplash sem parâmetros que podem estar causando problemas

-- Produtos originais (IDs 1-14)
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500' WHERE id = 9; -- Samsung Neo QLED 65"
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500' WHERE id = 12; -- PlayStation 5 Slim
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500' WHERE id = 10; -- LG OLED C3 55"
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500' WHERE id = 13; -- Echo Dot 5ª Geração
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500' WHERE id = 14; -- Carregador MagSafe

-- Produtos adicionais (IDs 29+)
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500' WHERE id = 33; -- Samsung Galaxy S23
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500' WHERE id = 35; -- Xiaomi 14 Pro
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500' WHERE id = 38; -- Dell Inspiron 15
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500' WHERE id = 39; -- ThinkPad X1 Carbon (URL diferente)
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500' WHERE id = 41; -- iPad Air
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500' WHERE id = 43; -- Galaxy Tab S9 (URL diferente)
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1434493651957-d7b95c2b77a4?w=500' WHERE id = 44; -- Apple Watch Series 9
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' WHERE id = 45; -- Galaxy Watch 6 (URL diferente)
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1583394838271-890932c5f9cb?w=500' WHERE id = 47; -- Sony WH-1000XM5
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500' WHERE id = 48; -- Galaxy Buds2 Pro
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500' WHERE id = 49; -- Magic Keyboard iPad
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500' WHERE id = 51; -- Samsung T7 SSD

-- Atualizar produtos originais que ainda estão com URLs do CDN Mocha
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500' WHERE nome = 'Xiaomi 14 Pro' AND id BETWEEN 1 AND 14;
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500' WHERE nome = 'Lenovo ThinkPad X1 Carbon' AND id BETWEEN 1 AND 14;
UPDATE produtos SET imagem_principal = 'https://images.unsplash.com/photo-1583394838271-890932c5f9cb?w=500' WHERE nome = 'Sony WH-1000XM5' AND id BETWEEN 1 AND 14;

-- Atualizar timestamp
UPDATE produtos SET updated_at = CURRENT_TIMESTAMP WHERE id IN (3, 6, 8, 9, 10, 12, 13, 14, 33, 35, 38, 39, 41, 43, 44, 45, 47, 48, 49, 51);