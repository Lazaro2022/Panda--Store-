import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Search, Menu, X, Zap } from "lucide-react";
import { useCart } from "@/react-app/contexts/CartContext";
import CartDrawer from "@/react-app/components/CartDrawer";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <>
      <header className="sticky top-0 z-40 glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold gradient-text hidden sm:block">
                Panda Store
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 rounded-xl glass hover:bg-white/10 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-xs font-bold flex items-center justify-center glow-accent">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-xl glass hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar produtos..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
