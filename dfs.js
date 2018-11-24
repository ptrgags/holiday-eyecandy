class DFSSchottky {
    /**
     * Constructor
     *
     * IMPORTANT: xforms must have inverses!
     *
     * IMPORTANT: tiles must match up to the xforms.
     *
     * example if there are circles
     * Ca, CA, Cb, CB,
     *
     * and transformations
     * a: pair CA -> Ca
     * b: pair CB -> Cb
     * A: pair Ca -> CA
     * B: pair Cb -> CB
     *
     *
     * then xforms = [a, b, A, B]
     * and tiles = [Ca, Cb, CA, CB]
     * 
     * though the tiles could be some other shape
     */
    constructor(ifs, tiles, max_depth=5) {
        this.ifs = ifs;
        this.tiles = tiles;
        this.max_depth = max_depth;
        this.done = false;
    }

    render_tiles(gfx) {
        for (let i = 0; i < this.ifs.num_xforms; i++) {
            let tile = this.tiles[i];
            let xform = this.ifs.get_xform(i);

            tile.draw(gfx);
            this.render_tile_helper(
                gfx, 
                xform, 
                tile, 
                i, 
                this.max_depth, 
                this.ifs.get_label(i));
        }
    }

    render_tile_helper(gfx, xform_chain, tile, last_index, depth, label) {
        if (depth == 0)
            return;

        // If we just took transformation i,
        // the inverse xform is at position (i + N / 2) % N
        // We do not want to take the inverse (it would be redundant)
        // so iterate over all the other transforms except the inverse
        let max_offset = this.ifs.num_forward_xforms - 1;
        for (let i = -max_offset; i <= max_offset; i++) {
            let new_index = last_index + i; 
            let new_xform = this.ifs.get_xform(new_index);

            // Note: we are applying the new xform first, then the previous
            // one. This is backwards, but it ensures the limit set
            // is plotted coherently since transforms with the same
            // prefix are close together.
            xform_chain = new_xform.then(xform_chain);

            // Transform the starting tile and plot it
            let new_tile = tile.apply_transform(xform_chain);
            new_tile.draw(gfx);

            // Continue exploring the search space
            this.render_tile_helper(
                gfx,
                xform_chain,
                tile,
                new_index,
                depth - 1,
                label + this.ifs.get_label(new_index));
        }
    }

    draw(gfx) {
        if (!this.done) {
            this.render_tiles(gfx);
            this.done = true;
        }
    }
}

class DFSLimitPoints {
    /**
     * Constructor
     *
     * IMPORTANT: xforms must have inverses!
     *
     * IMPORTANT: tiles must match up to the xforms.
     *
     * example if there are circles
     * Ca, CA, Cb, CB,
     *
     * and transformations
     * a: pair CA -> Ca
     * b: pair CB -> Cb
     * A: pair Ca -> CA
     * B: pair Cb -> CB
     *
     *
     * then xforms = [a, b, A, B]
     * and tiles = [Ca, Cb, CA, CB]
     * 
     * though the tiles could be some other shape
     */
    constructor(ifs, tiles, max_depth=5) {
        this.ifs = ifs;
        this.tiles = tiles;
        this.max_depth = max_depth;
        this.done = false;
    }

    render_tiles(gfx) {
        for (let i = 0; i < this.ifs.num_xforms; i++) {
            let tile = this.tiles[i];
            let xform = this.ifs.get_xform(i);

            this.render_tile_helper(
                gfx, 
                xform, 
                tile, 
                i, 
                this.max_depth, 
                this.ifs.get_label(i));
        }
    }

    render_tile_helper(gfx, xform_chain, tile, last_index, depth, label) {
        if (depth == 0) {
            tile.apply_transform(xform_chain).draw(gfx);
            return;
        }

        // If we just took transformation i,
        // the inverse xform is at position (i + N / 2) % N
        // We do not want to take the inverse (it would be redundant)
        // so iterate over all the other transforms except the inverse
        let max_offset = this.ifs.num_forward_xforms - 1;
        for (let i = -max_offset; i <= max_offset; i++) {
            let new_index = last_index + i; 
            let new_xform = this.ifs.get_xform(new_index);

            // Note: we are applying the new xform first, then the previous
            // one. This is backwards, but it ensures the limit set
            // is plotted coherently since transforms with the same
            // prefix are close together.
            xform_chain = new_xform.then(xform_chain);

            // Continue exploring the search space
            this.render_tile_helper(
                gfx,
                xform_chain,
                tile,
                new_index,
                depth - 1,
                label + this.ifs.get_label(new_index));
        }
    }

    draw(gfx) {
        if (!this.done) {
            this.render_tiles(gfx);
            this.done = true;
        }
    }
}
