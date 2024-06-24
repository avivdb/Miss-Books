import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {
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
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h3>Authors: {book.authors.toString()}</h3>
            <h3>Publish Date: {book.publishedDate}</h3>
            <h3>Price: {book.listPrice.amount}₪</h3>
            <h3>Page Count: {book.pageCount}</h3>
            <h3>Catagories: {book.categories.toString()}</h3>
            <h3>Language: {book.language}</h3>
            <p>{book.description}</p>
            <img src={book.thumbnail} alt="" />
            {book.listPrice.isOnSale && <div>ON SALE!!!</div>}


            <button onClick={onBack}>back</button>
        </section>
    )
}