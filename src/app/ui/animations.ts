import { style, animate } from '@angular/animations';

const enum Easing {
  in = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  out = 'cubic-bezier(0.6, 0.04, 0.98, 0.335)'
}

const slide = style({
  transform: 'translateY(100px) scaleY(1.2)',
  opacity: 0
});

const zoom = style({
  transform: 'scaleY(0.7)',
  opacity: 0
});

export const slideInY = [
  slide,
  animate(`400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`) // Cannot use const enum before Ivy
];
export const slideOutY = animate(`400ms ${Easing.out}`, slide);
export const zoomOut = animate(`400ms ${Easing.out}`, zoom);
