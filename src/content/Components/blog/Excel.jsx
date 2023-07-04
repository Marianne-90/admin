import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useState, useEffect } from "react";

export const Excel = ({ download }) => {


  const handleExport = () => {

    const fileType = "xlsx";

    const obj = {
      Sheets: {},
      SheetNames: [],
    };

    download.map((item) => {
      obj.Sheets[item.titulo] = XLSX.utils.json_to_sheet(item.comentarios);
      obj.SheetNames.push(item.titulo);
    });

    const excelBuffer = XLSX.write(obj, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "comentarios" + ".xlsx");
  };

  return <button onClick={handleExport} id="descargarComment">Descargar Excel</button>;

};
