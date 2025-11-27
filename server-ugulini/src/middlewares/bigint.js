// middlewares/bigint.js
BigInt.prototype.toJSON = function () {
  return this.toString();
};
