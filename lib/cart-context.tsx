'use client';

import * as React from 'react';
import type { CartItem, Configuration } from './types';
import { getProduct } from './products';
import { calculatePrice } from './pricing';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (productSlug: string, configuration: Configuration) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  hydrated: boolean;
}

const CartContext = React.createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'form-cart-v1';

function generateId(): string {
  return `item_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Two configurations are equal only if every field matches. */
function configEquals(a: Configuration, b: Configuration): boolean {
  return (
    a.productId === b.productId &&
    a.width === b.width &&
    a.depth === b.depth &&
    a.height === b.height &&
    a.material === b.material &&
    a.finish === b.finish &&
    a.color === b.color &&
    a.base === b.base
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // localStorage unavailable or corrupt — start empty
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write failures
    }
  }, [items, hydrated]);

  const addItem = React.useCallback((productSlug: string, configuration: Configuration) => {
    const product = getProduct(productSlug);
    if (!product) return;
    const { unitPrice, total } = calculatePrice(product, configuration);

    setItems((prev) => {
      // If an identical configuration exists, increase its quantity
      const existing = prev.find((item) =>
        configEquals(item.configuration, configuration)
      );
      if (existing) {
        const newQty = existing.configuration.quantity + configuration.quantity;
        const updated = { ...existing.configuration, quantity: newQty };
        const price = calculatePrice(product, updated);
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, configuration: updated, unitPrice: price.unitPrice, totalPrice: price.total }
            : item
        );
      }
      const newItem: CartItem = {
        id: generateId(),
        productSlug,
        productName: product.name,
        configuration,
        unitPrice,
        totalPrice: total,
        addedAt: Date.now(),
      };
      return [...prev, newItem];
    });
  }, []);

  const updateQuantity = React.useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const product = getProduct(item.productSlug);
        if (!product) return item;
        const updatedConfig = { ...item.configuration, quantity };
        const price = calculatePrice(product, updatedConfig);
        return {
          ...item,
          configuration: updatedConfig,
          unitPrice: price.unitPrice,
          totalPrice: price.total,
        };
      })
    );
  }, []);

  const removeItem = React.useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = React.useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, item) => sum + item.configuration.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    hydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
