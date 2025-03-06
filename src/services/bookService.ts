import { api } from "./api";

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
  active: boolean;
  createdAt: string;
  modifiedAt?: string;
}

// Отримати всі книги
export const fetchBooks = async (): Promise<Book[]> => {
  const response = await api.get("/books");
  return response.data;
};

// Отримати книгу за ID
export const fetchBookById = async (id: number): Promise<Book> => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// Додати нову книгу
export const addBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const response = await api.post("/books", book); // Запит на додавання
  return response.data;
};

// Оновити книгу
export const updateBook = async (id: string, updatedBook: Partial<Book>) => {
  // API запит для оновлення книги
  const response = await api.put(`/books/${id}`, updatedBook);
  return response.data; // повертаємо всю оновлену книгу
};

// Видалити книгу
export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};

// Деактивувати або активувати книгу
export const toggleBookStatus = async (id: number, active: boolean): Promise<Book> => {
  const response = await api.patch(`/books/${id}`, { active, modifiedAt: new Date().toISOString() });
  return response.data;
};

