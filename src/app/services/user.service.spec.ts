import { BamUser } from 'src/app/models/bam-user';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';
import { UserService } from './user.service';
import { TopicService } from './topic.service';

/**
 * Here we are testing the methods within the SubTopic Service class
 * @name SubTopicTest
 * @author Daniel Sidhu | Spark1806-USF-Java | Steven Kelsey
 */
describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * getUserByEmail Test
   * @param none
   */
  it('should have getUserByEmail',
    async(inject([UserService], (service: UserService) => {
      expect(service.getUserByEmail).toBeTruthy();
    })));

  /**
   * register Test
   * @param none
   */
  it('should have register',
    async(inject([UserService], (service: UserService) => {
      expect(service.register).not.toBeNull();
    })));

  /**
   * updateInfo Test
   * @param none
   */
  it('should have updateInfo',
    async(inject([UserService], (service: UserService) => {
      expect(service.updateInfo).not.toBeNull();
    })));
  });
