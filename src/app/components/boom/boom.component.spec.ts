import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { BoomComponent } from './boom.component';
import { Dependencies } from '../../bam.test-observable.module';
import { BatchService } from '../../services/batch.service';
import { CalendarService } from '../../services/calendar.service';
import { CurriculumService } from '../../services/curriculum.service';
import { SubtopicService } from '../../services/subtopic.service';
import { UsersService } from '../../services/users.service';
import { BoomUtil } from './boom-test.util';
import { BamUser } from '../../models/bamuser.model';
import { Batch } from '../../models/batch.model';
import { Subtopic } from '../../models/subtopic.model';
import { ScheduledSubtopic } from '../../models/scheduledsubtopic.model';

/**
 * @author Craig Koepele | 1803-mar05-java-usf
 * Spec testing component for Boom
 */
describe('BoomComponent', () => {
  let component: BoomComponent;
  let fixture: ComponentFixture<BoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  /**
   * @author Craig Koepele | 1803-mar05-java-usf
   * Before each test, set up mock values to return for each service.
   *
   * Use the test bed to inject the services. spyOn then sets up the appropriate mock
   * observatle to return on a specified function
   */
  beforeEach(() => {
    const batchService: BatchService = TestBed.get(BatchService);
    const calendarService: CalendarService = TestBed.get(CalendarService);
    const curriculumService: CurriculumService = TestBed.get(CurriculumService);
    const subtopicService: SubtopicService = TestBed.get(SubtopicService);
    const usersService: UsersService = TestBed.get(UsersService);

    const subts: Array<Subtopic> = BoomUtil.getSubtopicByIds([1, 2, 3, 4]);

    spyOn(batchService, 'getAllInProgress').and.returnValue(of(BoomUtil.makeBatches()));
    spyOn(curriculumService, 'getScheduleById').and.returnValue(of(BoomUtil.getScheduleById(2)));
    spyOn(usersService, 'getUserByID').and.returnValue(of(BoomUtil.getUserById(1)));
    spyOn(subtopicService, 'getSubtopicByIDs').and.returnValue(of(subts));

    TestBed.overrideProvider(BatchService, { useValue: batchService });
    TestBed.overrideProvider(CurriculumService, { useValue: curriculumService });
    TestBed.overrideProvider(UsersService, { useValue: usersService });
    TestBed.overrideProvider(SubtopicService, { useValue: subtopicService });

    fixture = TestBed.createComponent(BoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Pass if the component is created
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Craig Koepele | 1803-mar05-java-usf
   * Specifically tests the ngOnInit function. NOTE: ngOnInit is called
   * every time a component is created, so the first two lines are excessive.
   */
  it('initialize all subtopics', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const subtopics: Subtopic[][] = component.allBatchSubtopics;
    for (const sub in subtopics) {
      if (subtopics.hasOwnProperty(sub)) {
        expect(subtopics[sub]).toEqual(BoomUtil.getSubtopicByIds([1, 2, 3, 4]));
      }
    }
  });

  /**
   * @author Craig Koepele | 1803-mar05-java-usf
   * Tests the component function getBatchSubtopics()
   */
  it('initialize the Batches', () => {
    const batches: Batch[] = BoomUtil.makeBatches();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.currentBatches).toEqual(batches);
  });

  /**
   * @author Craig Koepele | 1803-mar05-java-usf
   * Test component function setBatchStats()
   */
  it('set the batch statistics', () => {
    expect(component.batchSelectionList).toEqual(component.currentBatches);
    expect(component.batches).toEqual(BoomUtil.makeBooms());
  });

  /**
   * @author Craig Koepele | 1803-mar05-java-usf
   * Test component function plotBatch(id: Number)
   */
  it('plot out the batch', () => {
    expect(component.barChartLabels).toEqual(BoomUtil.makeBarChart(
      component.barChartLabels.length).weekLable);
    expect(component.barChartData).toEqual(BoomUtil.makeBarChart(
      component.barChartLabels.length).barChart);
  });

  /**
   * @author Craig Koepele | 1803-mar05-java-usf
   * Test component function pieCharPercent(percent)
   */
  it('get the percentage', () => {
    const data: any = BoomUtil.makePieLables();
    expect(component.percent).toEqual(90);
    expect(component.batchOverallArray).toEqual(data.batchOverallArray);
    expect(component.pieChartData).toEqual(data.pieChartData);
    expect(component.pieChartDatasets).toEqual(data.pieChartDatasets);
  });

  /**
   * @author Craig Koepele | 1803-mar05-java-usf
   * Test component function changePercent(event: any, percent: Number
   * Tests two cases, when percent === component.percent, and when it
   * does not
   */
  it('change the percentage', () => {
    component.changePercent(new Event(''), 0);
    fixture.detectChanges();
    expect(component.pieChartHeight).toEqual(782.156);
    expect(component.pieChartData).toEqual([]);
    expect(component.pieChartLabels).toEqual([]);
    expect(component.pieChartDatasets).toEqual([]);
    component.changePercent(new Event(''), 90);
    fixture.detectChanges();
    expect(component.pieChartHeight).toEqual(782.156);
  });

  /**
   * @author Craig Koepele | 1803-mar05-java-usf
   * Test component function getWeek(date)
   * NOTE: This funtion is most lokely depreciated, as it isn't
   * called during the component run time, nor in it's html file
   */
  it('get the week helper', () => {
    let date: Date = new Date(`04/jan/2018`);
    expect(component.getWeek(date.getTime())).toEqual(1);
    date = new Date('11/jan/2018');
    expect(component.getWeek(date.getTime())).toEqual(2);
    date = new Date('18/jan/2018');
    expect(component.getWeek(date.getTime())).toEqual(3);
    date = new Date('25/jan/2018');
    expect(component.getWeek(date.getTime())).toEqual(4);
  });

  /**
   * @author Craig Koepele | 1803-mar05-java-usf
   * Test component function setBatchStats()
   */
  it('change the batch', () => {
    component.ngOnInit();
    component.changeBatch(3);
    fixture.detectChanges();
    expect(component.chartHeight).toEqual(355);
    expect(component.barChartData.length).toEqual(0);
    expect(component.barChartLabels.length).toEqual(0);
  });

});
