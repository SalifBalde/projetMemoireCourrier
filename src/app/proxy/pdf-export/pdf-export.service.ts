import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  constructor() { }

  exportPDF(
    data: any[],
    name: string,
    columns: { header: string; dataKey: string }[],
    dateRange: string,
    bureauRange: string
  ) {
    if (data.length > 0) {
      const doc = new jsPDF('landscape');

      const leftLogo = 'assets/layout/images/laposte.jpeg';

      doc.addImage(leftLogo, 'PNG', 10, 10, 30, 15);

      const title = 'Rapport Des Expéditions E-Commerce';

      const titleWidth = doc.getTextWidth(title);
      const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 1.3;
      const titleY = 20;
      doc.setFontSize(20);
      doc.text(title, titleX, titleY, { align: 'center' });

      const dateRangeY = titleY + 15;
      const leftPosition = -29;
      doc.setFontSize(12);
      doc.text(` ${dateRange}`, titleX - leftPosition, dateRangeY);

      const bureauX = titleX + -75; 
      doc.text(bureauRange, bureauX, dateRangeY);

      const formattedData = data.map((item) => {
        let formattedItem: any = {};
        columns.forEach((col) => {
          formattedItem[col.dataKey] = item[col.dataKey];
        });
        return formattedItem;
      });

      autoTable(doc, {
        head: [columns.map((col) => col.header)],
        body: formattedData.map((row) => columns.map((col) => row[col.dataKey])),
        startY: dateRangeY + 10, 
        margin: { horizontal: 10 },
      });

      doc.save(`Rapport_expedition_e-commerce.pdf`);
    } else {
      console.error('No data available to export');
    }
  }
}
