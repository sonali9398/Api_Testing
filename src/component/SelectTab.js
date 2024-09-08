import React, {useState, useContext} from 'react';
import CreateTable from './CreateTable';
import { DataContext } from './DataProvider';

const SelectTab = () => {

    const {paramData, setParamData, headerData, setHeaderData} = useContext(DataContext)

    const [value, setValue] = useState('1');

    const handleChange = (newValue) => {
      setValue(newValue);
    };

  return (
    <div className="tab-container">
        <div className="tab-list">
        <button
            className={value === '1' ? 'tab active' : 'tab'}
            onClick={() => handleChange('1')}
        >
            PARAMS
            
        </button>
        <button
            className={value === '2' ? 'tab active' : 'tab'}
            onClick={() => handleChange('2')}
        >
            {/* <CreateTable text={"HEADERS"}/> */}
            HEADERS
        </button>
        <button
            className={value === '3' ? 'tab active' : 'tab'}
            onClick={() => handleChange('3')}
        >
            BODY
        </button>
        </div>
        <div className="tab-content">
        {value === '1' && <div>Params<CreateTable text={"QUERY PARAMS"} data={paramData} setData={setParamData}/></div>}
        {value === '2' && <div>Headers<CreateTable text={"HEADERS"} data={headerData} setData={setHeaderData}/></div>}
        {value === '3' && <div className='w-100%'><textarea/></div>}
        </div>
  </div>
  )
};


export default SelectTab
