import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { Books } from "../../books.js"
const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy)
    // useEffect(() => {
    //     setBooks(Books.books)
    // }, [])
    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log(err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(books => books.filter(book => book.id !== bookId)))
            .catch(err => console.log('err', err))

    }

    function onSelectBook(bookId) {
        setSelectedBook(bookId)

    }

    function onBack() {
        setSelectedBook(null)
    }
    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {
                !selectedBook &&
                <React.Fragment>
                    <BookFilter
                        filterBy={filterBy}
                        onSetFilterBy={onSetFilterBy} />
                    <h1>Book Index</h1>
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBook={onSelectBook} />
                </React.Fragment>
            }
            {selectedBook && < BookDetails bookId={selectedBook} onBack={onBack} />}
        </section>
    )

}