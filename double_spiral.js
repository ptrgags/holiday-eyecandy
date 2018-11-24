class MobiusTracks extends ComplexPlaneSketch {
    constructor() {
        super();
        this.NUM_TILES = 1000;
    }

    make_renderer(xforms, tiles) {
        return new ChaosTiling(xforms, tiles);
    }

    make_xforms() {
        // The subclass picks the type of mobius transform
        let mobius = this.mobius_xform;

        // Rotate the sphere so inf -> 1 and 0 -> -1
        let rotate = MobiusTransform.y90();
        let combined = mobius.conjugate_by(rotate);
        
        return new IFS([combined, combined.inverse]);
    }

    get mobius_xform() {
        throw new TypeError("Implement in subclass!");
    }

    make_tiles() {
        let results = [];
        for (let i = 0; i < this.NUM_TILES; i++) {
            let x = rand_value(2);
            let y = rand_value(2);
            let pos = createVector(x, y);
            results.push(new Trace(pos));
        }
        return results;
    }
}


class LoxodromicTracks extends MobiusTracks {
    get mobius_xform() {
        return MobiusTransform.similitude(
            Complex.from_polar(1.1, 0.1), Complex.zero());
    }
}

class HyperbolicTracks extends MobiusTracks {
    get mobius_xform() {
        return MobiusTransform.pure_scale(1.1);
    }
}

class ParabolicTracks extends MobiusTracks {
    get mobius_xform() {
        return MobiusTransform.pure_translation(new Complex(0.1, 0.0));
    }
}

class EllipticTracks extends MobiusTracks {
    get mobius_xform() {
        return MobiusTransform.similitude(
            Complex.from_polar(1.0, 0.1), Complex.zero());
    }
}
