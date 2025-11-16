import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Sparkles, Filter } from "lucide-react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import ProdutoCard from "@/react-app/components/ProdutoCard";
import LoadingSkeleton from "@/react-app/components/LoadingSkeleton";
import { useApi } from "@/react-app/hooks/useApi";
import type { ProdutoComCategoria, Categoria } from "@/shared/types";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(
    searchParams.get("categoria")
  );

  const categoriaParam = selectedCategoria ? `categoria=${selectedCategoria}` : "";
  const buscaParam = searchQuery ? `busca=${encodeURIComponent(searchQuery)}` : "";
  const queryString = [categoriaParam, buscaParam].filter(Boolean).join("&");
  const produtosUrl = `/api/produtos${queryString ? `?${queryString}` : ""}`;

  const { data: produtos, loading: loadingProdutos } = useApi<ProdutoComCategoria[]>(
    produtosUrl,
    [produtosUrl]
  );

  const { data: categorias } = useApi<Categoria[]>("/api/categorias");

  useEffect(() => {
    if (selectedCategoria) {
      setSearchParams({ categoria: selectedCategoria });
    } else {
      setSearchParams({});
    }
  }, [selectedCategoria, setSearchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoriaClick = (slug: string | null) => {
    setSelectedCategoria(slug);
    setSearchQuery("");
  };

  const produtosDestaque = produtos?.filter((p) => p.is_destaque === 1) || [];
  const produtosExibir = searchQuery || selectedCategoria ? produtos : produtos?.filter((p) => p.is_destaque === 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />

      <main className="flex-1">
        {/* Hero Section */}
        {!searchQuery && !selectedCategoria && (
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1920')] bg-cover bg-center opacity-5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-float">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Produtos do Futuro</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                  Bem-vindo à{" "}
                  <span className="gradient-text">Panda Store</span>
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Os melhores produtos eletrônicos com design futurista e tecnologia de ponta
                </p>
              </div>

              {/* Produtos Destaque */}
              {produtosDestaque.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-3xl font-display font-bold mb-8 text-center">
                    ⚡ Produtos em <span className="gradient-text">Destaque</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {produtosDestaque.map((produto) => (
                      <ProdutoCard key={produto.id} produto={produto} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Filtros e Produtos */}
        <section className="container mx-auto px-4 py-12">
          {/* Categorias */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Categorias</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoriaClick(null)}
                className={`px-6 py-3 rounded-xl transition-all ${
                  !selectedCategoria
                    ? "gradient-primary font-semibold glow-primary"
                    : "glass hover:bg-white/10"
                }`}
              >
                Todas
              </button>
              {categorias?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoriaClick(cat.slug)}
                  className={`px-6 py-3 rounded-xl transition-all ${
                    selectedCategoria === cat.slug
                      ? "gradient-primary font-semibold glow-primary"
                      : "glass hover:bg-white/10"
                  }`}
                >
                  {cat.icone} {cat.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Título da Seção */}
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold">
              {searchQuery ? (
                <>Resultados para "{searchQuery}"</>
              ) : selectedCategoria ? (
                <>
                  {categorias?.find((c) => c.slug === selectedCategoria)?.icone}{" "}
                  {categorias?.find((c) => c.slug === selectedCategoria)?.nome}
                </>
              ) : (
                <>Todos os Produtos</>
              )}
            </h2>
          </div>

          {/* Grid de Produtos */}
          {loadingProdutos ? (
            <LoadingSkeleton />
          ) : produtosExibir && produtosExibir.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produtosExibir.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-2xl">
              <p className="text-xl text-gray-400">
                Nenhum produto encontrado
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
