/**
 * Interface for tile arrangers. They pick the centers
 * for each of the initial tiles
 */
class TileArranger {
    /**
     * Return an array of complex numbers that represent the centers
     * of each tile
     */
    arrange_tiles() {
        throw new TypeError("Implement in Subclass!");
    }
}
