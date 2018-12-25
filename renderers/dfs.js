/**
 * Render tiles using Depth-First Search
 */
class DFSRenderer extends Renderer {
    constructor(max_tiles, animation_frames) {
        super();
        this.max_tiles = max_tiles;
        this.animation_frames = animation_frames;

        // Avoid making too many recursive calls.
        // I could probably set this higher, but I don't want to even get
        // close to a stack overflow
        this.DEPTH_LIMIT = 100;
    }

    build(tile_maker, arranger, ifs, color_picker) {
        super.build(tile_maker, arranger, ifs, color_picker);
        this.tile_gen = this.dfs_tiles(0, this.tiles[0]);
        this.finished = false;
        this.know_thy_limits();
    }

    /**
     * Pick conservative limits on the depth and rendering speed
     * depending on the exponential growth of the tiling.
     */
    know_thy_limits() {
        let n = this.ifs.all_xforms.length;
        // Estimate the depth we need to hit max_tiles.
        this.max_depth = DFSRenderer.pick_depth(n, this.max_tiles);

        // Since the number of recursive calls is proportional to the max
        // depth, set a conservative estimate on the depth. This is mostly
        // for the case where n = 2. Since the branching factor is 1,
        // the depth is linear instead of logarithmic.
        this.max_depth = Math.min(this.max_depth, this.DEPTH_LIMIT);

        // Update the stats
        this.stats.max_iters = this.max_depth;

        // Calculate the number of tiles that will be generated
        // and divide by the number of frames we want to animate for
        this.render_speed = this.total_tiles / this.animation_frames;
    }

    /**
     * Compute the number of tiles given the number of transforms
     * (including inverses) and the maximum depth
     *
     * formula is similar to a geometric sequence:
     * tiles(n, d) = 1 + sum(n * (n-1)^k for k in 0 to d - 1)
     *             = 1 + n ((n - 1)^d - 1) / (n - 2)
     */
    static get_num_tiles(num_xforms, max_depth) {
        if (num_xforms === 2) {
            // Special case: when there are only 2 transforms,
            // the branching factor is 1 so just count up the chains of
            // depth max_depth
            return 1 + num_xforms * max_depth;
        } else {
            /**
             * The 1 is for the root tile. at depth 0, we can select
             * any of the n transformations. at further depths,
             * we can't select the inverse so the branching factor is (n - 1)
             */
            let numerator = Math.pow(num_xforms - 1, max_depth) - 1;
            let denominator = num_xforms - 2;
            return 1 + num_xforms * numerator / denominator;
        }
    }

    /**
     * Pick the depth to get as close to the desired number of tiles
     * without going over. This is to limit the exponential growth
     *
     * This is essentially the inverse of get_num_tiles() when
     * num_xforms is held constant.
     */
    static pick_depth(num_xforms, desired_num_tiles) {
        let x = desired_num_tiles;
        let n = num_xforms;

        if (n === 2) {
            // x = 1 + 2d
            // so (x - 1) // 2 == d
            return Math.floor((x - 1) / 2);
        } else {
            // x = 1 + n ((n - 1)^d - 1) / (n - 2), solve for d
            var result = x - 1;
            result *= (n - 2);
            result /= n;
            result += 1;
            result = Math.log(result) / Math.log(n - 1);
            return Math.floor(result);
        }
    }


    get total_tiles() {
        let n = this.ifs.all_xforms.length;
        let d = this.max_depth;
        return DFSRenderer.get_num_tiles(n, d);
    }

    *dfs_tiles(depth, tile, xform_index=null) {
        // Color by the most recent recursive call.
        this.stats.iterations = depth;
        if (depth == this.max_depth)
            yield tile;
        else if (depth === 0) {
            yield tile;
            // At the root of the tree, we can choose any of the
            // transformations
            let counter = 0;
            for (let [xform, index] of this.ifs.all_xforms) {
                counter++;
                let new_tile = tile.apply_transform(xform);
                yield *this.dfs_tiles(depth + 1, new_tile, index);
            }
        } else {
            yield tile;
            // At non-root interior nodes, we don't want to
            // take the inverse of the transform we just applied,
            // else we'll end up in an infinite loop
            let xforms = this.ifs.all_except_inverse(xform_index);
            for (let [xform, index] of xforms) {
                let new_tile = tile.apply_transform(xform);
                yield *this.dfs_tiles(depth + 1, new_tile, index);
            }
        }
    }

    render(gfx) {
        if (this.finished)
            return;

        for (let i = 0; i < this.render_speed; i++) {
            let tile = this.tile_gen.next().value;
            if (tile !== undefined) {
                this.stats.tile_center = tile.center;
                tile.draw(gfx, this.tile_color);
                this.stats.tiles_drawn++;
            } else {
                this.finished = true;
                break;
            }
        }
    }

    get label() {
        return "Depth-First Search";
    }

    get id() {
        return 'renderer-dfs';
    }
}
