## Evitar pasar funciones de cambio de estado a funciones externas

**Todas las funciones de cambio de estado (como `setLoQueSea()`) deben de quedarse en el componente donde se declaran**. 

Si tenemos una función externa que hace una llamada HTTP a una API, y obtiene un valor que debemos guardar en el estado, es mala práctica pasar directamente como parámetro, la función actualizadora de estado, esto porque esa función externa ya no será reutilizable:

**/services/getRandomFact.js**
```js
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export const getRandomFact = async (setFact) => { // 👈
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json()
  const { fact } = data
  setFact(fact) // ❌
}
```

La mejor práctica para mantener esa función reutilizable, es simplemente devolver el valor de la llamada HTTP, y luego que el componente que la llame use dicho valor retornado como desee:

**/services/getRandomFact.js**
```js
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export const getRandomFact = async () => { // 👈
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json()
  const { fact } = data
  return fact // ✅
}
```

## Evitar dar nombre a _custom hooks_ que revelen su implemetación

Una mala práctica es hacer que los nombres de nuestros _custom hooks_ digan mucho sobre su implementación, esto porque la implementación de los _custom hooks_ pueden cambiar, los _custom hooks_ deben ser _cajas negras_, no nos debería importar cómo están implementado, sólo su resultado.

Nombres como el siguiente está mal, ya que puede insinuar que los datos los obtendremos usando _Axios_, pero también podríamos obtenerlo desde el _local storage_ u otro sitio, por lo que dicho nombre ya no sería correcto:

```jsx
export function useAxiosCatFacts() { // ❌
  // ...
}
```

Un mejor nombre debe de ser uno que esté relacionado con lo que devuelve dicho _custom hook_, que es lo que nos interesa:

```jsx
export function useCatFacts() { // ✔
  // ...
}
```
