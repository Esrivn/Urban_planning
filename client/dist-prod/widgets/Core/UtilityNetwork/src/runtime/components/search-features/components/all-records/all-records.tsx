import './all-records.scss';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { loadArcGISJSAPIModules, React } from 'jimu-core';
import MapView from 'esri/views/MapView';
import { Button } from 'primereact/button';


function AllRecords(prod, ref) {
    const { jimuMapView, listData, template } = prod;
    const [view, setView] = useState(null); // View Map
    const [listRecords, setListRecords] = useState([]); // danh sách records
    const [layerName, setLayerName] = useState(''); // Tên Layer
    const [listKey, setListKey] = useState([]); // Tên Layer
    let handleInterval = null;

    // Theo dõi sự thay đổi của biến jimuMapView
    useEffect(() => {
        if (jimuMapView) {
            setView(jimuMapView.view);
            const _view: MapView = jimuMapView.view;
        }
    }, [jimuMapView])

    // Theo dõi sự thay đổi của biến listData
    useEffect(() => {
        if (listData) {
            setLayerName(listData.layer);
            if (template) {
                setListKey(template[listData.layerCode]);
            }
            setListRecords(listData.data.features);
            console.log(listData);
        }
    }, [listData])

    const onBack = () => {
        prod.btnBackCallback();
    }

    const renderItem = (record) => {
        const attributes = record.attributes;
        const displayField = record.layer.displayField;

        return <div className='form-control-item field col-12 md:col-4' onClick={() => clickDetailItem(record)}>
            <div>
                {
                    listKey && listKey.length > 0 &&
                    listKey.map(item => {
                        return <div className='item-label'>{item}: {attributes[item]}</div>
                    })
                }
                {
                    !listKey &&
                    <React.Fragment>
                        <div className='item-label'>OBJECTID: {attributes.OBJECTID}</div>
                        <div className='item-label'>{displayField}: {attributes[displayField]}</div>
                        <div className='item-label'>GLOBALID: {attributes.GLOBALID}</div>
                    </React.Fragment>
                }
            </div>
            <div className='form-control-item-icon'>
                <i className='pi pi-book' onClick={(e) => onDetailRecord(e, record)}></i>
                <i className="ml-3 pi pi-eye" onClick={(e) => onZoom(e, record)}></i>
            </div>
        </div>
    }

    const onZoom = (e, record) => {
        e.stopPropagation();
        if (handleInterval) {
            clearInterval(handleInterval);
        }
        view.goTo(record, { duration: 1000 });
        highlightGeometry(record.geometry);
    }

    const onDetailRecord = (e, record) => {
        e.stopPropagation();
        prod.btnDetailCallback(record);
    }

    const clickDetailItem = (item) => {
        if (handleInterval) {
            clearInterval(handleInterval);
        }
        const _view: MapView = view;
        _view.goTo({ target: item, zoom: _view.zoom }, { duration: 1000 });
        highlightGeometry(item.geometry);
    }

    const highlightGeometry = async (geom) => {
        const [Graphic] = await loadArcGISJSAPIModules(['esri/Graphic'])
        const pointHighlight = {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            style: "circle",
            color: [255, 255, 255],
            size: "12px",  // pixels
            outline: {  // autocasts as new SimpleLineSymbol()
                color: [0, 255, 255],
                width: 3  // points
            }
        };

        const polylineHighlight = {
            type: "simple-line",  // autocasts as new SimpleLineSymbol()
            color: [0, 255, 255],
            width: "8px",
            style: "solid"
        };

        const polygonHighlight = {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [51, 51, 204, 0.9],
            style: "none",
            outline: {  // autocasts as new SimpleLineSymbol()
                color: [0, 255, 255],
                width: 2
            }
        };

        let graphic = null;
        switch (geom.type) {
            case 'point':
                graphic = new Graphic({
                    geometry: geom.clone(),
                    symbol: pointHighlight
                });
                break;
            case 'polyline':
                graphic = new Graphic({
                    geometry: geom.clone(),
                    symbol: polylineHighlight
                });
                break;
            case 'polygon':
                graphic = new Graphic({
                    geometry: geom.clone(),
                    symbol: polygonHighlight
                });
                break;
            default:
                break;
        }

        if (graphic) {
            let count = 0;
            view.graphics.add(graphic);
            setTimeout(() => {
                view.graphics.remove(graphic);
            }, 500);
            handleInterval = setInterval(() => {
                count++;
                view.graphics.add(graphic);
                setTimeout(() => {
                    view.graphics.remove(graphic);
                }, 500);

                if (count === 2) {
                    clearInterval(handleInterval);
                }
            }, 1000)
        }
    }

    return (
        <div className='app-all-records'>
            <div className='form-control-header'>
                {
                    layerName !== '' &&
                    <div>
                        <h5>Layer: {layerName}</h5>
                        <h5>Total: {listRecords.length}</h5>
                    </div>

                }
            </div>
            <div className='form-control-body p-fluid grid formgrid'>
                {
                    listRecords && listRecords.length > 0 &&
                    listRecords.map(el =>
                        renderItem(el)
                    )
                }
            </div>
            <div className='form-control-footer footer-item'>
                <Button label="Back" onClick={onBack} />
            </div>
        </div>
    )
}

export default forwardRef(AllRecords);
