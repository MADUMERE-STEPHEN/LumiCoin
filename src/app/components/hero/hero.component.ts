import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
   animations: [
    // Fade-in and slide for text
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    // Button pop-in animation
    trigger('buttonPop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('500ms 400ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    // Button hover scale
    trigger('buttonHover', [
      state('normal', style({ transform: 'scale(1)', boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)' })),
      state('hovered', style({ transform: 'scale(1.05)', boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)' })),
      transition('normal <=> hovered', animate('200ms ease-in-out')),
    ]),
    // Image scale-in animation
    trigger('imageScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('800ms 200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    // Image hover glow
    trigger('imageHover', [
      state('normal', style({ filter: 'drop-shadow(0 0 5px rgba(168, 85, 247, 0.3))' })),
      state('hovered', style({ filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.7))' })),
      transition('normal <=> hovered', animate('300ms ease-in-out')),
    ]),
    // Infinite particle animation
    trigger('particleFloat', [
      transition('* => *', [
        animate('15s linear infinite', keyframes([
          style({ transform: 'translate(0, 0) scale(1)', opacity: 0.5, offset: 0 }),
          style({ transform: 'translate(-15px, 25px) scale(1.15)', opacity: 0.8, offset: 0.5 }),
          style({ transform: 'translate(0, 0) scale(1)', opacity: 0.5, offset: 1 }),
        ])),
      ]),
    ]),
  ],
})
export class HeroComponent {

  isButtonHovered: boolean = false;
  isImageHovered: boolean = false;

  toggleButtonHover(state: boolean) {
    this.isButtonHovered = state;
  }

  toggleImageHover(state: boolean) {
    this.isImageHovered = state;
  }
}
