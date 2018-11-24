class MobiusTracks extends ComplexPlaneSketch {
    constructor(rotate_amount=90) {
        super();
        this.NUM_TILES = 1000;
        this.rotate = rotate_amount;
    }

    make_renderer(xforms, tiles) {
        return new ChaosTiling(xforms, tiles);
    }

    make_xforms() {
        // The subclass picks the type of mobius transform
        var mobius = this.mobius_xform;

        // Rotate the sphere so inf -> 1 and 0 -> -1
        if (this.rotate === 90) {
            mobius = mobius.conjugate_by(MobiusTransform.y90());
        } else if (this.rotate === 180) {
            mobius = mobius.conjugate_by(MobiusTransform.x180());
        }
        
        return new IFS([mobius, mobius.inverse]);
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
