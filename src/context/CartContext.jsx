import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('perfume_cart');
      if (localCart) return JSON.parse(localCart);
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    // Mặc định cho sẵn 2 sản phẩm mẫu sang trọng nếu giỏ ban đầu trống để người dùng trải nghiệm ngay
    return [
      {
        _id: 'sample-1',
        name: 'Lost Cherry - Tom Ford',
        category: 'Eau de Parfum',
        price: '4.225.000₫',
        rawPrice: 4225000,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
        quantity: 1
      },
      {
        _id: 'sample-2',
        name: 'Another 13 - Le Labo',
        category: 'Eau de Parfum',
        price: '5.200.000₫',
        rawPrice: 5200000,
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
        quantity: 1
      }
    ];
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

  // Thêm sản phẩm vào giỏ (hỗ trợ số lượng tùy chọn quantityToAdd)
  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => (item._id && item._id === product._id) || item.name === product.name);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantityToAdd;
        return updated;
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
