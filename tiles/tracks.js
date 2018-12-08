class TraceMaker extends TileMaker {
    make_tile(center) {
        return new Trace(center);
    }
}

class Trace extends Tile {
    constructor(pos, last_pos=null) {
        super();
        this.pos = pos;
        this.last_pos = last_pos;
    }

    apply_transform(xform) {
        let new_pos = xform.transform_point(this.pos);
        return new Trace(new_pos, this.pos);
    }

    draw(gfx, color) {
        gfx.stroke(color);
        gfx.noFill();
        if (this.last_pos !== null)
            gfx.line(this.last_pos.x, this.last_pos.y, this.pos.x, this.pos.y);
    }
}
