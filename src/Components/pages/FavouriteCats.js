import React from "react";
import Header from "../Header/Header";

import styles from "./favouriteCats.module.css";

import { favoriteActions } from "../favourite-slice/FavouriteSlice";
import { useSelector, useDispatch } from "react-redux";

import filledHeart from "../../img/heart2.png";

const FavouriteCats = ({ setFavorites ,isFavourite}) => {
 
  const favoriteItems = useSelector((state) => state.favorite.favoriteItems);
  const dispatch = useDispatch();

  const removeFromFavoriteHandler = (id) => {
    dispatch(favoriteActions.removeFromFavorite(id));
    setFavorites(false);
    
  };

  
  return (
    <div>
      <Header />
      {favoriteItems.length > 0 ? (
        <div className={styles.cats}>
          {favoriteItems.map((cat) => (
            <div key={cat.id} className={styles.catContainer}>
              <img className={styles["image-cats"]} src={cat.url} alt="" />
              <div className={styles.icons}>
                <p>
                  <img
                    onClick={() => removeFromFavoriteHandler(cat.id)}
                    src={filledHeart}
                    alt=""
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.choose}>Выберите котика который вам нравится</div>
      )}
    </div>
  );
};

export default FavouriteCats;
