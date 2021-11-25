import { Component, OnInit } from '@angular/core';
import { Result, ServerResultInterface, UpdateData } from '../../models/server-result.interface';
import { HttpClientService } from '../../services/http-client.service';
import { IdColumnSettings } from './id-column-settings';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private httpClientService: HttpClientService) {}

  data: Result[];
  idColumnName: string;

  ngOnInit() {
    this.httpClientService.getData().subscribe((value: ServerResultInterface) => {
      this.data = value.result;
    });
    this.idColumnName = IdColumnSettings.idKey;
    if (IdColumnSettings.isUniqueIds) {
      this.deleteDuplicatedIdRows();
    }
  }

  deleteDuplicatedIdRows() {
    this.data = this.data.filter((element: Result, index: number, array: Result[]) => {
      return array.findIndex(item => item[this.idColumnName] === element[this.idColumnName]) === index;
    });
  }

  updateTableData(data: UpdateData) {
    const columnType = this.getCellType(data.columnName, data.row);
    this.data[data.index][data.columnName] = columnType === 'number' ? +data.event.target.value : data.event.target.value;
    this.httpClientService.saveData(this.data).subscribe();
  }

  getCellType(columnKey: string, row: Result): string {
    if (row[columnKey]) {
      return typeof row[columnKey];
    }
    const firstFoundNotEmptyObject = this.data.find((elem: Result) => elem.hasOwnProperty(columnKey) && elem[columnKey]);
    return typeof firstFoundNotEmptyObject[columnKey];
  }

  addNewRow() {
    this.data.push({[this.idColumnName]: Math.round(Math.random() * 10000)});
  }

  deleteRow(id: number) {
    this.data.splice(this.data.findIndex((elem: Result) => elem[this.idColumnName] === id), 1);
  }
}
