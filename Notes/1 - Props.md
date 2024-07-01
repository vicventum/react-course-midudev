## Las props son inmutables

En este caso si tenemos un componente que recibe un `userName` como prop, y queremos agregarle un `@` al lado del `userName`, **no debemos modificar la prop**:

```jsx
export function TwitterFollowCard({ userName }) {
	userName = `@{userName}` // ❌
	// ...
```

Lo que debemos hacer es crear una nueva variable que devuelva el valor modificado de la prop que queremos (como una _computed property_):

```jsx
export function TwitterFollowCard({ userName }) {
	const formattedUserName = `@{userName}` // ✅
    // ...
```

## Renderizado de componentes

Un componente se renderiza cuando alguna variable de estado dentro de él cambia, o cuando un componente padre lo hace. **Un componente padre que se vuelve a renderizar, volverá a renderizar un componente hijo aún cuando las props del componente hijo no hayan cambiado, pero ==dicho componente hijo se vuelve a renderizar pero no actualiza el DOM, ya que no ha habido ningún cambio que reflejar==**)

## Inicializar un estado con una prop

Si usamos una prop para inicializar un estado, una buena práctica es colocarle la palabra `initial` como prefijo de esa prop:

**App.jsx**
```jsx
<TwitterFollowCard userName={'vicventum'} initialIsFollowing> // 👈
  <strong>Victor Alvarez</strong>
</TwitterFollowCard>
```

**TwitterFollowCard.jsx**
```jsx
export function TwitterFollowCard({ initialIsFollowing }) { // 👈
	  const [isFollowing, setIsFollowing] = useState(initialIsFollowing) // ✅
	// ...
```

Además, es importante recordar que **el valor del estado inicial de una prop, sólo usa una vez al inicializar el estado de ese componente hijo, ==si el valor de dicha prop cambia con el tiempo, esos cambios no se verán reflejados en el estado de la variable que uso dicho estado para incializarse==**

Por ejemplo, supongamos que tenemos un estado en el componente padre que usaremos para pasarlo como prop inicializadora para el componente hijo

**App.jsx**
```jsx
export function App() {
  const [isFollowing, setIsFollowing] = useState(false) // 👈

  return (
    <TwitterFollowCard userName={'vicventum'} initialIsFollowing={isFollowing}> // 👈
      <strong>Victor Alvarez</strong>
    </TwitterFollowCard>

    <button onClick={() => setIsFollowing(!isFollowing)}>  // 👈
      Cambiar estado 
    </button>
  )
```

**TwitterFollowCard.jsx**
```jsx
export function TwitterFollowCard({ initialIsFollowing }) { // 👈
	  const [isFollowing, setIsFollowing] = useState(initialIsFollowing) // ✅
	// ...
```

Si bien dicha prop inicializa correctamente el estado de nuestro componente hijo sin problema, si pulsamos el botón `"Cambiar estado "` del componente padre y el estado  de la variable `isFollowing` que le estamos pasando al componente hijo cambia, **dicho cambio no se verá reflejado en el componente hijo, ya que el valor de esa prop sólo se usó la primera vez que inicializamos la variable `isFollowing` del componente hijo, y ahora esta sólo cambiará por medio de su función `setIsFollowing`**

## `key` en renderizado de listas

**Las _keys_ le indican a React que objeto del array corresponde a cada componente, para así poder emparejarlo más tarde**. **Esto se vuelve más importante si los objetos de tus arrays se pueden mover (p. ej. debido a un ordenamiento), insertar, o eliminar**.

###  [[7 - ⭐ Renderizado de listas#⭐ No usar el `index` de un bucle como `key`|⭐ No usar el `index` de un bucle como `key`]]

> [!warning]
>**Podrías estar tentado a usar el índice del elemento en el array como su _key_. De hecho, eso es lo que React usará si tu no especifícas una _`key`_ en absoluto. Pero el orden en el que renderizas elementos cambiará con el tiempo si un elemento es insertado, borrado, o si se reordena su array**. El índice como _key_ lleva a menudo a sutiles y confusos errores.
>
>**Igualmente, no generes _keys_ sobre la marcha, p. ej. con `key={Math.random()}` o `key={crypto.uuid()}`**. **Esto hará que las _keys_ nunca coincidan entre renderizados, llevando a todos tus componentes y al DOM a recrearse cada vez**. No solo es una manera lenta, si no que también pierde cualquier input del usuario dentro de los elementos listados. En vez de eso, usa unas IDs basadas en datos.
>
>Date cuenta de que tus componentes no reciben la _`key`_ como un prop. Solo es usado como pista para React. Si tus componentes necesitan un ID, se lo tienes que pasar como una prop separada: `<Profile key={id} userId={id} />`.

**App.jsx**
```jsx
import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard'

export default function App() {
	// const formatUserName = (userName) => `@${userName}`
	const users = [ // 👈
		{
			userName: 'vicventum',
			name: 'Victor Alvarez',
			isFollowing: true,
		},
		{
			userName: 'midudev',
			name: 'Miguel Ángel Durán',
			isFollowing: true,
		},
		{
			userName: 'pheralb',
			name: 'Pablo H.',
			isFollowing: false,
		},
	]

	return (
		<section className="App">
			{users.map((user) => ( // 👈
				<TwitterFollowCard
					key={user.userName} // 👈
					userName={user.userName}
					initialIsFollowing={user.isFollowing}
				>
					<strong>{user.name}</strong>
				</TwitterFollowCard>
			))}
		</section>
	)
}
```
