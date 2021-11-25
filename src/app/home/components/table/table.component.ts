import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Result, UpdateData } from '../../models/server-result.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {

  tableData: Result[];
  uniqueTableKeys!: string[];

  @Input() data: Result[];
  @Input() idColumnName: string;
  @Output() updatedData = new EventEmitter<UpdateData>();
  @Output() deleteTableRow = new EventEmitter<number>();
  @Output() addNewTableRow = new EventEmitter();

  ngOnInit(): void {
    this.tableData = this.data;
    this.setUniqueKeysForHeader();
  }

  private setUniqueKeysForHeader(): void {
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

  getCellContent(columnKey: string, row: Result): string | number {
    const cellValue = row[columnKey];
    if ((!cellValue && cellValue !== '') || typeof cellValue === 'boolean') {
      return '';
    }
    return cellValue;
  }

  updateData(event: any, columnName: string, row: Result, index: number): void {
    this.updatedData.emit({event, columnName, row, index});
  }

  addNewRow(): void {
    this.addNewTableRow.emit();
  }

  deleteRow(id: number): void {
    this.deleteTableRow.emit(id);
  }
}
