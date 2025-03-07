import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Book, addBook, updateBook, fetchBookById } from "../services/bookService";

const AddEditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  const [bookData, setBookData] = useState<Omit<Book, "id">>({
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

  // Завантажуємо книгу за ID, якщо воно є
  useEffect(() => {
    if (id) {
      fetchBookById(id)
        .then((book) => {
          if (book) {
            setBookData({
              title: book.title,
              author: book.author,
              category: book.category,
              isbn: book.isbn,
              active: book.active,
              createdAt: book.createdAt,
              modifiedAt: book.modifiedAt ?? "",
            });
          } else {
            console.error("Book not found with id:", id); 
          }
        })
        .catch((error) => {
          console.error("Failed to fetch book:", error);
        });
    }
  }, [id]);

  // Обробка зміни значень в інпутах
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  // Перевірка на валідність форми
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

  // Обробка сабміту форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedBook: Partial<Book> = {
      ...bookData,
      modifiedAt: new Date().toISOString(),
    };

    if (id) {
      // Якщо є ID, оновлюємо книгу
      updateBook(id, updatedBook)
        .then(() => {
          alert("Book updated successfully!");
          navigate("/"); // Перехід на головну сторінку
        })
        .catch((error) => {
          console.error("Failed to update book:", error);
        });
    } else {
      // Якщо ID немає, додаємо нову книгу
      const newBook: Omit<Book, "id"> = {
        ...bookData,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      };
      addBook(newBook)
        .then(() => {
          alert("Book added successfully!");
          navigate("/"); // Перехід на головну сторінку
        })
        .catch((error) => {
          console.error("Failed to add book:", error);
        });
    }
  };

  return (
    <Wrapper>
      <Title>{id ? "Edit Book" : "Add New Book"}</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Title:
          <Input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <ErrorMessage>Title is required</ErrorMessage>}
        </Label>
        <Label>
          Author:
          <Input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
            className={errors.author ? "input-error" : ""}
          />
          {errors.author && <ErrorMessage>Author is required</ErrorMessage>}
        </Label>
        <Label>
          Category:
          <Select
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
          </Select>
          {errors.category && <ErrorMessage>Category is required</ErrorMessage>}
        </Label>
        <Label>
          ISBN:
          <Input
            type="text"
            name="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            required
            pattern="\d+"
            title="ISBN must be a number"
            className={errors.isbn ? "input-error" : ""}
          />
          {errors.isbn && <ErrorMessage>ISBN is required</ErrorMessage>}
        </Label>
        <Label>
          Active:
          <Checkbox
            type="checkbox"
            checked={bookData.active} 
            onChange={(e) => setBookData({ ...bookData, active: e.target.checked })}
          />
        </Label>
        <Button type="submit">{id ? "Update Book" : "Add Book"}</Button>
      </Form>

      <LinkWrapper>
        <StyledLink href="/">Go to Dashboard</StyledLink>
      </LinkWrapper>
    </Wrapper>
  );
};

// Styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  padding: 0 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;

  &.input-error {
    border-color: red;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005f73;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const LinkWrapper = styled.div`
  margin: 40px 0;
`;

const StyledLink = styled.a`
  color: #0077b6;
  font-size: 16px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #005f73;
  }
`;

export default AddEditBook;
