import { Component, OnInit } from '@angular/core';
import { Batch } from '../../../models/batch.model';
import { BatchService } from '../../../services/batch.service';
import { UsersService } from '../../../services/users.service';
import { CurriculumService } from '../../../services/curriculum.service';

@Component({
  selector: 'app-all-batches',
  templateUrl: './all-batches.component.html',
  styleUrls: ['./all-batches.component.css']
})
export class AllBatchesComponent implements OnInit {

  batches: Batch[];
  filterText: string;

  constructor(
    private batchService: BatchService,
    private usersService: UsersService,
    private currService: CurriculumService) { }

  ngOnInit() {
    this.loadAll();
  }

  /**
   * Gets all batches
   * @author Charlie Harris | 1712-dec10-java-steve
   */
  loadAll() {
    this.batchService.getBatchAll().subscribe(batches => {

      this.batches = batches;

      for (let i = 0; i < this.batches.length; i++) {

        const userID = this.batches[i].trainerID;
        const currID = this.batches[i].curriculumID;

        this.usersService.getUserByID(userID).subscribe(trainer => {
          this.batches[i].trainer = trainer;
        }, err => this.batches[i].trainer = null);

        this.currService.getCurriculumById(currID).subscribe(curriculum => {
          this.batches[i].curriculum = curriculum[0];
        });

      }

    }, err => this.batches = []);

  }

  /**
   * Sets [this.filterText] to the text in the search box
   * @param event event.target.value holds text in search box
   * @author Charlie Harris | 1712-dec10-java-steve
   */
  setFilterText(event) {
    this.filterText = event.target.value;
  }

}
