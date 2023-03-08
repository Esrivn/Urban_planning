import './style.scss';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { classNames, loadArcGISJSAPIModules, React } from 'jimu-core';

import HomeAttributes from "./components/home/home";
import AllRecords from "./components/all-records/all-records";
import RecordDetails from './components/record-details/record-details';

const template = {
    "HCM_6628": ["SUBNETWORKNAME", "ISDIRTY", "GLOBALID"],
    "HCM_8515": ["OBJECTID", "ASSETTYPE", "ASSOCIATIONSTATUS", "GLOBALID"],
    "HCM_3219": ["SUBNETWORKNAME", "ISDIRTY", "GLOBALID"],
    "HCM_3238": ["SUBNETWORKNAME", "ISDIRTY", "GLOBALID"]
};

function SearchFeatures(prod, ref) {
    const { jimuMapView, layerConfig } = prod;
    const [view, setView] = useState(null); // View Map
    const [activeMode, setActiveMode] = useState('home');
    const [listData, setListData] = useState(null);
    const [currentData, setCurrentData] = useState(null);

    // Theo dõi sự thay đổi của biến jimuMapView
    useEffect(() => {
        if (jimuMapView) {
            setView(jimuMapView);
        }
    }, [jimuMapView])

    useEffect(() => {
        return () => { // Chạy khi hook function bị hủy (destroy)

        }
    }, []);

    const homeCallback = (e) => {
        setListData(e);
        setActiveMode('all-records');
    }

    const allRecordsBack = () => {
        setActiveMode('home');
    }

    const detailsBack = () => {
        setActiveMode('all-records');
    }

    const allRecordsDetail = (e) => {
        setCurrentData(e);
        setActiveMode('details');
    }

    return (
        <div className='widget-search-features'>
            <div className={classNames({ 'd-none': activeMode !== 'home' })}>
                <HomeAttributes jimuMapView={view} layerConfig={layerConfig} homeCallback={homeCallback}></HomeAttributes>
            </div>
            <div className={classNames({ 'd-none': activeMode !== 'all-records' })}>
                <AllRecords jimuMapView={view} listData={listData} template={template}
                    btnBackCallback={allRecordsBack} btnDetailCallback={allRecordsDetail}></AllRecords>
            </div>
            <div className={classNames({ 'd-none': activeMode !== 'details' })}>
                <RecordDetails jimuMapView={view} data={currentData}
                    btnBackCallback={detailsBack}></RecordDetails>
            </div>
        </div>
    )
}

export default forwardRef(SearchFeatures);
