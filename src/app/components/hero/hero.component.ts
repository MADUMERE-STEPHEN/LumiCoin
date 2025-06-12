import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroComponent {
  }
