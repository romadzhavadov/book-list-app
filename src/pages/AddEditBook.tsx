import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addBookThunk, updateBookThunk } from "../redux/booksSlice";
import { useParams, useNavigate } from "react-router-dom";

const AddEditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { books, status } = useSelector((state: RootState) => state.books);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    active: true,
    createdAt: "",
    modifiedAt: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    author: false,
    category: false,
    isbn: false,
  });

  useEffect(() => {
    if (id) {
      const bookToEdit = books.find((book) => book.id === id);
      if (bookToEdit) {
        setBookData({
          title: bookToEdit.title,
          author: bookToEdit.author,
          category: bookToEdit.category,
          isbn: bookToEdit.isbn,
          active: bookToEdit.active,
          createdAt: bookToEdit.createdAt,
          modifiedAt: bookToEdit.modifiedAt,
        });
      }
    }
  }, [id, books]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {
      title: !bookData.title,
      author: !bookData.author,
      category: !bookData.category,
      isbn: !bookData.isbn,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedBook = {
      ...bookData,
      modifiedAt: new Date().toISOString(),
    };

    if (id) {
      dispatch(updateBookThunk({ id, updatedBook }))
        .then(() => {
          alert("Book updated successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Failed to update book:", error);
        });
    } else {
      const newBook = {
        ...bookData,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      };
      dispatch(addBookThunk(newBook))
        .then(() => {
          alert("Book added successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Failed to add book:", error);
        });
    }
  };

  return (
    <div>
      <h1>{id ? "Edit Book" : "Add New Book"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <p className="error-message">Title is required</p>}
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
            className={errors.author ? "input-error" : ""}
          />
          {errors.author && <p className="error-message">Author is required</p>}
        </label>
        <label>
          Category:
          <select
            name="category"
            value={bookData.category}
            onChange={handleChange}
            required
            className={errors.category ? "input-error" : ""}
          >
            <option value="">Select a Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Biography">Biography</option>
            <option value="History">History</option>
          </select>
          {errors.category && <p className="error-message">Category is required</p>}
        </label>
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            required
            pattern="\d+" // Регулярний вираз для перевірки лише цифр
            title="ISBN Має бути цифрою" // Повідомлення для користувача
            className={errors.isbn ? "input-error" : ""}
          />
          {errors.isbn && <p className="error-message">ISBN is required</p>}
        </label>
        <label>
          Active:
          <input
            type="checkbox"
            name="active"
            checked={bookData.active}
            onChange={(e) =>
              setBookData({ ...bookData, active: e.target.checked })
            }
          />
        </label>
        <button type="submit">{id ? "Update Book" : "Add Book"}</button>
      </form>

      {/* Лінк на сторінку Dashboard */}
      <div>
        <a href="/">Go to Dashboard</a>
      </div>
    </div>
  );
};

export default AddEditBook;

