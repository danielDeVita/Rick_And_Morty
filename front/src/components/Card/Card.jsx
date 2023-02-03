import styles from "./Card.module.css"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFavorite, deleteCharacter } from "../../redux/actions"
import { useState, useEffect } from "react";

export function Card({ name, species, gender, image, onClose, id, addFavorite, deleteCharacter, myFavorites }) {

   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if (isFav === true) {
         setIsFav(false);
         deleteCharacter(id);
      } else {
         setIsFav(true);
         addFavorite({ name, species, gender, image, id })
      }
   };

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div className={styles.card}>

         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }

         <Link to={`/detail/${id}`}>
            <h2>{name}</h2>
         </Link>
         <h3>{species}</h3>
         <h3>{gender}</h3>
         <img src={image} alt="" />
         <button onClick={onClose}>Close</button>
      </div>
   );
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFavorite: (character) => dispatch(addFavorite(character)),
      deleteCharacter: (id) => dispatch(deleteCharacter(id))
   }
}

const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites,
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);