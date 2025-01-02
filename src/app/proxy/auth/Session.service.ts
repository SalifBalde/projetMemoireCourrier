import { Injectable } from '@angular/core';
import { UserDto } from '../users';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setUserAttributes(attributes: any): void {
    sessionStorage.setItem('userAttributes', JSON.stringify(attributes));
  }

  setAgentAttributes(attributes: UserDto): void {
    sessionStorage.setItem('agentAttributes', JSON.stringify(attributes));
  }


  getUserAttributes(): any {
    const attributes = sessionStorage.getItem('userAttributes');
    return attributes ? JSON.parse(attributes) : null;
  }

  getAgentAttributes(): UserDto {
    const attributes = sessionStorage.getItem('agentAttributes');
    return attributes ? JSON.parse(attributes) : null;
  }

  clearUserAttributes(): void {
    sessionStorage.removeItem('userAttributes');
  }
}
