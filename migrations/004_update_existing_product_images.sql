-- Migração de Imagens dos Produtos Existentes - Panda Store
-- Este arquivo atualiza as imagens dos produtos que já existem no banco (IDs 1-14)

-- Atualizar imagens dos produtos existentes
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/iphone-16-pro-max.png' WHERE id = 1; -- iPhone 15 Pro Max
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-s24-ultra.png' WHERE id = 2; -- Samsung Galaxy S24 Ultra
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/xiaomi-14-pro.png' WHERE id = 3; -- Xiaomi 14 Pro
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/macbook-pro-14.png' WHERE id = 4; -- MacBook Pro M3 16"
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/dell-xps-15.png' WHERE id = 5; -- Dell XPS 15 OLED
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/thinkpad-x1-carbon.png' WHERE id = 6; -- Lenovo ThinkPad X1 Carbon
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/airpods-pro-2.png' WHERE id = 7; -- AirPods Pro 2ª Geração
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/sony-wh-1000xm5.png' WHERE id = 8; -- Sony WH-1000XM5
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/samsung-neo-qled-65.png' WHERE id = 9; -- Samsung Neo QLED 65"
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/lg-oled-c3-55.png' WHERE id = 10; -- LG OLED C3 55"
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/ipad-pro-12.png' WHERE id = 11; -- iPad Pro M2 12,9"
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/playstation-5-slim.png' WHERE id = 12; -- PlayStation 5 Slim
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/echo-dot-5.png' WHERE id = 13; -- Echo Dot 5ª Geração
UPDATE produtos SET imagem_principal = 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/magsafe-charger.png' WHERE id = 14; -- Carregador Sem Fio MagSafe

-- Atualizar timestamp de atualização
UPDATE produtos SET updated_at = CURRENT_TIMESTAMP WHERE id BETWEEN 1 AND 14;