/**
 * Render tiles using Depth-First Search
 */
class DFSRenderer extends Renderer {
    constructor(max_depth, tiles_per_frame) {
        super();
        this.max_depth = max_depth;
        this.tiles_per_frame = tiles_per_frame;
    }

    build(tile_maker, arranger, ifs, color_picker) {
        super.build(tile_maker, arranger, ifs, color_picker);
        this.tile_gen = this.dfs_tiles(0, this.tiles[0]);
    }

    *dfs_tiles(depth, tile, xform_index=null) {
        if (depth == this.max_depth)
            yield tile;
        else if (depth == 0) {
            yield tile;
            // At the root of the tree, we can choose any of the
            // transformations
            for (let [xform, index] of this.ifs.all_xforms) {
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


    render(gfx, color) {
        for (let i = 0; i < this.tiles_per_frame; i++) {
            let tile = tile_gen.next().value;
            if (tile !== undefined) {
                tile.draw(gfx, color);
            }
        }
    }

    get label() {
        return "Depth-First Search (First Tile Only)";
    }
}
