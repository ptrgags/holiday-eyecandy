/**
 * Simplest possible Tile Arranger. This creates N tiles, all centered 
 * at the origin.
 *
 * This is intended to be used with renderers that transform tiles randomly
 * like in ChaosGame
 */
class CenterArranger extends TileArranger {
    constructor(num_tiles) {
        super();
        this.num_tiles = num_tiles;
    }

    arrange_tiles() {
        let results = [];
        for (let i = 0; i < this.num_tiles; i++)
            results.push(complex(0.0, 0.0));
        return results;
    }
}
