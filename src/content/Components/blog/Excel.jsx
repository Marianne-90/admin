import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useState, useEffect } from "react";

export const Excel = ({ coments }) => {
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const userJson = await userResponse.json();
      const productResponse = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const productJson = await productResponse.json();

      const array = [
        {
          category: "user",
          data: userJson,
        },
        {
          category: "product",
          data: productJson,
        },
      ];

      setFinalData(array);
    };

    fetchData();
  }, []);

  const handleExportToExceltowpages = () => {
    const fileType = "xlsx";

    const product1 = XLSX.utils.json_to_sheet(productData);
    const user1 = XLSX.utils.json_to_sheet(userData);

    const wb = {
      Sheets: { product: product1, user: user1 },
      SheetNames: ["product", "user"],
    };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, "myfile" + ".xlsx");
  };

  const handleExport = () => {
    const fileType = "xlsx";

    const obj = {
      Sheets: {},
      SheetNames: [],
    };

    finalData.map((item) => {
      obj.Sheets[item.category] = XLSX.utils.json_to_sheet(item.data);;
      obj.SheetNames.push(item.category);
    });

    const excelBuffer = XLSX.write(obj, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "myfile" + ".xlsx");
  };

  return <button onClick={handleExport}>Descargar</button>;
};
