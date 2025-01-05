class RandomGenerator {
    _aValue: number = 2021495;
    _cValue: number = 3049596;
    _mValue: number = 2147483647;
    current: number;

    constructor(seed: number) {
        this.current = seed;
    }

    random() {
        this.current = (this._aValue * this.current + this._cValue) % this._mValue;
        return this.current;
    }
}

export default RandomGenerator;