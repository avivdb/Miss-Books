import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))
            .catch(err => console.log(err))
    }, [])
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <h1>Book Index</h1>
            <BookList books={books} />
        </section>
    )

}