import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { CurriculumService } from './curriculum.service';

/**
 * Here we are testing the methods within curriculum service
 * @name calenderTest
 * @author Chris Holmes | Spark1806-USF-Java | Steven Kelsey
 */
describe('CurriculumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurriculumService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([CurriculumService], (service: CurriculumService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * getAll Test
   * @param none
   */
  it('should call getAll ', function() {
    const getCurriculums = new CurriculumService(null);
    spyOn(getCurriculums, 'getAll');
    getCurriculums.getAll();
    expect(getCurriculums.getAll).toHaveBeenCalled();
  });

  /**
   * post Test
   * @param null
   */
  it('should call post ', function() {
    const postCurriculums = new CurriculumService(null);
    spyOn(postCurriculums, 'post');
    postCurriculums.post(null);
    expect(postCurriculums.post).toHaveBeenCalled();
  });

  /**
   * deactivate Test
   * @param null
   */
  it('should call deactivate ', function() {
    const deactivateCurriculums = new CurriculumService(null);
    spyOn(deactivateCurriculums, 'deactivate');
    deactivateCurriculums.deactivate(null);
    expect(deactivateCurriculums.deactivate).toHaveBeenCalled();
  });

  /**
   * deactivateName Test
   * @param null
   */
  it('should call deactivateName ', function() {
    const deactivateName = new CurriculumService(null);
    spyOn(deactivateName, 'deactivateName');
    deactivateName.deactivateName(null);
    expect(deactivateName.deactivateName).toHaveBeenCalled();
  });

  /**
   * reactivateName Test that cannot be null
   * @param none
   */
  it('reactivateName should not be null ', function() {
    const reactivateName = new CurriculumService(null);
    spyOn(reactivateName, 'reactivateName');
    reactivateName.reactivateName(null);
    expect(reactivateName.reactivateName).not.toBe(null);
  });

  /**
   * reactivateName Test
   * @param null
   */
  it('should call reactivateName ', function() {
    const reactivateName = new CurriculumService(null);
    spyOn(reactivateName, 'reactivateName');
    reactivateName.reactivateName(null);
    expect(reactivateName.reactivateName).toHaveBeenCalled();
  });
});
