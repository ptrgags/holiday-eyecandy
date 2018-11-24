class HexagonTiling extends ComplexPlaneSketch {
    constructor() {
        super();
        this.NUM_TILES = 20;
        this.TILE_RADIUS = 0.1;
        this.ROOT3 = Math.sqrt(3);
    }

    make_hexagon() {
        let poly = Polygon.make_regular(6);

        // Make the hexagons a little bit smaller
        let shrink = MatrixTransform.scale(this.TILE_RADIUS, this.TILE_RADIUS);
        return poly.apply_transform(shrink);
    }

    make_tiles() {
        let results = [];
        for (let i = 0; i < this.NUM_TILES; i++)
            results.push(this.make_hexagon());
        return results;
    }

    make_xforms() {
        let x = this.TILE_RADIUS * 1.5;
        let y = this.TILE_RADIUS / 2.0 * this.ROOT3;

        let ifs = new IFS([
            MobiusTransform.pure_translation(new Complex(x, y)),
            MobiusTransform.pure_translation(new Complex(0, 2 * y)),
            MobiusTransform.pure_translation(new Complex(x, -y))
        ]);
        ifs.add_inverses();
        return ifs;
    }

    make_renderer(xforms, tiles) {
        return new ChaosTiling(xforms, tiles);
    }
}
