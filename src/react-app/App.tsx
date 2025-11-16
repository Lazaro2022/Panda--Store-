import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "@getmocha/users-service/react";
import { CartProvider } from "@/react-app/contexts/CartContext";
import HomePage from "@/react-app/pages/Home";
import ProdutoDetalhePage from "@/react-app/pages/ProdutoDetalhe";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import AdminDashboardPage from "@/react-app/pages/admin/Dashboard";
import AdminProdutosPage from "@/react-app/pages/admin/Produtos";
import AdminProdutoFormPage from "@/react-app/pages/admin/ProdutoForm";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produto/:id" element={<ProdutoDetalhePage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/produtos" element={<AdminProdutosPage />} />
            <Route path="/admin/produtos/novo" element={<AdminProdutoFormPage />} />
            <Route path="/admin/produtos/:id/editar" element={<AdminProdutoFormPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
