class ApollonianGasket extends IFS {
    make_xforms() {
        let a = new MobiusTransform([
            Complex.one(), Complex.zero(),
            complex(0.0, -2.0), Complex.one()
        ]);
        let b = new MobiusTransform([
            complex(1.0, -1.0), Complex.one(),
            Complex.one(), complex(1.0, 1.0)
        ]);
        return [a, b];
    }

    get is_group() {
        return true;
    }
}
