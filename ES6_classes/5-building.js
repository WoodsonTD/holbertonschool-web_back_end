/* eslint-disable-next-line no-unused-vars */
class Building {
  constructor(sqft) {
    this._sqft = sqft;
  }

  /* eslint-disable-next-line no-unused-vars */
  get sqft() {
    return this._sqft;
  }

  /* eslint-disable-next-line class-methods-use-this */
  evacuationWarningMessage() {
    throw new Error('Class extending Building must override evacuationWarningMessage');
  }
}
