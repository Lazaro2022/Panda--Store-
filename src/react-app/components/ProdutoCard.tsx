import { Link } from "react-router";
import { ShoppingCart, Zap } from "lucide-react";
import type { ProdutoComCategoria } from "@/shared/types";
import { useCart } from "@/react-app/contexts/CartContext";

interface ProdutoCardProps {
  produto: ProdutoComCategoria;
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
  const { addItem } = useCart();

  const precoAtual = produto.preco_promocional || produto.preco;
  const desconto = produto.preco_promocional
    ? Math.round((1 - produto.preco_promocional / produto.preco) * 100)
    : null;

  return (
    <div className="group relative rounded-2xl glass overflow-hidden hover:bg-dark-100 transition-all duration-300">
      {/* Badge de Destaque */}
      {produto.is_destaque === 1 && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center gap-1">
          <Zap className="w-3 h-3" fill="currentColor" />
          <span className="text-xs font-semibold">Destaque</span>
        </div>
      )}

      {/* Badge de Desconto */}
      {desconto && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-accent/80 backdrop-blur-sm">
          <span className="text-xs font-bold">-{desconto}%</span>
        </div>
      )}

      {/* Imagem */}
      <Link to={`/produto/${produto.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={produto.imagem_principal || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"}
          alt={produto.nome}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Conteúdo */}
      <div className="p-6">
        {/* Categoria */}
        {produto.categoria_nome && (
          <span className="text-xs text-primary font-medium">
            {produto.categoria_nome}
          </span>
        )}

        {/* Nome */}
        <Link to={`/produto/${produto.id}`}>
          <h3 className="font-semibold text-lg mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {produto.nome}
          </h3>
        </Link>

        {/* Preço */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold gradient-text">
            R$ {precoAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
          {produto.preco_promocional && (
            <span className="text-sm text-gray-500 line-through">
              R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <Link
            to={`/produto/${produto.id}`}
            className="flex-1 px-4 py-3 rounded-xl glass border border-primary/30 hover:bg-primary/10 transition-colors text-center font-medium"
          >
            Ver Detalhes
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(produto);
            }}
            className="px-4 py-3 rounded-xl gradient-primary hover:scale-105 transition-transform"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Estoque */}
        <div className="mt-3 text-xs text-gray-400">
          {produto.estoque > 10 ? (
            <span className="text-success">Em estoque</span>
          ) : produto.estoque > 0 ? (
            <span className="text-warning">Últimas unidades!</span>
          ) : (
            <span className="text-error">Sem estoque</span>
          )}
        </div>
      </div>
    </div>
  );
}
