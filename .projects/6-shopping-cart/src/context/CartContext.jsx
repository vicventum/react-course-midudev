import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    // Comprueba que el producto esté en el carrito
    const productInCartIndex = cart.findIndex(item => item.id === product.id)

    // Si el producto está en el carrito
    if (productInCartIndex >= 0) {
      // Forma 1 forma de hacerlo
      const newCart = window.structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }

    // Si el producto no está en el carrito
    setCart(prevState => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ])
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
