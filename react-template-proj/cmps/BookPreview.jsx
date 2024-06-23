export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <h3>{book.listPrice}$</h3>
        </article>
    )
}