class DoubleSpiral extends ComplexPlaneSketch {
    constructor() {
        super();
        this.NUM_TILES = 1000;
        this.TILE_SIZE = 0.01;
    }

    make_xforms() {
        let rotate = MobiusTransform.y90();
        let spiral = MobiusTransform.similitude(
            Complex.from_polar(1.1, 0.1), Complex.zero());

        // Compute rotate * spiral * rotate^-1
        let loxodromic = spiral.conjugate_by(rotate);
        
        return new IFS([loxodromic, loxodromic.inverse]);
    }

    make_tiles() {
        let results = [];
        for (let i = 0; i < this.NUM_TILES; i++) {
            let x = rand_value(2);
            let y = rand_value(2);
            let pos = createVector(x, y);
            results.push(new Circle(pos, this.TILE_SIZE));
        }
        return results;

    }

    make_renderer(xforms, tiles) {
        return new ChaosTiling(xforms, tiles);
    }
}
