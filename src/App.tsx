import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { fetchBooksThunk } from "./redux/booksSlice";

import AppRouter from "./AppRouter"


function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  return (
    <>
      <AppRouter/>
    </>
  )
}

export default App
