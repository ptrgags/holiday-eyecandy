/**
 * Simple tiling method inspired by the Chaos Game
 * However this works on the level of tiles, not pixels
 */
class ChaosTiling {
    constructor(xforms, tiles) {
        this.xforms = xforms;
        this.tiles = tiles;
    }
    
    draw(gfx) {
        let new_tiles = [];
        for (let tile of this.tiles) {
            tile.draw(gfx);
            let xform = this.xforms.rand_xform;
            let new_tile = tile.apply_transform(xform);
            new_tiles.push(new_tile);
        }
        this.tiles = new_tiles;
    }
}
