/**
 * Interface for rendering
 */
class Renderer {
    constructor() {
        this.tile_maker = null;
        this.ifs = null;
        this.tile_arranger = null;
        this.tiles = [];
    }

    build_core(tile_maker, arranger, ifs) {
        this.tile_maker = tile_maker;
        this.tile_arranger = arranger;
        this.ifs = ifs;

        // Set up things that need further setup
        this.ifs.setup();
        
        // Initialize the first set of tiles.
        // subclasses will handle everything that happens
        // to them.
        this.init_tiles();
    }

    init_tiles() {
        // Get the centers of the initial tiles
        let centers = this.tile_arranger.arrange_tiles();

        let new_tiles = [];
        for (let center of centers) {
            let tile = this.tile_maker.make_tile(center);
            new_tiles.push(tile);
        }
        this.tiles = new_tiles;
    }
}
