import styles from "./SearchBar.module.css"
import { useState } from "react";

export default function SearchBar({ onSearch, random }) {

   const [character, setCharacter] = useState("");

   const handleChange = (e) => {
      setCharacter(e.target.value)
   };

   return (
      <div className={styles.container}>
         <input type='search'
            onChange={handleChange}
         />
         <button onClick={() => onSearch(character)}
         >Agregar
         </button>
         <button onClick={() => random(Math.floor(Math.random() * 800) + 26)}
         >Random!
         </button>
      </div>
   );
}
