const { useState, useEffect } = React
export function BookFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { value, name: field } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const { title, price } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Books</h2>
            <form action="">
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" id="title" name="title" />
                <label htmlFor="price">Price</label>
                <input value={price} onChange={handleChange} type="range" min="0" max="500" id="price" name="price" />
            </form>
        </section>
    )
}