import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Result, ServerResultInterface, UpdateData } from '../../models/server-result.interface';
import { HttpClientService } from '../../services/http-client.service';
import { IdColumnSettings } from './id-column-settings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private httpClientService: HttpClientService) {}

  data: Result[];
  getDataSubscription: Subscription;
  saveDataSubscription: Subscription;
  idColumnName: string;

  ngOnInit(): void {
    this.getDataSubscription = this.httpClientService.getData().subscribe((value: ServerResultInterface) => {
      this.data = value.result;
    });
    this.idColumnName = IdColumnSettings.idKey;
    if (IdColumnSettings.isUniqueIds) {
      this.deleteDuplicatedIdRows();
    }
  }

  addNewRow(): void {
    this.data.push({[this.idColumnName]: Math.round(Math.random() * 10000)});
  }

  deleteRow(id: number): void {
    this.data.splice(this.data.findIndex((elem: Result) => elem[this.idColumnName] === id), 1);
  }

  updateTableData(data: UpdateData): void {
    const valueType = this.getCellType(data.columnName, data.row);
    const value = data.row[data.columnName];
    if (!value && valueType === 'number') {
      this.data[data.index][data.columnName] = null;
    } else {
      this.data[data.index][data.columnName] = valueType === 'number' ? +data.event.target.value : data.event.target.value;
    }
    this.saveDataSubscription = this.httpClientService.saveData(this.data).subscribe();
  }

  private getCellType(columnKey: string, row: Result): string {
    if (row[columnKey]) {
      return typeof row[columnKey];
    }
    const firstFoundNotEmptyObject =
      this.data.find((elem: Result) => elem.hasOwnProperty(columnKey) && elem[columnKey]) || row;
    return typeof firstFoundNotEmptyObject[columnKey];
  }

  private deleteDuplicatedIdRows(): void {
    this.data = this.data.filter((element: Result, index: number, array: Result[]) => {
      return array.findIndex(item => item[this.idColumnName] === element[this.idColumnName]) === index;
    });
  }

  ngOnDestroy(): void {
    this.getDataSubscription.unsubscribe();
    this.saveDataSubscription.unsubscribe();
  }
}
