import React, { useEffect, useState } from "react";
import Header from "../Header/Header";

import styles from "./allCats.module.css";

import { favoriteActions } from "../favourite-slice/FavouriteSlice";
import { useDispatch } from "react-redux";

import heart from "../../img/heart.png";
import filledHeart from "../../img/heart2.png";

const AllCats = ({
  loading,
  data,
  setPage,
  hoveredItem,
  favorites,
  iconsHover,
  iconsLeave,
  clickToHeart,
  isFavourite,
  setIsFavourite,
}) => {
  const [replaceImg, setReplaceImg] = useState(false);

  const dispatchAction = useDispatch();

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= scrollHeight - 20) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const addToFavoriteHandler = (item) => {
    const isFavourite = favorites[item.id];

    if (isFavourite) {
      dispatchAction(favoriteActions.removeFromFavorite(item.id));
    } else {
      dispatchAction(favoriteActions.addToFavorite(item));
    }

    setIsFavourite((prevFavorites) => {
      return { ...prevFavorites, [item.id]: !isFavourite };
    });
  };

  const handleMouseEnter = (itemID) => {
    setReplaceImg(itemID);
  };

  const handleMouseLeave = () => {
    setReplaceImg(null);
  };
  return (
    <div className={styles.allCats}>
      <Header />

      <div className={styles.cats}>
        {data.map((item) => (
          <div
            key={item.id}
            className={styles.catContainer}
            onMouseEnter={() => iconsHover(item.id)}
            onMouseLeave={iconsLeave}
          >
            <img
              className={styles["image-cats"]}
              key={item.id}
              src={item.url}
              alt=""
            />
            {(hoveredItem === item.id || favorites[item.id]) && (
              <div className={styles.icons}>
                <p>
                  <img
                    onClick={() => {
                      clickToHeart(item.id);
                      addToFavoriteHandler(item);
                    }}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    src={
                      replaceImg === item.id || favorites[item.id]
                        ? filledHeart
                        : heart
                    }
                    alt=""
                  />
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {loading && <div className={styles.loading}>Загрузка данных</div>}
    </div>
  );
};

export default AllCats;
