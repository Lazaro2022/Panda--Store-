import { useParams, Link } from "react-router";
import { ShoppingCart, ChevronLeft, Package, Zap, CheckCircle } from "lucide-react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { useApi } from "@/react-app/hooks/useApi";
import { useCart } from "@/react-app/contexts/CartContext";
import type { ProdutoComCategoria } from "@/shared/types";

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const { addItem } = useCart();
  
  const { data: produto, loading } = useApi<ProdutoComCategoria>(
    `/api/produtos/${id}`
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-white/5 rounded w-32 mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-white/5 rounded-2xl" />
              <div className="space-y-6">
                <div className="h-10 bg-white/5 rounded w-3/4" />
                <div className="h-6 bg-white/5 rounded w-1/4" />
                <div className="h-32 bg-white/5 rounded" />
                <div className="h-16 bg-white/5 rounded" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link to="/" className="text-primary hover:underline">
            Voltar para home
          </Link>
        </main>
      </div>
    );
  }

  const precoAtual = produto.preco_promocional || produto.preco;
  const desconto = produto.preco_promocional
    ? Math.round((1 - produto.preco_promocional / produto.preco) * 100)
    : null;

  const especificacoes = produto.especificacoes
    ? produto.especificacoes.split("\n").filter(Boolean)
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para produtos
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Imagem */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="aspect-square rounded-2xl overflow-hidden glass">
                <img
                  key={produto.imagem_principal}
                  src={produto.imagem_principal || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"}
                  alt={produto.nome}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800";
                  }}
                />
              </div>
              
              {produto.is_destaque === 1 && (
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" fill="currentColor" />
                  <span className="font-semibold">Produto Destaque</span>
                </div>
              )}

              {desconto && (
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-accent/80 backdrop-blur-sm">
                  <span className="font-bold text-lg">-{desconto}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Informações */}
          <div className="space-y-8">
            {/* Categoria */}
            {produto.categoria_nome && (
              <div className="inline-block px-4 py-2 rounded-full glass border border-primary/30">
                <span className="text-sm font-medium text-primary">
                  {produto.categoria_nome}
                </span>
              </div>
            )}

            {/* Nome */}
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              {produto.nome}
            </h1>

            {/* Marca */}
            {produto.marca && (
              <p className="text-lg text-gray-400">
                Marca: <span className="text-white font-semibold">{produto.marca}</span>
              </p>
            )}

            {/* Preço */}
            <div className="py-6 border-y border-white/10">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold gradient-text">
                  R$ {precoAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
                {produto.preco_promocional && (
                  <span className="text-2xl text-gray-500 line-through">
                    R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
              {desconto && (
                <p className="text-success text-lg font-semibold mt-2">
                  Economia de {desconto}%
                </p>
              )}
            </div>

            {/* Descrição */}
            {produto.descricao && (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Descrição</h2>
                <p className="text-gray-300 leading-relaxed">{produto.descricao}</p>
              </div>
            )}

            {/* Especificações */}
            {especificacoes.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Especificações Técnicas</h2>
                <div className="glass rounded-xl p-6 space-y-3">
                  {especificacoes.map((spec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Estoque */}
            <div className="flex items-center gap-3 glass rounded-xl p-4">
              <Package className={`w-5 h-5 ${
                produto.estoque > 10 ? "text-success" :
                produto.estoque > 0 ? "text-warning" : "text-error"
              }`} />
              <span className="font-medium">
                {produto.estoque > 10 ? (
                  <span className="text-success">Produto disponível em estoque</span>
                ) : produto.estoque > 0 ? (
                  <span className="text-warning">Apenas {produto.estoque} unidades restantes!</span>
                ) : (
                  <span className="text-error">Produto indisponível no momento</span>
                )}
              </span>
            </div>

            {/* Ações */}
            <div className="flex gap-4">
              <button
                onClick={() => addItem(produto)}
                disabled={produto.estoque === 0}
                className="flex-1 py-4 px-8 rounded-xl gradient-primary font-bold text-lg hover:scale-105 transition-transform glow-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
