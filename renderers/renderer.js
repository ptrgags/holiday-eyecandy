/**
 * Interface for rendering
 */
class Renderer {
    constructor() {
        this.tile_maker = null;
        this.ifs = null;
        this.tile_arranger = null;
        this.tiles = [];

        this.reset_stats();
    }

    reset_stats() {
        this.stats = {
            frame: 0,
            tiles_drawn: 0,
            tile_center: complex(0),
            iterations: 0,
            max_iters: 1000,
        }
    }

    build(tile_maker, arranger, ifs, color_picker) {
        this.tile_maker = tile_maker;
        this.tile_arranger = arranger;
        this.ifs = ifs;
        this.color_picker = color_picker;

        // Set up things that need further setup
        this.ifs.setup();

        // Reset the stats
        this.reset_stats();

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

        this.stats.num_tiles = this.tiles.length;
    }

    /**
     * Calculate the color for the next tile.
     * call this immediately before drawing a tile.
     */
    get tile_color() {
        return this.color_picker.pick_color(this.stats);
    }

    draw(gfx) {
        this.render(gfx);

        // Update the rendered frame count
        this.stats.frame++;
    }

    render(gfx) {
        throw new TypeError("Implement in Subclass!");
    }
}
