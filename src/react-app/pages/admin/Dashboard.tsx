import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Package, Star, AlertTriangle, XCircle, ShoppingBag, LogOut } from "lucide-react";
import { useApi } from "@/react-app/hooks/useApi";
import type { Estatisticas } from "@/shared/types";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isPending, redirectToLogin, logout } = useAuth();

  const { data: stats, loading } = useApi<Estatisticas>("/api/admin/estatisticas");

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

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const statCards = [
    {
      title: "Total de Produtos",
      value: stats?.total_produtos || 0,
      icon: Package,
      color: "primary",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      title: "Produtos em Destaque",
      value: stats?.produtos_destaque || 0,
      icon: Star,
      color: "secondary",
      gradient: "from-secondary/20 to-secondary/5",
    },
    {
      title: "Estoque Baixo",
      value: stats?.produtos_estoque_baixo || 0,
      icon: AlertTriangle,
      color: "warning",
      gradient: "from-warning/20 to-warning/5",
    },
    {
      title: "Produtos Inativos",
      value: stats?.produtos_inativos || 0,
      icon: XCircle,
      color: "error",
      gradient: "from-error/20 to-error/5",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-300">
      {/* Header */}
      <header className="glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                Panda Store Admin
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Olá, {user.google_user_data.given_name || user.email}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Ver Loja</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className={`glass rounded-2xl p-6 bg-gradient-to-br ${stat.gradient}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl glass bg-${stat.color}/10`}>
                    <Icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-4xl font-bold gradient-text">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Ações Rápidas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/produtos"
              className="p-6 rounded-xl glass hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl gradient-primary group-hover:scale-110 transition-transform">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Gerenciar Produtos</h3>
                  <p className="text-gray-400 text-sm">
                    Visualizar, criar, editar e deletar produtos
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/produtos/novo"
              className="p-6 rounded-xl glass hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Adicionar Produto</h3>
                  <p className="text-gray-400 text-sm">
                    Cadastrar um novo produto no sistema
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
