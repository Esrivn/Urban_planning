import './style.scss';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { classNames, DataSourceManager, loadArcGISJSAPIModules, React } from 'jimu-core';
import MapView from 'esri/views/MapView';

import { CoreButton, CoreInput, CoreSelect } from '../../../../../component';
import { Tooltip } from 'primereact/tooltip';

import TrashBin from "../../../images/trash-bin.png";
import StoreDiagrams from "../../../images/StoreDiagram32.png";
import NewDiagrams from "../../../images/NewDiagram32.png";
import SelectFeature from "../../../images/SelectionSelectTool32.png";
import AppendToDiagram from "../../../images/AppendToDiagram32.png";
import AppendToMap from "../../../images/OpenDiagView32.png";
import StartPointImg from "../../../images/startPoint.png";
import BarrierImg from "../../../images/barrier.png";
import DeleteImg from "../../../images/GenericDeleteRed32.png";
import { JimuMapView, featureUtils } from 'jimu-arcgis';

let _graphicQuery = null; // lưu trữ graphic dùng để query lấy features
let _sketch = null; // lưu trữ sketchViewModel
let _dataResponse = null; // lưu trữ dữ liệu khi select features ở diagram
let _isRequestPending = false;
let _handleEventViewClick = null; // Kiểm soát sự kiện view click
let _urlDiagram = { // lưu trữ url diagram của 3 loại đối tượng ở map
    'edge': '',
    'junction': '',
    'container': ''
};


let defaultPointSymbol: any = {
    type: 'simple-marker',
    style: 'circle',
    color: [255, 255, 0, 0.8],
    size: '16px',
    outline: {
        color: [255, 255, 0, 0.8],
        width: 3
    }
}

let defaultPolylineSymbol: any = {
    type: 'simple-line',
    color: [255, 255, 0, 0.8],
    width: 3,
    style: 'solid'
}

let defaultPolygonSymbol: any = {
    type: 'simple-fill', // autocasts as new SimpleFillSymbol()
    color: [255, 255, 0, 0.5],
    style: 'solid',
    outline: { // autocasts as new SimpleLineSymbol()
        color: [255, 255, 0, 0.8],
        width: 3
    }
}

// Ghi chú: các biến toàn cục cần thay đổi thì phải đưa ra ngoài hook function, các biến hằng số thì để bên trong (mỗi lần re-render luôn cố định 1 giá trị)

function NetworkDiagrams(prod, ref) {
    const { jimuMapView, urlNetworkDiagram, urlFeatureServer } = prod;
    const [view, setView] = useState(null); // View Map
    const [viewDiagram, setViewDiagram] = useState(null); // ViewDiagram
    const [lookupDiagram, setLookupDiagram] = useState([]); // Lưu trữ danh sách diagram
    const [valueDiagram, setValueDiagram] = useState(null);
    const [imgLayoutList, setImgLayoutList] = useState(null); // Danh sách image layout
    const [isOpenLayoutGroup, setIsOpenLayoutGroup] = useState(null); // Kiểm tra đóng mở group layout

    const [diagramInfo, setDiagramInfo] = useState(null);
    const [active, setActive] = useState(null); // Biến điều kiện active của button (ngoài map diagram)
    const [mapToolActive, setMapToolActive] = useState(null); // Biến điều kiện active của tool (trong map diagram);

    const [diagramName, setDiagramName] = useState(''); // lưu trữ tham số name của hàm store diagram
    const [diagramTag, setDiagramTag] = useState(''); // lưu trữ tham số tag của hàm store diagram
    const [diagramAccess, setDiagramAccess] = useState(null); // lưu trữ giá trị tham số access của hàm store diagram

    const _imgLayoutList = ['ForceDirectedLayout32.png', 'GridLayout32.png', 'MainlineTreeLayout32.png', 'RadialTreeLayout32.png', 'SmartTreeLayout32.png'];

    const lookupAccess = [
        { code: 'esriDiagramPublicAccess', descr: 'Public Access' },
        { code: 'esriDiagramProtectedAccess', descr: 'Protected Access' },
        { code: 'esriDiagramPrivateAccess', descr: 'Private Access' }
    ]

    const idFlagGraphicLayer = 'flag_graphicLayer';
    const idSelectGraphicLayer = 'select_graphicLayer';
    const idDiagramLayer = 'diagramLayer';

    // Theo dõi sự thay đổi của biến jimuMapView
    useEffect(() => {
        if (jimuMapView) {
            setView(jimuMapView.view);
            const _view: MapView = jimuMapView.view;
            window['_jmv'] = jimuMapView;
            defaultPointSymbol.color = _view.highlightOptions.color;
            defaultPolygonSymbol.color = _view.highlightOptions.color;
            defaultPolylineSymbol.color = _view.highlightOptions.color;
            // defaultPointSymbol = featureUtils.getDefaultSymbol('point');
            // defaultPolygonSymbol = featureUtils.getDefaultSymbol('polygon');
            // defaultPolylineSymbol = featureUtils.getDefaultSymbol('polyline')
        }
    }, [jimuMapView])

    useEffect(() => {
        initControl()
        return () => { // Chạy khi hook function bị hủy (destroy)

        }
    }, []);

    /** Load các control như select diagram hay button tool */
    const initControl = async () => {
        const params = {
            f: 'json'
        }

        const [esriRequest] = await loadArcGISJSAPIModules(["esri/request"]);
        await loadDiagram();

        let arrLayoutList = [];
        for (let index = 0; index < _imgLayoutList.length; index++) {
            const element = _imgLayoutList[index];
            const module = await import(`../../../images/${element}`);
            arrLayoutList.push(module.default);
        }
        setImgLayoutList(arrLayoutList);

        let res = await esriRequest(urlFeatureServer, {
            responseType: "json",
            query: params
        });

        if (res && res.data) {
            const urlUtilityNetwork = urlFeatureServer + '/' + res.data.controllerDatasetLayers.utilityNetworkLayerId;
            res = await esriRequest(urlUtilityNetwork, {
                responseType: "json",
                query: params
            });


            _urlDiagram.container = urlFeatureServer + '/' + res.data.systemLayers.diagramContainerLayerId;
            _urlDiagram.edge = urlFeatureServer + '/' + res.data.systemLayers.diagramEdgeLayerId;
            _urlDiagram.junction = urlFeatureServer + '/' + res.data.systemLayers.diagramJunctionLayerId;
        }
    }

    /** Load diagrams */
    const loadDiagram = async () => {
        const params = {
            f: 'json'
        }

        console.log(urlNetworkDiagram);

        const urlDiagram = `${urlNetworkDiagram}/diagrams`;
        const [esriRequest] = await loadArcGISJSAPIModules(["esri/request"]);
        let res = await esriRequest(urlDiagram, {
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

        setLookupDiagram(array);
    }

    /** Tạo map khi chọn diagram */
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
            setViewDiagram(null);
            return;
        }

        const url = `${urlNetworkDiagram}/diagrams/${name}/map`;
        const layer = new MapImageLayer({ url, id: idDiagramLayer });

        myMap.add(layer);
        layer.on('layerview-create', (evt) => {
            if (evt.layerView.layer.fullExtent) {
                view.goTo({
                    target: evt.layerView.layer.fullExtent.expand(2.0)
                }, { duration: 1000 })

            }
            // create Graphic
            createFlagGraphic(view, name);
        });
        setViewDiagram(view);
    }

    /** Tạo graphic của Flag (Root Junction/Barrier) */
    const createFlagGraphic = async (view?, name?) => {
        if (!view) {
            view = viewDiagram;
        }

        if (!name) {
            name = valueDiagram.code;
        }
        const [
            GraphicsLayer,
            esriRequest,
            Graphic,
            Point
        ] = await loadArcGISJSAPIModules([
            "esri/layers/GraphicsLayer",
            "esri/request",
            "esri/Graphic",
            "esri/geometry/Point"
        ]);

        let graphicLayer = await getGraphicLayer(view, idFlagGraphicLayer);
        graphicLayer.removeAll();

        const urlGetFlag = `${urlNetworkDiagram}/diagrams/${name}/getFlags`;

        // Root Junction
        const res = await esriRequest(urlGetFlag, {
            query: {
                gdbVersion: null,
                sessionId: null,
                moment: null,
                flagType: 'esriDiagramRootJunction',
                f: 'json'
            },
            responseType: 'json',
            method: 'get'
        });

        if (res && res.data && res.data.flags) {
            res.data.flags.forEach(flag => {
                const point = new Point({
                    x: flag.geometry.x,
                    y: flag.geometry.y,
                    spatialReference: flag.geometry.spatialReference
                });
                let symbol = {
                    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                    url: StartPointImg,
                    width: "24px",
                    height: "24px"
                };
                const graphic = new Graphic({
                    geometry: point,
                    symbol
                });
                graphicLayer.add(graphic);
            });
        }

        // Barrier
        const resBarrier = await esriRequest(urlGetFlag, {
            query: {
                gdbVersion: null,
                sessionId: null,
                moment: null,
                flagType: 'esriDiagramBarrierJunction',
                f: 'json'
            },
            responseType: 'json',
            method: 'get'
        });

        if (resBarrier && resBarrier.data && resBarrier.data.flags) {
            resBarrier.data.flags.forEach(flag => {
                const point = new Point({
                    x: flag.geometry.x,
                    y: flag.geometry.y,
                    spatialReference: flag.geometry.spatialReference
                });
                let symbol = {
                    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                    url: BarrierImg,
                    width: "24px",
                    height: "24px"
                };
                const graphic = new Graphic({
                    geometry: point,
                    symbol
                });
                graphicLayer.add(graphic);
            });
        }

        document.body.style.cursor = 'default';
    }

    /** Xóa toàn bộ các flag  */
    const clearFlag = async () => {
        if (!valueDiagram) {
            return;
        }

        // setMapToolActive(2);
        // _sketch.cancel(); // dừng sự kiện vẽ trên diagram

        const items = viewDiagram.map.allLayers.get('items');
        if (items && items.length > 0) {
            items.forEach(item => {
                if (item.id === idFlagGraphicLayer) {
                    item.removeAll();
                }
            });
        }

        const [esriRequest] = await loadArcGISJSAPIModules(["esri/request"]);
        const urlClearFlags = `${urlNetworkDiagram}/diagrams/${valueDiagram.code}/clearFlags`;
        const arrayPromise = [];
        arrayPromise.push(esriRequest(urlClearFlags, {
            query: {
                gdbVersion: null,
                sessionId: null,
                flagType: 'esriDiagramBarrierJunction',
                f: 'json'
            },
            responseType: 'json',
            method: 'get'
        }))
        arrayPromise.push(esriRequest(urlClearFlags, {
            query: {
                gdbVersion: null,
                sessionId: null,
                flagType: 'esriDiagramRootJunction',
                f: 'json'
            },
            responseType: 'json',
            method: 'get'
        }))
        const res = await Promise.all(arrayPromise);
        console.log(res);
    }

    // Sự kiện xảy ra khi thay đổi control select diagram
    const onChangeDiagram = (e) => {
        const val = e.target ? e.target.value : e.value;
        setValueDiagram(val);
        val ? createMap(val.code) : createMap(null);
    }

    // Có sử dụng
    const renderImgLayout = (name, index) => {
        const results = _imgLayoutList.filter((fil, i) => index === i);
        return <div className="icn-tool" title={results[0]} style={{ backgroundImage: `url(${name})` }}
            onClick={() => onClickTool(results)}></div>
    }

    // Có sử dụng
    const onClickTool = (tool) => {
        if (!tool || tool.length === 0) {
            return;
        }

        switch (tool[0]) {
            case 'GridLayout32.png':
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

    /** Hàm lấy dữ liệu đang select ở map */
    const getSelectedDatasource = () => {
        const results = [];
        const dsObj = DataSourceManager.getInstance();
        const dataSources = dsObj.getDataSources();
        for (let key in dataSources) {
            if (key.includes('-selection')) {
                const records = dataSources[key].getSelectedRecords();
                if (records.length > 0) {
                    results.push({
                        id: dataSources[key].id,
                        records
                    });
                }
            }
        }

        return results;
    }

    /** Hàm select ở map diagram */
    const selectionOnDiagram = async () => {
        if (!viewDiagram) {
            return;
        }

        if (mapToolActive === 1) { // Tắt sự kiện chọn
            setMapToolActive(null);
            if (_sketch) {
                _sketch.cancel();
            }
            return;
        }

        setMapToolActive(1);

        const [
            SketchViewModel,
        ] = await loadArcGISJSAPIModules([
            "esri/widgets/Sketch/SketchViewModel",
        ]);

        let selectGraphicLayer = await getGraphicLayer(viewDiagram, idSelectGraphicLayer);

        if (!_sketch) { // Nếu chưa tạo SketchViewModel
            const sketchViewModel = new SketchViewModel({
                view: viewDiagram,
                layer: selectGraphicLayer
            });

            _sketch = sketchViewModel;

            _sketch.on("create", async (event) => {
                if (event.state === "start") {
                    selectGraphicLayer.removeAll();
                }
                if (event.state === "complete") {
                    _sketch.create("rectangle");
                    _graphicQuery = event.graphic;
                    queryData({
                        graphic: _graphicQuery,
                        view: viewDiagram
                    });
                }
            });
        }


        _sketch.create("rectangle");
    }

    /** Thu phóng tới vị trí tương ứng trên map của các bản ghi được chọn ở map diagram */
    const appendToMap = async () => {
        if (!viewDiagram) {
            return;
        }
        const [
            Graphic,
            geometryEngine
        ] = await loadArcGISJSAPIModules([
            'esri/Graphic',
            'esri/geometry/geometryEngine'
        ])

        const items = view.map.allLayers.get('items'); // lấy ra các toàn bộ layer trong map
        const obj = {};
        _dataResponse.results.forEach(item => {
            if (!obj[item.layerName]) {
                obj[item.layerName] = [];
            }
            Object.keys(item.feature.attributes).forEach(key => {
                if (key.toUpperCase().includes('.ASSOCIATEDOBJECTID')) {
                    const objectId = item.feature.attributes[key];
                    obj[item.layerName].push(objectId);
                }
            });
        });

        const arrRequest = []; // đưa các request vào mảng để đồng bộ bằng phương thức Promise.all()
        const keyIndex = [];
        Object.keys(obj).forEach(key => {
            let layer = items.filter(fil => fil.title && fil.title.includes(key));
            if (layer && layer.length > 0) {
                layer = layer[0];
                const query = layer.createQuery();
                query.where = `${layer.objectIdField} in (${obj[key].join(',')})`;
                query.outSpatialReference = 102100;
                query.outFields = ['*'];
                arrRequest.push(layer.queryFeatures(query));
                keyIndex.push(key);
            }
        });

        const responseList = await Promise.all(arrRequest);
        const arrayGraphic = [];
        responseList.forEach((res, index) => {
            if (res && res.features) {
                res.features.forEach(element => {
                    const graphic = new Graphic({
                        geometry: element.geometry,
                        attributes: element.attributes,
                        symbol: element.geometry.type === 'point' ? defaultPointSymbol : defaultPolylineSymbol
                    })
                    graphic.layerName = keyIndex[index];
                    arrayGraphic.push(graphic);
                });
            }
        });

        // ghép các graphic vào làm 1 để extent tới
        const graphicUnion = geometryEngine.union(arrayGraphic.map(item => item.geometry));

        // Clear các feature đã select ở trên map
        const jmv: JimuMapView = jimuMapView;
        jmv.clearSelectedFeatures();

        buildRecords(arrayGraphic)
        view.goTo({ target: graphicUnion }, { duration: 1000 });
    }

    const buildRecords = (arrayFeatures: any[]) => {
        const dsObj = DataSourceManager.getInstance();
        const mapLyrVws = jimuMapView.jimuLayerViews;
        for (const key in mapLyrVws) {
            const ds = dsObj.getDataSource(mapLyrVws[key].layerDataSourceId);
            if (ds.type === 'FEATURE_LAYER') {
                const objectIdList = []
                const featDatRecList = []
                // @ts-expect-error
                const arr = arrayFeatures.filter(rs => rs.layerName === ds.layerDefinition.name);
                if (arr && arr.length > 0) {
                    arr.forEach(x => {
                        featDatRecList.push(ds.buildRecord(x));
                        objectIdList.push(x.attributes[ds['layer'].objectIdField])
                    })
                    ds.selectRecordsByIds(objectIdList.map(String), featDatRecList, true);
                }
            }
        }
    }

    /** Thu phóng tới vị trí tương ứng trên map diagram của các bản ghi được chọn ở map */
    const appendToDiagram = async () => {
        if (!viewDiagram) {
            return;
        }

        const list = getSelectedDatasource();
        console.log(list);
        const junction = []; // point request
        const edge = []; // polyline request
        const container = []; // polygon request
        list.forEach(item => {
            const arr = item.records.map(item => item.feature);
            arr.forEach(x => {
                if (x.geometry.type === 'point') {
                    junction.push(x.attributes[x.layer.objectIdField])
                } else if (x.geometry.type === 'polyline') {
                    edge.push(x.attributes[x.layer.objectIdField])
                } else {
                    container.push(x.attributes[x.layer.objectIdField])
                }
            })
        });

        const arrayRequest = [];
        const [
            esriRequest,
            Point,
            Polyline,
            Polygon,
            Graphic
        ] = await loadArcGISJSAPIModules([
            'esri/request',
            "esri/geometry/Point",
            "esri/geometry/Polyline",
            "esri/geometry/Polygon",
            "esri/Graphic",
        ]);

        // Vì khi select chỉ có ObjectId của đối tượng ở map => phải query tới bảng edge/junction/containment
        // Sau khi query xong => dữ liệu có trường GlobalID dùng để query tiếp vào từng diagrams
        if (junction.length > 0) {
            arrayRequest.push(
                esriRequest(_urlDiagram.junction + '/query', {
                    responseType: "json",
                    query: {
                        f: 'json',
                        where: `ASSOCIATEDOBJECTID in (${junction.join(',')})`,
                        outFields: ['*']
                    },
                    method: 'post'
                })
            )
        }

        if (edge.length > 0) {
            arrayRequest.push(
                esriRequest(_urlDiagram.edge + '/query', {
                    responseType: "json",
                    query: {
                        f: 'json',
                        where: `ASSOCIATEDOBJECTID in (${edge.join(',')})`,
                        outFields: ['*']
                    },
                    method: 'post'
                })
            )
        }

        if (container.length > 0) {
            arrayRequest.push(
                esriRequest(_urlDiagram.container + '/query', {
                    responseType: "json",
                    query: {
                        f: 'json',
                        where: `ASSOCIATEDOBJECTID in (${container.join(',')})`,
                        outFields: ['*']
                    },
                    method: 'post'
                })
            )
        }

        const resAll = await Promise.all(arrayRequest);
        if (resAll && resAll.length > 0) {
            const listGraphic = [];
            resAll.forEach(item => {
                if (item && item.data) {
                    const type = item.data.geometryType;
                    item.data.features.forEach(element => {
                        let geometry = null; let graphic = null;
                        if (type === 'esriGeometryPoint') {
                            geometry = new Point({
                                x: element.geometry.x,
                                y: element.geometry.y,
                                spatialReference: item.data.spatialReference
                            });

                            graphic = new Graphic({
                                geometry,
                                symbol: defaultPointSymbol,
                                attributes: element.attributes
                            })
                        } else if (type === 'esriGeometryPolyline') {
                            geometry = new Polyline({
                                paths: element.geometry.paths,
                                spatialReference: item.data.spatialReference
                            });
                            graphic = new Graphic({
                                geometry,
                                symbol: defaultPolylineSymbol,
                                attributes: element.attributes
                            })
                        } else {
                            geometry = new Polygon({
                                rings: element.geometry.rings,
                                spatialReference: item.data.spatialReference
                            });
                            graphic = new Graphic({
                                geometry,
                                symbol: defaultPolygonSymbol,
                                attributes: element.attributes
                            })
                        }

                        listGraphic.push(graphic);
                    });
                }
            });

            console.log(resAll);
            viewDiagram.graphics.removeAll();
            viewDiagram.graphics.addMany(listGraphic);
        }
    }

    const getGraphicLayer = async (view: any, id: any) => {
        const [GraphicsLayer] = await loadArcGISJSAPIModules(["esri/layers/GraphicsLayer"]);
        const items = view.map.allLayers.get('items');
        let graphicLayer = null;
        if (items && items.length > 0) {
            items.forEach(item => {
                if (item.id === id) {
                    graphicLayer = item;
                }
            });
        }


        if (!graphicLayer) {
            graphicLayer = new GraphicsLayer({ id });
            view.map.add(graphicLayer);
        }

        return graphicLayer;
    }

    // Có sử dụng
    /** Áp dụng layout cho diagrams */
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

        if (response && response.data) {
            createMap(valueDiagram.code);
        }
    }

    // Có sử dụng
    const queryData = async (obj: { graphic: any, view: any }) => {
        if (_isRequestPending) {
            return;
        }
        const [identify] = await loadArcGISJSAPIModules(["esri/rest/identify"]);
        const geometry = obj.graphic.geometry;
        const view = obj.view;
        const items = view.map.allLayers.get('items');
        if (items && items.length > 0) {
            let layer = items.filter(fil => fil.id === idDiagramLayer);
            if (layer && layer.length > 0) {
                _sketch.layer.removeAll();
                layer = layer[0];
                _isRequestPending = true;
                identify.identify(layer.url, {
                    geometry,
                    tolerance: 9,
                    returnGeometry: true,
                    layerOption: 'visible',
                    spatialReference: layer.spatialReference,
                    width: viewDiagram.width,
                    height: viewDiagram.height
                }).then(resp => {
                    _isRequestPending = false;
                    _dataResponse = resp;
                    console.log(_dataResponse);
                    highlightAllGraphic(view)
                }).catch(err => {
                    _isRequestPending = false;
                    _dataResponse = null;
                });
            }
        }
    }

    /** Vẽ đồ họa các phần tử được chọn */
    const highlightAllGraphic = async (view) => {
        const [Graphic] = await loadArcGISJSAPIModules(["esri/Graphic"]);
        view.graphics.removeAll();
        if (_dataResponse && _dataResponse.results) {
            _dataResponse.results.forEach(item => {
                let symbol: any = defaultPolylineSymbol;
                if (item.feature.geometry.type === 'point') {
                    symbol = defaultPointSymbol;
                } else if (item.feature.geometry.type === 'polygon') {
                    symbol = defaultPolygonSymbol;
                }
                const graphic = new Graphic({
                    geometry: item.feature.geometry,
                    symbol,
                    attributes: item.feature.attributes
                });

                view.graphics.add(graphic);
            })
        }
    }

    // Có sử dụng - chưa hoàn thành
    /** Tạo diagram từ các features đã chọn */
    const createDiagram = () => {
        setActive(2);
        document.body.style.cursor = 'wait';
        queryDataDiagram();
    }

    const queryDataDiagram = async () => {
        const selected = getSelectedDatasource();
        let results = [];
        selected.forEach(item => {
            const records: any[] = item.records;
            results = results.concat(records.map(x => x.feature.attributes[x.feature.layer.globalIdField]));
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
       
        try {
            const res = await esriRequest(urlCreateDiagram, {
                responseType: "json",
                query: params
            });
            if (res && res.data) {
                setDiagramInfo(res.data.diagramInfo);
                createMap(res.data.diagramInfo.name);
                const newLookupDiagram = [...new Set(lookupDiagram)];
                const obj = {
                    code: res.data.diagramInfo.name,
                    descr: res.data.diagramInfo.name
                };
                newLookupDiagram.push(obj);
                setLookupDiagram(newLookupDiagram);
                setValueDiagram(obj);
            } else {
                setDiagramInfo(null);
            }
        } catch (error) {
            console.log(error);
            if (error && error.message) {
                alert(error.message);
            }
        }
    
        document.body.style.cursor = 'default';
    }


    // Có sử dụng - chưa hoàn thành
    /** Bật form lưu diagram */
    const storeDiagram = async () => {
        setActive(3);
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

    /** Thay đổi control tag */
    const onChangeTag = (x) => {
        const val = x.target ? x.target.value : x.value;
        setDiagramTag(val);
    }

    // Có sử dụng
    const onChangeAccess = (x) => {
        const val = x.target ? x.target.value : x.value;
        setDiagramAccess(val);
    }

    // Có sử dụng
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

        if (res && res.data) {
            alert('Lưu diagram thành công!');
            setActive(null);
            await loadDiagram();
            createMap(diagramName);
        } else {
            alert('Lưu diagram thất bại!');
        }
    }

    const openLayoutGroup = () => {
        setIsOpenLayoutGroup(!isOpenLayoutGroup);
    }

    // Có sử dụng
    const onSetRootJunction = () => {
        if (!valueDiagram) {
            return;
        }
        setMapToolActive(3);
        if (_sketch) {
            _sketch.cancel(); // dừng sự kiện vẽ trên diagram
        }
        initEventClick('rootJunction');
    }

    // Có sử dụng
    const onSetBarrier = async () => {
        if (!valueDiagram) {
            return;
        }

        setMapToolActive(4);
        if (_sketch) {
            _sketch.cancel(); // dừng sự kiện vẽ trên diagram
        }
        initEventClick('barrierJunction');
    }

    // Có sử dụng
    const initEventClick = async (type: 'rootJunction' | 'endJunction' | 'PivotJunction' | 'barrierJunction' | 'barrierEdge') => {
        const [
            identify,
            projection,
            esriRequest
        ] = await loadArcGISJSAPIModules([
            "esri/rest/identify",
            "esri/geometry/projection",
            "esri/request"
        ]);

        await projection.load();
        const items = viewDiagram.map.allLayers.get('items');

        // get layer
        const a = items.filter(fil => fil.id === idDiagramLayer);

        if (_handleEventViewClick) {
            _handleEventViewClick.remove();
        }

        // get url
        const url = `${urlNetworkDiagram}/diagrams/${valueDiagram.code}/map`;
        _handleEventViewClick = viewDiagram.on('click', async (evt) => {
            let diagramElementId = null;
            // convert mapPoint to layer spatialReference => use to query correct
            const geometry = projection.project(evt.mapPoint, a[0].spatialReference);
            const resp = await identify.identify(url, {
                geometry,
                tolerance: 9,
                returnGeometry: true,
                layerOption: 'visible',
                spatialReference: a[0].spatialReference,
                width: viewDiagram.width,
                height: viewDiagram.height
            });

            if (resp && resp.results && resp.results.length > 0) {
                const data = resp.results[0].feature;
                Object.keys(data.attributes).forEach(key => {
                    if (key.includes('FEATUREDEID')) {
                        diagramElementId = data.attributes[key];
                    }
                });
            }

            if (diagramElementId) {
                // Add flag into diagram
                const urlManageFlag = `${urlNetworkDiagram}/diagrams/${valueDiagram.code}/manageFlag`;
                let flagType = '';
                switch (type) {
                    case 'rootJunction':
                        flagType = 'esriDiagramRootJunction'
                        break;
                    case 'PivotJunction':
                        flagType = 'esriDiagramPivotJunction'
                        break;
                    case 'endJunction':
                        flagType = 'esriDiagramEndJunction'
                        break;
                    case 'barrierEdge':
                        flagType = 'esriDiagramBarrierEdge'
                        break;
                    case 'barrierJunction':
                        flagType = 'esriDiagramBarrierJunction'
                        break;
                    default:
                        flagType = 'esriDiagramRootJunction'
                        break;
                }
                const res = await esriRequest(urlManageFlag, {
                    query: {
                        gdbVersion: null,
                        sessionId: null,
                        action: 'add',
                        flagType,
                        flagID: diagramElementId,
                        f: 'json'
                    },
                    responseType: 'json',
                    method: 'get'
                });

                if (res) {
                    // Missing function create graphic
                    await createFlagGraphic()
                }
            }
        });
    }

    const deleteDiagram = async () => {
        if (!valueDiagram) {
            alert('Vui lòng chọn diagram cần xóa');
            return;
        }
        const check = confirm('Xác nhận xóa Diagrams?');
        if (check === false) {
            return;
        }
        const urlDeleteDiagram = `${urlNetworkDiagram}/deleteDiagram`;
        const params = {
            gdbVersion: null,
            sessionId: null,
            name: valueDiagram.code,
            f: 'json'
        }

        const [esriRequest] = await loadArcGISJSAPIModules(["esri/request"]);
        const res = await esriRequest(urlDeleteDiagram, {
            responseType: "json",
            query: params
        });

        console.log(res);

        if (res && res.data) {
            alert('Xóa diagram thành công!');
            await loadDiagram();
            createMap();
        } else {
            alert('Xóa diagram thất bại!');
        }
    }

    return (
        <div className='widget-network-diagrams'>
            <Tooltip target=".prime-tooltip"></Tooltip>
            <div className='group-btn-control'>
                <div className='control-select'>
                    <CoreSelect value={valueDiagram} onChange={onChangeDiagram} dataSource={lookupDiagram}
                        isLabelLeft={true} valueField={null} labelName="List Diagram"></CoreSelect>
                </div>
                <div className='control-btn'>
                    {/* <div className={`icn-tool prime-tooltip ${active === 1 ? "active" : ""}`} style={{ backgroundImage: `url(${SelectFeature})` }}
                        data-pr-tooltip="Select features" onClick={selectFeatures}></div> */}
                    <div className={`icn-tool prime-tooltip ${active === 2 ? "active" : ""}`} style={{ backgroundImage: `url(${NewDiagrams})` }}
                        data-pr-tooltip="Create Diagram" onClick={createDiagram}></div>
                    <div className={`icn-tool prime-tooltip ${active === 3 ? "active" : ""}`} style={{ backgroundImage: `url(${StoreDiagrams})` }}
                        data-pr-tooltip="Store Diagram" onClick={storeDiagram}></div>
                    <div className={`icn-tool prime-tooltip ${active === 4 ? "active" : ""}`} style={{ backgroundImage: `url(${TrashBin})` }}
                        data-pr-tooltip="Delete Diagram" onClick={deleteDiagram}></div>
                </div>
            </div>

            {
                active === 3 &&
                <div className={classNames('store-diagram-group', { 'active': active === 3 })}>
                    <CoreSelect value={diagramAccess} isRequired={true} onChange={onChangeAccess} dataSource={lookupAccess}
                        valueField={null} labelName="Access Type"></CoreSelect>
                    <CoreInput value={diagramName} isRequired={true} onChange={onChangeName} labelName="Name"></CoreInput>
                    <CoreInput value={diagramTag} isRequired={false} onChange={onChangeTag} labelName="Tag"></CoreInput>
                    <div className='footer-btn'>
                        <CoreButton icon="" onClick={runSaveDiagram} labelName="Run"></CoreButton>
                    </div>
                </div>
            }

            <div id="mapDiv" className={classNames('map-inside', { 'active': active === 3 })}>
                <div className='group-container'>
                    <div className={classNames('icn-tool prime-tooltip', !viewDiagram ? 'icn-disabled' : null, { 'active': mapToolActive === 1 })}
                        data-pr-tooltip="Selection" style={{ backgroundImage: `url(${SelectFeature})` }}
                        onClick={() => selectionOnDiagram()}></div>
                    <div className={classNames('icn-tool prime-tooltip', !viewDiagram ? 'icn-disabled' : null)}
                        data-pr-tooltip="Append To Diagram" style={{ backgroundImage: `url(${AppendToDiagram})` }}
                        onClick={() => appendToDiagram()}></div>
                    <div className={classNames('icn-tool prime-tooltip', !viewDiagram ? 'icn-disabled' : null)}
                        data-pr-tooltip="Append To Map" style={{ backgroundImage: `url(${AppendToMap})` }}
                        onClick={() => appendToMap()}></div>
                </div>

                <div className='group-container' style={{ top: '55px' }}>
                    <div className={classNames('icn-tool prime-tooltip', !viewDiagram ? 'icn-disabled' : null, { 'active': mapToolActive === 2 })}
                        data-pr-tooltip="Clear Flag" style={{ backgroundImage: `url(${DeleteImg})` }}
                        onClick={() => clearFlag()}></div>
                    <div className={classNames('icn-tool prime-tooltip', !viewDiagram ? 'icn-disabled' : null, { 'active': mapToolActive === 3 })}
                        data-pr-tooltip="Root Junction" style={{ backgroundImage: `url(${StartPointImg})` }}
                        onClick={() => onSetRootJunction()}></div>
                    <div className={classNames('icn-tool prime-tooltip', !viewDiagram ? 'icn-disabled' : null, { 'active': mapToolActive === 4 })}
                        data-pr-tooltip="Barrier" style={{ backgroundImage: `url(${BarrierImg})` }}
                        onClick={() => onSetBarrier()}></div>
                    <div>
                        <i className="icn-tool pi pi-th-large prime-tooltip" data-pr-tooltip="Layout Group"
                            onClick={openLayoutGroup}></i>

                        {
                            imgLayoutList && isOpenLayoutGroup &&
                            imgLayoutList.map((item, index) => renderImgLayout(item, index))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(NetworkDiagrams);
