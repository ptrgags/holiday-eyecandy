class PointMaker extends TileMaker {
    make_tile(center) {
        return new Point(center);
    }
}

class Point extends Tile {
    constructor(center) {
        super(center);
        this.w = 0.001;
    }
    apply_transform(xform) {
        let result = xform.transform_point(this.center);
        return new Point(result);
    }

    draw(gfx, color) {
        gfx.stroke(color);
        gfx.noFill();
        gfx.ellipse(this.center.real, this.center.imag, this.w, this.w);
    }
}
