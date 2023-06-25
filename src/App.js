import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BooksList from "./pages/BooksList";
import HomePage from "./pages/HomePage";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import HardcoverNonfictionRecommendations from "./pages/HardcoverNonfictionRecommendations";
import HardcoverFictionRecommendations from "./pages/HardcoverFictionRecommendations";
import BookSearch from "./pages/BookSearch";
import PaperbackNonfictionRecommendations from "./pages/PaperbackNonfictionRecommendations";
import PaperbackFictionRecommendations from "./pages/PaperbackFictionRecommendations";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-list" element={<BooksList />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/update-book" element={<UpdateBook />} />
        <Route
          path="/hardcover-non-fiction-recommendations"
          element={<HardcoverNonfictionRecommendations />}
        />
        <Route
          path="/hardcover-fiction-recommendations"
          element={<HardcoverFictionRecommendations />}
        />
        <Route
          path="/paperback-non-fiction-recommendations"
          element={<PaperbackNonfictionRecommendations />}
        />
        <Route
          path="/paperback-fiction-recommendations"
          element={<PaperbackFictionRecommendations />}
        />
        <Route path="/search" element={<BookSearch />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
