import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks, addBook, updateBook, deleteBook, toggleBookStatus, Book } from "../services/bookService";

interface BooksState {
  books: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: BooksState = {
  books: [],
  status: "idle",
};

// Async thunk для отримання списку книг
export const fetchBooksThunk = createAsyncThunk("books/fetchBooks", async () => {
  return await fetchBooks();
});

// Async thunk для додавання книги
export const addBookThunk = createAsyncThunk(
  "books/addBook",
  async (newBook: Omit<Book, "id">) => {
    return await addBook(newBook);
  }
);


// Async thunk для оновлення книги
export const updateBookThunk = createAsyncThunk(
  "books/updateBook",
  async ({ id, updatedBook }: { id: string; updatedBook: Partial<Book> }) => {
    const response = await updateBook(id, updatedBook);
    return response; // повертаємо оновлену книгу з API
  }
);

// Async thunk для видалення книги
export const deleteBookThunk = createAsyncThunk("books/deleteBook", async (id: number) => {
  await deleteBook(id);
  return id;
});

// Async thunk для зміни статусу книги
export const toggleBookStatusThunk = createAsyncThunk(
  "books/toggleBookStatus",
  async ({ id, active }: { id: number; active: boolean }) => {
    return await toggleBookStatus(id, active);
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooksThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooksThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addBookThunk.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBookThunk.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload; // оновлюємо книгу в масиві
      }
      })
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      })
      .addCase(toggleBookStatusThunk.fulfilled, (state, action) => {
        state.books = state.books.map((book) => (book.id === action.payload.id ? action.payload : book));
      });
  },
});

export default bookSlice.reducer;
