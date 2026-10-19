import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const lastAddCallRef = useRef({ time: 0, id: '' });
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('perfume_cart');
      if (localCart) return JSON.parse(localCart);
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    // Giỏ hàng bắt đầu trống nếu chưa có trong localStorage
    return [];
  });

  // Tự động lưu vào localStorage mỗi khi giỏ thay đổi
  useEffect(() => {
    try {
      localStorage.setItem('perfume_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  // Hàm chuyển đổi chuỗi giá thành số nguyên (VD: "3.850.000₫" -> 3850000)
  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    const cleanStr = String(priceStr).replace(/[^0-9]/g, '');
    return parseInt(cleanStr, 10) || 0;
  };

  // Thêm sản phẩm vào giỏ (hỗ trợ số lượng tùy chọn quantityToAdd, có debounce chống double-click / StrictMode duplicate)
  const addToCart = (product, quantityToAdd = 1) => {
    const now = Date.now();
    const itemKey = product._id || product.id || product.name;
    // Chặn nếu cùng 1 sản phẩm bị gọi liên tiếp trong vòng 400ms
    if (
      lastAddCallRef.current.id === itemKey &&
      now - lastAddCallRef.current.time < 400
    ) {
      return;
    }
    lastAddCallRef.current = { time: now, id: itemKey };

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => (item._id && item._id === product._id) || item.name === product.name
      );

      if (existingIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            rawPrice: parsePrice(product.price),
            quantity: quantityToAdd
          }
        ];
      }
    });
  };

  // Cập nhật số lượng
  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === productId || item.name === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId && item.name !== productId));
  };

  // Xóa sạch giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  // Tổng số lượng món hàng trong giỏ
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Tổng tiền trước giảm giá
  const subtotal = cart.reduce((sum, item) => {
    const unitPrice = item.rawPrice || parsePrice(item.price);
    return sum + unitPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
