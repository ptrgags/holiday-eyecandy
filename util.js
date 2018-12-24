/**
 * Return a random double in the range [-scale, scale)
 */
let rand_value = function(scale) {
    // Number between -1 and 1
    let unit_rand = 2.0 * Math.random() - 1;
    return scale * unit_rand;
}

/**
 * Because JavaScript doesn't implement modulo properly for negative
 * integers :P
 */
let mod = function(n, m) {
    return ((n % m) + m) % m;
}

/**
 * this is a common idiom for me
 */
let log = function(x) {
    console.log(x.str);
}

let rand_array = function(n) {
    return Array(n).fill(0).map(x => Math.random());
}

/**
 * Pair two Clines
 */
function pair_circles(c1, c2, extra_xform) {
    // First, map c1 to a unit circle at the origin
    let P = Complex.from_vec(c1.center);
    let to_center = MobiusTransform.pure_translation(P.neg);
    let normalize_scale = MobiusTransform.pure_scale(1.0 / c1.radius);

    //map inside to outside using 1/z
    let inv = MobiusTransform.x180();

    // If desired, map the unit circle -> unit circle in between
    let extra = extra_xform || MobiusTransform.identity();

    // Scale up to and move to second circle
    let scale = MobiusTransform.pure_scale(c2.radius);
    let Q = Complex.from_vec(c2.center);
    let recenter = MobiusTransform.pure_translation(Q);


    // Combine the 5 steps into one matrix:
    return to_center
        .then(normalize_scale)
        .then(inv)
        .then(extra)
        .then(scale)
        .then(recenter);
}
