/**
 * Any function from [0.0, 1.0] -> [0.0, 1.0]
 * to modulate the colors.
 */
class ColorMapper {
    map_color(val) {
        throw new TypeError("Implement in subclass!");
    }
}
