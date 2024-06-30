## Copiar objetos de forma superficial y profunda

Como ya sabemos, para actualizar el estado de una variable no podemos modificar la variable directamente:

```jsx
const [board, setBoard] = useState(Array(9).fill(null))
board[0] = '✖' // ❌ Esto no es correcto
```

Para hacerlo correctamente debemos copiar todo el objeto o array y pasarle el nuevo valor a la función actualizadora. Esto podemos hacerlo **de forma superficial con el _spread operator_ para arrays u objetos planos**:

```jsx
const [board, setBoard] = useState(Array(9).fill(null))
const newBoard = [...board] // 👈
newBoard[0] = '✖'  // 👈
setBoard(newBoard) // 👈✅ Esto SI es correcto
```

**Para objetos con varios niveles de profundidad debemos usar la función `structuredClone`** (en este caso no es necesario porque es un array):

```jsx
const [board, setBoard] = useState(Array(9).fill(null))
const newBoard = structuredClone(board) // 👈
newBoard[0] = '✖'
setBoard(newBoard) // ✅ Esto SI es correcto
```

## El estado es asíncrono

La actualización del estado es asíncrona, por lo que **si en un controlador de eventos actualizamos el estado en una variable, y ==en la línea siguiente queremos mostrar el estado ya actualizado, la variable mostrará el estado anterior, esto es porque primero se tiene que terminar de ejecutar el resto del código del controlador de eventos para poder disparar el nuevo renderizado== y poder ver reflejado el estado con el nuevo valor**.

En este caso si tenemos un nuevo ganador y queremos guardar ese nuevo ganador en el estado de `winner`, e inmediatamente mostrar una alerta con `winner` ya actualizada, el alert nos mostrará `null` como valor de `winner` (además de que no nos mostrará la  `x` en pantalla hasta que le demos "_Aceptar_" al alert ya que detiene el renderizado):

```jsx
function handleUpdateBoard(index) {
  // ...

  const newWinner = checkWinner(newBoard)
  if (newWinner) {
    setWinner(newWinner) // 👈
    alert('¡Has ganado!', newWinner) // 👈
  } 
}
```

Para corregir esto y mostrar el valor actualizado del estado, lo que debemos hacer es no pasarle directamente el valor a asignar a la función actualizadora, sino que debemos pasar un callback que debe devolver el nuevo a asignar. Dentro de este callback, podremos tener acceso al nuevo valor del estado sin esperar que el controlador de eventos termine y se produzca un nuevo renderizado.

De esta manera, podemos mostrar correctamente el mensaje con el nuevo valor actualizado:

```jsx
function handleUpdateBoard(index) {
  // ...

  const newWinner = checkWinner(newBoard)
  if (newWinner) {
    setWinner((prevVal) => {
      alert(`Ganador: ${newWinner}, valor anterior: ${prevVal}`)
      return newWinner
    })
  } 
}
```

>[!note]
>En este caso aun tendríamos el problema de que no nos mostrará la  `x` en pantalla hasta que le demos "_Aceptar_" al alert ya que detiene el renderizado

## Inicialización condicional del estado

Es importante recordar que **los hooks deben ser llamados sólo en la raiz del componente**, por lo que intentar inicializar un estado condicionalmente dentro de un `if`, no es correcto, **además de que en este caso la obtención del _local storage_ se ejecutará en cada render, lo cual es un problema porque es una operación lenta, síncrona, y bloqueante**:

```jsx
// ...
const boardFromLocalStorage = window.localStorage.board // ❌
if (boardFromLocalStorage)  {
  const [board, setBoard] = useState(JSON.parse(boardFromLocalStorage)) // ❌
} else {
  const [board, setBoard] = useState(Array(9).fill(null)) // ❌
}
// ...
```

**Un renderizado condicional con un ternario tampoco es posible**:

```jsx
const [board, setBoard] = useState(
  window.localStorage.board ? window.localStorage.board : Array(9).fill(null) // ❌
)
```

**Para poder inicializar un estado condicionalmente correctamente, podemos pasarle un callback al `useState`, y dentro de él realizar la lógica condicional y devolver el valor inicial del estado**:

```jsx
// ...
const [board, setBoard] = useState(() => { // 👈
  const boardFromLocalStorage = window.localStorage.board // ✅
  if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage) // ✅
  return Array(9).fill(null) // ✅
})
// ...
```

En este caso sí se podría usar un ternario, pero dentro del callback:

```jsx
// ...
const [board, setBoard] = useState(() => { // 👈
  const boardFromLocalStorage = window.localStorage.board // ✅
  return window.localStorage.board  // ✅
    ? window.localStorage.board 
    : Array(9).fill(null)
})
// ...
```

Con esto además la obtención del _local storage_ sólo se ejecutará una vez en la inicialización del estado, y no en cada render