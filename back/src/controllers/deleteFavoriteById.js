const { Favorite } = require("../DB_connection");

const deleteFavoriteById = async (id) => {
    try {
        const favoriteFound = await Favorite.findByPk(id);
        if (!favoriteFound) throw new Error("Id inexistente")
        favoriteFound.destroy();
        return 'Favorito eliminado correctamente';
    } catch (error) {
        return { error: error.message }
    }
};

module.exports = deleteFavoriteById