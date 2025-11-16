import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { ProdutoComCategoria } from "@/shared/types";

interface CartItem {
  produto: ProdutoComCategoria;
  quantidade: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (produto: ProdutoComCategoria) => void;
  removeItem: (produtoId: number) => void;
  updateQuantity: (produtoId: number, quantidade: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (produto: ProdutoComCategoria) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.produto.id === produto.id);
      if (existing) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const removeItem = (produtoId: number) => {
    setItems((prev) => prev.filter((item) => item.produto.id !== produtoId));
  };

  const updateQuantity = (produtoId: number, quantidade: number) => {
    if (quantidade <= 0) {
      removeItem(produtoId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.produto.id === produtoId ? { ...item, quantidade } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => {
    const preco = item.produto.preco_promocional || item.produto.preco;
    return sum + preco * item.quantidade;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
