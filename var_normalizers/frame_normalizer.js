/**
 * Normalize the frame count
 * by computing frame count % max frames / max frames
 */
class FrameCountNormalizer extends VariableNormalizer { 
    constructor(max_frames) {
        super();
        this.max_frames = max_frames;
    }

    normalize(stats) {
        let frame = stats.frame;
        return frame % this.max_frames / this.max_frames;
    }
}
