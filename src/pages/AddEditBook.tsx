import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addBookThunk, updateBookThunk } from "../redux/booksSlice";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const AddEditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { books } = useSelector((state: RootState) => state.books);

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
      const bookToEdit = books.find((book) => book.id === Number(id));
      if (bookToEdit) {
        setBookData({
          title: bookToEdit.title,
          author: bookToEdit.author,
          category: bookToEdit.category,
          isbn: bookToEdit.isbn,
          active: bookToEdit.active,
          createdAt: bookToEdit.createdAt,
          modifiedAt: bookToEdit.modifiedAt ?? ""
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
            name="active"
            checked={bookData.active}
            onChange={(e) =>
              setBookData({ ...bookData, active: e.target.checked })
            }
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
  font-size: 2rem;  // Початковий розмір шрифта для великих екранів
  font-weight: bold;
  text-align: center;
  margin: 20px 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;  // Зменшуємо розмір шрифта для планшетів
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;  // Зменшуємо розмір шрифта для мобільних пристроїв
  }
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

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    padding: 10px;
  }
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
