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
