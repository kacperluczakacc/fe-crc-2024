//komponenty w react są funkcjami, które zwracają jeden element DOM

function InnerComponent() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  )
}

const App = () => {
  return (
      <InnerComponent />
  )
}

export default App