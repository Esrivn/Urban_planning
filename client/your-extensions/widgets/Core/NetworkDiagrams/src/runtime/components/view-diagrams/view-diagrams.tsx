import './view-diagrams.scss';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { loadArcGISJSAPIModules, React } from 'jimu-core';
import MapView from 'esri/views/MapView';

import { CoreButton, CoreInput, CoreSelect } from '../../../../../component';
import { Fieldset } from 'primereact/fieldset';
import { Panel } from 'primereact/panel';
import { string } from 'prop-types';

let _imgSelectionList = ['SelectionSelectTool32.png', 'AppendToDiagram32.png', 'GridLayout32.png'];
let _imgLayoutList = ['startPoint.png', 'barrier.png', 'DiagramLayout32.png', 'ForceDirectedLayout32.png', 'GeoPositionLayout32.png', 'GridLayout32.png', 'MainlineTreeLayout32.png', 'RadialTreeLayout32.png', 'SmartTreeLayout32.png'];

function ViewDiagrams(prod, ref) {
    const { jimuMapView, urlNetworkDiagram } = prod;
    const [view, setView] = useState(null); // View Map
    const [viewDiagram, setViewDiagram] = useState(null); // ViewDiagram
    const [lookupDiagram, setLookupDiagram] = useState([]); // Lưu trữ danh sách diagram
    const [valueDiagram, setValueDiagram] = useState(null);
    const [imgSelectionList, setImgSelectionList] = useState(null);
    const [imgLayoutList, setImgLayoutList] = useState(null);

    // Theo dõi sự thay đổi của biến jimuMapView
    useEffect(() => {
        if (jimuMapView) {
            setView(jimuMapView.view);
            const _view: MapView = jimuMapView.view;

        }
    }, [jimuMapView])

    useEffect(() => {
        initControl()
        return () => { // Chạy khi hook function bị hủy (destroy)

        }
    }, []);

    const initControl = async () => {
        const params = {
            f: 'json'
        }

        const urlDiagram = `${urlNetworkDiagram}/diagrams`;
        const [esriRequest] = await loadArcGISJSAPIModules(["esri/request"]);
        const res = await esriRequest(urlDiagram, {
            responseType: "json",
            query: params
        });

        let array = [];

        if (res && res.data) {
            res.data.diagramNames.forEach(name => {
                array.push({
                    code: name,
                    descr: name
                });
            });
        }

        console.log(array);
        setLookupDiagram(array);

        let arrSelectionList = [];
        for (let index = 0; index < _imgSelectionList.length; index++) {
            const element = _imgSelectionList[index];
            const module = await import(`../../../images/${element}`);
            arrSelectionList.push(module.default);
        }

        let arrLayoutList = [];
        for (let index = 0; index < _imgLayoutList.length; index++) {
            const element = _imgLayoutList[index];
            const module = await import(`../../../images/${element}`);
            arrLayoutList.push(module.default);
        }

        console.log(arrLayoutList, arrSelectionList);
        setImgSelectionList(arrSelectionList);
        setImgLayoutList(arrLayoutList);

        // // Test Create Trace Config
        // const query = {
        //     f: 'json',
        //     name: 'Connected_IncludeContainers',
        //     description: "Connected trace example with containers",
        //     traceType: "connected",
        //     traceConfiguration: JSON.stringify({
        //         "includeContainers": true,
        //         "includeContent": false,
        //         "includeStructures": false,
        //         "includeBarriers": true,
        //         "validateConsistency": true,
        //         "validateLocatability": false,
        //         "includeIsolated": false,
        //         "ignoreBarriersAtStartingPoints": false,
        //         "includeUpToFirstSpatialContainer": true,
        //         "allowIndeterminateFlow": true,
        //         "domainNetworkName": "",
        //         "tierName": "",
        //         "targetTierName": "",
        //         "subnetworkName": "",
        //         "diagramTemplateName": "",
        //         "shortestPathNetworkAttributeName": "",
        //         "filterBitsetNetworkAttributeName": "",
        //         "traversabilityScope": "junctionsAndEdges",
        //         "conditionBarriers": [],
        //         "functionBarriers": [],
        //         "arcadeExpressionBarrier": "",
        //         "filterBarriers": [],
        //         "filterFunctionBarriers": [],
        //         "filterScope": "junctionsAndEdges",
        //         "functions": [],
        //         "nearestNeighbor": {
        //             "count": -1,
        //             "costNetworkAttributeName": "",
        //             "nearestCategories": [],
        //             "nearestAssets": []
        //         },
        //         "outputFilters": [],
        //         "outputConditions": [],
        //         "propagators": []
        //     }),
        //     resultTypes: JSON.stringify([{ "type": "elements", "includeGeometry": false, "includePropagatedValues": false, "networkAttributeNames": [], "diagramTemplateName": "", "resultTypeFields": [] }]),
        //     tags: JSON.stringify(["Connected", "Include_Containers"])
        // }

        // esriRequest('https://gisun.esrivn.net/server/rest/services/HCM/UtilityNetworkServer/traceConfigurations/create', {
        //     responseType: "json",
        //     query: query,
        //     method: 'post'
        // }).then(res => {
        //     console.log('TRACE CONFIG >>>>>>>>>> ', res)
        // }, err => {
        //     console.log('ERROR TRACE CONFIG >>> ', err);
        // })
    }

    const createMap = async (name?: string) => {
        document.body.style.cursor = 'wait';
        const [
            Map,
            MapView,
            MapImageLayer
        ] = await loadArcGISJSAPIModules([
            "esri/Map", "esri/views/MapView", "esri/layers/MapImageLayer"
        ]);

        const myMap = new Map({
            // basemap: "streets-vector" // Hiển thị diagrams không cần basemap
        });
        const view = new MapView({
            map: myMap,
            container: 'mapDiv'
        });

        if (!name) {
            document.body.style.cursor = 'default';
            return;
        }

        const url = `${urlNetworkDiagram}/diagrams/${name}/map`;
        const layer = new MapImageLayer({ url });

        myMap.add(layer);
        layer.on('layerview-create', (evt) => {
            document.body.style.cursor = 'default';
            view.goTo({
                target: evt.layerView.layer.fullExtent
            }, { duration: 1000 })
        });

        setViewDiagram(view);
    }

    const onChangeDiagram = (e) => {
        const val = e.target ? e.target.value : e.value;
        setValueDiagram(val);
        val ? createMap(val.code) : createMap(null);
    }

    const renderImgLayout = (name, index) => {
        const results = _imgLayoutList.filter((fil, i) => index === i);
        return <div className="icn-tool" style={{ backgroundImage: `url(${name})` }}
            onClick={() => onClickTool(results)}></div>
    }

    const renderImgSelection = (name, index) => {
        const results = _imgSelectionList.filter((fil, i) => index === i);
        return <div className="icn-tool" style={{ backgroundImage: `url(${name})` }}
            onClick={() => onClickTool(results)}></div>
    }

    const onClickTool = (tool) => {
        if (!tool || tool.length === 0) {
            return;
        }

        switch (tool[0]) {
            case 'DiagramLayout32.png':
                applyLayoutAlgorithm('GridDiagramLayout');
                break;
            case 'ForceDirectedLayout32.png':
                applyLayoutAlgorithm('ForceDirectedDiagramLayout');
                break;
            case 'MainlineTreeLayout32.png':
                applyLayoutAlgorithm('MainLineTreeDiagramLayout');
                break;
            case 'RadialTreeLayout32.png':
                applyLayoutAlgorithm('RadialTreeDiagramLayout');
                break;
            case 'SmartTreeLayout32.png':
                applyLayoutAlgorithm('SmartTreeDiagramLayout');
                break;
            default:
                break;
        }
    }

    const applyLayoutAlgorithm = async (layoutName) => {
        if (!valueDiagram) {
            alert('You must choose Diagram!!!');
            return;
        }

        const url = `${urlNetworkDiagram}/diagrams/${valueDiagram.code}/applyLayout`;
        let postJson = {
            layoutParams: "",
            layoutName: layoutName,
            containerObjectIDs: [],
            junctionObjectIDs: [],
            edgeObjectIDs: [],
            f: "json"
        }
        const [esriRequest] = await loadArcGISJSAPIModules(['esri/request'])
        const response = await esriRequest(url, {
            responseType: "json",
            query: postJson,
            method: 'post'
        });
        console.log('APPLY LAYOUT RESPONSE >>>>>>>>> ', response);

        if (response && response.data) {
            createMap(valueDiagram.code);
        }
    }

    return (
        <div className='app-view-diagrams'>
            <div className='group-container'>
                <div className='group-title'>Selection: </div>
                <div className='group-body'>
                    {
                        imgSelectionList &&
                        imgSelectionList.map((item, index) => renderImgSelection(item, index))
                    }
                </div>
            </div>

            <div className='group-container'>
                <div className='group-title'>Layout: </div>
                <div className='group-body'>
                    {
                        imgLayoutList &&
                        imgLayoutList.map((item, index) => renderImgLayout(item, index))
                    }
                </div>
            </div>

            <CoreSelect value={valueDiagram} onChange={onChangeDiagram} dataSource={lookupDiagram}
                valueField={null} labelName="List Diagram"></CoreSelect>

            <div id="mapDiv" className='map-inside'></div>
        </div>
    )
}

export default forwardRef(ViewDiagrams);
