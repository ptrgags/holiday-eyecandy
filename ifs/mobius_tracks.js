class MobiusTracks extends IFS {

    make_xforms() { 
        // The subclass picks the type of mobius transform
        var mobius = this.mobius_xform;

        /*
        // Rotate the sphere so inf -> 1 and 0 -> -1
        if (this.rotate === 90) {
            mobius = mobius.conjugate_by(MobiusTransform.y90());
        } else if (this.rotate === 180) {
            mobius = mobius.conjugate_by(MobiusTransform.x180());
        }
        */

        return [mobius];
    }

    get is_group() {
        return true;
    }

    get mobius_xform() {
        throw new TypeError("Implement in subclass!");
    }
}

/**
 * Loxodromic mobius transforms trace out spirals
 *
 * Complex Plane: single spiral radiating out of the origin and head
 *  toward infinity. After conjugation, this becomes a double spiral!
 *
 * Riemann Sphere: spiral of constant bearing (a loxodrome!) from the
 *  south pole towards the north pole. After conjugation, the sphere is
 *  rotated 90 degrees
 *
 */
class LoxodromicTracks extends MobiusTracks {
    constructor(multiplier=complex(1.1, 0.1), conjugate=true) {
        super();
        this.mult = multiplier;
        this.conjugate = conjugate;
    }

    get mobius_xform() {
        let mobius = MobiusTransform.similitude(this.mult, Complex.zero());
        if (this.conjugate)
            return mobius.conjugate_by(MobiusTransform.y90());
        else
            return mobius;
    }
}


/**
 * Hyperbolic Mobius transformations are a special case of Loxodromic Mobius
 * transforms where the rotation is always 0
 *
 * Complex Plane: lines that radiate out from the origin and move towards
 * infinity. After conjugation, the lines become arcs from -1 to 1
 *
 * Riemann Sphere: Meridians from south pole to the north pole. 
 * Conjugation rotates the sphere 90 degrees around the y-axis, making
 * the meridians go from left to right instead of bottom to top.
 *
 */
class HyperbolicTracks extends LoxodromicTracks {
    constructor(multiplier=1.1, conjugate=true) {
        super(complex(multiplier), conjugate);
    }
}


/**
 * Elliptic Mobius transforms move points along circles
 * the math is similar to loxodromic transforms so I use that as a superclass
 *
 * Complex plane: Concentric circles. After conjugating, they become
 *   a set of Apollonian circles
 * 
 * Riemann Sphere: Circular rings around the sphere like lattitude lines
 *   conjugating by a mobius transform simply rotates the sphere
 */
class EllipticTracks extends LoxodromicTracks {
    constructor(rotate_amount, conjugate=true) {
        super(Complex.from_polar(1.0, rotate_amount), conjugate);
    }
}

/**
 * Parabolic Mobius transformations: 
 *
 * Complex plane: translation mapping, optionally conjugated by a mobius
 *   transform that maps infinity to the origin
 * 
 * Riemann Sphere: motion along circles tangent at infinity. Optionally
 *   conjugated by a 180 degree rotation around the x-axis, which swaps
 *   the north and south poles.
 */
class ParabolicTracks extends MobiusTracks {
    constructor(translate_amount, conjugate=true) {
        super();
        this.translate = translate_amount;
        this.conjugate = conjugate;
    }

    get mobius_xform() {
        let mobius = MobiusTransform.pure_translation(this.translate);
        if (this.conjugate)
            return mobius.conjugate_by(MobiusTransform.x180());
        else
            return mobius;
    }
}
