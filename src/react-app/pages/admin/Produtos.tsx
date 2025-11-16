import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Package, Plus, Edit, Trash2, Eye, EyeOff, Star, Search, ArrowLeft } from "lucide-react";
import { useApi } from "@/react-app/hooks/useApi";
import type { ProdutoComCategoria } from "@/shared/types";

export default function AdminProdutos() {
  const { user, isPending, redirectToLogin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: produtos, loading, setData } = useApi<ProdutoComCategoria[]>(
    "/api/admin/produtos"
  );

  useEffect(() => {
    if (!isPending && !user) {
      redirectToLogin();
    }
  }, [user, isPending, redirectToLogin]);

  if (isPending || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-primary">
          <Package className="w-12 h-12" />
        </div>
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;

    try {
      const response = await fetch(`/api/admin/produtos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData(produtos?.filter((p) => p.id !== id) || null);
      } else {
        alert("Erro ao deletar produto");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar produto");
    }
  };

  const produtosFiltrados = produtos?.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria_nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-300">
      {/* Header */}
      <header className="glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-display font-bold gradient-text">
                Gerenciar Produtos
              </h1>
            </div>

            <Link
              to="/admin/produtos/novo"
              className="px-4 py-2 rounded-lg gradient-primary hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Produto
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-primary">
              <Package className="w-12 h-12" />
            </div>
          </div>
        ) : produtosFiltrados && produtosFiltrados.length > 0 ? (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Produto</th>
                    <th className="text-left px-6 py-4 font-semibold">Categoria</th>
                    <th className="text-left px-6 py-4 font-semibold">Preço</th>
                    <th className="text-left px-6 py-4 font-semibold">Estoque</th>
                    <th className="text-left px-6 py-4 font-semibold">Status</th>
                    <th className="text-right px-6 py-4 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtosFiltrados.map((produto) => (
                    <tr
                      key={produto.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={produto.imagem_principal || ""}
                            alt={produto.nome}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {produto.nome}
                              {produto.is_destaque === 1 && (
                                <Star className="w-4 h-4 text-secondary" fill="currentColor" />
                              )}
                            </div>
                            {produto.marca && (
                              <div className="text-sm text-gray-400">{produto.marca}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full glass text-sm">
                          {produto.categoria_nome || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-primary">
                          R$ {(produto.preco_promocional || produto.preco).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        {produto.preco_promocional && (
                          <div className="text-sm text-gray-500 line-through">
                            R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            produto.estoque > 10
                              ? "bg-success/20 text-success"
                              : produto.estoque > 0
                              ? "bg-warning/20 text-warning"
                              : "bg-error/20 text-error"
                          }`}
                        >
                          {produto.estoque}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {produto.is_ativo === 1 ? (
                          <span className="flex items-center gap-2 text-success">
                            <Eye className="w-4 h-4" />
                            Ativo
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-gray-500">
                            <EyeOff className="w-4 h-4" />
                            Inativo
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/produtos/${produto.id}/editar`}
                            className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(produto.id)}
                            className="p-2 rounded-lg glass hover:bg-error/20 text-error transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 glass rounded-2xl">
            <p className="text-gray-400">Nenhum produto encontrado</p>
          </div>
        )}
      </main>
    </div>
  );
}
