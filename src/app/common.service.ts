import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private closingStatusChanged = new BehaviorSubject<boolean>(false);
  public changeClosingStatus = this.closingStatusChanged.asObservable();
 
  private closingStatusallChanged = new BehaviorSubject<boolean>(false);
  public changeClosingallStatus = this.closingStatusallChanged.asObservable();

  private getIssummary = new BehaviorSubject<boolean>(false);
  public changeIsSummary = this.getIssummary.asObservable();

  private getResults = new BehaviorSubject<boolean>(false);
  public changeSummaryResults = this.getResults.asObservable();

  private searchResults = new BehaviorSubject<boolean>(false);
  public changeSearchResults = this.searchResults.asObservable();

  private searchSummaryResults = new BehaviorSubject<boolean>(false);
  public changesearchSummaryResults = this.searchSummaryResults.asObservable();

  constructor() { }

  public closingStatusUpdated(val: any) {
    this.closingStatusChanged.next(val);
  }
  public closingStatusallUpdated(val: any) {
    this.closingStatusallChanged.next(val);
  }

  public updateIsSummary(val: any) {
    this.getIssummary.next(val);
  }
  public updateSearchResults(val: any) {
    this.searchResults.next(val);
  }
  public updateSummaryResults(val: any) {
    this.getResults.next(val);
  }

  public updatesearchSummaryResults(val: any) {
    this.searchSummaryResults.next(val);
  }
}
