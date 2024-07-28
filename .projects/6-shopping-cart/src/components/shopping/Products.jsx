import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from '@/components/base/Icons'
import { useCart } from '@/hooks/use-cart'

export function Products({ products }) {
  const { checkProductInCart, addToCart, removeFromCart } = useCart()

  return (
    <main className='products'>
      <ul>
        {/* ? Usando `slice` para sólo mostrar los primero 10 productos */}
        {products.slice(0, 10).map(product => {
          const isProductInCart = checkProductInCart(product)

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button
                  style={{
                    backgroundColor: isProductInCart ? 'tomato' : '#09f',
                  }}
                  onClick={() =>
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
