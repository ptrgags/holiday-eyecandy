/**
 * There are 17 Wallpaper groups. I do not plan to implement all of them
 * simply due to lack of time.
 */
class Wallpaper extends IFS {
    constructor(wallpaper_type, cell_size=1.0) {
        super();
        this.wallpaper_type = wallpaper_type;
        this.cell_size = cell_size;
    }

    /**
     * Return a CycleBuffer of transformations
     */
    make_xforms() {
        // Translate by various amounts
        let Tx_half = new ComplexTransform(
            complex(1), complex(0.5 * this.cell_size));
        let Ty_half = new ComplexTransform(
            complex(1), complex(0, 0.5 * this.cell_size));
        let Tx = Tx_half.then(Tx_half);
        let Ty = Ty_half.then(Ty_half);

        // Some tilings need different translation amounts in each direction
        let Tx2 = Tx.then(Tx);
        let Ty2 = Ty.then(Ty);
        let Tx4 = Tx2.then(Tx2);
        let Ty4 = Ty2.then(Ty2);

        // n-degree rotations about the origin
        let R2 = new ComplexTransform(complex(-1), complex(0));
        let R4 = new ComplexTransform(complex(0, 1), complex(0));

        // Flip over x and y axes
        let X = new ComplexTransform(complex(1), complex(0), true);
        let Y = new ComplexTransform(complex(-1), complex(0), true);

        // Glide reflections. multiples of HALF the cell size
        // since glide reflections usually produce staggered rows
        let Gx = X.then(Tx_half);
        let Gy = Y.then(Ty_half);
        let Gx2 = X.then(Tx);
        let Gy2 = Y.then(Ty);
        let Gx4 = X.then(Tx2);
        let Gy4 = Y.then(Ty2);

        let GROUPS = {
            p1: [Tx, Ty],
            p2: [Tx, Ty2, R2],
            pm: [Tx, Ty2, X],
            pg: [Tx, Ty2, Gy2],
            // cm goes here
            pmm: [Tx2, Ty2, X, Y],
            pmg: [Tx2, Ty2, X, Gy2],

            // More here
            p4: [Tx2, Ty2, R4],

            // These aren't quite right yet
            /*
            p4m: [
                Tx4,
                Ty4,
                R4.conjugate_by(Tx.inverse),
                X,
                Y.conjugate_by(Tx.inverse)],
            p4g: [Tx4, Ty4, R4, Gx4.conjugate_by(Tx), Gy4.conjugate_by(Ty)],
            */

        };

        let result = GROUPS[this.wallpaper_type];

        if (result === undefined)
            throw new TypeError("Invalid Walpaper Group " + this.wallpaper);

        return result;
    }

    get is_group() {
        return true;
    }

    get label() {
        return `Wallpaper Group ${this.wallpaper_type}`;
    }

    get id() {
        return `ifs-wallpaper-${this.wallpaper_type}`;
    }
}
