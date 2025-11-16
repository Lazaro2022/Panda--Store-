import { Instagram, Twitter, Facebook, Zap, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">
                Panda Store
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Os melhores produtos eletrônicos do futuro, entregues hoje.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/?categoria=smartphones" className="hover:text-primary transition-colors">
                  Smartphones
                </a>
              </li>
              <li>
                <a href="/?categoria=laptops" className="hover:text-primary transition-colors">
                  Laptops
                </a>
              </li>
              <li>
                <a href="/?categoria=tablets" className="hover:text-primary transition-colors">
                  Tablets
                </a>
              </li>
              <li>
                <a href="/?categoria=fones-de-ouvido" className="hover:text-primary transition-colors">
                  Fones de Ouvido
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-4">Informações</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <a href="https://wa.me/5592992295440" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span className="text-sm">(92) 99229-5440</span>
              </a>
              <div className="flex gap-3 mt-4">
                <a href="https://www.instagram.com/panda.storemanaus?igsh=MWtwd3BiZ3FqeHgwbg==" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 rounded-xl glass hover:bg-white/10 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Panda Store. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
