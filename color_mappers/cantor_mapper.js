/**
 * Map [0, 1] -> [0, 1] using the Cantor Set fractal (well, a limited-depth
 * version of it)
 * Really this is the complement of the cantor set, the value range
 * is pasted into the part that is normally removed. The cantor set will
 * be colored in with color 0
 * Furthermore, any number of segments will be used.
 *
 * Example for 3 segments:
 * 0 | [0-----------------------------------------1]
 * 1 | [0-----------0][0-----------1][0-----------0]
 * 2 | [0-0][0-1][0-0][0-----------1][0-0][0-1][0-0]
 * ... and so on. Every middle portion gets the range [0, 1] and the others
 * keep getting split up until we hit the depth limit
 */
class CantorMapper extends ColorMapper {
    // Note: num_segments should be an odd number.
    constructor(num_segments=3, max_iters=5) {
        super();
        this.segments = num_segments;
        this.max_iters = max_iters;
    }

    cantor_range(depth, current_val) {
        // turn a range [0, 1] into several smaller ranges
        // of equal size. Example for 3 segments:
        //
        // current_val = [0,             1]
        // scaled      = [0,             3]
        // cell_id     =    0     1     2
        // new_val     = [0, 1][0, 1][0, 1]
        let scaled = current_val * this.segments;
        let cell_id = Math.floor(scaled);
        let new_val = scaled - cell_id;

        // Base case 1: we are not in the cantor set. return the current
        // value which will be scaled by recursion
        if (cell_id % 2 === 1) {
            return current_val;
        // Base case 2: we hit the depth limit. This is an approximation
        // of a point in the Cantor set. Return the "background value" of
        // the first color in the palette.
        } else if (depth >= this.max_iters) {
            return 0.0;
        } else {
            return this.cantor_range(depth + 1, new_val);
        }
    }

    map_color(val) {
        return this.cantor_range(0, val);
    }

    get label() {
        return "Cantor Set";
    }

    get id() {
        return 'map-cantor';
    }

}
