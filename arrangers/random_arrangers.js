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

    get label() {
        return `Square of ${this.num_tiles} Random Tile(s)`
    }
}

class RandomCircleArranger extends TileArranger {
    constructor(num_tiles, radius) {
        super();
        this.num_tiles = num_tiles;
        this.radius = radius;
    }

    arrange_tiles() {
        let results = [];
        for (let i = 0; i < this.num_tiles; i++) {
            let r = rand_value(this.radius);
            let theta = rand_value(Math.PI);
            results.push(Complex.from_polar(r, theta));
        }
        return results;
    }

    get label() {
        return `Circle of ${this.num_tiles} Random Tile(s)`
    }
}
