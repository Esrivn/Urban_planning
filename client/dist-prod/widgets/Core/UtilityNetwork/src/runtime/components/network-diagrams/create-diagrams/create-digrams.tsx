import './create-diagrams.scss';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { loadArcGISJSAPIModules, React } from 'jimu-core';
import MapView from 'esri/views/MapView';

import { CoreButton, CoreInput, CoreSelect } from '../../../../../../component';
import StoreDiagrams from "../../../images/StoreDiagram32.png";
import NewDiagrams from "../../../images/NewDiagram32.png";
import SelectFeature from "../../../images/SelectionSelectTool32.png";

const lookupAccess = [
    { code: 'esriDiagramPublicAccess', descr: 'Public Access' },
    { code: 'esriDiagramProtectedAccess', descr: 'Protected Access' },
    { code: 'esriDiagramPrivateAccess', descr: 'Private Access' }
]

function CreateDiagrams(prod, ref) {
    const [view, setView] = useState(null); // View Map
    const [sketchViewModel, setSketchViewModel] = useState(null); // lưu trữ sketchViewModel
    const [graphicQuery, setGraphicQuery] = useState(null); // lưu trữ graphic dùng để query lấy features
    const [diagramInfo, setDiagramInfo] = useState(null);
    const [active, setActive] = useState(null);

    const [diagramName, setDiagramName] = useState(''); // lưu trữ tham số name của hàm store diagram
    const [diagramTag, setDiagramTag] = useState(''); // lưu trữ tham số tag của hàm store diagram
    const [diagramAccess, setDiagramAccess] = useState(null); // lưu trữ giá trị tham số access của hàm store diagram

    const { jimuMapView, urlNetworkDiagram } = prod;

    // Theo dõi sự thay đổi của biến jimuMapView
    useEffect(() => {
        if (jimuMapView) {
            setView(jimuMapView.view);
            const _view: MapView = jimuMapView.view;
        }
    }, [jimuMapView])

    useEffect(() => {
        return () => { // Chạy khi hook function bị hủy (destroy)
            const items = jimuMapView.view.map.allLayers.get('items');
            if (items && items.length > 0) {
                items.forEach(item => {
                    if (item.id === 'draw_select_features') {
                        item.removeAll();
                    }
                });
            }
        }
    }, []);


    return (
        <div className='app-create-diagrams'>
            
        </div>
    )
}

export default forwardRef(CreateDiagrams);
