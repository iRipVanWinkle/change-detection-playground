import { Injectable } from "@angular/core";

@Injectable()
export class IdentifierGenerator {
  private currentFreeId = 0;

  generateId(): string {
    const id = String.fromCharCode(this.currentFreeId + 97);
    this.currentFreeId += 1;

    return id;
  }
}
