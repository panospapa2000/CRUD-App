import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 12, firstName: 'Dr. Nice', lastName: 'Medhurst', email: 'atuny0@sohu.com', phone: '+63 791 675 8914', image: 'https://robohash.org/hicveldicta.png'},
      { id: 13, firstName: 'Bombasto', lastName: 'Quigley', email: 'hbingley1@plala.or.jp', phone: '+7 813 117 7139', image: 'https://robohash.org/doloremquesintcorrupti.png'},
      { id: 14, firstName: 'Celeritas', lastName: 'Hills', email: 'rshawe2@51.la', phone: '+63 739 292 7942', image: 'https://robohash.org/consequunturautconsequatur.png'},
      { id: 15, firstName: 'Magneta', lastName: 'Cummerata', email: 'yraigatt3@nature.com', phone: '+86 461 145 4186', image: 'https://robohash.org/facilisdignissimosdolore.png'},
      { id: 16, firstName: 'RubberMan', lastName: 'Schultz', email: 'kmeus4@upenn.edu', phone: '+372 285 771 1911', image: 'https://robohash.org/adverovelit.png'},
      { id: 17, firstName: 'Dynama', lastName: 'Reichert', email: 'jtreleven5@nhs.uk', phone: '+351 527 735 3642', image: 'https://robohash.org/laboriosamfacilisrem.png'},
      { id: 18, firstName: 'Dr. IQ', lastName: 'Abbott', email: 'dpettegre6@columbia.edu', phone: '+62 640 802 7111', image: 'https://robohash.org/cupiditatererumquos.png'},
      { id: 19, firstName: 'Magma', lastName: 'Mueller', email: 'ggude7@chron.com', phone: '+86 946 297 2275', image: 'https://robohash.org/quiaharumsapiente.png'},
      { id: 20, firstName: 'Magma', lastName: 'Mueller', email: 'ggude7@chron.com', phone: '+86 946 297 2275', image: 'https://robohash.org/quiaharumsapiente.png'},
    
    ];
    return {users};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}