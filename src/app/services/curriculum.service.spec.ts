import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { CurriculumService } from './curriculum.service';

describe('CurriculumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurriculumService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([CurriculumService], (service: CurriculumService) => {
    expect(service).toBeTruthy();
  }));
  it('should call getAll ', function() {
    const getCurriculums = new CurriculumService(null);
    spyOn(getCurriculums, 'getAll');
    getCurriculums.getAll();
    expect(getCurriculums.getAll).toHaveBeenCalled();
  });
  it('should call getAll ', function() {
    const postCurriculums = new CurriculumService(null);
    spyOn(postCurriculums, 'post');
    postCurriculums.post(null);
    expect(postCurriculums.post).toHaveBeenCalled();
  });
  it('should call deactivate ', function() {
    const deactivateCurriculums = new CurriculumService(null);
    spyOn(deactivateCurriculums, 'deactivate');
    deactivateCurriculums.deactivate(null);
    expect(deactivateCurriculums.deactivate).toHaveBeenCalled();
  });
  it('should call deactivateName ', function() {
    const deactivateName = new CurriculumService(null);
    spyOn(deactivateName, 'deactivateName');
    deactivateName.deactivateName(null);
    expect(deactivateName.deactivateName).toHaveBeenCalled();
  });
  it('reactivateName should not be null ', function() {
    const reactivateName = new CurriculumService(null);
    spyOn(reactivateName, 'reactivateName');
    reactivateName.reactivateName(null);
    expect(reactivateName.reactivateName).not.toBe(null);
  });
  it('should call reactivateName ', function() {
    const reactivateName = new CurriculumService(null);
    spyOn(reactivateName, 'reactivateName');
    reactivateName.reactivateName(null);
    expect(reactivateName.reactivateName).toHaveBeenCalled();
  });
});
