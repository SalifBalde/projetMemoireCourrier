import { Injectable } from '@angular/core';
import { UserDto } from '../users';
import { JournalResultDto } from '../journal';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  getCurrentUserId() {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  setUserAttributes(attributes: any): void {
    sessionStorage.setItem('userAttributes', JSON.stringify(attributes));
  }

  setAgentAttributes(attributes: UserDto): void {
    sessionStorage.setItem('agentAttributes', JSON.stringify(attributes));
  }

  setJournalAttributes(attributes: JournalResultDto): void {
    sessionStorage.setItem('journalAttributes', JSON.stringify(attributes));
  }

  getUserAttributes(): any {
    const attributes = sessionStorage.getItem('userAttributes');
    return attributes ? JSON.parse(attributes) : null;
  }

  getAgentAttributes(): UserDto {
    const attributes = sessionStorage.getItem('agentAttributes');
    return attributes ? JSON.parse(attributes) : null;
  }

  getJournalAttributes(): JournalResultDto {
    const attributes = sessionStorage.getItem('journalAttributes');
    return attributes ? JSON.parse(attributes) : null;
  }


  clearUserAttributes(): void {
    sessionStorage.removeItem('userAttributes');
  }
}
