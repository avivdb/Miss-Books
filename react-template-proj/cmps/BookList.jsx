import { BookPreview } from "../cmps/BookPreview.jsx"

export function BookList({ books, onRemoveBook, onSelectBook }) {
    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button onClick={() => onSelectBook(book.id)}>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}