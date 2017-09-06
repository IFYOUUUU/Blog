import { Component } from '@angular/core';

@Component({
  selector: 'hero-form-template',
  templateUrl: './hero-form-template.component.html'
})
export class HeroFormTemplateComponent {

  hobbies = ['Swimming', 'Footing', 'Gaming'];

  hero = {name: 'Kris', sex: 'man', hobby: this.hobbies[0]};
}
