module.exports.arrayRandom = function random(items) {
  return items[Math.floor(Math.random()*items.length)];
};