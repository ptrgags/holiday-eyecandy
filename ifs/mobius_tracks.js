class MobiusTracks extends IFS {
    constructor(rotate_amount=90) {
        super();
        this.rotate = rotate_amount;
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

        return [mobius];
    }

    get is_group() {
        return true;
    }

    get mobius_xform() {
        throw new TypeError("Implement in subclass!");
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
