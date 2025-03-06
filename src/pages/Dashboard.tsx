// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../redux/store";
// import { fetchBooksThunk, toggleBookStatusThunk, deleteBookThunk } from "../redux/booksSlice";
// import { Link } from "react-router-dom";
// import { format } from "date-fns";
// import { toZonedTime } from "date-fns-tz"; // Для перетворення в локальний час

// const Dashboard: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { books, status } = useSelector((state: RootState) => state.books);
//   const [filter, setFilter] = useState<string>("Show All");


//   useEffect(() => {
//     dispatch(fetchBooksThunk());
//   }, [dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>Error loading books</p>;

//   // Фільтрація книг за статусом
//   const filteredBooks = books.filter((book) => {
//     if (filter === "Show Active") return book.active;
//     if (filter === "Show Deactivated") return !book.active;
//     return true; // Show All
//   });

//   // Отримання локального часового поясу
//   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//   return (
//     <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
//       <h1>Book List</h1>

//       {/* Фільтр */}
//       <div>
//         <label>Filter:</label>
//         <select onChange={(e) => setFilter(e.target.value)} value={filter}>
//           <option>Show All</option>
//           <option>Show Active</option>
//           <option>Show Deactivated</option>
//         </select>
//       </div>

//       {/* Інформація про кількість записів */}
//       <p>
//         Showing {filteredBooks.length} of {books.length} records
//       </p>

//       {/* Лінк на сторінку додавання книги */}
//       <Link to="/add">Add a Book</Link>

//       {/* Таблиця */}
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Author</th>
//             <th>Category</th>
//             <th>ISBN</th>
//             <th>Created At</th>
//             <th>Modified At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredBooks.map((book) => (
//             <tr
//               key={book.id}
//               style={{
//                 backgroundColor: book.active ? "white" : "lightgray", // змінюємо фон для деактивованих книг
//               }}
//             >
//               <td>{book.title}</td>
//               <td>{book.author}</td>
//               <td>{book.category}</td>
//               <td>{book.isbn}</td>

//               {/* Форматування часу для Created At */}
//               <td>
//                 {book.createdAt
//                   ? format(toZonedTime(new Date(book.createdAt), timeZone), "dd MMMM yyyy, h:mma")
//                   : "--"}
//               </td>

//               {/* Форматування часу для Modified At */}
//               <td>
//                 {book.modifiedAt
//                   ? format(toZonedTime(new Date(book.modifiedAt), timeZone), "dd MMMM yyyy, h:mma")
//                   : "--"}
//               </td>

//               <td>
//                 <Link to={`/edit/${book.id}`}>Edit</Link>
//                 <button onClick={() => dispatch(deleteBookThunk(book.id))}>Delete</button>
//                 <button onClick={() => dispatch(toggleBookStatusThunk({ id: book.id, active: !book.active }))}>
//                   {book.active ? "Deactivate" : "Re-Activate"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Sticky Footer */}
//       <footer style={{ marginTop: "auto", textAlign: "center", padding: "10px", background: "#f1f1f1" }}>
//         <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
//           GitHub
//         </a>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBooksThunk, toggleBookStatusThunk, deleteBookThunk } from "../redux/booksSlice";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz"; // Для перетворення в локальний час

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, status } = useSelector((state: RootState) => state.books);
  const [filter, setFilter] = useState<string>("Show All");

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading books</p>;

  // Фільтрація книг за статусом
  const filteredBooks = books.filter((book) => {
    if (filter === "Show Active") return book.active;
    if (filter === "Show Deactivated") return !book.active;
    return true; // Show All
  });

  // Отримання локального часового поясу
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Обробка видалення книги
  const handleDelete = async (bookId: string) => {
    try {
      await dispatch(deleteBookThunk(bookId)); // чекаємо на завершення видалення
      alert("Book successfully deleted."); // Показуємо повідомлення після успішного видалення
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <h1>Book List</h1>

      {/* Фільтр */}
      <div>
        <label>Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option>Show All</option>
          <option>Show Active</option>
          <option>Show Deactivated</option>
        </select>
      </div>

      {/* Інформація про кількість записів */}
      <p>
        Showing {filteredBooks.length} of {books.length} records
      </p>

      {/* Лінк на сторінку додавання книги */}
      <Link to="/add">Add a Book</Link>

      {/* Таблиця */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Created At</th>
            <th>Modified At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr
              key={book.id}
              style={{
                backgroundColor: book.active ? "white" : "lightgray", // змінюємо фон для деактивованих книг
              }}
            >
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.isbn}</td>

              {/* Форматування часу для Created At */}
              <td>
                {book.createdAt
                  ? format(toZonedTime(new Date(book.createdAt), timeZone), "dd MMMM yyyy, h:mma")
                  : "--"}
              </td>

              {/* Форматування часу для Modified At */}
              <td>
                {book.modifiedAt
                  ? format(toZonedTime(new Date(book.modifiedAt), timeZone), "dd MMMM yyyy, h:mma")
                  : "--"}
              </td>

              <td>
                <Link to={`/edit/${book.id}`}>Edit</Link>
                <button onClick={() => dispatch(toggleBookStatusThunk({ id: book.id, active: !book.active }))}>
                  {book.active ? "Deactivate" : "Re-Activate"}
                </button>

                {/* Кнопка Delete доступна тільки для деактивованих книг */}
                {!book.active && (
                  <button onClick={() => handleDelete(book.id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sticky Footer */}
      <footer style={{ marginTop: "auto", textAlign: "center", padding: "10px", background: "#f1f1f1" }}>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;
