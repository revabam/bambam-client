import { BamUser } from 'src/app/models/bam-user';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, HttpClient, HttpHandler]
    });
  });

  // Testing all methods within UserService
  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getUserByEmail',
async(inject([UserService], (service: UserService) => {
  expect(service.getUserByEmail).toBeTruthy();
})));

  it('should have register',
async(inject([UserService], (service: UserService) => {
  expect(service.register).not.toBeNull();
})));
});
