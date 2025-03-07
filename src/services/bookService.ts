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

const baseURL = "http://localhost:3000";

// Функція для виконання запитів з базовим URL
const fetchFromApi = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${baseURL}${url}`, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
};

// Отримати всі книги
export const fetchBooks = async (): Promise<Book[]> => {
  return await fetchFromApi("/books");
};

// Отримати книгу за ID
export const fetchBookById = async (id: string): Promise<Book> => {
  return await fetchFromApi(`/books/${id}`);
};

// Додати нову книгу
export const addBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  };
  return await fetchFromApi("/books", options);
};

// Оновити книгу
export const updateBook = async (id: string, updatedBook: Partial<Book>) => {
  const options: RequestInit = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBook),
  };
  return await fetchFromApi(`/books/${id}`, options);
};

// Видалити книгу
export const deleteBook = async (id: number): Promise<void> => {
  const options: RequestInit = { method: "DELETE" };
  await fetchFromApi(`/books/${id}`, options);
};

// Деактивувати або активувати книгу
export const toggleBookStatus = async (id: number, active: boolean): Promise<Book> => {
  const options: RequestInit = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active, modifiedAt: new Date().toISOString() }),
  };
  return await fetchFromApi(`/books/${id}`, options);
};
