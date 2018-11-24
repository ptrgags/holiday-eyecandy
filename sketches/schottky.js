class SchottkyCircles extends ComplexPlaneSketch {
    make_renderer(xforms, tiles) {
        return new DFSSchottky(xforms, tiles, 5);
        //return new DFSLimitPoints(xforms, tiles, 5);
    }

    make_tiles() {
        return [
            // a
            new Cline(createVector(-1, -1), 1),
            // b
            new Cline(createVector(1, -1), 1),
            // A
            new Cline(createVector(-1, 1), 1),
            // B
            new Cline(createVector(1, 1), 1),
        ]
    }

    make_xforms() {
        this.tiles = this.tiles || this.make_tiles();

        // While I could do this with a loop, I might need to 
        // add an extra transformation
        let a = pair_circles(this.tiles[2], this.tiles[0]);
        let b = pair_circles(this.tiles[3], this.tiles[1]);

        let ifs = new IFS([a, b]);
        ifs.add_inverses();
        return ifs;
    }
}
