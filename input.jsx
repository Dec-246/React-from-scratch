function H1({ children }) {
    return <h1>{children}</h1>
}

function Greeting() {
    return <h2>Hello there!</h2>
}

export default function App() {
    return (
        <>
        {/* Any tag without children can be self closing */}
            <Greeting />
            <H1>BIG LIST</H1>
            
            <ul className="my-little-list">
                <li>Hello</li>
                <li>World</li>
            </ul>

            <form action="">
                <label htmlFor="first_name">First Name</label>

                <input id="first_name" name="first_name" type="text" />

                <button>Submit</button>
            </form>
        </>
       
    )
}