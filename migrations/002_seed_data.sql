-- Migration: Inserir dados iniciais para Panda Store

-- Inserir categorias
INSERT INTO categorias (nome, slug, icone) VALUES
('Smartphones', 'smartphones', '📱'),
('Laptops', 'laptops', '💻'),
('Fones de Ouvido', 'fones-de-ouvido', '🎧'),
('Smart TVs', 'smart-tvs', '📺'),
('Tablets', 'tablets', '📱'),
('Acessórios', 'acessorios', '🔌'),
('Gaming', 'gaming', '🎮'),
('Smart Home', 'smart-home', '🏠');

-- Inserir produtos de exemplo
INSERT INTO produtos (nome, descricao, preco, preco_promocional, categoria_id, marca, estoque, especificacoes, is_ativo, is_destaque, imagem_principal) VALUES
-- Smartphones
('iPhone 15 Pro Max', 'Smartphone premium da Apple com chip A17 Pro, sistema de câmeras profissionais e tela Super Retina XDR de 6,7 polegadas.', 8999.00, 8499.00, 1, 'Apple', 25, 'Tela: 6,7" Super Retina XDR\nChip: A17 Pro\nCâmera: 48MP + 12MP + 12MP\nArmazenamento: 256GB\nBateria: até 29h de vídeo', 1, 1, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'),

('Samsung Galaxy S24 Ultra', 'Smartphone Android premium com S Pen integrada, câmeras de 200MP e tela Dynamic AMOLED 2X de 6,8 polegadas.', 7499.00, 6999.00, 1, 'Samsung', 30, 'Tela: 6,8" Dynamic AMOLED 2X\nProcessador: Snapdragon 8 Gen 3\nCâmera: 200MP + 50MP + 12MP + 10MP\nRAM: 12GB\nArmazenamento: 512GB', 1, 1, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500'),

('Xiaomi 14 Pro', 'Smartphone com câmera Leica, processador Snapdragon 8 Gen 3 e carregamento rápido de 120W.', 3999.00, 3599.00, 1, 'Xiaomi', 40, 'Tela: 6,73" LTPO OLED\nProcessador: Snapdragon 8 Gen 3\nCâmera: 50MP Leica Triple\nRAM: 12GB\nArmazenamento: 512GB\nCarregamento: 120W', 1, 0, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'),

-- Laptops
('MacBook Pro M3 16"', 'Laptop profissional da Apple com chip M3 Pro, tela Liquid Retina XDR e até 22 horas de bateria.', 18999.00, 17499.00, 2, 'Apple', 15, 'Tela: 16,2" Liquid Retina XDR\nChip: Apple M3 Pro\nRAM: 18GB\nArmazenamento: 512GB SSD\nBateria: até 22h', 1, 1, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'),

('Dell XPS 15 OLED', 'Laptop premium com tela OLED 4K, processador Intel Core i7 e placa gráfica RTX 4070.', 12999.00, 11999.00, 2, 'Dell', 20, 'Tela: 15,6" OLED 4K\nProcessador: Intel Core i7-13700H\nRAM: 32GB DDR5\nArmazenamento: 1TB SSD\nGPU: RTX 4070', 1, 1, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500'),

('Lenovo ThinkPad X1 Carbon', 'Laptop empresarial ultraleve com certificação militar e teclado premium.', 8999.00, NULL, 2, 'Lenovo', 25, 'Tela: 14" 2.8K OLED\nProcessador: Intel Core i7-1365U\nRAM: 16GB\nArmazenamento: 512GB SSD\nPeso: 1,12kg', 1, 0, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'),

-- Fones de Ouvido
('AirPods Pro 2ª Geração', 'Fones de ouvido sem fio com cancelamento ativo de ruído e áudio espacial personalizado.', 1899.00, 1699.00, 3, 'Apple', 50, 'Cancelamento de ruído ativo\nÁudio Espacial Personalizado\nBateria: até 6h + 24h no estojo\nResistente à água IPX4', 1, 1, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500'),

('Sony WH-1000XM5', 'Headphones premium com cancelamento de ruído líder da indústria e 30 horas de bateria.', 1599.00, 1399.00, 3, 'Sony', 35, 'Cancelamento de ruído V1\nBateria: 30 horas\nCarregamento rápido: 3min = 3h\nBluetooth 5.2\nSuporta LDAC', 1, 0, 'https://images.unsplash.com/photo-1583394838271-890932c5f9cb?w=500'),

-- Smart TVs
('Samsung Neo QLED 65"', 'Smart TV 4K com tecnologia Quantum Dot, HDR10+ e sistema Tizen.', 6999.00, 6299.00, 4, 'Samsung', 18, 'Tela: 65" Neo QLED 4K\nProcessador: Neo Quantum 4K\nHDR: HDR10+, HLG\nSistema: Tizen\nGameMode: 120Hz VRR', 1, 1, 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500'),

('LG OLED C3 55"', 'Smart TV OLED com pixels auto-iluminados, Dolby Vision IQ e webOS 23.', 4999.00, 4499.00, 4, 'LG', 22, 'Tela: 55" OLED evo\nProcessador: α9 Gen6 AI\nHDR: Dolby Vision IQ, HDR10 Pro\nSistema: webOS 23\nGaming: VRR, ALLM', 1, 0, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'),

-- Tablets
('iPad Pro M2 12,9"', 'Tablet profissional da Apple com chip M2, tela Liquid Retina XDR e suporte ao Apple Pencil.', 7999.00, 7399.00, 5, 'Apple', 28, 'Tela: 12,9" Liquid Retina XDR\nChip: Apple M2\nArmazenamento: 256GB\nCâmera: 12MP + LiDAR\nCompatível com Magic Keyboard', 1, 1, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'),

-- Gaming
('PlayStation 5 Slim', 'Console de videogame de nova geração com SSD ultra-rápido e ray tracing em tempo real.', 3999.00, 3799.00, 7, 'Sony', 12, 'CPU: AMD Zen 2 8-core\nGPU: AMD RDNA 2\nRAM: 16GB GDDR6\nArmazenamento: 1TB SSD\nRay Tracing, 4K/120fps', 1, 1, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500'),

-- Smart Home
('Echo Dot 5ª Geração', 'Smart speaker compacto com Alexa, som melhorado e controle de casa inteligente.', 349.00, 299.00, 8, 'Amazon', 60, 'Alto-falante: 1,73" + sensor de temperatura\nConectividade: Wi-Fi 6, Bluetooth\nControls: Zigbee integrado\nAlexa integrada', 1, 0, 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500'),

-- Acessórios
('Carregador Sem Fio MagSafe', 'Carregador magnético sem fio para iPhone com alinhamento perfeito e 15W de potência.', 399.00, NULL, 6, 'Apple', 45, 'Potência: 15W para iPhone\nCompartível com MagSafe\nCabo USB-C de 1m incluído\nAlinhamento magnético perfeito', 1, 0, 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500');

-- Atualizar timestamps
UPDATE categorias SET updated_at = CURRENT_TIMESTAMP;
UPDATE produtos SET updated_at = CURRENT_TIMESTAMP;