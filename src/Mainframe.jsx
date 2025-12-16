import React, { useState } from "react";
import FetchJFile from './FetchJFile'

function Mainframe(){
    const [dataLoaded, setDataLoaded] = useState(false);
    
    function loadData(jObj){
          console.log(`loadData ${JSON.stringify(jObj)}`);
          setDataLoaded(true);
    }

    return <>
    <h1>My Main Frame</h1>
    <FetchJFile dataLoaded={dataLoaded} loadData={loadData}/>
    </>;
}

export default Mainframe;