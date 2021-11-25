import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Result } from '../../models/server-result.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tableData: Result[];
  uniqueTableKeys!: string[];

  @Input() data: Result[];
  @Input() idColumnName: string;
  @Output() updatedData = new EventEmitter<{event: any, columnName: string, row: Result, index: number}>();
  @Output() deleteTableRow = new EventEmitter<number>();

  ngOnInit() {
    this.tableData = this.data;
    this.setUniqueKeysForHeader();
  }

  getCellContent(columnKey: string, row: Result): string | number {
    const cellValue = row[columnKey];
    if (!cellValue && typeof cellValue === 'boolean') {
      return cellValue.toString();
    } else if (!cellValue && cellValue !== '') {
      return '---';
    }
    return cellValue;
  }

  setUniqueKeysForHeader() {
    let uniqueKeys = new Set();
    this.tableData.forEach((item: Result) => {
      for (let key in item) {
        uniqueKeys.add(key);
      }
    });
    const uniqueKeysArray = Array.from(uniqueKeys);
    uniqueKeysArray.splice(uniqueKeysArray.findIndex((item: string) => item === this.idColumnName), 1);
    this.uniqueTableKeys = uniqueKeysArray as string[];
  }

  updateData(event: any, columnName: string, row: Result, index: number) {
    this.updatedData.emit({event, columnName, row, index});
  }

  deleteRow(id: number) {
    this.deleteTableRow.emit(id);
  }
}
