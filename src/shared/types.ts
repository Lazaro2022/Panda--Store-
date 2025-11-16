import z from "zod";

// Categoria
export const CategoriaSchema = z.object({
  id: z.number(),
  nome: z.string(),
  slug: z.string(),
  icone: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Categoria = z.infer<typeof CategoriaSchema>;

// Produto
export const ProdutoSchema = z.object({
  id: z.number(),
  nome: z.string(),
  descricao: z.string().nullable(),
  preco: z.number(),
  preco_promocional: z.number().nullable(),
  categoria_id: z.number().nullable(),
  marca: z.string().nullable(),
  estoque: z.number(),
  especificacoes: z.string().nullable(),
  is_ativo: z.number(),
  is_destaque: z.number(),
  imagem_principal: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Produto = z.infer<typeof ProdutoSchema>;

// Produto com categoria
export const ProdutoComCategoriaSchema = ProdutoSchema.extend({
  categoria_nome: z.string().nullable(),
  categoria_slug: z.string().nullable(),
});

export type ProdutoComCategoria = z.infer<typeof ProdutoComCategoriaSchema>;

// Schemas para criação/edição
export const CreateProdutoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  preco: z.number().positive("Preço deve ser maior que zero"),
  preco_promocional: z.number().positive().optional().nullable(),
  categoria_id: z.number().optional().nullable(),
  marca: z.string().optional().nullable(),
  estoque: z.number().int().min(0).default(0),
  especificacoes: z.string().optional().nullable(),
  is_ativo: z.boolean().default(true),
  is_destaque: z.boolean().default(false),
  imagem_principal: z.string().optional().nullable(),
});

export type CreateProduto = z.infer<typeof CreateProdutoSchema>;

export const UpdateProdutoSchema = CreateProdutoSchema.partial();

export type UpdateProduto = z.infer<typeof UpdateProdutoSchema>;

// Estatísticas do dashboard
export const EstatisticasSchema = z.object({
  total_produtos: z.number(),
  produtos_destaque: z.number(),
  produtos_estoque_baixo: z.number(),
  produtos_inativos: z.number(),
});

export type Estatisticas = z.infer<typeof EstatisticasSchema>;
