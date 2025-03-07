import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBooksThunk, toggleBookStatusThunk, deleteBookThunk } from "../redux/booksSlice";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import styled from "styled-components";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, status } = useSelector((state: RootState) => state.books);
  const [filter, setFilter] = useState<string>("Show All");

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  if (status === "loading") return <LoadingText>Loading...</LoadingText>;
  if (status === "failed") return <ErrorText>Error loading books</ErrorText>;

  // Фільтрація книг за статусом
  const filteredBooks = books.filter((book) => {
    if (filter === "Show Active") {
      return book.active;
    }
    if (filter === "Show Deactivated") {
      return !book.active;
    }
    return true; // Show All
  });

  // Отримання локального часового поясу
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Обробка видалення книги
  const handleDelete = async (bookId: number) => {
    try {
      await dispatch(deleteBookThunk(bookId)); 
      alert("Book successfully deleted."); 
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <DashboardWrapper>
      <FilterAndCountWrapper>

        {/* Фільтр */}
        <FilterWrapper>
          <label>Filter:</label>
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option>Show All</option>
            <option>Show Active</option>
            <option>Show Deactivated</option>
          </select>
        </FilterWrapper>

        {/* Інформація про кількість записів */}
        <RecordsCount>
          Showing {filteredBooks.length} of {books.length} records
        </RecordsCount>

      </FilterAndCountWrapper>

      {/* Таблиця */}
      <Table>
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
            <TableRow key={book.id} active={book.active}>
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

              <ActionsCell>
                <EditButton to={`/edit/${book.id}`}>
                  Edit
                </EditButton>
                <ActionButton
                  onClick={() =>
                    dispatch(toggleBookStatusThunk({ id: book.id, active: !book.active }))
                  }
                >
                  {book.active ? "Deactivate" : "Re-Activate"}
                </ActionButton>

                {/* Кнопка Delete доступна тільки для деактивованих книг */}
                {!book.active && (
                  <ActionButton onClick={() => handleDelete(book.id)} remove>
                    Delete
                  </ActionButton>
                )}
              </ActionsCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </DashboardWrapper>
  );
};

// Styled-components
const DashboardWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f8fafc;
`;

const FilterAndCountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
    font-weight: bold;
  }

  select {
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
  }
`;

const RecordsCount = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: left;
  font-size: 12px;

  th {
    background-color: #1e3a8a;
    color: white;
    padding: 8px;
    font-weight: bold;
  }

  td {
    padding: 8px;
    border: 1px solid #ddd;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const TableRow = styled.tr<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "white" : "lightgray")};

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ActionsCell = styled.td`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`;

const EditButton = styled(Link)`
  background-color: rgb(255, 255, 255);
  color: #45a049;
  padding: 6px 10px;
  border: 1px solid #45a049;
  border-radius: 4px;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-right: 5px;

  &:hover {
    color: rgb(250, 255, 250);
    background-color: #45a049;
    border-color: #388e3c;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ActionButton = styled.button<{ remove?: boolean }>`
  padding: 6px 12px;
  border: 2px solid ${({ remove }) => (remove ? "#f44336" : "#facc15")};
  background-color: transparent;
  color: ${({ remove }) => (remove ? "#f44336" : "#facc15")};
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ remove }) => (remove ? "#f44336" : "#facc15")};
    color: white;
  }
`;

const LoadingText = styled.p`
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
  color: #1e3a8a;
`;

const ErrorText = styled.p`
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
  color: #f44336;
`;

export default Dashboard;
