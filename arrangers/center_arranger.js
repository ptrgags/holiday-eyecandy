/**
 * Simplest possible Tile Arranger. This creates N tiles, all centered
 * at a given center
 *
 * This is intended to be used with renderers that transform tiles randomly
 * like in ChaosGame
 */
class CenterArranger extends TileArranger {
    constructor(center, num_tiles) {
        super();
        this.center = center;
        this.num_tiles = num_tiles;
    }

    arrange_tiles() {
        let results = [];
        for (let i = 0; i < this.num_tiles; i++)
            results.push(this.center);
        return results;
    }

    get label() {
        return `${this.num_tiles} tile(s) at ${this.center.str}`;
    }
}
