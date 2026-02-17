import BookCard from "./components/BookCard";
import myBooks from "./data/myBooks.ts";

const Library = () => {
    return (
    <div>
    <h2>Ma Collection</h2>
    <div className="book-list">
    {myBooks.map((book) => (
    <BookCard
    key={book.id}
    title={book.title}
    author={book.author}
    />
    ))}
    </div>
    </div>
    );
};
export default Library;