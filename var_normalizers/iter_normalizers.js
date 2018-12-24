/**
 * Normalize the number of iterations/depth depending on which variables
 * are present in the stats object
 */
class IterationNormalizer extends VariableNormalizer {
    normalize(stats) {
        return stats.iterations % stats.max_iters / stats.max_iters;
    }

    get label() {
        return "Iteration/Depth";
    }

    get id() {
        return 'var-iters';
    }
}
