/** @jsx jsx */
import { React, AllWidgetProps, jsx } from 'jimu-core'
import { IMConfig } from '../config'
import '../../../styles.scss';                              //icons
import { Button } from 'primereact/button';
import { CoreInput, CoreButton, CoreCheckBox, CoreSelect, CoreColorPicker, CoreDatetime, CoreRadioButton, CoreMessage, CoreSearchBasic, CoreForm, Loader } from '../../../component';
import ThemeService from '../../../component/theme/theme.service';
import { color } from 'jimu-ui/basic/color-picker';
import { useState, useEffect, useRef, useReducer, useLayoutEffect } from 'react';
//import { queryOdata } from '../../../core-esri';
import { OdataParams, QdataParams } from '../../../core-esri/config';
import { JimuMapView, JimuMapViewComponent, loadArcGISJSAPIModules } from 'jimu-arcgis';
import { parse } from 'zipson/lib';
import { mapConfig } from '../../../component/services/mapConfig';
import arcgisservices from '../../../core-esri/arcgisservices';
import requestservice from '../../../core-esri/requestservice';
// import MapView from 'esri/views/MapView';
// import Map from 'esri/Map';
import { Fragment } from 'react';
import { getWhereClause } from '../../../core-esri/common';
import geometry from 'esri/geometry';

//import { zoomToFeature } from '../../../core-esri/utils';

//import MapView from 'esri/views/MapView';

//export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {
export default function Widget(props: AllWidgetProps<IMConfig> & any) {
  //const [load, setLoad] = useState(false);
  const [display, setDisplay] = useState(false);
  const [configApp, setconfigApp] = useState(null);
  const [configWindow, setconfigWindow] = useState(null);
  const [configLayout, setconfigLayout] = useState(null);
  const [urlQuery, setUrlQuery] = useState('');
  const [jimuMapView, setJimuMapView] = useState(null);
  const refForm = useRef(null);
  const [view, setView] = useState(null); // View Map
  const [urlQueryQuyHoach, setUrlQueryQuyHoach] = useState('https://gisun.esrivn.net/server/rest/services/QuyHoachXD/QuyHoachKeHoachSDDCapHuyen2022/MapServer/0');
  const [urlGeometry, setUrlGeometry] = useState('https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer');
  useEffect(() => {
    //setLoad(true);
    loadConfig();
    ThemeService.setActiveTheme();
  }, []);
  let ObjectQuery = new requestservice('sql');

  const loadConfig = async () => {
    //loadconfig application
    let param = {
      url: 'https://coretech.vn:1314/odata/Config/Init?appid=15&userid=1',
      method: 'GET',
      contentType: 'json',
      responseType: 'json'
    };
    let resp = await ObjectQuery.query(param as QdataParams);
    // console.log(resp);
    //console.log(JSON.stringify(resp));
    setconfigApp(resp);
    let paramWindow = {
      url: 'https://coretech.vn:1314/odata/SysCaches/SysCacheWindow/1',
      method: 'GET',
      contentType: 'json',
      responseType: 'json'
    };
    let respwindow = await await ObjectQuery.query(paramWindow as QdataParams);

    //alert(JSON.stringify(configWindow));
    const windowConfig = respwindow.model.config ? parse(respwindow.model.config) : '';
    const layoutConfig = respwindow.model.layout ? (respwindow.model.layout) : '';
    const config = mapConfig(windowConfig);
    setconfigWindow(config);
    // console.log(configWindow);
    setconfigLayout(layoutConfig);
    setUrlQuery(windowConfig.tabs[0][21]);
    //console.log(layoutConfig);
  };

  useLayoutEffect(() => {
    if (jimuMapView) {
      setView(jimuMapView.view);
      const _map: typeof __esri.Map = jimuMapView.view.map;
      const _view: typeof __esri.MapView = jimuMapView.view;
      //event click map
      jimuMapView.view.on('click', res => {
        onIdentify(res.mapPoint, 'esriGeometryPoint');
        //alert ('à');
      });

    }
  }, [jimuMapView])
  const onIdentify = async (mapPoint, geometryType) => {
    jimuMapView.view.graphics.removeAll();
    const param = {
      geometry: mapPoint,
      f: 'json',
      outFields: ['*'],
      outSR: 102100,
      returnGeometry: true,
      geometryType: geometryType
    };
    let ObjectQuery = new requestservice('arcgis');
    const q: QdataParams = { url: urlQuery, params: param }
    const result = await ObjectQuery.query(q);
    //console.log(result);
    if (result.data) {
      refForm.current.onBindData(result.data.features[0].attributes);
      const geo = result.data.features[0].geometry;
      // zoomToFeature(geo,jimuMapView);
      var ring = geo.rings;
      return loadArcGISJSAPIModules([
        'esri/geometry/Polygon', 'esri/Graphic', "esri/geometry/geometryEngine", "esri/rest/geometryService", "esri/rest/support/AreasAndLengthsParameters"
      ]).then(async pg => {
        let Polygon: typeof __esri.geometry.Polygon;
        let Graphic: typeof __esri.Graphic;
        let GeometryEngine: typeof __esri.geometryEngine;
        let GeometryService: typeof __esri.geometryService;
        let AreasAndLengthsParameters: typeof __esri.AreasAndLengthsParameters;


        [Polygon, Graphic, GeometryEngine, GeometryService, AreasAndLengthsParameters] = pg;

        const polygon = new Polygon({
          hasZ: true,
          hasM: true,
          rings: ring,
          spatialReference: jimuMapView.view.spatialReference,

        });
        let symbol: any = {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          //color: "red",
          outline: {  // autocasts as new SimpleLineSymbol()
            color: [21, 255, 255, 255],
            width: "2px"
          }
        };
        const gra = new Graphic({
          geometry: polygon,
          symbol: symbol,
        });
        jimuMapView.view.graphics.add(gra);
        // const featureQuyHoachs = await this.queryQuyHoach(polygon);
        // console.log(featureQuyHoachs);
        const areasAndLengthParams = new AreasAndLengthsParameters({
          areaUnit: "square-meters",
          lengthUnit: "meters",
          polygons: [polygon]
        });
        GeometryService.areasAndLengths(urlGeometry, areasAndLengthParams).then((result: any) => {
          console.log("area: ", result.areas[0]);
          console.log("length: ", result.lengths[0]);
        });
        const param = {
          geometry: polygon,
          f: 'json',
          outFields: ['*'],
          outSR: 102100,
          returnGeometry: true,
          geometryType: 'esriGeometryPolygon'
        };
        let ObjectQuery = new requestservice('arcgis');
        const q: QdataParams = { url: urlQueryQuyHoach, params: param }
        const result = await ObjectQuery.query(q);
        //  console.log(result);
        if (result.data) {
          // const geo1 = geo;
          const polygon = new Polygon({
            rings: geo.rings,
            spatialReference: jimuMapView.view.spatialReference,
          });
          const geo1 = polygon;

          for (let index = 0; index < result.data.features.length; index++) {
            let geo2: any = [];
            const element = result.data.features[index];
            let g = element.geometry;
            const polygon = new Polygon({
              rings: g.rings,
              spatialReference: jimuMapView.view.spatialReference,
            });
            geo2.push(polygon);
            const resultKetqua: any = GeometryEngine.intersect(geo2, geo1);
            //console.log(resultKetqua);
            if (resultKetqua.length > 0) {
              for (let index = 0; index < resultKetqua.length; index++) {
                const geo = resultKetqua[index];
                if (geo == null) return;
                const polygon1 = new Polygon({
                  rings: geo.rings,
                  spatialReference: jimuMapView.view.spatialReference,
                });
                const gra = new Graphic({
                  geometry: polygon1,
                  symbol: symbol,
                });
                const areasAndLengthParams = new AreasAndLengthsParameters({
                  areaUnit: "square-meters",
                  lengthUnit: "meters",
                  polygons: [polygon1]
                });
                GeometryService.areasAndLengths(urlGeometry, areasAndLengthParams).then((result: any) => {
                  console.log("area: ", result.areas[0]);
                  console.log("length: ", result.lengths[0]);
                  console.log("length: ", element.attributes);
                });
                jimuMapView.view.graphics.add(gra);
                // const param = {
                //   geometry: gra.geometry,
                //   f: 'json',
                //   outFields: ['*'],
                //   outSR: 102100,
                //   returnGeometry: true,
                //   spatialRel: 'esriSpatialRelWithin',
                //   geometryType: 'esriGeometryPolygon'
                // };
                // let ObjectQuery = new requestservice('arcgis');
                // const q: QdataParams = { url: urlQueryQuyHoach, params: param }
                // const resultQuyHoach = await ObjectQuery.query(q);
                // console.log(resultQuyHoach);
                // for (let index = 0; index < resultQuyHoach.data.features.length; index++) {
                //   const element = resultQuyHoach.data.features[index];
                //   const areasAndLengthParams = new AreasAndLengthsParameters({
                //     areaUnit: "square-meters",
                //     lengthUnit: "meters",
                //     polygons: [element.geometry]
                //   });

                //   GeometryService.areasAndLengths(urlGeometry, areasAndLengthParams).then((result: any) => {
                //     console.log("area: ", result.areas[0]);
                //     console.log("length: ", result.lengths[0]);
                //     console.log(element.attributes);
                //   });

                // }
              }

              // query dữ liệu quy hoạch

            }
          }
          // result.data.features.forEach(fea => {

          // });

        }

      });
    }
  }
  // const queryQuyHoach = async(geometry) =>
  // {

  //   return result.data.features;
  // }
  const onSearch = async (e) => {
    setDisplay(true);
    ObjectQuery = new requestservice('arcgis');
    const p = getWhereClause(e, configWindow.tabs[0].fields);
    const q = { url: urlQuery, where: p.where };
    const result = await ObjectQuery.search(q);
    console.log(result);
    if (result.features.length > 0) {
      if (jimuMapView) {
        jimuMapView.view.graphics.removeAll();
      }
      refForm.current.onBindData(result.features[0]);
      const geo = result.features[0].__geometry;
      // zoomToFeature(geo,jimuMapView);
      var ring = geo.rings;
      return loadArcGISJSAPIModules([
        'esri/geometry/Polygon', 'esri/Graphic'
      ]).then(pg => {
        let Polygon: typeof __esri.geometry.Polygon;
        let Graphic: typeof __esri.Graphic;
        [Polygon, Graphic] = pg;

        const polygon = new Polygon({
          hasZ: true,
          hasM: true,
          rings: ring,
          spatialReference: view.spatialReference,

        });
        let symbol: any = {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          //color: "red",
          outline: {  // autocasts as new SimpleLineSymbol()
            color: [21, 181, 74, 255],
            width: "2px"
          }
        };
        const gra = new Graphic({
          geometry: polygon,
          symbol: symbol,
        });
        view.graphics.add(gra);
        //const _view: any = view;
        view.goTo({
          target: polygon,
          zoom: 20
        });
        setDisplay(false);
      });
    }
  }
  const onClear = (e) => {
    refForm.current.onClearResult();
    view.graphics.removeAll();
  }
  const config = {
    FOREIGNTABLE: 'https://water.esrivn.net/CoreTechApi/odataquotation/COMPANYs',
    SERVICE_TYPE: 'SQL',
    COLUMNCODE: 'CompanyId',
    COLUMNDISPLAY: 'CompanyName'
  }
  // Kiểm tra Map
  const isMapConfigured = () => {
    return props.useMapWidgetIds && props.useMapWidgetIds.length === 1;
  }
  // Set MapView

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) setJimuMapView(jmv);
  };

  // View Map
  const ViewMap = () => {
    return (
      <div>
        {isMapConfigured() &&
          <Fragment>

            <JimuMapViewComponent
              useMapWidgetId={props.useMapWidgetIds?.[0]}
              onActiveViewChange={activeViewChangeHandler}
            />
          </Fragment>
        }
      </div>
    )
  }

  return (
    <div className="widget-demo jimu-widget m-2">
      <ViewMap />
      <Loader display={display} ></Loader>
      <div  >
        {/* {configWindow && configLayout && <CoreSearchBasic configWindow={configWindow} onOkCallBack={(e) => onSearch(e)} onClearCallBack ={onClear} configLayout={configLayout} configApp={configApp} isLabelLeft={true}></CoreSearchBasic>} */}
        {configWindow && configLayout && configApp && <CoreForm fieldConfig={configWindow.tabs[0].fields} layoutConfig={configLayout}
          lookupData={configApp.sys_combo} tabId={configWindow.tabs[0].tabid} isLabelLeft={true} isLabelBorder={true}
          onOkCallBack={(e) => onSearch(e)} onClearCallBack={onClear} mode='search' labelWidth="120px" isDisplayClear={false} isRequire={true} isDisplaySearch={false}></CoreForm>
        }
      </div>
      <div >
        {configWindow && configLayout && configApp && configWindow && <CoreForm fieldConfig={configWindow.tabs[0].fields} layoutConfig={configLayout} ref={refForm}
          lookupData={configApp.sys_combo} tabId={configWindow.tabs[0].tabid} isLabelLeft={true} labelWidth="90px"  isLabelBorder={true}
          onOkCallBack={(e) => onSearch(e)} onClearCallBack={onClear} mode='form' isDisplayClear={true} isDisplaySearch={true} isRequire={false} ></CoreForm>}
      </div>

    </div>
  )

}

