import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minSpeed: 0 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextCarId,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.minSpeed) {
                books = books.filter(book => book.listPrice >= gFilterBy.minSpeed)
            }
            return books
        })
}

function get(carId) {
    return storageService.get(BOOK_KEY, carId)
}

function remove(carId) {
    return storageService.remove(BOOK_KEY, carId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = 0) {
    return { id: '', title, listPrice }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextCarId(carId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextCarIdx = books.findIndex(book => book.id === carId) + 1
            if (nextCarIdx === books.length) nextCarIdx = 0
            return books[nextCarIdx].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('Harry Potter 1', 300))
        books.push(_createBook('Harry Potter 2', 120))
        books.push(_createBook('Harry Potter 3', 100))
        books.push(_createBook('Harry Potter 4', 150))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}