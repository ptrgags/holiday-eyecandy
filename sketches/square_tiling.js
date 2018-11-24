class SquareTiling extends ComplexPlaneSketch {
    constructor() {
        super();
        this.SIZE = 0.1;
        this.NUM_TILES = 10;
    }

    make_square() {
        return new Polygon([
            createVector(this.SIZE, this.SIZE),
            createVector(-this.SIZE, this.SIZE),
            createVector(-this.SIZE, -this.SIZE),
            createVector(this.SIZE, -this.SIZE)
        ]);
    }
    
    make_tiles() {
        let results = [];
        for (let i = 0; i < this.NUM_TILES; i++)
            results.push(this.make_square());
        return results;
    }

    make_xforms() {
        let ifs = new IFS([
            MobiusTransform.pure_translation(new Complex(2 * this.SIZE, 0)),
            MobiusTransform.pure_translation(new Complex(0, 2 * this.SIZE)),
        ]);
        ifs.add_inverses();
        return ifs;
    }

    make_renderer(xforms, tiles) {
        return new ChaosTiling(xforms, tiles);
    }

}
