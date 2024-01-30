import "./App.css";
import AllCats from "./Components/pages/AllCats";

import { useState, useEffect } from "react";

import "./Components/resetCSS/reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FavouriteCats from "./Components/pages/FavouriteCats";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);

  const fetchCats = async () => {
    const limit = 10;
    const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}`;
    setLoading(true);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const imageData = await response.json();
      setData((prevData) => [...prevData, ...imageData]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      throw error.message || "Что-то пошло не так...";
    }
  };

  useEffect(() => {
    fetchCats();
  }, [page]);

  const iconsHover = (itemID) => {
    setHoveredItem(itemID);
  };
  const iconsLeave = () => {
    setHoveredItem(null);
  };
  const clickToHeart = (itemID) => {
    setFavorites((prevFavorites) => {
      return { ...prevFavorites, [itemID]: !prevFavorites[itemID] };
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <AllCats
              data={data}
              loading={loading}
              setPage={setPage}
              hoveredItem={hoveredItem}
              favorites={favorites}
              iconsHover={iconsHover}
              iconsLeave={iconsLeave}
              clickToHeart={clickToHeart}
              isFavourite={isFavourite}
              setIsFavourite={setIsFavourite}
              setFavorites = {setFavorites}
            />
          }
          exact
        />
        <Route
          path="/favourite"
          element={
            <FavouriteCats
              data={data}
              favorites={favorites}
              setFavorites={setFavorites}
              iconsLeave={iconsLeave}
              clickToHeart={clickToHeart}
              isFavourite={isFavourite}
              setIsFavourite={setIsFavourite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
