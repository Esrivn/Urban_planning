import './create-diagrams.scss';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { loadArcGISJSAPIModules, React } from 'jimu-core';
import MapView from 'esri/views/MapView';

import { CoreButton, CoreInput, CoreSelect } from '../../../../../component';
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
            initButtonSelectFeatures(_view);
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

    const initButtonSelectFeatures = async (view) => {
        const [
            GraphicsLayer,
            SketchViewModel,
        ] = await loadArcGISJSAPIModules([
            "esri/layers/GraphicsLayer",
            "esri/widgets/Sketch/SketchViewModel",
        ]);

        const items = view.map.allLayers.get('items');
        let polygonGraphicsLayer = null;
        if (items && items.length > 0) {
            items.forEach(item => {
                if (item.id === 'draw_select_features') {
                    polygonGraphicsLayer = item;
                }
            });
        }


        if (!polygonGraphicsLayer) {
            polygonGraphicsLayer = new GraphicsLayer({
                id: 'draw_select_features'
            });
            view.map.add(polygonGraphicsLayer);
        }

        const sketchViewModel = new SketchViewModel({
            view: view,
            layer: polygonGraphicsLayer
        });

        sketchViewModel.on("create", async (event) => {
            if (event.state === "start") {
                polygonGraphicsLayer.removeAll();
            }
            if (event.state === "complete") {
                setGraphicQuery(event.graphic);
                sketchViewModel.create("rectangle");
            }
        });

        setSketchViewModel(sketchViewModel);
    }

    const queryData = async (obj) => {
        const geometry = obj.graphic.geometry;
        const _view = view ?? obj.view;
        const items = _view.map.allLayers.get('items');
        if (items && items.length > 0) {
            const featureLayers = items.filter(fil => fil.type === 'feature');
            if (featureLayers && featureLayers.length > 0) {
                const arr = [];
                featureLayers.forEach(featureLayer => {
                    const query = featureLayer.createQuery();
                    query.geometry = geometry;
                    query.where = '1=1';
                    query.returnGeometry = false;
                    query.outFields = [featureLayer.globalIdField]
                    arr.push(featureLayer.queryFeatures(query));
                });

                const resp = await Promise.all(arr);
                let results = [];
                resp.forEach((item, index) => {
                    if (item && item.features && item.features.length > 0) {
                        results = results.concat(item.features.map(x => x.attributes[featureLayers[index].globalIdField]));
                    }
                });
                const urlCreateDiagram = urlNetworkDiagram + '/createDiagramFromFeatures';
                const params = {
                    gdbVersion: null,
                    sessionId: null,
                    template: 'Basic',
                    initialFeatures: JSON.stringify(results),
                    f: 'json'
                }

                const [esriRequest] = await loadArcGISJSAPIModules(["esri/request"]);
                const res = await esriRequest(urlCreateDiagram, {
                    responseType: "json",
                    query: params
                });
                if (res && res.data) {
                    setDiagramInfo(res.data.diagramInfo);
                    const urlDiagram = urlNetworkDiagram + '/diagrams/' + res.data.diagramInfo.name + '/map';
                    createMap(urlDiagram);
                } else {
                    setDiagramInfo(null);
                }

                document.body.style.cursor = 'default';
            }
        }
    }

    const createMap = async (url) => {
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

        const layer = new MapImageLayer({ url });

        myMap.add(layer);
        layer.on('layerview-create', (evt) => {
            view.goTo({
                target: evt.layerView.layer.fullExtent
            }, { duration: 1000 })
        });
    }

    const selectFeatures = () => {
        setActive(1);
        sketchViewModel.create("rectangle");
    }

    const createDiagram = () => {
        setActive(2);
        if (sketchViewModel) {
            sketchViewModel.cancel();

            document.body.style.cursor = 'wait';
            queryData({
                graphic: graphicQuery,
                view
            });
        }
    }

    const storeDiagram = async () => {
        setActive(3);
        if (sketchViewModel) {
            sketchViewModel.cancel();
        }
        if (!diagramInfo) {
            alert('Please create diagrams first!');
            setActive(null);
            return;
        }
    }

    const onChangeName = (x) => {
        const val = x.target ? x.target.value : x.value;
        setDiagramName(val);
    }

    const onChangeTag = (x) => {
        const val = x.target ? x.target.value : x.value;
        setDiagramTag(val);
    }

    const onChangeAccess = (x) => {
        const val = x.target ? x.target.value : x.value;
        setDiagramAccess(val);
    }

    const runSaveDiagram = async () => {
        if (diagramName === '' || !diagramAccess) {
            alert('Bạn chưa nhập đủ trường bắt buộc!!!');
            return;
        }

        const params = {
            gdbVersion: null,
            sessionId: null,
            name: diagramName,
            tag: diagramTag,
            access: diagramAccess.code,
            f: 'json'
        }

        const urlStoreDiagram = `${urlNetworkDiagram}/diagrams/${diagramInfo.name}/store`;
        const [esriRequest] = await loadArcGISJSAPIModules(["esri/request"]);
        const res = await esriRequest(urlStoreDiagram, {
            responseType: "json",
            query: params
        });
        console.log(res);
        if (res && res.data) {
            alert('Lưu diagram thành công!');
            setActive(null);
        } else {
            alert('Lưu diagram thất bại!');
        }
    }

    return (
        <div className='app-create-diagrams'>
            <div className='btn-control'>
                <div className={`icn-tool ${active === 1 ? "active" : ""}`} style={{ backgroundImage: `url(${SelectFeature})` }} onClick={selectFeatures}></div>
                <div className={`icn-tool ${active === 2 ? "active" : ""}`} style={{ backgroundImage: `url(${NewDiagrams})` }} onClick={createDiagram}></div>
                <div className={`icn-tool ${active === 3 ? "active" : ""}`} style={{ backgroundImage: `url(${StoreDiagrams})` }} onClick={storeDiagram}></div>
            </div>

            {
                active === 3 &&
                <div className='store-diagram-group'>
                    <CoreInput value={diagramName} isRequired={true} onChange={onChangeName} labelName="Name"></CoreInput>
                    <CoreInput value={diagramTag} isRequired={false} onChange={onChangeTag} labelName="Tag"></CoreInput>
                    <CoreSelect value={diagramAccess} isRequired={true} onChange={onChangeAccess} dataSource={lookupAccess}
                        valueField={null} labelName="Access Type"></CoreSelect>
                    <div className='footer-btn'>
                        <CoreButton icon="" onClick={runSaveDiagram} labelName="Run"></CoreButton>
                    </div>
                </div>
            }


            <div id="mapDiv" style={{ width: '300px', height: '300px', border: '1px solid green' }}></div>
        </div>
    )
}

export default forwardRef(CreateDiagrams);
