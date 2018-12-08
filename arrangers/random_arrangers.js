class RandomSquareArranger extends TileArranger {
    constructor(num_tiles, rand_scale) {
        super();
        this.num_tiles = num_tiles;
        this.rand_scale = rand_scale;
    }

    arrange_tiles() {
        let results = [];
        for (let i = 0; i < this.num_tiles; i++) {
            let x = rand_value(this.rand_scale);
            let y = rand_value(this.rand_scale);
            results.push(complex(x, y));
        }
        return results;
    }
}
