import './style.scss';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { classNames, loadArcGISJSAPIModules, React } from 'jimu-core';

import imgBtnValid from "../../../images/entire_extent.png";
import imgTerminal from "../../../images/terminal_conn.png";
import imgErrorIns from "../../../images/error_ins.png";

// import HomeAttributes from "./components/home/home";
// import AllRecords from "./components/all-records/all-records";
// import RecordDetails from './components/record-details/record-details';

function Topology(prod, ref) {
    // const { jimuMapView } = prod;
    // const [view, setView] = useState(null); // View Map
    // const [activeMode, setActiveMode] = useState('home');
    // const [listData, setListData] = useState(null);
    // const [currentData, setCurrentData] = useState(null);

    // Theo dõi sự thay đổi của biến jimuMapView
    // useEffect(() => {
    //     if (jimuMapView) {
    //         setView(jimuMapView);
    //     }
    // }, [jimuMapView])

    // useEffect(() => {
    //     return () => { // Chạy khi hook function bị hủy (destroy)

    //     }
    // }, []);

    // const homeCallback = (e) => {
    //     setListData(e);
    //     setActiveMode('all-records');
    // }

    const btnActionTopology = async (type) => {
        console.log('type', type);
    }

    return (
        <div className='widget-topology'>
            <div className="header-widget d-flex align-items-center">
                <div className="btn-header col-md-6 d-flex align-items-center">
                    <div className="btn-validate" style={{ backgroundImage: `url(${(imgBtnValid)})` }} onClick={() => btnActionTopology('validate')}></div>
                    <div className="btn-error-ins" style={{ backgroundImage: `url(${(imgErrorIns)})` }} onClick={() => btnActionTopology('errorIns')}></div>
                    {/* <i className="btn-error-ins "></i>
                    <i className="pi pi-shield"></i> */}
                    <div className="btn-terminnal" style={{ backgroundImage: `url(${(imgTerminal)})` }} onClick={() => btnActionTopology('terminal')}></div>
                </div>
            </div>

            <div className="content-widget">
                <div className="act-validate">
                </div>
                <div className="act-error-ins">
                    {/* List error */}
                </div>
                <div className="act-terminnal">
                    {/* Edit line terminal */}
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Topology);
