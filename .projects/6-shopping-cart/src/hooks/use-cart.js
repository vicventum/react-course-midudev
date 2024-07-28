import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined)
    throw new Error('useCart must be used within a CartProvider')

  function checkProductInCart(product) {
    return context.cart.some(item => item.id === product.id)
  }

  return { checkProductInCart, ...context }
}
