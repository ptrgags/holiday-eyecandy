class ColorPicker {
    constructor(normalizer, color_mapper, palette) {
        this.normalizer = normalizer;
        this.color_mapper = color_mapper;
        this.palette = palette;
    }

    pick_color(stats) {
        let raw_val = this.normalizer.normalize(stats);
        let modulated = this.color_mapper.map_color(raw_val);
        return this.palette.lookup_color(modulated);
    }
}
