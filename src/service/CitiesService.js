export class CitiesService {
    constructor() {}
  
    get cities() {
      return fetch("data/cities.json").then((res) => res.json());
    }
  }
  