import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))
            .catch(err => console.log(err))
    }, [])

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(books => books.filter(book => book.id !== bookId)))
            .catch(err => console.log('err', err))

    }

    function onSelectBook(bookId) {
        setSelectedBook(bookId)

    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {
                !selectedBook &&
                <React.Fragment>
                    <h1>Book Index</h1>
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBook={onSelectBook} />
                </React.Fragment>
            }
            {selectedBook && < BookDetails bookId={selectedBook} />}
        </section>
    )

}