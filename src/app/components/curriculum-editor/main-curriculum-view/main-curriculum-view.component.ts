import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CurriculumWeekComponent } from '../curriculum-week/curriculum-week.component';
import { CurriculumSubtopic } from '../../../models/curriculumSubtopic.model';
import { CurriculumService } from '../../../services/curriculum.service';
import { CourseStructureComponent } from '../course-structure/course-structure.component';
import { Curriculum } from '../../../models/curriculum.model';
import { CurriculumSubtopicDTO } from '../../../models/curriculumSubtopicDTO.model';
import { MetaDTO } from '../../../models/metaDTO.model';
import { SessionService } from '../../../services/session.service';
import { WeeksDTO } from '../../../models/weeksDTO.model';
import { AlertService } from '../../../services/alert.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';
import { WeeksExportDTO } from '../../../models/weeksExportDTO';
import { SubtopicService } from '../../../services/subtopic.service';
import { ScheduleZ } from '../../../models/scheduleZ.model';
import { SubtopicCurric } from '../../../models/subtopicCurric.model';
import { Topic } from '../../../models/topic.model';
import * as $ from 'jquery';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

/**
 * @author Daniel Robinson
 * Creates full view of a curriculum's weeks
 */
@Component({
    selector: 'app-main-curriculum-view',
    templateUrl: './main-curriculum-view.component.html',
    styleUrls: ['./main-curriculum-view.component.css']
})

export class MainCurriculumViewComponent implements OnInit {
    schedule: CurriculumSubtopic[];
    allWeeks: Array<CurriculumSubtopic[]> = new Array<CurriculumSubtopic[]>();
    toggleTab = 1;
    selectedCurr: Curriculum;
    isNewVer = false;
    isFirstVer = false;
    uniqCurrVersions;
    populatingCalendar = false;

    @ViewChildren(CurriculumWeekComponent) weeks: QueryList<CurriculumWeekComponent>;

    constructor(private curriculumService: CurriculumService,
        private sessionService: SessionService, private alertService: AlertService,
        private subtopicService: SubtopicService) { }


    ngOnInit() {
        this.displayWeekView();
        this.dropdownScript();
        this.curriculumService.currentSelectedCurr.subscribe(
            data => { this.selectedCurr = data;
            if (this.selectedCurr && this.selectedCurr.id == null) {
                this.isNewVer = true;
            } else {
                this.isNewVer = false;
            }
        }
        );
    }

    /**
     * This script is used to function the double drop down menu for the deletion of the weeks
     * @author Mohamad Alhindi, Jeffery Camacho
     * @batch 1712-Dec11-2017
     */
    dropdownScript() {
        $(document).ready(function () {
            $('#deleteMenu').on('click', function (e) {
                $('.dropdown-submenu1 div.clear-week').next('ul').hide();
                $('.dropdown-submenu2 div.clear-subtopic').next('ul').hide();
            });
        });

        $(document).ready(function () {
            $('.dropdown-submenu1 div.clear-week').on('click', function (e) {
                $(this).next('ul').toggle();
                $('.dropdown-submenu2 div.clear-subtopic').next('ul').hide();
                e.stopPropagation();
                e.preventDefault();
            });
        });
        $(document).ready(function () {
            $('.dropdown-submenu2 div.clear-subtopic').on('click', function (e) {
                $(this).next('ul').toggle();
                $('.dropdown-submenu1 div.clear-week').next('ul').hide();
                e.stopPropagation();
                e.preventDefault();
            });
        });
    }

    /**
     * Toggles between topic view and course structure
     * @author: Mohamad Alhindi
     * @batch:  1712-Dec11-2017
     */
    toggle(view) {
        this.toggleTab = view;
    }

    /** If the selected curriculum version has a null ID, it's new. For ngIf to trigger modal asking user
    * if they want to set it to master. If the version number is 1, this is a new curricumul entirely
    * and its first version will be master by default. Set isFirstVer to true so that our ngIf can bypass
    * the modal
    *  @author Dylan Britton, Carter Taylor,Olayinka Ewumi (1712-Steve)
    */
    receiveMessage(event) {
        this.selectedCurr = event;
        if (event.id == null) {
            this.isNewVer = true;
            this.dropdownScript();
        } else {
            this.isNewVer = false;
        }

        if (event.version === 1) {
            this.isFirstVer = true;
            this.allWeeks = [];
        } else {
            this.isFirstVer = false;
        }
    }

    /**
     * Opens save curriculum modal
     * @author: Mohamad Alhindi, Carter Taylor
     * @batch:  1712-Dec11-2017
     */
    openSaveCurriculumModal() {
        (<any>$('#saveCurriculumModal')).modal('show');
    }

    /**
     * Opens make master curriculum modal
     * @author: Mohamad Alhindi, Carter Taylor
     * @batch:  1712-Dec11-2017
     */
    openMasterModal() {
        (<any>$('#makeNewVerMasterModal')).modal('show');
    }

    /**
     * Update curriculum
     * Saves the new master curriculum version and persist to database
     * Depending on if it already is true or false
     * @author: Carter Taylor
     * @batch:  1712-Dec11-2017
     * @param makeMaster: boolean
     */
    saveCurr(makeMaster: boolean) {
        this.selectedCurr.weekDuration = this.weeks.length;
        this.selectedCurr.creatorId = this.sessionService.getUser().userId;
        this.selectedCurr.modifierId = 0;
        this.selectedCurr.dateCreated = Date.now();

        const meta = new MetaDTO(this.selectedCurr);

        const weeksDTO: WeeksDTO[] = [];
        this.weeks.forEach(elem => weeksDTO.push(elem.weekDTO));

        this.curriculumService.addCurriculum(this.selectedCurr).subscribe(
            response => {
                this.alertService.alert('success', 'Successfully saved ' +
                    response.name + ' version #' + response.version);

                this.selectedCurr = response;
                const unformatted_JSON = JSON.parse(JSON.stringify(weeksDTO));
                const formatted_schedule = this.formatSchedule(unformatted_JSON);
                this.curriculumService.addSchedule(formatted_schedule);

                this.refreshList(response);
                this.isNewVer = false;
            },
            error => {
                this.alertService.alert('danger', 'Unable to save curriculum');
                console.log(error);
                this.isNewVer = false;
            }
        );
    }

    formatSchedule( unformatted_JSON: any): ScheduleZ {
        const schedule: ScheduleZ = new ScheduleZ();
        schedule.curriculum = this.selectedCurr;
        let i, j, k;
        for (i = 0; i < unformatted_JSON.length; i++) { // for every week
            for (j = 0; j < 5; j++) { // for every day
                const hour = 9;

                for (k = 0; k < unformatted_JSON[i].days[j].subtopics.length; k++) { // for every hour (or subtopic)
                        const subtopic: SubtopicCurric = new SubtopicCurric();
                        if (typeof unformatted_JSON[i].days[j].subtopics[k].id === 'undefined') {
                            subtopic.subtopicId = unformatted_JSON[i].days[j].subtopics[k].subtopicId;
                            subtopic.subtopicName = unformatted_JSON[i].days[j].subtopics[k].subtopicName;
                            subtopic.parentTopic = unformatted_JSON[i].days[j].subtopics[k].parentTopic;
                            subtopic.status = unformatted_JSON[i].days[j].subtopics[k].status;
                        } else {
                            subtopic.subtopicId = unformatted_JSON[i].days[j].subtopics[k].id;
                            subtopic.subtopicName = unformatted_JSON[i].days[j].subtopics[k].name;
                            const topic: Topic = new Topic();
                            topic.topicID = unformatted_JSON[i].days[j].subtopics[k].topic.id;
                            topic.topicName = unformatted_JSON[i].days[j].subtopics[k].topic.name;
                            subtopic.parentTopic = topic;
                        }

                        subtopic.date.day = j + 1;
                        const arbitraryTime = new Date('1970-01-01');
                        arbitraryTime.setHours(hour + k);
                        subtopic.date.startTime = arbitraryTime.getTime();
                        arbitraryTime.setHours(hour + k + 1);
                        subtopic.date.endTime = arbitraryTime.getTime();
                        subtopic.date.week = i + 1;
                        schedule.subtopics.push(subtopic);
                }
            }
        }

        return schedule;
    }

    /**
     * Adds the newly saved curriculum object to the curriculum services'
     * behavior subject.
     * @author James Holzer, Carter Taylor, Mohamad Alhindi (1712-Steve)
     * @param curr
     */
    refreshList(curr: Curriculum) {
        const currList = this.curriculumService.allCurriculumData.getValue();
        if (curr.masterVersion === 1) {
            const masterIndex = currList.findIndex(
                elem => (elem.masterVersion === 1 && elem.name === curr.name));
            if (masterIndex !== -1) {
                currList[masterIndex].masterVersion = 0;
            }
        }
        currList.push(curr);
        this.curriculumService.refreshCurriculums(currList);
    }
    /**
     * Subscribes to the BehaviorSubject in Curriculum Service
     * which holds the currently selected curriculum's
     * schedule (CurriculumSubtopic[]). Assigns that data to
     * this.schedule and calls this.getWeeks()
     * @author Carter Taylor (1712-Steve)
     */
    displayWeekView() {
        this.curriculumService.currentData.subscribe(
            data => {
                // clear 2D array each time a curriculum is selected
                this.allWeeks = new Array<CurriculumSubtopic[]>();
                this.schedule = data;
                this.getWeeks();
            },
            error => {
                console.log(error);
            }
        );
    }

    /**
     * Generates weeks depending on how many weeks in CurriculumSubtopic[]
     * @author: Mohamad Alhindi, Carter Taylor, James Holzer
     * @batch:  1712-Dec11-2017
     */
    getWeeks() {
        if (this.schedule) {
            let week: CurriculumSubtopic[] = [];
            const maxWeek = this.getMaxWeeks();
            for (let i = 1; i <= maxWeek; i++) {
                this.schedule.forEach(e => {
                    if (e.curriculumSubtopicWeek === i) {
                        week.push(e);
                    }
                });

                this.allWeeks.push(week);
                week = [];
            }
        }
    }
    /**
     * Discovers the amount of weeks in a given curriculum
     * @author: Mohamad Alhindi, Carter Taylor, James Holzer
     * @batch:  1712-Dec11-2017
     */
    getMaxWeeks() {
        let maxWeek = 0;
        this.schedule.forEach(e => {
            if (e.curriculumSubtopicWeek > maxWeek) {
                maxWeek = e.curriculumSubtopicWeek;
            }
        });
        return maxWeek;
    }

    /**
     * Adds and array of CurriculumSubtopics as a week to the week view
     * @author: Mohamad Alhindi, Carter Taylor, James Holzer
     * @batch:  1712-Dec11-2017
     */

    addWeek() {
        this.allWeeks.push(new Array<CurriculumSubtopic>());
        this.alertService.alert('success', 'Successfully added a week to the bottom. Save is required.');
    }

    /**
     *
     * @param weekNum
     * Selects week by its weekNum and returns the corresponding week object
     * @author: Mohamad Alhindi, Carter Taylor, James Holzer
     * @batch:  1712-Dec11-2017
     */
    getWeekById(weekNum: number): CurriculumSubtopic[] {
        const week: CurriculumSubtopic[] = this.allWeeks[weekNum];
        return week;
    }

    /**
     * @param weekNum
     * Removes a week object from view by its corresponding weekNum
     * @author: Mohamad Alhindi, Carter Taylor, James Holzer
     * @batch:  1712-Dec11-2017
     */
    removeWeek(weekNum: number) {
        this.allWeeks = this.allWeeks.filter(w => w !== this.getWeekById(weekNum));
        this.alertService.alert('success', 'Successfully removed a Week#' + ( weekNum + 1 ) + '. Save is required.');
    }

    /**
     * Used to match date created property for the DB
     * @author: Carter Taylor
     * @batch:  1712-Dec11-2017
     */
    getCurrentDate(): string {
        let today: any = new Date();
        let dd: any = today.getDate();
        let mm: any = today.getMonth() + 1;
        const yyyy: any = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    /**
     * Clear all weeks while editing
     * @author: Mohamad Alhindi, Carter Taylor
     * @batch:  1712-Dec11-2017
     */
    clearAllWeeks() {
        this.allWeeks = [];
    }

    /**
     * Truncates the subtopics from all weeks
     * @author: Mohamad Alhindi, Carter Taylor, James Holzer
     * @batch:  1712-Dec11-2017
     */
    truncateWeeks() {
        let empty = true;
        for (let i = 0; i < this.allWeeks.length; i++) {
            if (this.allWeeks[i].length > 0) {
                empty = false;
            }
            this.allWeeks[i] = [];
        }
        if (empty) {
            this.alertService.alert('danger', 'No Subtopics to Remove');
        } else {
            this.alertService.alert('success', 'Successfully removed all subtopics from weeks. Save is required.');
        }
    }

    /**
     * When the synch button is clicked, calls the synchBatch method in the curriculum service
     * @author: Jordan DeLong
     * @batch:  1712-Dec11-2017
     */
    populateCalendar() {
        this.populatingCalendar = true;
        const batchId = this.sessionService.getSelectedBatch().id;
        const fun = function (origin) {
            origin.populatingCalendar = false;
            origin.alertService.alert('success', 'Your calendar has been populated!');
        };
        this.subtopicService.removeAllSubtopicsFromBatch(batchId).subscribe(() => {
            this.curriculumService.syncBatch(batchId).subscribe(
                () => fun(this),
                () => fun(this));
        });
}

/**
 * Opens the modal with id areYouSurePopulateCalendar
 * @author Charlie Harris | 1712-dec11-java-steve
 * @param masterVersion
 */
areYouSurePopulateCalendar(masterVersion) {
    if (masterVersion === 1) {
        (<any>$('#areYouSurePopulateCalendar')).modal('show');
    } else {
        // const batchType = this.sessionService.getSelectedBatch().type.name; //NO TYPE
        this.alertService.alert('danger', 'NO TYPE');
            // `You can only populate your calendar with the master version of your batch type, ${batchType}`);
    }
}

/**
 * @author Charlie Harris | 1712-dec11-java-steve
 * Opens modal with id areYouReallySurePopulateCalendar
 */
areYouReallySurePopulateCalendar() {
    const batch = this.sessionService.getSelectedBatch();
    const fun = function (res, origin) {
        if (res.status === 204) {
            origin.populateCalendar();
        } else if (res.status === 200) {
            (<any>$('#areYouReallySurePopulateCalendar')).modal('show');
        }
        (<any>$('#areYouSurePopulateCalendar')).modal('hide');
    };
    this.subtopicService.isPopulated(batch.id).subscribe(res => fun(res, this), res => fun(res, this));
}

/**
 * @author James Holzer (1712-Steve)
 * Opens the modal with the id areYouSure
 */
areYouSureDeleteCurr(masterVersion) {
    if (masterVersion === 0) {
        (<any>$('#areYouSure')).modal('show');
    } else {
        this.alertService.alert('danger', 'You Cannot Delete a Master Curriculum');
    }
}

/**
 * @author James Holzer (1712-Steve)
 * Opens the modal with the id areYouReallySure
 */
areYouReallySureDeleteCurr() {
    (<any>$('#areYouReallySure')).modal('show');
}

/**
 * @author James Holzer, Allan Poindexter, Mohamad Alhindi, Carter Taylor (1712-Steve)
 * @param selectedCurr
 * Deletes a curriculum, retrieves the curriculum array from service, updates it without
 *  deleted curriculum and sets the array thats printed to the page and the selected Curriculum
 *  version header on the page
 */
deleteVersions(selectedCurr) {
    this.curriculumService.deleteCurriculumVersion(selectedCurr).subscribe((response) => {
        let currArr = this.curriculumService.allCurriculumData.getValue();
        currArr = currArr.filter(e => e !== selectedCurr);
        this.curriculumService.refreshCurriculums(currArr);
        this.alertService.alert('success', 'Successfully deleted version');
        this.selectedCurr = null;
        this.allWeeks = [];
    });
}
/**
 *
 * @author John Austin, Patrick Kennedy, Tyler Dresselhouse (1712-Steve)
 * Downloads the selected curriculum to an Excel file
 */
download() {
    let ourWeeks: WeeksExportDTO;
    ourWeeks = new WeeksExportDTO((this.allWeeks), this.selectedCurr.name + ' v' + this.selectedCurr.version);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ourWeeks.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'excelFileName');
}

    /**
     * @author John Austin (1712-Steve)
     * @param buffer
     * @param fileName
     * Helper method for download()
     */
    private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
