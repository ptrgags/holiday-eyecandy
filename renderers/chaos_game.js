class ChaosGame extends Renderer {
    draw(gfx) {
        let new_tiles = [];
        for (let tile of this.tiles) {
            tile.draw(gfx, 'red');
            let xform = this.ifs.rand_xform;
            let new_tile = tile.apply_transform(xform);
            new_tiles.push(new_tile);
        }
        this.tiles = new_tiles;
    }

}
