/**
 * Normalize the number of tiles drawn
 * mod some maximum value.
 *
 * this should give similar results to FrameCountNormalizer except
 * the speed will depend on the renderer and IFS used.
 */
class NumTilesNormalizer extends VariableNormalizer {
    constructor(max_tiles) {
        super();
        this.max_tiles = max_tiles;
    }

    normalize(stats) {
        return stats.tiles_drawn % this.max_tiles / this.max_tiles;
    }

    get label() {
        return "Tiles Drawn";
    }

    get id() {
        return 'var-num-tiles';
    }
}
