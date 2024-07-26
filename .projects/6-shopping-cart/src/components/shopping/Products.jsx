import './Products.css'
import { AddToCartIcon } from '@/components/base/Icons'

export function Products({ products }) {
  return (
    <main className='products'>
      <ul>
        {/* ? Usando `slice` para sólo mostrar los primero 10 productos */}
        {products.slice(0, 10).map(product => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div>
              <strong>{product.title}</strong> - ${product.price}
            </div>
            <div>
              <button>
                <AddToCartIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
