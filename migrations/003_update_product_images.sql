-- Migração de Imagens dos Produtos - Panda Store
-- Este arquivo contém os comandos SQL para atualizar as imagens dos produtos
-- Execute este script no banco de dados de destino após criar a estrutura de tabelas

-- Atualizar imagens dos produtos existentes
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-s24-ultra.png' WHERE id = 29;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/macbook-air-m2.png' WHERE id = 30;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-s23.png' WHERE id = 33;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-z-flip-5.png' WHERE id = 34;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/xiaomi-14-pro.png' WHERE id = 35;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/macbook-pro-14.png' WHERE id = 36;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/dell-xps-15.png' WHERE id = 37;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/dell-inspiron-15.png' WHERE id = 38;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/thinkpad-x1-carbon.png' WHERE id = 39;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/ipad-pro-12.png' WHERE id = 40;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/ipad-air.png' WHERE id = 41;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-tab-s9-ultra.png' WHERE id = 42;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-tab-s9.png' WHERE id = 43;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/apple-watch-series-9.png' WHERE id = 44;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-watch-6.png' WHERE id = 45;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/airpods-pro-2.png' WHERE id = 46;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/sony-wh-1000xm5.png' WHERE id = 47;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-buds2-pro.png' WHERE id = 48;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/magic-keyboard-ipad.png' WHERE id = 49;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/samsung-t7-ssd.png' WHERE id = 51;
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/iphone-16-pro-max.png' WHERE id = 52;

-- Atualizar timestamp de atualização
UPDATE produtos SET updated_at = CURRENT_TIMESTAMP WHERE id IN (29, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52);