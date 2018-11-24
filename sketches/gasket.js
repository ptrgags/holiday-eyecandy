class AppolonianGasket extends ComplexPlaneSketch {
    constructor() {
        super(0.4);
        this.NUM_TILES = 10000;
        this.CIRCLE_SIZE = 0.001;
    }

    make_renderer(xforms, tiles) {
        return new ChaosTiling(xforms, tiles);
    }

    make_xforms() {
        let a = new MobiusTransform([
            Complex.one(), Complex.zero(),
            new Complex(0, -2), Complex.one()
        ]);
        let b = new MobiusTransform([
            new Complex(1, -1), Complex.one(),
            Complex.one(), new Complex(1, 1)
        ]);
        let ifs = new IFS([a, b]);
        ifs.add_inverses();
        return ifs;
    }

    make_tiles() {
        let results = [];
        for (let i = 0; i < this.NUM_TILES; i++) {
            //let x = rand_value(2);
            //let y = rand_value(2);
            let pos = createVector(0, 0);
            results.push(new Point(pos));
        }
        return results;
    }
}
