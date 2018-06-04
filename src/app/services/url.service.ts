import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UrlService {

  private context: string;

  /**
   * Endpoints for batches
   */
  batches = {
    fetchAllByTrainer: () => `${this.context}/batches/trainers`,
    fetchAllByTrainerId: (id: number) => `${this.context}/batches/trainers/${id}`,
    fetchAll: () => `${this.context}/batches`,
    save: () => `${this.context}/batches`,
    update: () => `${this.context}/batches`,
    delete: (batchId) => `${this.context}/batches/${batchId}`
  };

  /**
   * Endpoints for trainees
   */
  trainees = {
    findAll: () => `${this.context}/trainees`,
    findById: (id: number) => `${this.context}/trainees/${id}`,
    findByEmail: (email: string) => `${this.context}/trainees/email?=${email}`,
    findAllByBatchAndStatus: (id: number, status: string) => `${this.context}/trainees/batch/${id}/status/${status}`,
    save: () => `${this.context}/trainees`,
    update: () => `${this.context}/trainees`,
    delete: (traineeId: number) => `${this.context}/trainees/${traineeId}`
  };

  /**
   * Endpoints for trainers
   */
  trainers = {
    fetchByEmail: (email: string) => `${this.context}/trainers/email/${email}/`,
    fetchAll: () => `${this.context}/trainers`,
    save: () => `${this.context}/trainers`,
    update: () => `${this.context}/trainers`,
    promote: () => `${this.context}/trainers/promote`,
    getTitles: () => `${this.context}/trainers/titles`,
    delete: () => `${this.context}/trainers`,
  };

  assessment = {
    fetchByBatchIdByWeek: (batchId: number, week: number) => `${this.context}/trainer/assessment/${batchId}/${week}`,
    save: () => `${this.context}/trainer/assessment/create`,
    update: () => `${this.context}/trainer/assessment/update`,
    delete: (assessmentId: number) => `${this.context}/trainer/assessment/delete/${assessmentId}`,
  };

  // BAM Endpoints
  users = {
    getUserByID: (userId: number) => `${this.context}/users/${userId}`,
    getAllUsersRoles: () => `${this.context}/users/roles`,
    getAllUsersUrl: () => `${this.context}/users`,
    getAllTrainersUrl: () => `${this.context}/users/alltrainers`,
    getAllAssociatesUrl: () => `${this.context}/users/allassociates`,
    getUsersInBatchUrl: (batchId: number) => `${this.context}/users/inbatch/${batchId}`,
    dropUserFromBatchUrl: (userId: number) => `${this.context}/users/${userId}`,
    updateUserUrl: (userId: number) => `${this.context}/users/${userId}`,
    addUserUrl: () => `${this.context}/users`,
    removeUserUrl: (userId: number) => `${this.context}/users/${userId}`,
    makeInactive: () => `${this.context}/users/inactivate`,
    addUserToBatchUrl: (batchId: number, userId: number) => `${this.context}/users/batches/${userId}/${batchId}`,
    getUsersNotInBatchUrl: () => `${this.context}/users/batches/none`,
    resetPasswordUrl: () => `${this.context}/user/reset`,
    recoverPasswordUrl: () => `${this.context}/user/recovery`
  };

  topic = {
    addTopicName: (name: string) => `${this.context}/topics/${name}`,
    changeTopicName: (name: string) => `${this.context}/topics/topic`
  };

  subtopic = {
    getSubtopicByIDs: (subtopicIdList: number[]) => `${this.context}/topics/subtopics?ids=${subtopicIdList}`,
    getSubtopicByID: (subtopicId: number) => `${this.context}/topics/subtopics/${subtopicId}`,
    getSubtopics: () => `${this.context}/topics/subtopics`,
    addSubTopicName: (subtopicName: string, topicId: number, typeId: number) =>
      `${this.context}/subtopics/${typeId}/${topicId}/${subtopicName}`,
    removeSubtopic: (subtopicId: number) => `${this.context}/subtopics/${subtopicId}`,
    removeAllSubtopics: (batchId: number) => `${this.context}/subtopics/${batchId}/`,
    isPopulated: (batchId: number) => `${this.context}/subtopics/ispopulated/${batchId}/`
  };

  addsubtopics = {
    // getBatchSubtopicsUrl: (batchId: number, pageNumber: number, pageSize: number) =>
    //   `${this.context}/calendar/subtopicspagination/${batchId}/${pageSize}/${pageNumber}`,
    getBatchIdUrl: (batchId: number) => `${this.context}/batches/batch/${batchId}`,
    addSubtopicUrl: () => `${this.context}/curricula/schedules`,
    getSubtopicPoolUrl: (curriculumId: number) => `${this.context}/curricula/${curriculumId}/subtopics`,
    updateDateUrl: (subtopicId: number, batchId: number, date: number) =>
      `${this.context}/calendar/dateupdate/${subtopicId}/${batchId}/${date}`,
      updateScheduleURL: `${this.context}/curricula/schedules`,
      addNewScheduledSubtopic: (scheduleId: number) => `${this.context}/curricula/scheduled-subtopics?schedule=${scheduleId}`
    };

    assignForce = {
      refreshBatches: () => `${this.context}/refreshbatches`
    };

    calendar = {
      // getSubtopicsByBatchPaginationUrl: (batchId: number, pageNumber: number, pageSize: number) =>
      //   `${this.context}/calendar/subtopicspagination/${batchId}/${pageNumber}/${pageSize}/`,
      getScheduleById: (scheduleId: number) => `${this.context}/curricula/schedules/${scheduleId}`,
      getSubtopicsByBatchUrl: (batchId: number) => `${this.context}/calendar/subtopics/${batchId}`,
      getNumberOfSubTopicsByBatchUrl: (batchId: number) => `${this.context}/calendar/getnumberofsubtopics/${batchId}`,
      getTopicsByBatchPagUrl: (batchId: number) => `${this.context}/calendar/topics/${batchId}`,
      changeTopicDateUrl: `${this.context}/curricula/scheduled-subtopics`,
      updateTopicStatusUrl: (subtopicId: number, batchId: number, status: string) =>
      `${this.context}/curricula/schedules`,
    addTopicsUrl: () => `${this.context}/calendar/addtopics`
  };

  curriculum = {
    getCurriculumAllUrl: () => `${this.context}/curricula/all`,
    getCurriculumByIdUrl: (id: number) => `${this.context}/curricula?ids=${id}`,
    getSchedulesByCurriculumIdUrl: (id: number) => `${this.context}/curricula/${id}/schedules`,
    getTopicPoolAllUrl: () => `${this.context}/topics/`,
    getSubtopicPoolAllUrl: () => `${this.context}/curricula/subtopicpool`,
    addCurriculumUrl: () => `${this.context}/curricula/`,
    makeCurriculumMasterByIdUrl: (id: number) => `${this.context}/curricula/${id}/master`,
    syncBatchByIdUrl: (id: number) => `${this.context}/curricula/syncbatch/${id}`,
    deleteCurriculumVersionUrl: () => `${this.context}/curricula/deleteversion`,
    getScheduleById: (id: number) => `${this.context}/curricula/schedules/${id}`,
    addSchedule: () => `${this.context}/curricula/schedules`
  };

  bambatch = {
    getBatchAllUrl: () => `${this.context}/batches/`,
    getPastBatchesUrl: (trainerId: number) => `${this.context}/batches/past/${trainerId}`,
    getFutureBatchesUrl: (trainerId: number) => `${this.context}/batches/future/${trainerId}`,
    getBatchInProgressUrl: (email: string) => `${this.context}/batches/inprogress/${email}`,
    getAllBatchesInProgressUrl: (trainerId: number) => `${this.context}/batches/current/${trainerId}`,
    getBatchByIdURL: (batchId: number) => `${this.context}/batches/batch/${batchId}`,
    updateBatchUrl: () => `${this.context}/batches/batch`,
    getAllBatchTypesUrl: () => `${this.context}/batches/types`,
    removeSubtopicFromBatchUrl: (subtopicId: number) => `${this.context}/batch/${subtopicId}`,
    getAllInProgressUrl: () => `${this.context}/batches/current/`
  };

  constructor() {
    this.context = environment.jsonServer;
  }
}