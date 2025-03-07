import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { fetchBooksThunk } from "./redux/booksSlice";
import AppRouter from "./AppRouter"
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";


function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  return (
    <>
      <Header/>
      <AppRouter />
      <Footer/>
    </>
  )
}

export default App
