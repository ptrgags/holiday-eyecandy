/**
 * Interface for a generic transformation. It does not have
 * to be linear ;)
 */
class Transform {
    transform_point(z) {
        throw new TypeError("Implement in subclass!");
    }

    /**
     * Compose transformations of the same type
     */
    then(xform) { 
        throw new TypeError("Implement in subclass!");
    }

    /**
     * Return true if the transformation can be undone
     */
    get is_invertible() {
        return false;
    }

    /**
     * Return the inverse Transform of the same type.
     */
    get inverse() {
       throw new TypeError("Not invertible!") ;
    }
}
