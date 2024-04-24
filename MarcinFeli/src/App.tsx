// Komponenty w React.js są funkcjami, które zwracają jeden element DOM.

function InnerComponent({text}) {
  return <div>{text} </div>
}

function App() {
	return (
		<div>
			<InnerComponent text="Hello World" />
		</div>
	)
}

export default App
