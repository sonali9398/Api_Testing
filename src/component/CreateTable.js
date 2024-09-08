import React, {useState, useContext} from "react";
import { DataContext } from "./DataProvider";

const CreateTable = ({text, data, setData}) => {

    const{setJsonText} = useContext(DataContext)

    const [rows, setRows] = useState([{ key: '', value: '' }]);

    const handleAddRow = (event) => {
        if (event.target.checked) {
        setRows([...rows, { key: '', value: '' }]);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newRows = [...rows];
        newRows[index][name] = value;
        setRows(newRows);
    }

    return(
        
             <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                        <td>
                            <input
                            type="checkbox"
                            onChange={handleAddRow}
                            />
                        </td>
                        <td>
                            <input
                            type="text"
                            name="key"
                            value={row.key}
                            onChange={(e) => handleInputChange(index, e)}
                            />
                        </td>
                        <td>
                            <input
                            type="text"
                            name="value"
                            value={row.value}
                            onChange={(e) => handleInputChange(index, e)}
                            />
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        
    )
}

export default CreateTable;