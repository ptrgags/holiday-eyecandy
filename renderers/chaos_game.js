class ChaosGame extends Renderer {
    render(gfx, color) {
        let new_tiles = [];
        for (let tile of this.tiles) {
            tile.draw(gfx, color);
            this.stats.tiles_drawn++;

            // Apply a random transformation, including inverses.
            // Ignore the xform index, that is only needed for DFS
            let [xform, ] = this.ifs.rand_xform;
            let new_tile = tile.apply_transform(xform);
            new_tiles.push(new_tile);
        }
        this.tiles = new_tiles;
        this.stats.iterations += 1;
    }

    get label() {
        return "Chaos Game";
    }

}
