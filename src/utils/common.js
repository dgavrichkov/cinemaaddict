export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const keyCombo = (callback, ...keys) => {
  const keyNames = [...keys];
  let pressed = {};


  document.onkeydown = function(e) {
    pressed[e.key] = true;
    for(let i=0; i<keyNames.length; i++) { // проверить, все ли клавиши нажаты
      if (!pressed[keyNames[i]]) {
        return;
      }
    }
    pressed = {};

    callback();
  };

  document.onkeyup = function(e) {
    delete pressed[e.key];
  };
};
