// Modules
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DragDropModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { OverlayPanelModule } from 'primeng/primeng';
import { RoutingModule } from './routing.module';
import { ScheduleModule } from 'primeng/primeng';

// Components
import { AddAssociateToBatchComponent } from './components/calendar/add-associate-to-batch/add-associate-to-batch.component';
import { AddSubtopicComponent } from './components/calendar/add-subtopic/add-subtopic.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AllBatchesComponent } from './components/batches/all-batches/all-batches.component';
import { BamComponent } from './bam.component';
import { BatchesTableComponent } from './components/batches/batches-table/batches-table.component';
import { BatchesSearchComponent } from './components/batches/batches-search/batches-search.component';
import { BatchProgressBarComponent } from './components/dashboard/batch-progress-bar/batch-progress-bar.component';
import { BoomComponent } from './components/boom/boom.component';
import { CalendarComponent } from './components/calendar/calendar-view/calendar.component';
import { CalendarService } from './services/calendar.service';
import { CourseStructureComponent } from './components/curriculum-editor/course-structure/course-structure.component';
import { CurriculumWeekComponent } from './components/curriculum-editor/curriculum-week/curriculum-week.component';
import { DashboardInfoComponent } from './components/dashboard/dashboardinfo/dashboardinfo.component';
import { EditBatchComponent } from './components/calendar/edit-batch/edit-batch.component';
import { ExistingSubtopicModalComponent } from './components/calendar/existing-subtopic-modal/existing-subtopic-modal.component';
import { HomeComponent } from './components/home/home.component';
import { MainCurriculumViewComponent } from './components/curriculum-editor/main-curriculum-view/main-curriculum-view.component';
import { MyBatchesComponent } from './components/batches/my-batches/my-batches.component';
import { LoadingSpinnerComponent } from './components/dashboard/ui/loading-spinner/loading-spinner.component';
import { RemoveAssociateFromBatchComponent } from './components/calendar/remove-associate-from-batch/remove-associate-from-batch.component';
import { SubtopicSearchComponent } from './components/curriculum-editor/subtopic-search/subtopic-search.component';
import { TopicPoolComponent } from './components/curriculum-editor/topic-pool/topic-pool.component';
import { TopicSearchComponent } from './components/curriculum-editor/topic-search/topic-search.component';
import { ViewAssociatesComponent } from './components/calendar/view-associates/view-associates.component';
import { WelcomeComponent } from './components/dashboard/welcome/welcome.component';

// Pipes
import { FilterBatchPipe } from './Pipes/filter-batch.pipe';
import { OrderPipe } from './pipes/order.pipe';
import { SearchPipe } from './pipes/search.pipe';

// Services
import { AddSubtopicService } from './services/add-subtopic.service';
import { AlertService } from './services/alert.service';
import { AssignforcesyncService } from './services/assignforcesync.service';
import { BatchService } from './services/batch.service';
import { CalendarStatusService } from './services/calendar-status.service';
import { CurriculumService } from './services/curriculum.service';
import { DragndropService } from './services/dragndrop.service';
import { SearchTextService } from './services/search-text.service';
import { SessionService } from './services/session.service';
import { SubtopicService } from './services/subtopic.service';
import { TopicService } from './services/topic.service';
import { UrlService } from './services/url.service';
import { UsersService } from './services/users.service';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { Session } from 'protractor';

@NgModule({
  declarations: [
    // Components
    AddAssociateToBatchComponent,
    AddSubtopicComponent,
    AlertsComponent,
    AllBatchesComponent,
    BamComponent,
    BatchProgressBarComponent,
    BatchesSearchComponent,
    BatchesTableComponent,
    BoomComponent,
    CalendarComponent,
    CourseStructureComponent,
    CurriculumWeekComponent,
    DashboardInfoComponent,
    EditBatchComponent,
    ExistingSubtopicModalComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    MainCurriculumViewComponent,
    MyBatchesComponent,
    RemoveAssociateFromBatchComponent,
    SubtopicSearchComponent,
    TopicPoolComponent,
    TopicSearchComponent,
    ViewAssociatesComponent,
    WelcomeComponent,

    // Pipes
    FilterBatchPipe,
    OrderPipe,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    ChartsModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    OrderModule,
    OverlayPanelModule,
    RoutingModule,
    ScheduleModule
  ],
  providers: [
    AddSubtopicService,
    AlertService,
    AssignforcesyncService,
    BatchService,
    CalendarService,
    ChildrenOutletContexts,
    CurriculumService,
    DragndropService,
    HttpClient,
    SearchTextService,
    SessionService,
    SubtopicService,
    TopicService,
    UrlService,
    UsersService
  ],
  bootstrap:[BamComponent]
})
export class BamModule { }
