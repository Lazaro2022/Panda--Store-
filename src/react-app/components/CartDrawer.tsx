import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/react-app/contexts/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark-200 z-50 flex flex-col border-l border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">
            Carrinho <span className="text-primary">({itemCount})</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const preco = item.produto.preco_promocional || item.produto.preco;
                return (
                  <div
                    key={item.produto.id}
                    className="flex gap-4 p-4 rounded-xl glass"
                  >
                    <img
                      src={item.produto.imagem_principal || ""}
                      alt={item.produto.nome}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-1">
                        {item.produto.nome}
                      </h3>
                      <p className="text-sm text-primary font-bold mt-1">
                        R$ {preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 glass rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.produto.id, item.quantidade - 1)
                            }
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantidade}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.produto.id, item.quantidade + 1)
                            }
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.produto.id)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="gradient-text text-2xl">
                R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button className="w-full py-4 rounded-xl gradient-primary font-bold text-lg hover:scale-105 transition-transform glow-primary">
              Finalizar Compra
            </button>

            <button
              onClick={clearCart}
              className="w-full py-3 rounded-xl glass hover:bg-white/10 transition-colors"
            >
              Limpar Carrinho
            </button>
          </div>
        )}
      </div>
    </>
  );
}
