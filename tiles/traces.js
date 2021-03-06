class TraceMaker extends TileMaker {
    make_tile(center) {
        return new Trace(center);
    }

    get label() {
        return "Motion Traces";
    }

    get id() {
        return 'tile-traces';
    }
}

class Trace extends Tile {
    constructor(center, last_pos=null) {
        super(center);
        this.last_pos = last_pos;
    }

    apply_transform(xform) {
        let new_pos = xform.transform_point(this.center);
        return new Trace(new_pos, this.center);
    }

    draw(gfx, color) {
        gfx.stroke(color);
        gfx.noFill();
        if (this.last_pos !== null) {
            gfx.line(
                this.last_pos.x, this.last_pos.y, this.center.x, this.center.y);
        }
    }
}
