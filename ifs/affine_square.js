class AffineSquare extends IFS{
    constructor(num_squares=4, big_square_size=2.0) {
        super();
        this.num_squares = num_squares;
        this.size = big_square_size;
    }

    make_xforms() {
        let shrink = new ComplexTransform(complex(0.5), complex(0.0));
        let results = [];
        var dir = complex(-1.0, 1.0);
        for (let i = 0; i < this.num_squares; i++) {
            let translate = new ComplexTransform(complex(1.0), dir);
            results.push(shrink.then(translate));
            // Each succcessive transform will have the translation
            // in a different rotation, each 90 degrees apart
            dir = dir.mult(Complex.i());
        }
        return results;
    }

    get is_group () {
        return false;
    }

    get label () {
        if (this.num_squares === 3)
            return 'Sierpinski Triangle';
        else
            return 'Big Square';
    }
}
