import { RenderPosition } from '../constants/renderPosition.js';
import Abstract from '../view/abstract';

/**
 * container - 
 * child - 
 * place - RenderPosition
 */
export const render = (container: any, child: any, place: string) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    default:
      container.after(child);
  }
};