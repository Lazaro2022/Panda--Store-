
-- Inserir categorias
INSERT INTO categorias (nome, slug, icone) VALUES
('Smartphones', 'smartphones', '📱'),
('Notebooks', 'notebooks', '💻'),
('Tablets', 'tablets', '📱'),
('Smartwatches', 'smartwatches', '⌚'),
('Fones', 'fones', '🎧'),
('Acessórios', 'acessorios', '🔌');

-- Inserir produtos
INSERT INTO produtos (nome, descricao, preco, preco_promocional, categoria_id, marca, estoque, especificacoes, is_ativo, is_destaque, imagem_principal) VALUES
-- Smartphones
('iPhone 15 Pro Max 256GB', 'O iPhone mais avançado com chip A17 Pro e câmera de 48MP', 8999.00, 7999.00, 1, 'Apple', 15, 'Tela: 6.7" Super Retina XDR
Chip: A17 Pro
Câmera: 48MP tripla
Armazenamento: 256GB
Bateria: até 29h de vídeo', 1, 1, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800'),

('Samsung Galaxy S24 Ultra 512GB', 'Galaxy mais poderoso com S Pen integrado e IA avançada', 7499.00, 6899.00, 1, 'Samsung', 20, 'Tela: 6.8" Dynamic AMOLED 2X
Processador: Snapdragon 8 Gen 3
Câmera: 200MP quádrupla
Armazenamento: 512GB
RAM: 12GB', 1, 1, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'),

('iPhone 14 128GB', 'iPhone com recursos avançados e design premium', 5999.00, 5299.00, 1, 'Apple', 25, 'Tela: 6.1" Super Retina XDR
Chip: A15 Bionic
Câmera: 12MP dupla
Armazenamento: 128GB
5G', 1, 0, 'https://images.unsplash.com/photo-1678652197950-eb2ccc870f5d?w=800'),

('Xiaomi 14 Pro 256GB', 'Flagship Xiaomi com câmera Leica e carregamento ultra-rápido', 4299.00, 3899.00, 1, 'Xiaomi', 18, 'Tela: 6.73" AMOLED
Processador: Snapdragon 8 Gen 3
Câmera: 50MP Leica tripla
Armazenamento: 256GB
Carregamento: 120W', 1, 0, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'),

-- Notebooks
('MacBook Pro 14" M3 Pro', 'MacBook Pro com chip M3 Pro para desempenho profissional', 14999.00, 13999.00, 2, 'Apple', 8, 'Tela: 14" Liquid Retina XDR
Chip: M3 Pro (12-core)
RAM: 18GB
SSD: 512GB
Bateria: até 18h', 1, 1, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'),

('Dell XPS 15 Plus', 'Notebook premium com tela InfinityEdge e processador Intel de última geração', 11999.00, 10999.00, 2, 'Dell', 12, 'Tela: 15.6" OLED 3.5K
Processador: Intel Core i7-13700H
RAM: 16GB DDR5
SSD: 1TB NVMe
GPU: RTX 4050', 1, 1, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'),

('Lenovo ThinkPad X1 Carbon', 'Ultrabook corporativo leve e durável', 9499.00, NULL, 2, 'Lenovo', 10, 'Tela: 14" 2.8K OLED
Processador: Intel Core i7-1365U
RAM: 16GB
SSD: 512GB
Peso: 1.12kg', 1, 0, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'),

-- Tablets
('iPad Pro 12.9" M2 256GB', 'iPad Pro com chip M2 e tela Liquid Retina XDR', 9999.00, 8999.00, 3, 'Apple', 14, 'Tela: 12.9" Liquid Retina XDR
Chip: M2
Armazenamento: 256GB
Câmera: 12MP
5G', 1, 1, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'),

('Samsung Galaxy Tab S9 Ultra', 'Tablet Android premium com S Pen', 7999.00, 7299.00, 3, 'Samsung', 16, 'Tela: 14.6" AMOLED 2X
Processador: Snapdragon 8 Gen 2
RAM: 12GB
Armazenamento: 256GB
S Pen incluído', 1, 0, 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800'),

-- Smartwatches
('Apple Watch Series 9 45mm GPS', 'Smartwatch Apple com recursos avançados de saúde', 4299.00, 3899.00, 4, 'Apple', 22, 'Tela: Retina Always-On
Chip: S9 SiP
Resistência à água: 50m
GPS + Celular
Monitoramento de saúde', 1, 1, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800'),

('Samsung Galaxy Watch 6 Classic', 'Smartwatch premium com design clássico', 2899.00, 2599.00, 4, 'Samsung', 18, 'Tela: 1.5" AMOLED
Bateria: até 40h
GPS + LTE
Monitoramento de saúde
Resistente à água', 1, 0, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'),

-- Fones
('AirPods Pro 2ª Geração', 'Fones true wireless com cancelamento ativo de ruído', 2199.00, 1899.00, 5, 'Apple', 30, 'Cancelamento de ruído adaptativo
Modo transparência
Áudio espacial personalizado
Até 6h com ANC
Case MagSafe', 1, 1, 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800'),

('Sony WH-1000XM5', 'Headphone over-ear com melhor cancelamento de ruído do mercado', 2699.00, 2399.00, 5, 'Sony', 25, 'Cancelamento de ruído líder
30h de bateria
Hi-Res Audio
Conexão multiponto
Carregamento rápido', 1, 1, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800'),

('Samsung Galaxy Buds2 Pro', 'Earbuds premium com som Hi-Fi 360', 1299.00, 1099.00, 5, 'Samsung', 28, 'Hi-Fi 360 Audio
ANC inteligente
Resistente à água IPX7
Até 8h de bateria
Carregamento wireless', 1, 0, 'https://images.unsplash.com/photo-1590658165737-15a047b7a4b8?w=800'),

-- Acessórios
('Magic Keyboard para iPad Pro', 'Teclado trackpad flutuante para iPad Pro', 2499.00, NULL, 6, 'Apple', 15, 'Trackpad integrado
Design flutuante
Porta USB-C
Retroiluminação
Compatível iPad Pro 12.9"', 1, 0, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800'),

('Carregador MagSafe 3 em 1', 'Carregador wireless para iPhone, AirPods e Apple Watch', 899.00, 799.00, 6, 'Belkin', 35, 'Carregamento 3 em 1
MagSafe 15W
Design premium
Compatível toda linha Apple
Proteção contra superaquecimento', 1, 0, 'https://images.unsplash.com/photo-1591290619762-c588f68148c7?w=800'),

('SSD Externo Samsung T7 1TB', 'SSD portátil ultra-rápido com USB 3.2', 799.00, 699.00, 6, 'Samsung', 40, 'Capacidade: 1TB
Velocidade: até 1050 MB/s
USB 3.2 Gen 2
Senha e criptografia AES 256-bit
Resistente a quedas', 1, 0, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800');
