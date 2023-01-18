import ItemsList from './ItemsList'

function Content({ items, handleCheck, handleDelete }) {

    // let names = ['Bob'];
    // function generateRandomNumbers(names) {
    //     const randomNames = Math.ceil(Math.random() * names.length) - 1;
    //     return randomNames;
    // }

    // function changeValues() {
    //     const nameOne = []
    //     for (let i = 1; i < 2; i++) {
    //         console.log(nameOne.push(generateRandomNumbers(names)));
    //     }
    //     return nameOne;
    // }

    // function handleChange() {
    //     names.push('Pete', 'Dave', 'Moses');
    //     setNames(names[changeValues()]);
    // }
    // const handleClick = () => {
    //     console.log("You clicked it");
    // }

    // const handleClick2 = (name) => {
    //     console.log(`${name} is my name`);
    // }

    // const handleClick3 = (e) => {
    //     console.log(e.target);
    // }
    // const [name, setNames] = useState('Dave');

    // function handleNameChange() {
    //     const names = ['Bob', 'Dave', 'Moses', 'Pete'];
    //     const randomNames = Math.ceil(Math.random() * names.length) - 1;
    //     setNames(names[randomNames]);
    // }



    return (
        <>
            {items.length ? (
                <ItemsList
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty</p>
            )
            }
        </>
    )
}

export default Content;