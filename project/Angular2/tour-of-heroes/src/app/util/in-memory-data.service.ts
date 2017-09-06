import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 10, name: 'James' },
      { id: 11, name: 'Jay' },
      { id: 12, name: 'Clown' },
      { id: 13, name: 'Kris' },
      { id: 14, name: 'Kevin' },
      { id: 15, name: 'Kebe' },
    ];
    return {heroes};
  }
}
