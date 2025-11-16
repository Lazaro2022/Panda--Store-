-- Migração: Inserir produtos adicionais baseados no JSON fornecido
-- Data da migração: 2025-11-16
-- Descrição: Produtos adicionais da Panda Store com imagens do CDN da Mocha

-- Inserir produtos adicionais
INSERT INTO produtos (id, nome, descricao, preco, preco_promocional, categoria_id, marca, estoque, especificacoes, is_ativo, is_destaque, imagem_principal, created_at, updated_at) VALUES
(29, 'Samsung Galaxy S24 Ultra 512GB', 'Smartphone Android premium com S Pen integrada, câmeras de 200MP e armazenamento de 512GB.', 7999.00, 7399.00, 1, 'Samsung', 25, 'Tela: 6,8" Dynamic AMOLED 2X\nProcessador: Snapdragon 8 Gen 3\nCâmera: 200MP + 50MP + 12MP + 10MP\nRAM: 12GB\nArmazenamento: 512GB', 1, 1, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-s24-ultra.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(30, 'MacBook Air M2 256GB', 'Laptop ultraleve da Apple com chip M2, design renovado e até 18 horas de bateria.', 8999.00, 8299.00, 2, 'Apple', 30, 'Tela: 13,6" Liquid Retina\nChip: Apple M2\nRAM: 8GB\nArmazenamento: 256GB SSD\nBateria: até 18h', 1, 1, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/macbook-air-m2.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(33, 'Samsung Galaxy S23 256GB', 'Smartphone premium com câmeras avançadas e processador Snapdragon 8 Gen 2.', 4999.00, 4499.00, 1, 'Samsung', 35, 'Tela: 6,1" Dynamic AMOLED 2X\nProcessador: Snapdragon 8 Gen 2\nCâmera: 50MP + 12MP + 10MP\nRAM: 8GB\nArmazenamento: 256GB', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-s23.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(34, 'Samsung Galaxy Z Flip 5 256GB', 'Smartphone dobrável compacto com tela flexível e design inovador.', 5999.00, 5499.00, 1, 'Samsung', 20, 'Tela: 6,7" Dynamic AMOLED 2X dobrável\nProcessador: Snapdragon 8 Gen 2\nCâmera: 12MP + 12MP\nRAM: 8GB\nArmazenamento: 256GB', 1, 1, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-z-flip-5.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(35, 'Xiaomi 14 Pro 256GB', 'Smartphone premium com câmera Leica, processador Snapdragon 8 Gen 3 e carregamento rápido.', 4299.00, 3899.00, 1, 'Xiaomi', 40, 'Tela: 6,73" LTPO OLED\nProcessador: Snapdragon 8 Gen 3\nCâmera: 50MP Leica Triple\nRAM: 12GB\nArmazenamento: 256GB', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/xiaomi-14-pro.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(36, 'MacBook Pro 14" M3 Pro', 'Laptop profissional da Apple com chip M3 Pro e tela Liquid Retina XDR de 14 polegadas.', 15999.00, 14999.00, 2, 'Apple', 18, 'Tela: 14,2" Liquid Retina XDR\nChip: Apple M3 Pro\nRAM: 18GB\nArmazenamento: 512GB SSD\nBateria: até 18h', 1, 1, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/macbook-pro-14.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(37, 'Dell XPS 15 Plus', 'Laptop premium com tela OLED 4K, processador Intel de 12ª geração e design moderno.', 13999.00, 12999.00, 2, 'Dell', 22, 'Tela: 15,6" OLED 4K\nProcessador: Intel Core i7-12700H\nRAM: 32GB DDR5\nArmazenamento: 1TB SSD\nGPU: RTX 3050 Ti', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/dell-xps-15.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(38, 'Dell Inspiron 15 i5 16GB', 'Laptop intermediário ideal para produtividade e uso cotidiano.', 3999.00, NULL, 2, 'Dell', 45, 'Tela: 15,6" Full HD\nProcessador: Intel Core i5-1235U\nRAM: 16GB DDR4\nArmazenamento: 512GB SSD\nGPU: Intel Iris Xe', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/dell-inspiron-15.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(39, 'Lenovo ThinkPad X1 Carbon Gen 11', 'Laptop empresarial ultraleve com certificação militar e teclado premium.', 9499.00, NULL, 2, 'Lenovo', 28, 'Tela: 14" 2.8K OLED\nProcessador: Intel Core i7-1365U\nRAM: 16GB\nArmazenamento: 512GB SSD\nPeso: 1,12kg', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/thinkpad-x1-carbon.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(40, 'iPad Pro 12.9" M2 256GB', 'Tablet profissional da Apple com chip M2, tela Liquid Retina XDR e suporte ao Apple Pencil.', 8499.00, 7999.00, 5, 'Apple', 32, 'Tela: 12,9" Liquid Retina XDR\nChip: Apple M2\nArmazenamento: 256GB\nCâmera: 12MP + LiDAR\nCompatível com Magic Keyboard', 1, 1, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/ipad-pro-12.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(41, 'iPad Air 256GB WiFi', 'Tablet versátil com chip M1, tela Liquid Retina de 10,9 polegadas e suporte ao Apple Pencil.', 4999.00, 4599.00, 5, 'Apple', 35, 'Tela: 10,9" Liquid Retina\nChip: Apple M1\nArmazenamento: 256GB\nCâmera: 12MP\nCompatível com Apple Pencil', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/ipad-air.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(42, 'Samsung Galaxy Tab S9 Ultra', 'Tablet Android premium com tela AMOLED de 14,6 polegadas e S Pen incluída.', 7999.00, 7299.00, 5, 'Samsung', 25, 'Tela: 14,6" Dynamic AMOLED 2X\nProcessador: Snapdragon 8 Gen 2\nRAM: 12GB\nArmazenamento: 256GB\nS Pen incluída', 1, 1, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-tab-s9-ultra.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(43, 'Samsung Galaxy Tab S9 128GB', 'Tablet Android com tela AMOLED de 11 polegadas e desempenho premium.', 4999.00, 4499.00, 5, 'Samsung', 30, 'Tela: 11" Dynamic AMOLED 2X\nProcessador: Snapdragon 8 Gen 2\nRAM: 8GB\nArmazenamento: 128GB\nS Pen incluída', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-tab-s9.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(44, 'Apple Watch Series 9 45mm GPS', 'Smartwatch da Apple com chip S9, tela sempre ativa e recursos avançados de saúde.', 3299.00, 2999.00, 6, 'Apple', 40, 'Tela: 45mm Retina Always-On\nChip: S9 SiP\nBateria: até 18h\nGPS integrado\nResistente à água', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/apple-watch-series-9.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(45, 'Samsung Galaxy Watch 6 Classic', 'Smartwatch Android com design premium, bezel giratório e recursos avançados de saúde.', 2499.00, 2199.00, 6, 'Samsung', 35, 'Tela: 1,5" Super AMOLED\nProcessador: Exynos W930\nBateria: até 40h\nGPS integrado\nResistente à água', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-watch-6.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(46, 'AirPods Pro 2ª Geração USB-C', 'Fones de ouvido sem fio premium com cancelamento ativo de ruído e áudio espacial.', 1999.00, 1799.00, 3, 'Apple', 50, 'Cancelamento de ruído ativo adaptável\nÁudio Espacial Personalizado\nBateria: até 6h + 24h no estojo\nResistente à água IPX4', 1, 1, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/airpods-pro-2.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(47, 'Sony WH-1000XM5 Midnight Blue', 'Headphones premium com cancelamento de ruído líder da indústria e 30 horas de bateria.', 1699.00, 1499.00, 3, 'Sony', 42, 'Cancelamento de ruído V1\nBateria: 30 horas\nCarregamento rápido: 3min = 3h\nBluetooth 5.2\nSuporta LDAC', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/sony-wh-1000xm5.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(48, 'Samsung Galaxy Buds2 Pro', 'Fones de ouvido sem fio premium com cancelamento ativo de ruído e áudio de alta qualidade.', 899.00, 799.00, 3, 'Samsung', 45, 'Cancelamento de ruído ativo\nÁudio 360 com rastreamento de cabeça\nBateria: até 8h + 20h no estojo\nResistente à água IPX7', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/galaxy-buds2-pro.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(49, 'Magic Keyboard para iPad Pro', 'Teclado magnético premium para iPad Pro com trackpad integrado e retroiluminação.', 2499.00, NULL, 6, 'Apple', 25, 'Design flutuante magnético\nTrackpad Multi-Touch\nTeclas retroiluminadas\nPassagem USB-C\nCompatível iPad Pro 12,9"', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/magic-keyboard-ipad.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(51, 'SSD Externo Samsung T7 1TB', 'SSD portátil de alta velocidade com conectividade USB 3.2 Gen 2 e design compacto.', 699.00, 599.00, 6, 'Samsung', 60, 'Capacidade: 1TB\nInterface: USB 3.2 Gen 2\nVelocidade: até 1.050 MB/s\nCriptografia AES 256-bit\nCompatível PC/Mac/Android', 1, 0, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/samsung-t7-ssd.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(52, 'iPhone 16 Pro Max 256GB', 'Smartphone premium da Apple com chip A18 Pro, sistema de câmeras avançado e tela Super Retina XDR.', 9999.00, 9499.00, 1, 'Apple', 20, 'Tela: 6,9" Super Retina XDR\nChip: A18 Pro\nCâmera: 48MP + 48MP + 12MP\nArmazenamento: 256GB\nBateria: até 33h de vídeo', 1, 1, 'https://mocha-cdn.com/019a7e5e-ee3d-77b9-9c6f-80fb6c09c60a/iphone-16-pro-max.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);