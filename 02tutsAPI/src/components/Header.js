
function Header({ title }) {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}


//Default props
Header.defaultProps = {
    title: "Default Title"
}

export default Header;