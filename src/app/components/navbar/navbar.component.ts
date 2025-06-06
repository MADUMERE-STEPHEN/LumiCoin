import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule, CommonModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
 // Hover animation for links and logo
    trigger('hoverGlow', [
      state('normal', style({
        transform: 'scale(1)',
        filter: 'drop-shadow(0 0 0 #a855f7)',
      })),
      state('hovered', style({
        transform: 'scale(1.03)',
        filter: 'drop-shadow(0 0 8px #a855f7)',
      })),
      transition('normal <=> hovered', animate('250ms ease-in-out')),
    ]),
    // Fade-in animation for navbar on load
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    // Search bar focus animation
    trigger('searchFocus', [
      state('normal', style({
        boxShadow: '0 0 0 #a855f7',
        backgroundColor: '#1a1a1a',
      })),
      state('focused', style({
        boxShadow: '0 0 12px #a855f7',
        backgroundColor: '#2a2a2a',
      })),
      transition('normal <=> focused', animate('200ms ease-in-out')),
    ]),
  ],
})
export class NavbarComponent {
  isHovered: { [key: string]: boolean } = {};
  isSearchFocused: boolean = false;

  toggleHover(item: string, state: boolean) {
    this.isHovered[item] = state;
  }

  toggleSearchFocus(state: boolean) {
    this.isSearchFocused = state;
  }
  }

