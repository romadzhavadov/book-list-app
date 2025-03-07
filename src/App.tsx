import { useEffect } from "react";
import AppRouter from "./AppRouter";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { fetchBooks } from "./services/bookService"; 

function App() {

  useEffect(() => {
    const getBooks = async () => {
      try {
        await fetchBooks();
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBooks();
  }, []);

  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
