import { connect } from "react-redux";
import Card from "../Card/Card";
import styles from "../Cards/Cards.module.css"
import { useDispatch } from "react-redux";
import { filterCards, orderCards } from "../../redux/actions";

export const Favorites = ({ myFavorites }) => {

    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.target.name === "filter" && dispatch(filterCards(e.target.value))
        e.target.name === "order" && dispatch(orderCards(e.target.value))
    };

    let selectStyle = {
        border: "4px dashed #e89ac7",
        borderRadius: "8px",
        backgroundColor: "rgb(26, 25, 25)",
        margin: ".5rem 4rem .5rem 4rem",
        padding: ".3rem .1rem .3rem .1rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    };

    let optionStyle = {
        backgroundColor: "rgb(151, 206, 76)",
        margin: ".5rem",
        fontSize: "16px",
        border: "none",
    };

    return (
        <div className={styles.cardContainer}>
            <div style={selectStyle}>
                <select style={optionStyle} name="order" defaultValue={"default"} onChange={handleChange}>
                    <option value="default" disabled>Seleccione un orden</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>

                <select style={optionStyle} name="filter" defaultValue={"default"} onChange={handleChange}>
                    <option value="default" disabled>Seleccione un género</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            {
                myFavorites.map(fav =>
                    <Card
                        key={fav.id}
                        name={fav.name}
                        species={fav.species}
                        gender={fav.gender}
                        image={fav.image}
                        id={fav.id}
                    />)
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myFavorites: state.myFavorites,
    }
}

export default connect(mapStateToProps, null)(Favorites);