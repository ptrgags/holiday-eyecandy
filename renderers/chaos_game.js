class ChaosGame extends Renderer {
    set_ifs(ifs) {
        this.ifs = ifs;
    }

    set_tiles(tiles) {
        this.tiles = tiles;
    }

    draw(gfx) {
        /*
        let new_tiles = [];
        for (let tile of this.tiles) {
            tile.draw(gfx);
            let xform = this.xforms.rand_xform;
            let new_tile = tile.apply_transform(xform);
            new_tiles.push(new_tile);
        }
        this.tiles = new_tiles;
        */
    }

}
