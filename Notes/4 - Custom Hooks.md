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