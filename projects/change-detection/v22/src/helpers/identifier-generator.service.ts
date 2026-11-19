import { Service } from '@angular/core';

@Service()
export class IdentifierGenerator {
  private currentFreeId = 0;

  generateId(): string {
    const id = String.fromCharCode(this.currentFreeId + 97);
    this.currentFreeId += 1;

    return id;
  }
}
