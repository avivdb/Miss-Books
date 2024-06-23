import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookDetails({ bookId }) {
    const [book, setBook] = useState(null)
    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book)
            )
            .catch(err => console.log(err))
    }, [])
    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Title: {book.title}</h1>
            <h1>Price: {book.listPrice}₪</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, omnis molestias fuga aliquid minus sit iste blanditiis, dignissimos natus saepe sunt, rem nulla repudiandae exercitationem. Totam dolor quae incidunt ipsum!</p>
        </section>
    )
}