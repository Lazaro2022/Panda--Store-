import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useApi } from "@/react-app/hooks/useApi";
import type { ProdutoComCategoria, Categoria, CreateProduto } from "@/shared/types";

export default function AdminProdutoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { user, isPending, redirectToLogin } = useAuth();

  const { data: produto } = useApi<ProdutoComCategoria>(
    isEditing ? `/api/admin/produtos/${id}` : "",
    [id]
  );

  const { data: categorias } = useApi<Categoria[]>("/api/categorias");

  const [formData, setFormData] = useState<CreateProduto>({
    nome: "",
    descricao: "",
    preco: 0,
    preco_promocional: null,
    categoria_id: null,
    marca: "",
    estoque: 0,
    especificacoes: "",
    is_ativo: true,
    is_destaque: false,
    imagem_principal: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      redirectToLogin();
    }
  }, [user, isPending, redirectToLogin]);

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome,
        descricao: produto.descricao || "",
        preco: produto.preco,
        preco_promocional: produto.preco_promocional,
        categoria_id: produto.categoria_id,
        marca: produto.marca || "",
        estoque: produto.estoque,
        especificacoes: produto.especificacoes || "",
        is_ativo: produto.is_ativo === 1,
        is_destaque: produto.is_destaque === 1,
        imagem_principal: produto.imagem_principal || "",
      });
    }
  }, [produto]);

  if (isPending || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-primary">
          <Loader2 className="w-12 h-12" />
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/admin/produtos/${id}` : "/api/admin/produtos";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/admin/produtos");
      } else {
        const error = await response.json();
        alert(`Erro: ${error.error || "Erro ao salvar produto"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? null : parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value || null }));
    }
  };

  return (
    <div className="min-h-screen bg-dark-300">
      {/* Header */}
      <header className="glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/produtos"
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-display font-bold gradient-text">
                {isEditing ? "Editar Produto" : "Novo Produto"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <div className="glass rounded-2xl p-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>

            <div>
              <label className="block text-sm font-medium mb-2">
                Nome do Produto <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="iPhone 15 Pro Max 256GB"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao || ""}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Descrição detalhada do produto..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Apple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Categoria</label>
                <select
                  name="categoria_id"
                  value={formData.categoria_id || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icone} {cat.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Preços e Estoque */}
          <div className="glass rounded-2xl p-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Preços e Estoque</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Preço <span className="text-error">*</span>
                </label>
                <input
                  type="number"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="8999.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Preço Promocional
                </label>
                <input
                  type="number"
                  name="preco_promocional"
                  value={formData.preco_promocional || ""}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="7999.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Estoque</label>
                <input
                  type="number"
                  name="estoque"
                  value={formData.estoque}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="15"
                />
              </div>
            </div>
          </div>

          {/* Especificações e Imagem */}
          <div className="glass rounded-2xl p-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Detalhes Adicionais</h2>

            <div>
              <label className="block text-sm font-medium mb-2">
                Especificações Técnicas
              </label>
              <textarea
                name="especificacoes"
                value={formData.especificacoes || ""}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono text-sm"
                placeholder="Tela: 6.7&quot; Super Retina XDR&#10;Chip: A17 Pro&#10;Câmera: 48MP tripla&#10;Armazenamento: 256GB"
              />
              <p className="text-xs text-gray-400 mt-2">
                Uma especificação por linha
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                URL da Imagem Principal
              </label>
              <input
                type="url"
                name="imagem_principal"
                value={formData.imagem_principal || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            {formData.imagem_principal && (
              <div className="mt-4">
                <img
                  src={formData.imagem_principal}
                  alt="Preview"
                  className="w-full max-w-md rounded-xl glass"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Status */}
          <div className="glass rounded-2xl p-8 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Status</h2>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_ativo"
                checked={formData.is_ativo}
                onChange={handleChange}
                className="w-5 h-5 rounded border-white/20 bg-white/10 text-primary focus:ring-primary/20"
              />
              <span className="font-medium">Produto Ativo</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_destaque"
                checked={formData.is_destaque}
                onChange={handleChange}
                className="w-5 h-5 rounded border-white/20 bg-white/10 text-secondary focus:ring-secondary/20"
              />
              <span className="font-medium">Produto em Destaque</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Link
              to="/admin/produtos"
              className="px-6 py-3 rounded-xl glass hover:bg-white/10 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl gradient-primary hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar Produto
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
