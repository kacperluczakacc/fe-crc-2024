import React from "react";

function PrintTextComponent({ text }: { text: string }) {
    return <p>Print Text Comp: {text}</p>;
}

function App() {
    return (
        <div>
            <h1>App Component</h1>
            <PrintTextComponent text="Hello, World!" />
        </div>
    );
}

export default App;
