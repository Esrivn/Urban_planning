/** @jsx jsx */
import { React, AllWidgetProps, jsx } from 'jimu-core'
import { IMConfig } from '../config'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";
import { Dropdown } from 'primereact/dropdown';
import '../style/style.scss';
import '../style/GloableStyles.scss'
import '../style/dropdown.scss'
import '../style/tab-view.scss'
import '../../../styles.scss';
import ThemeService from '../../../component/theme/theme.service';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import esriRequest from '../service/esri-request';
import { JimuMapView, JimuMapViewComponent, loadArcGISJSAPIModules } from 'jimu-arcgis';
import MapView from 'esri/views/MapView';
const { useState, useEffect, useLayoutEffect, useRef, Fragment } = React;
import { parse } from 'zipson/lib';
import { CoreForm, CoreInput, CoreButton, CoreCheckBox, CoreSelect, CoreColorPicker, CoreDatetime, CoreRadioButton, CoreMessage, Loader } from '../../../component';
import { mapConfig } from '../../../component/services/mapConfig';
import {esriRequest1, printTask, printTask1, queryData, addGraphicFill, addGraphicSampleLine, clearGraphic } from '../service/esri-request';
import requestservice from '../../../core-esri/requestservice';
import { OdataParams, QdataParams } from '../../../core-esri/config';
import * as XLSX from "xlsx";
import * as FileSaver from 'file-saver';
import close_icon from '../assets/close_icon.png';
import back from '../assets/back.png';
import { arrTypeLand } from './typeLand';
import { Button } from 'primereact/button'
import { hooks } from 'jimu-ui';
import defaultMessages from './translations/default'; 


import MyIcon from '../assets/image';
import marker_icon from '../assets/images/marker_icon.png';
import pin_00 from '../assets/drawable-mdpi/pin_00.png';
import pin_01 from '../assets/drawable-mdpi/pin_01.png';
import pin_02 from '../assets/drawable-mdpi/pin_02.png';
import pin_03 from '../assets/drawable-mdpi/pin_03.png';
import pin_04 from '../assets/drawable-mdpi/pin_04.png';
import pin_05 from '../assets/drawable-mdpi/pin_05.png';
import pin_06 from '../assets/drawable-mdpi/pin_06.png';
import pin_07 from '../assets/drawable-mdpi/pin_07.png';
import pin_08 from '../assets/drawable-mdpi/pin_08.png';
import pin_09 from '../assets/drawable-mdpi/pin_09.png';
import pin_10 from '../assets/drawable-mdpi/pin_10.png';
import pin_11 from '../assets/drawable-mdpi/pin_11.png';
import pin_12 from '../assets/drawable-mdpi/pin_12.png';
import pin_13 from '../assets/drawable-mdpi/pin_13.png';
import pin_14 from '../assets/drawable-mdpi/pin_14.png';
import pin_15 from '../assets/drawable-mdpi/pin_15.png';
import pin_16 from '../assets/drawable-mdpi/pin_16.png';
import pin_17 from '../assets/drawable-mdpi/pin_17.png';
import pin_18 from '../assets/drawable-mdpi/pin_18.png';
import pin_19 from '../assets/drawable-mdpi/pin_19.png';
import pin_20 from '../assets/drawable-mdpi/pin_20.png'


function Widget(props: AllWidgetProps<any>) {
  const [display, setDisplay] = useState(false);
  const [cboDistrict, setcboDistrict] = useState(null);
  const [cboSubdistrict, setcboSubdistrict] = useState(null);
  const [raidoTypeMap, setRaidoTypeMap] = useState('digitalMap');
  const [piecesPaper, setPiecesPaper] = useState('');
  const [numberPlots, setNumberPlots] = useState('');
  const [arrCboDistrict, setArrCboDistrict] = useState(null);
  let [arrDistric, setArrDistric] = useState([]);
  let [arrSubDistric, setSubArrDistric] = useState([]);
  let [arrSubDistric1, setArrSubDistric1] = useState([]);
  const [jimuMapView, setJimuMapView] = useState(null);
  const [view, setView] = useState(null); // View Map
  const [txtAddress, setTxtAdress] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const { urlDistric, urlSubdistric, arrUrlMap, Cadastral, scale, urlGeocodeServer, project, urlGeometry, Urban,QuyHoachXayDung } = props.config.layerUrls;
  const [arrYear, setArrYear] = useState([]);
  const [cboYear, setCboYear] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showResultsPacel, setShowResultsPacel] = useState(false);
  const [showResultsPacelPlanning, setShowResultsPacelPlanning] = useState(false);
  const [showResultsPacelPacel, setShowResultsPacelPacel] = useState(false);
  const [showResultsDetail, setShowResultsDetal] = useState(false);
  const [fieldList, setFieldList] = useState([]); // Danh sách field hiển thị
  const [arrFieldListPlanning, setArrFieldListPlanning] = useState([]);
  const [arrFieldList, setArrFieldList] = useState([]);
  const [arrFieldListDetail, setArrFieldListDetail] = useState([]);
  const [arrCoorDinate, setArrCoorDinate] = useState([1, 2, 3, 4]);
  const [valCoorDinateX, setValCoorDinateX] = useState({});
  const [valCoorDinateY, setValCoorDinateY] = useState({});
  const [layOutConfig, setLayOutConfig] = useState(null);
  const [fieldConfig, setFieldConfig] = useState([]) as any;
  const [currentValue, setCurrentValue] = useState(null); // Giá trị hiện tại của các control đang được khởi tạo
  const [arrCurrentValue, setArrCurrentValue] = useState(null);
  const [infoPacel, setInfoPacel] = useState(null);
  const [loading, setLoading] = useState(Boolean);
  const [showHideResultAdr, setShowHideResultAdr] = useState(true);
  const [arrResultAdress, setArrResultAdress] = useState([]);
  const [dataProject, setDataProject] = useState(null);
  const [dataUrbanPacel, setDataUrbanPacel] = useState([]);
  const [isPacel, setIsPacel] = useState(false);
  const [information, setinformation] = useState(null);

  const messagesAppRef: React.MutableRefObject<any> = useRef();

  const formRef = useRef() as any;
  const nls = hooks.useTranslate(defaultMessages)



  useEffect(() => {
    onLoadDistric();
    onLoadSubDistric();
    arrCoorDinate.forEach((val, index) => {
      valCoorDinateX[index] = null;
      valCoorDinateY[index] = null;
    })
    onLoadConfig();
    ThemeService.setActiveTheme();
  }, [])

  useLayoutEffect(() => {
    if (jimuMapView) {
      setView(jimuMapView.view);
      const _view: MapView = jimuMapView.view;
      _view.on('click', res => {
        onIdentifyUrban(res.mapPoint); 

      });
      onloadMap();
    }
  }, [jimuMapView])

  async function onloadMap() {
    let arr = [];
    arrUrlMap.forEach(element => {
      if (element.year !== null && element.year !== '') {
        arr.push({
          code: element.year,
          descr: element.year,
          item: element
        });
      }
    });
    setCboYear(arr[0]);
    setArrYear(arr);
    let e = { value: arr[0] };
    onCboYearChange(e);
  }

  const onLoadConfig = () => {
    esriRequest('https://coretech.vn:1314/odata/SysCaches/SysCacheWindow/2', {}, 'GET', res => {
      // console.log(res);
      if (res.success) {
        let windowConfig = res.model.config ? parse(res.model.config) : '';
        let layoutConfig1 = res.model.layout ? res.model.layout : '';

        const config = mapConfig(windowConfig);
        setFieldConfig(config.tabs[0].fields);
        setLayOutConfig(layoutConfig1);
        const tab = config.tabs[0];
        const where = tab.whereclause ? JSON.parse(tab.whereclause) : [];
        const Information = {
          TAB_ID: tab.tabid,
          PARENT_ID: tab.parenttabid,
          TABLE_ID: tab.tableid,
          DESCR: tab.tabname,
          TAB_LEVEL: tab.tablevel !== null ? tab.tablevel.toString() : '0',
          TAB_MAX_LEVEL: tab.maxLevel,
          TABLE_DETAIL: tab.tabledetail,
          SEQ_NO: tab.orderno ? tab.orderno.toString() : null,
          DEFAULT_WHERE: where,
          IS_LIENKETDOHOA: 'N',
          IS_SINGLE_LINE_EDIT: tab.issingglelineedit,
          IS_TAB_TRUNG_GIAN: tab.istabtrunggian === 'Y',
          KHOA_CHINH: tab.columnkey,
          TRUONG_LK_CON: tab.truonglienketcon,
          TRUONG_LK_CHA: tab.truonglienketcha,
          TRUONG_LKTG_CON: tab.truongtrunggiancon,
          TRUONG_LKTG_CHA: tab.truongtrunggiancha,
          BANG_CHA: tab.banglienket,
          BANG_LK: tab.bangtrunggian,
          KHOA_CHINH_BANG_LK: tab.columnkeytrunggian,
          WHERE: (tab.tablevel === 0 && tab.orderno === 1 || tab.parenttabid === null) ? [] : null,
          TABLE_NAME: tab.tablename,
          URL_EDIT: tab.urledit,
          URL_VIEW: tab.urlview,
          URL_EDIT_MAP: tab.urleditdohoa,
          URL_VIEW_MAP: tab.urlviewdohoa,
          LAYOUT_COLUMN: tab.layoutcolumn,
          PARENT_DATA: null,
          SERVICE_TYPE: tab.tabletype,
          // WINDOW_ID: this.windowId,
          FILTER_FIELD: tab.fillterfield,
          FILTER_DEFAULT_VALUE: tab.fillterdefaultvalue,
          ORDER_BY: tab.orderbyclause ?? null,
          INIT_SHOW: tab.initshow === 'Y',
          ONCHANGE: tab.onchange,
          COLUMN_DOHOA: tab.columndohoa, // chưa thấy sử dụng
          COLUMN_CODE: tab.columncode, // Sử dụng để filter nhanh
          TABLEWORKFLOWID: tab.tableworkflowId,
          JOBTYPEIDS: tab.jobtypeids,
          LAYERINDEX: tab.layerindex,
          HASATTACHMENT: tab.hasattachment,
          KVHC_COLUMN: tab.kvhccolumn,
          ColumnWorkflow: tab.columnworkflow,
          ColumnLinkLayer: tab.columnlinklayer
        };
        setinformation(Information);


        // this.tabId = config.tabs[0].tabid;
        // console.log(windowConfig);
        // this.windowConfig = res.model.config ? parse(res.model.config) : null;
      }
    }, err => {
      console.log(err);
    });
  }

  const onIdentify = async (mapPoint, geometryType, spatialRel, isClearGrapLocator?: boolean) => {
    isClearGrapLocator ? clearGraphic('graph_locator', jimuMapView) : ''
    jimuMapView.view.graphics.removeAll();
    setIsPacel(false);
    setArrFieldList([])
    setDataUrbanPacel([])
    setDataProject(null)
    const arrValue = [];
    console.log(scale);
    const param = {
      geometry: mapPoint,
      f: 'json',
      outFields: ['*'],
      outSR: 102100,
      returnGeometry: true,
      spatialRel: spatialRel,
      geometryType: geometryType
    };
    esriRequest(Cadastral.url + '/query', param, "GET", async res => {
      console.log(res);
      if (res.features.length > 0) {
        setShowResults(true);
        setShowResultsPacel(true)
        setShowResultsPacelPacel(true);
        const results = res.features[0];
        const attribute = res.features[0].attributes;
        setInfoPacel(results);
        setIsPacel(true);
        hightLightPolyGon(results.geometry.rings);
        res.fields.forEach(element => {
          const f = Cadastral.field.filter(fill => fill === element.name);
          if (f[0]) {
            element.isShow = true;
          } else {
            element.isShow = false;
          }

          if (Cadastral.areaField) {
            if (Cadastral.areaField === element.name) {
              element.areaField = true
            }
          }
        });

        arrValue.push({
          title: "CurrentLand",
          field: res.fields,
          value: attribute,
          isUrban: false
        });

        const info = {
          isHasPacel: true,
          results: results,
          arrValue: arrValue
        }
        setArrFieldList(arrValue);
        onIdentifyQH(results.geometry)

        // onIdentifyUrban(info); 
        queryProject(results)
      } else {
        messagesAppRef.current.getMessages('info','Không có thông tin thửa đất');
      }
    }, err => {
      console.log(err);
    });
  }

  const  onIdentifyUrban = async (mapPoint?) => {
    jimuMapView.view.graphics.removeAll();
    setShowResultsPacelPlanning(false)
    setShowResultsPacelPacel(false)
    setArrFieldListPlanning([])
    let arrValue = [];
    const scaleMap = jimuMapView.view.scale;
    let arrSale = [];
    Object.keys(scale).forEach(key => {
      arrSale.push(Number(key));
    });
    let scaleConfig: any = null;
    let arrTG = [];
    console.log('Scale Map',scaleMap);
    
    for (let index = 0; index < arrSale.length; index++) {
      // if (scaleMap >= 100000) {
      //   scaleConfig = 100000
      //   console.log("value scale",scaleConfig);
      //   break
      // } else
      if (scaleMap <= 2000) {
        scaleConfig = 2000
        console.log("value scale",scaleConfig);
        break
      } else
        if (arrSale[index] <= scaleMap &&  scaleMap <= arrSale[index + 1]) {
          arrTG.push(arrSale[index]);
          scaleConfig = arrSale[index];
          console.log("value scale",scaleConfig);
          break
        }
    }

    // scaleConfig = arrTG[arrTG.length-1];
    console.log("value scale", arrTG);
    let arrConfigLayer:any = [];
    scaleConfig !== null ? arrConfigLayer = scale[scaleConfig] : '';
    if (arrConfigLayer.isPacel) {
        onIdentify(mapPoint, 'esriGeometryPoint', 'esriSpatialRelIntersects', true);
    } else {
        setShowResults(true);
        setShowResultsPacel(true);
        setShowResultsPacelPlanning(true)
      let arrUrlMap = [];
      arrConfigLayer.forEach(item => {
        arrUrlMap.push(item.url)
      });
  
      const param = {
        geometry: mapPoint,
        f: 'json',
        outFields: ['*'],
        outSR: 102100,
        returnGeometry: true,
        geometryType: 'esriGeometryPoint'
      };
  
      let arr = arrUrlMap.map((url) => { return esriRequest1(url + '/query', param, 'GET') });      
      setDisplay(true);
      const results = await Promise.all(arr);
      setDisplay(false);

      console.log(results);
      results.forEach((res: any) => {
        if (res.data && res.data.features.length > 0) {
          const value = res.data.features[0];
          let title = null;
          let color = null;
          const a = arrConfigLayer.filter(fill => fill.url + '/query' === res.url);
          if (a[0]) {
            title = a[0].name;
            color = a[0].color
            res.data.fields.forEach(element => {
              const f = a[0].field.filter(fill => fill === element.name);
              if (f[0]) {
                element.isShow = true;
              } else {
                element.isShow = false;

              }
            });
          }
          
          arrValue.push({
            value: value,
            field: res.data.fields,
            title: title,
            color: color,
            isUrban: true
          });
          hightLightPolyGon(value.geometry.rings);
        }
      });

      setArrFieldListPlanning(arrValue);
    }
  }

  const queryProject = async (results) => {
    const [Polygon ] = await loadArcGISJSAPIModules([
      'esri/geometry/Polygon'
    ]);
    const polygon = new Polygon({
      hasZ: true,
      hasM: true,
      rings: results.geometry.rings,
      spatialReference: { wkid: 102100 }
    });
    queryData(project.url + '/query', polygon, 'esriGeometryPolygon', 'esriSpatialRelIntersects', async res => {
      if (res.features.length > 0) {
        if (project.domain) {
          const arrFielDomain = project.domain.fields;
          const arrDomainName = project.domain.domainName;  
          let obj = {};
          const params = {
            layers: JSON.stringify([project.layer]),
            f: 'pjson'
          };
          const domain = await esriRequest1(project.domain.url + '/queryDomains',params, 'GET');
          if (domain.data) {
            let arrDomain = domain.data.domains;
            arrDomainName.forEach(item => {
              const domainField =  arrDomain.filter(fill => fill.name === item);
              if (domainField[0]) {
                obj[item] = domainField[0].codedValues
              }
            });
          }

          console.log(obj);
          res.domain = obj
          setDataProject(res);
        }else {
          setDataProject(res);

        }

      }
    }, err => {
      console.log(err);
    })
  }


  const onIdentifyQH = async (geoPacel) => {
    const [PictureMarkerSymbol, TextSymbol] = await loadArcGISJSAPIModules(['esri/symbols/PictureMarkerSymbol', 'esri/symbols/TextSymbol'])
    let arrDataPacel = [];
    setDataUrbanPacel([])
    setDisplay(true);
    // setDataUrbanPacel(arrDataPacel)
    jimuMapView.view.graphics.removeAll();
    // const param = {
    //   geometry: mapPoint,
    //   f: 'json',
    //   outFields: ['*'],
    //   outSR: 102100,
    //   returnGeometry: true,
    //   geometryType: geometryType
    // };
    // let ObjectQuery = new requestservice('arcgis');
    // const q: QdataParams = { url: urlQuery, params: param }
    // const result = await ObjectQuery.query(q);
    //console.log(result);
    // if (result.data) {
    // refForm.current.onBindData(result.data.features[0].attributes);
    const geo = geoPacel;
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
        color: "green",
        outline: {  // autocasts as new SimpleLineSymbol()
          color: [21, 255, 255, 255],
          width: "2px"
        }
      };
      const gra = new Graphic({
        geometry: polygon,
        symbol: symbol,
      });
      // jimuMapView.view.graphics.add(gra);
      // const featureQuyHoachs = await this.queryQuyHoach(polygon);
      // console.log(featureQuyHoachs);
      // const areasAndLengthParams = new AreasAndLengthsParameters({
      //   areaUnit: "square-meters",
      //   calculationType: "geodesic",
      //   lengthUnit: "meters",
      //   polygons: [polygon]
      // });
      // GeometryService.areasAndLengths(urlGeometry, areasAndLengthParams).then((result: any) => {
      //   console.log("area thua dat bd: ", result.areas[0]);
      //   console.log("length: ", result.lengths[0]);
      // });
      const param = {
        geometry: polygon,
        f: 'json',
        outFields: ['*'],
        outSR: 102100,
        returnGeometry: true,
        geometryType: 'esriGeometryPolygon'
      };
      let ObjectQuery = new requestservice('arcgis');
      const q: QdataParams = { url: Urban.url, params: param }
      const result = await ObjectQuery.query(q);
      //  console.log(result);

      if (result.data) {
        // const geo1 = geo;
        const polygon = new Polygon({
          rings: geo.rings,
          spatialReference: jimuMapView.view.spatialReference,
        });
        const geo1 = polygon;
        let arrGeometryService = [];
        let countIndex = 0;
        for (let index1 = 0; index1 < (result.data.features.length <= 15 ? result.data.features.length : 0) ; index1++) {
          let geo2: any = [];
          const element = result.data.features[index1];
          let g = element.geometry;
          const polygon = new Polygon({
            rings: g.rings,
            spatialReference: jimuMapView.view.spatialReference,
          });
          geo2.push(polygon);
          const resultKetqua: any = GeometryEngine.intersect(geo2, geo1);
            for (let index = 0; index < resultKetqua.length; index++) {
              const geo = resultKetqua[index];
              if (geo !== null) {
                countIndex++
                const polygon1 = new Polygon({
                  rings: geo.rings,
                  spatialReference: jimuMapView.view.spatialReference,
                });
  
                let symbol1: any = {
                  type: "simple-line",  // autocasts as new SimpleFillSymbol()
                  // color: "red",
                  outline: {  // autocasts as new SimpleLineSymbol()
                    color: "black",
                    width: "4px"
                  }
                };
                const gra1 = new Graphic({
                  geometry: polygon1,
                  symbol: symbol1,
                });
  
                let picSymbol: any = {
                  type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                  url: getUrlIcon(countIndex),
                  width: "35px",
                  height: "42px"
                };
  
                const graphic_picture = new Graphic({
                  geometry: polygon1,
                  symbol: picSymbol,
                });
  
                // let textSymbol = {
                //   type: "text",
                //   color: "black",
                //   haloColor: "black",
                //   haloSize: "1px",
                //   text: index1 + 1,
                //   xoffset: "0px",
                //   yoffset: "-2px",
                //   font: {
                //     size: 12,
                //     family: "Arial",
                //     // weight: "bold"
                //   }
                // };
  
                // const graphic_textSymbol = new Graphic({
                //   geometry: polygon1,
                //   symbol: textSymbol,
                // });
  
  
                jimuMapView.view.graphics.add(gra1);
                jimuMapView.view.graphics.add(graphic_picture);
                // jimuMapView.view.graphics.add(graphic_textSymbol);
  
                const areasAndLengthParams = new AreasAndLengthsParameters({
                  areaUnit: "square-meters",
                  calculationType: "geodesic",
                  lengthUnit: "meters",
                  polygons: [polygon1]
                });
                arrGeometryService.push(GeometryService.areasAndLengths(urlGeometry, areasAndLengthParams));
                  let typeLand = '';
                  let codeColor = '';
                  arrTypeLand.forEach(item => {
                    if (item.maDat === element.attributes.mucDichSuDungQH) {
                      typeLand = item.mota;
                      codeColor = item.ma;
                    }
                  })
  
                  arrDataPacel.push({
                    index: index1,
                    typeLandDescr: typeLand,
                    codeColor: codeColor,
                    element,
                    rings:  geo.rings
                  })
              }
                // setDisplay(false);  
                // return;
              }
              
        }
        let arr = [];
        const resultsAll = await Promise.all(arrGeometryService);
        resultsAll.forEach((area, index) => {
          arr.push({
            area: area.areas[0],
            index: index,
            typeLandDescr: arrDataPacel[index].typeLandDescr,
            codeColor: arrDataPacel[index].codeColor,
            element: arrDataPacel[index].element,
            rings: arrDataPacel[index].rings
          })
        })
        setDisplay(false);  
        setDataUrbanPacel(arr);
      } else {
        setDisplay(false);  
      }
    });
    // }
  }

  const getUrlIcon = (index) => {
    let url ='';
    switch (index){
      case 1:
        url= pin_01;
        break;
      case 2:
        url= pin_02;
        break;
      case 3:
        url= pin_03;
        break;
      case 4:
        url= pin_04;
        break;
      case 5:
        url= pin_05;
        break;
      case 6:
        url= pin_06;
        break;
      case 7:
        url= pin_07;
        break;
      case 8:
          url= pin_08;
          break;
      case 9:
        url= pin_09;
        break;
      case 10:
        url= pin_10;
        break;
      default:
        url = pin_00;
    } 
    return url  
  }

  const hightLightPolyGon = async (rings, zoom?, isClear?) => {
    isClear ? jimuMapView.view.graphics.removeAll() : '';
    const [Graphic, Polygon] = await loadArcGISJSAPIModules([
      'esri/Graphic',
      'esri/geometry/Polygon'
    ]);
    const polygon = new Polygon({
      hasZ: true,
      hasM: true,
      rings: rings,
      spatialReference: jimuMapView.view.spatialReference
    });

    // jimuMapView.view.extent = polygon.extent
    if (zoom) {
      jimuMapView.view.goTo({
        target: polygon,
        zoom: zoom
      }, {
        animate: true,
        duration: 1000
      });
    }
   
    let polylineSymbol = {
      type: "simple-line",
      color: [0 , 0, 255],
      width: 2
    };

    let polylineGraphic = new Graphic({
      geometry: polygon,
      symbol: polylineSymbol
    });

    jimuMapView.view.graphics.add(polylineGraphic);
  }

  const hightLightFillPolyGon = async (rings, levelZoom?, isClearGraphic?) => {
    isClearGraphic ? jimuMapView.view.graphics.removeAll()  : ''
    const [
      Graphic, Polygon

    ] = await loadArcGISJSAPIModules([
      'esri/Graphic',
      'esri/geometry/Polygon'
    ]);
    const polygon = new Polygon({
      hasZ: true,
      hasM: true,
      rings: rings,
      spatialReference: { wkid: 102100 }
    });

    const _view: MapView = view;
    _view.goTo({
      target: polygon,
      zoom: levelZoom
    }, {
      animate: true,
      duration: 1000
    });


    let polylineSymbol = {
      type: "simple-line",
      color: [0 , 0, 255],
      width: 2
    };

    let symbol: any = {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: [102, 153, 255, 0.25],
      outline: { 
        color: [21, 255, 255, 255],
        width: "2px"
      }
    };

    let polylineGraphic = new Graphic({
      geometry: polygon,
      symbol: symbol
    });

    jimuMapView.view.graphics.add(polylineGraphic);
  }

  const onDistricChange = async (e) => {
    const val = e.target ? e.target.value : e.value;
    setcboDistrict(val);
    if (e.value !== null && e.value !== undefined) {
      const codeDistric = e.value.code;
      const f= arrDistric.filter(fill => fill.attributes.maHuyen === codeDistric);
      if (f[0]){
        var ring = f[0].geometry.rings;
        hightLightPolyGon(ring, 12, true)

        let arrSubDT = [];
        arrSubDistric1.forEach(ele => {
          if (ele.attributes.maHuyen === codeDistric) {
            arrSubDT.push({
              code: ele.attributes.maXa,
              descr: ele.attributes.tenXa
            });
          }
        });
        setSubArrDistric(arrSubDT);
      }
    } else if(e.value !== null &&  e.value.code === 'ALL'){
      setSubArrDistric([]);
    }
  }

  const onSubdistricChange = async (e) => {
    const val = e.target ? e.target.value : e.value;
    setcboSubdistrict(val);
    if (e.value !== null && val !== undefined) {
      const codeDistric = e.value.code;
      const f= arrSubDistric1.filter(fill => fill.attributes.maXa === codeDistric);
      if (f[0]){
        var ring = f[0].geometry.rings;
        hightLightPolyGon(ring, 14, true);
      }
    }
  }

  const isMapConfigured = () => {
    return props.useMapWidgetIds && props.useMapWidgetIds.length === 1;
  }

  const ViewMap = () => {
    return (
      <div>
        {isMapConfigured() &&
          <JimuMapViewComponent
            useMapWidgetId={props.useMapWidgetIds?.[0]}
            onActiveViewChange={activeViewChangeHandler}
          />
        }
      </div>
    )
  }

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) setJimuMapView(jmv);
  };

  async function onCboYearChange(e) {
    setCboYear(e.value);
    if (e.value !== null && e.value !== undefined) {
      const [Map, MapView, TileLayer] = await loadArcGISJSAPIModules(['esri/Map', 'esri/views/MapView', 'esri/layers/TileLayer']);
      let layer = new TileLayer(
        {
          url: e.value.item.urlTileCache
        });
      // layer.opacity = 0.5;
    //  jimuMapView.view.map.add(layer);
    }
   

  }
  const onRadioTypeMap = (e) => {
    setRaidoTypeMap(e.value)
  }

  const onClickReset = () => {
    console.log('reset')
    const obj = { 0: '', 1: '', 2: '', 3: '' };
    console.log(valCoorDinateX);
    
    setValCoorDinateX(obj);
    setValCoorDinateY(obj);
    setArrCoorDinate([1, 2, 3, 4]);

  }

  const onLoadDistric = () => {
    const param = {
      where: "1=1",
      f: 'json',
      outFields: ['*'],
      outSR: 102100,
      returnGeometry: true
    };

    esriRequest(urlDistric + '/query', param, 'GET', res => {
      if (res) {
        let arrDistric = [{
          code: 'ALL',
          descr: "Quận/ Huyện",
          // item: null
        }];
        res.features.forEach(element => {
          arrDistric.push({
            descr: element.attributes.tenHuyen,
            code: element.attributes.maHuyen,
            // item: element
          });
        });
        setArrDistric(res.features);
        setcboDistrict(arrDistric[0]);
        setArrCboDistrict(arrDistric);
      }
    }, err => {

    });
  }

  const onLoadSubDistric = () => {
    const param = {
      where: "1=1",
      f: 'json',
      outFields: ['*'],
      returnGeometry: true,
      outSR: 102100
    };

    esriRequest(urlSubdistric + '/query', param, 'GET', res => {
      if (res) {
        let arrSubDistric = [{
          descr: 'Phường/Xã',
          code: "ALL",
          item: null
        }];
        setArrSubDistric1(res.features);
      }
    }, err => {
      console.log(err);

    });
  }

  const onChangeAdress = (e) => {
    setTxtAdress(e);
    if (e !== null && e !== "") {
     setShowHideResultAdr(false)
      const params = {
        maxSuggestions: 6,
        outSR: { "latestWkid": 3857, "wkid": 102100 },
        text: e,
        f: 'json'
      }
      setLoading(true)
      esriRequest(urlGeocodeServer, params, 'GET', res => {
        console.log(res);
        setLoading(false)
        setArrResultAdress(res.suggestions);
      })
    } else {
     setShowHideResultAdr(true)
    }
  }

  const onSearchParcel = async (e) => {
    setDataUrbanPacel([])
    setIsPacel(false)
    let valeForm = '';
    const val = formRef.current.onSearch();
    Object.keys(val).forEach(key => {
      console.log(key);
      valeForm = valeForm + key + ` = '${val[key]}' and `
    });
    
    if (valeForm.length > 0) {
      valeForm = valeForm.substring(0, valeForm.length - 4)
    }
    if (cboDistrict !== null && cboDistrict !== undefined && cboSubdistrict !== null && cboSubdistrict !== undefined && valeForm !== '')  {
      const url = Cadastral.url + '/query';
      const wherSearch = `maHuyen = '${cboDistrict.code}' and maXa = '${cboSubdistrict.code}' and ${valeForm}`;
      const param = {
        where: wherSearch,
        f: 'json',
        outFields: ['*'],
        outSR: 102100,
        returnGeometry: true
      };
      esriRequest(url, param, 'GET', res => {
        if (res && res.features.length > 0) {
          setShowResults(true);
          setShowResultsPacel(true)
          setShowResultsPacelPacel(true);
          const results = res.features[0];
          const attribute = results.attributes;
          setInfoPacel(results);
          setIsPacel(true)
          hightLightPolyGon(results.geometry.rings, 19);
          res.fields.forEach(element => {
            const f = Cadastral.field.filter(fill => fill === element.name);
            if (f[0]) {
              element.isShow = true;
            } else {
              element.isShow = false;
            }

            if (Cadastral.areaField) {
              if (Cadastral.areaField === element.name) {
                element.areaField = true
              }
            }
            
          });
          let arrValue = [];
          arrValue.push({
            title: "CurrentLand",
            field: res.fields,
            value: attribute
          });
  
          const info = {
            isHasPacel: true,
            results: results,
            arrValue: arrValue
          }
  
          setArrFieldList(arrValue);
          onIdentifyQH(results.geometry);
          queryProject(results)
          // onIdentifyUrban(info); 
        } else {
          messagesAppRef.current.getMessages('info','Không có thông tin');
        }
      }, err => {
      });
    } else 
      messagesAppRef.current.getMessages('info','Vui lòng nhập thông tin');

  }

  const renderViewResultPacel = (field) => {
    return ((
      <div className='wp-result' style={{ background: field.color, color: "black" }}>
        <div className='ctn-result'>
          <label className='title-result'>{nls(field.title)}</label>
          {field.field.map(fill => renderRow(fill, field.value))}
        </div>

      </div>
    ))
  }

  const renderViewResultPacelPlanning = (field) => {
    return ((
      <div className='wp-result-planning' onClick={() => onCLickPlanning(field)}>
        <div className='ctn-result'>
          <label className='title-result'>{field.title}</label>
          {field.field.map(fill => renderRow(fill, field.value.attributes))}
        </div>
      </div>
    ))
  }

  const onCLickPlanning = (field) => {
    console.log(field);
    hightLightPolyGon(field.value.geometry.rings[0], 14);
    
  }
  
  const renderRow = (row, value) => {
    if (row.isShow !== true) {  
      return;
    }
    let val = row.areaField ? <div className='result'> {value[row.name]} (m<sup>2</sup>)</div> : <div className='result'> {value[row.name]}</div>
    return ((
      <div className='row-result'>
        <div className='lab'>{upperCase(row.alias)}</div>
        {val}
      </div>
    ))
  }

  const onClickUrbanPacel = async (row) => {
    setArrFieldListDetail([])
    setShowResultsPacel(false)
    setShowResultsDetal(true)
    const [Polygon] = await loadArcGISJSAPIModules(['esri/geometry/Polygon']);
    const ring = row.rings;
    const polygon = new Polygon({
      hasZ: true,
      hasM: true,
      rings: ring,
      spatialReference: { wkid: 102100 }
    });
    let arrValue = [];
    setDisplay(true);
    addGraphicSampleLine(polygon, { LAYER_ID: 'layer_line', SPATIAL_REFERENCE: 102100 }, jimuMapView)
    jimuMapView.view.goTo({
      target: polygon,
      zoom: 21
    }, {
      animate: true,
      duration: 1000
    });
    queryData(QuyHoachXayDung.url + '/query', polygon,'esriGeometryPolygon', 'esriSpatialRelContains', res => {
      console.log(res);
      if (res.features.length > 0) {
        const val = res.features[0];
        let attribute = val.attributes;
        res.fields.forEach(element => {
          const f = QuyHoachXayDung.field.filter(fill => fill === element.name);
          if (f[0]) {
            element.isShow = true;
          } else {
            element.isShow = false;
          }
        });
    
        arrValue.push({
          title: "Thông tin ô chức năng",
          field: res.fields,
          value: attribute,
          isUrban: false
        });
        setArrFieldListDetail([...arrValue])
        setDisplay(false)
        // hightLightFillPolyGon(val.geometry.rings)
      } else {
        setDisplay(false)
        messagesAppRef.current.getMessages('warn','Không có thông tin ô chức năng');
      }
    }, err => {
      console.log(err);
    })    
  }

  const renderViewUrbanPacel = (row) => {
    return ((
      <div className="wp-urban-pacel" style={{ background: row.codeColor }} onClick={() => onClickUrbanPacel(row)}>
        <div className='index-pacel'>
          <label htmlFor="">{row.index + 1}</label>
        </div>
        <div className='wp-info-pacel'>
          <div className="wp-field-pacel">
            <div className='field-pacel'>Chức năng sử dụng đất</div>
            <div className='field-pacel'>Diện tích</div>
          </div>
          <div className="wp-value-pacel">
            <div className='value-pacel'>{row.typeLandDescr}</div>
            <div className='value-pacel'>{row.area.toFixed(2)} (m<sup>2</sup>)</div>
          </div>

          {/* <div className='info-pacel'> */}
          {/* <div className='field-pacel'>Chức năng sử dụng đất</div> */}
          {/* <div className="row_pacel">
              <div className='field-pacel'>Chức năng sử dụng đất</div>
              <div className='value-field'>Đất giao thông</div>
            </div>
            <div className="row_pacel">
              <div className='field-pacel'>Diện tích</div>
              <div className='value-field'>5.5575,21 </div>
            </div> */}
          {/* </div> */}

        </div>
      </div>
    ))

  }


  const onClickDetailProject = async () => {
    const [
      Graphic, Polygon
    ] = await loadArcGISJSAPIModules([
      'esri/Graphic',
      'esri/geometry/Polygon'
    ]);
    setShowResultsPacel(false)
    setShowResultsDetal(true)
    let length = dataProject.features.length -1;
    let valueProject = dataProject.features[length];
    let attribute = valueProject.attributes;

    dataProject.fields.forEach(element => {
      const f = project.field.filter(fill => fill === element.name);
      if (f[0]) {
        element.isShow = true;
      } else {
        element.isShow = false;
      }
      
      if (dataProject.domain) {
        project.domain.fields.forEach((fieldDomain, key) => {
          if (fieldDomain === element.name) {
            attribute[element.name] = dataProject.domain[project.domain.domainName[key]][attribute[element.name]].name;
          }
        });
      }
   });

    let arrValue = [];
    arrValue.push({
      title: "Thông tin đồ án",
      field: dataProject.fields,
      value: attribute,
      isUrban: false
    });
    const polygon = new Polygon({
      hasZ: true,
      hasM: true,
      rings: valueProject.geometry.rings,
      spatialReference: { wkid: 102100 }
    });

    setArrFieldListDetail(arrValue)
    addGraphicFill(polygon, { LAYER_ID: 'layer_fill', SPATIAL_REFERENCE: 102100 }, jimuMapView);
    jimuMapView.view.extent = polygon.extent
    console.log(jimuMapView.view.map);
    

    // this.gisService.clearGraphic('layer_buffer', this.map);

    // hightLightFillPolyGon(valueProject.geometry.rings, 16)

    console.log(dataProject);
  }

  const onSearchLocator = async () => {
    const [
      Graphic, Polygon, Point, GraphicsLayer
    ] = await loadArcGISJSAPIModules([
      'esri/Graphic',
      'esri/geometry/Polygon',
      'esri/geometry/Point',
      'esri/layers/GraphicsLayer'
    ]);
    const _view: MapView = view;
    let ring = []
    let arrGraphic = []
    arrCoorDinate.forEach((element, index) => {
      let a = [valCoorDinateX[index], valCoorDinateY[index]];
      ring.push(a);
    });

    ring.forEach(geo => {
      const point = new Point({
        x: geo[0],
        y: geo[1],
        spatialReference: _view.spatialReference
      });
      let picSymbol: any = {
        type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
        url: marker_icon,
        width: "28px",
        height: "38px"
      };

      const grap_picture = new Graphic({
        geometry: point,
        symbol: picSymbol,
      });
      arrGraphic.push(grap_picture);
    })

    const layer = jimuMapView.view.map.findLayerById('graph_locator');
    if (!layer) {
      let graphicA = new GraphicsLayer({
        id: 'graph_locator',
        graphics: arrGraphic
      });
      jimuMapView.view.map.add(graphicA)
    } else {
      layer.addMany(arrGraphic)
    }
  

    const polygon = new Polygon({
      hasZ: true,
      hasM: true,
      rings: ring,
      spatialReference: _view.spatialReference

    });
    jimuMapView.view.goTo({
      target: polygon,
      zoom: 19
    }, {
      animate: true,
      duration: 1000
    });
    onIdentify(polygon, 'esriGeometryPolygon', 'esriSpatialRelContains', false)
  }

  const setValueControlX = (val, item) => {
    const obj: any = {};
    // item = item - 1;
    Object.keys(valCoorDinateX).forEach(key => {
      obj[key] = valCoorDinateX[key];
      if (key === item.toString()) {
        obj[key] = val.target.value;
      }
    });
    setValCoorDinateX({ ...obj });
    // console.log(valCoorDinateX);

  }

  const setValueControlY = (val, item) => {
    const obj: any = {};
    Object.keys(valCoorDinateY).forEach(key => {
      obj[key] = valCoorDinateY[key];
      if (key === item.toString()) {
        obj[key] = val.target.value;
      }
    });
    setValCoorDinateY(obj);
  }


  const onClickCoordinate = (item) => {
    console.log(item);
    valCoorDinateX[item + 1] = null;
    valCoorDinateY[item + 1] = null;
    let myArray = arrCoorDinate;
    myArray.push(myArray.length + 1);
    setArrCoorDinate([...myArray]);

  }

  const renderDynamicControl = (item, value) => {
    // valCoorDinate[item] = null;
    return <div className='list-coordinates'>
      <div className='coordinates'>
        <div className='title-number-index'><span className='index'>{item + 1}</span></div>
        <div className='border-line-input'><InputText onChange={(val) => setValueControlX(val, item)} placeholder='1199748.84' value={valCoorDinateX[item]}></InputText></div>
        <div className='border-line-input'><InputText placeholder='611245.93' onChange={(val) => setValueControlY(val, item)} value={valCoorDinateY[item]} ></InputText></div>
        <div className='border-button'><button onClick={() => onClickCoordinate(item)}>...</button></div>
      </div>
    </div>
  }

  const showFile = async (file) => {
    file.preventDefault()
    if (file.target.files[0]) {
      let valueFile = file.target.files[0]
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(valueFile);
  
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
  
      promise.then((data:any) => {
        console.log(data);
        let arrCodinate = [];
        setArrCoorDinate(data);
        setValCoorDinateX({});
        setValCoorDinateY({})
        let valX = {}
        let valY = {}
        data.forEach((item, index) => {
          valX[index] = item['X'],
          valY[index] = item['Y']
        });
        setValCoorDinateX(valX)
        setValCoorDinateY(valY)
        // setItems(d);
      });
    }
  }

  const onChangeTab = (e) => {
    setActiveIndex(e)
  }

  const onPrint = async () => {
    setDisplay(true)
    const [
      PrintTemplate,
      PrintParameters
    ] = await loadArcGISJSAPIModules([
       'esri/rest/support/PrintTemplate',
       'esri/rest/support/PrintParameters'
    ]);
    
    // var lyr = new MapImageLayer({ url: "https://gisun.esrivn.net/server/rest/services/QuyHoachXD/ThonTinDoAn/MapServer" });
    // const imageParam = lyr.createExportImageParameters(jimuMapView.view.extent, 100,200);
    // view.map.add(lyr)
    // var params = new ImageParameters();
    // params.bbox = g.geometry.getExtent().expand(1.5);
    // params.width = 320;
    // params.height = 320;
    // lyr.dpi = 96;
    // lyr.imageFormat = 'png';
    // lyr.spatialReference =  { wkid: 102100 }
    // lyr.id = 0;
    // lyr.imageMaxHeight = 200;
    // lyr.imageMaxWidth = 200
    // params.bboxSR = 102100;
    // // params.dynamicLayers = [];
    // params.layerOption = ImageParameters.LAYER_OPTION_SHOW;
    // params.layerIds = [0]; //Tắt Layer  3 (Quy hoạch)
    // params.layerDefinitions = ["OBJECTID=" + g.attributes.OBJECTID];

    // lyr.fetchImage(view.extent, view.width, view.height).then((imgmap) => {
    //   console.log(imgmap);
    // });

    // const polygon = new Polygon({
    //   hasZ: true,
    //   hasM: true,
    //   rings: infoPacel.geometry.rings,
    //   spatialReference: { wkid: 102100 }
    // });

    const urlPrinTask = 'https://gisun.esrivn.net/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';
    const template = new PrintTemplate({
      format: "png8",
      exportOptions: {
        // with:200,
        // height: 100,
        dpi: 96
      },
      layout: "letter-ansi-a-landscape",
      layoutOptions: {
        titleText: "Sơ đồ thửa đất",
        authorText: "",
        copyrightText:"",
        legendLayers : [],
        customTextElements: []
      },
      showLabels: false
     });

    const _view = jimuMapView.view;
    const params = new PrintParameters({
      view:  _view,
      template: template
     });

    const d = new Date();
    const date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();

    printTask(urlPrinTask, params, res => {
      setDisplay(false)
      var win = window.open();
      console.log(infoPacel);
      console.log(dataUrbanPacel);
      const nameProject = dataProject.features[dataProject.features.length - 1].attributes.TenDuAn;
      let htmlData = "";
      
      dataUrbanPacel.forEach((item, index) => {
        htmlData = htmlData + `<tr>`;
        htmlData = htmlData + `<td style='border: 2px solid black; padding: 5px; text-align:center'> ${item.index + 1 }</td> `;
        htmlData = htmlData + `<td style='border: 2px solid black; padding: 5px;'> ${item.typeLandDescr} </td> `;
        htmlData = htmlData + ` <td style='border: 2px solid black; padding: 5px;'> ${item.area.toFixed(2)} </td> `;
        htmlData  = htmlData+ ` </tr> `;
      });
     
      var str = `
      <div>
      <div style='width: 100%'>
          <div style='width: 50%; float: left;'>
              <center>
                  <h4>SỞ QUY HOẠCH - KIẾN TRÚC TP CẦN THƠ</h4>
              </center>
          </div>
          <div style='width: 50%; float: right;'>
              <center>
                  <h4>Ngày cấp: ${date}</h4>
              </center>
          </div>
      </div><br /><br />
      <center><h2>THÔNG TIN QUY HOẠCH</h2><br />  </center>
      <div style="width: 100%">
          <h3>I. Thông tin chung</h5>
          <span>&ensp; + Số thửa: ${infoPacel.attributes.SoThua}</span> <br/><br/>
          <span>&ensp; + Số tờ: ${infoPacel.attributes.SoTo}</span> <br/><br/>
          <span>&ensp; + Diện tích: ${infoPacel.attributes.DienTich} m<sup>2</sup></span> <br/><br/>
          <span>&ensp; + Thuộc quy hoạch phân khu:</span> <br/><br/>
          <span>&emsp; - ${nameProject} </span>
      </div>
      <div>
          <h3>II. Thông tin quy hoạch sử dụng đất</h5>
          <img style="width:100%" src='${res.url}' />
          <table style="border: 2px solid black; border-collapse: collapse;width: 100%">
              <thead>
                  <tr>
                      <th style="border: 2px solid black; font-weight: bold;text-align: center; padding:5px">STT</th>
                      <th style="border: 2px solid black; font-weight: bold;text-align: center;padding:5px">Chức năng</th>
                      <th style="border: 2px solid black; font-weight: bold;text-align: center; padding:5px">Diện tích (m<sup>2</sup>)</th>
                  </tr>
              </thead>
              <tbody>
                  ${htmlData}
              </tbody>
          </table>
      </div>
      <p style="color: red">Lưu ý: Kết quả tra cứu chỉ có giá trị tham khảo thông tin về chức năng sử dụng đất. Trong trường hợp cần
      cung cấp thông tin quy hoạch chi tiết hơn, đề nghị ông/bà liên hệ Sở Quy hoạch - Kiến trúc.</p>
      </div>
       `
       win.document.write(str);
    }, err => {
      setDisplay(false)

    });
   
    // const polygon = new Polygon({
    //   hasZ: true,
    //   hasM: true,
    //   rings: infoPacel.geometry.rings,
    //   spatialReference: { wkid: 102100 }
    // })
    

    // const extent =  polygon.extent.expand(1.5);
    // const valBbox = extent.xmin + ',' + extent.ymin + ',' + extent.xmax + ',' + extent.ymax;

    // console.log(extent);
    console.log(infoPacel);

    // const param = {
    //   size: "320,320",
    //   dpi: 96,
    //   transparent: true,
    //   format: 'png8',
    //   bbox: valBbox,
    //   bboxSR: 102100,
    //   layers: "show:2",
    //   imageSR: 102100,
    //   f: 'json',
    //   layerDefs: JSON.stringify({ 2: 'OBJECTID = ' + infoPacel.attributes.OBJECTID })
    // }
    // jimuMapView.view.map.layers.forEach( item => {
    //   console.log('layer >>>>>',item.title + item.type, item);
    // });

    // jimuMapView.view.graphicLayers.forEach( item => {
    //   console.log('layer graphic >>>>>',item.title + item.type ,item);
    // });


    // esriRequest('https://gisun.esrivn.net/server/rest/services/QuyHoachXD/ThonTinDoAn/MapServer/export', param, 'GET', res => {
    //   console.log(res);
    //   if (res.href) {
    //     window.open(res.href, "_bank")
    //   }
    // }, err => {
    //   console.log(err);

    // });

  }

  const onExport = () => {
    console.log(infoPacel);
    let arrTemplate = [];
    const rings = infoPacel.geometry.rings[0];
    rings.forEach(item => {
      arrTemplate.push({
        "X": item[0],
        "Y": item[1]
      })
    });
    exportToXlsx(arrTemplate, getNameFileEx());

  }

  const getNameFileEx = () =>{
    let name = '';
    const d = new Date();
    name = name +  d.getDate() + '_' + (d.getMonth() + 1) + '_' + d.getFullYear();
    return name;
}


  const exportToXlsx = (csvData, fileName) => {
    const fileExtension = '.xlsx';
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'ToaDoThuaDat': ws }, SheetNames: ['ToaDoThuaDat'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}


  const onClickAdress = async (item) => {
    setTxtAdress(item.text)
    setShowHideResultAdr(true);
    const [Point, Graphic] = await loadArcGISJSAPIModules(["esri/geometry/Point", "esri/Graphic"]);
    console.log(item);
    const params = {
      SingleLine: item.text,
      magicKey: item.magicKey,
      maxLocations: 6,
      outFields: "Addr_type,Match_addr,StAddr,City",
      outSR: { "latestWkid": 3857, "wkid": 102100 },
      f: 'json'
    }

    esriRequest('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates', params, 'GET', res => {
      console.log(res);
      if (res.candidates) {
        const location = res.candidates[0].location;
        const point = new Point({
          x: location.x,
          y: location.y,
          spatialReference: { wkid: 4326, latestWkid: 4326 }
        });

        view.goTo({
          target: point,
          zoom: 19
        }, {
          animate: true,
          duration: 1000
        });

        let geometryPoint = {
          type: "point",
          longitude: location.x,
          latitude: location.y
        };

        let markerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40]
        };

        let pointGraphic = new Graphic({
          geometry: geometryPoint,
          symbol: markerSymbol
        });

        jimuMapView.view.graphics.add(pointGraphic);
      }
    }, err => { })
  }

  const onClosResult = () => {
    setShowResults(false)
    setShowResultsPacelPlanning(false)
    setShowResultsPacelPacel(false)
    setShowResultsDetal(false)
    clearGraphic('layer_fill', jimuMapView);
    clearGraphic('layer_line', jimuMapView);
    clearGraphic('graph_locator', jimuMapView);

    // const layer = jimuMapView.view.map.findLayerById('graph_locator');
    // layer.remove();

    jimuMapView.view.graphics.removeAll();
  }

  const onBackResult = async () => {
    clearGraphic('layer_fill', jimuMapView);
    clearGraphic('layer_line', jimuMapView);
    setShowResultsDetal(false)
    setShowResults(true)
    setShowResultsPacel(true)
    if (isPacel) {
      console.log(infoPacel);
      const [Graphic, Polygon] = await loadArcGISJSAPIModules([
        'esri/Graphic',
        'esri/geometry/Polygon'
      ]);
      const polygon = new Polygon({
        hasZ: true,
        hasM: true,
        rings: infoPacel.geometry.rings,
        spatialReference: { wkid: 102100 }
      });
      jimuMapView.view.extent = polygon.extent.expand(2)
    }
  }

  const onClickResetParcal = () => {
    setcboDistrict({code: "ALL", descr: "Quận/ Huyện"});
    setSubArrDistric([]);
    formRef.current.onClearResult();
  }


  const upperCase = (string)  => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  const ViewResultAddress = () => {
    return(
      <div  className={showHideResultAdr ? 'hidden' : 'list-result'}>
      {arrResultAdress.map(res => {
        return (
          <div className='row-result' onClick={() => onClickAdress(res)}>{res.text}</div>
        );
      })
    }
    </div>)
  }

  return (
    <div className="wp">
      <ViewMap />
      <CoreMessage ref={messagesAppRef} />
      <Loader display={display} ></Loader>
      <div className={showResults === false ? 'wp-search' : 'hidden'}>
        <div className='title'>
          <label>{nls('Search')} </label>
        </div>
        <div className='content'>
          <div className='ctn-distric'>
            <CoreSelect isLabelBorder ={true} onChange={onDistricChange} labelName = {nls('District')} dataSource = {arrCboDistrict} value = {cboDistrict}  valueField={null}></CoreSelect>
            <CoreSelect isLabelBorder ={true} onChange={onSubdistricChange} labelName = {nls('Subdistrict')}  dataSource = {arrSubDistric} value = {cboSubdistrict} valueField={null}></CoreSelect>
          </div>
          <div className='tab'>
            <TabView activeIndex={activeIndex} onTabChange={(e) => onChangeTab(e.index)}>
              <TabPanel header={nls('Location')} >
                <div className='wp-location'>
                  {/* <label>Địa chỉ</label> */}
                  <div className='wp-adress'>
                  <CoreInput  isLabelBorder = {true} onChange={(e) => onChangeAdress(e.target.value)} labelName={nls('Address')} mode="text-area"  isLabelLeft={false} value={txtAddress}></CoreInput>
                  {/* <InputTextarea placeholder={"Nhập địa chỉ..."} onClick={onClickInputAdress} value={txtAddress} onChange={(e) => onChangeAdress(e.target.value)} rows={4} cols={50} autoResize /> */}
                  {loading ? <div>...loading</div> : null}
                  { !loading ? <ViewResultAddress />: null}
                  </div>
                  <CoreSelect isLabelBorder ={true} onChange={onCboYearChange} labelName = {nls('Year')} dataSource = {arrYear} value = {cboYear}  valueField={null}></CoreSelect>
                  {/* <label htmlFor="">Năm</label> */}
                  {/* <Dropdown value={cboYear} options={arrYear} onChange={onCboYearChange} optionLabel="name" /> */}
                  <div className='wp-radio'>
                    <div className="digital-map radio">
                      <label>{ nls('DigitalMap')}</label>
                      <RadioButton inputId="city1" name="city" value="digitalMap" onChange={onRadioTypeMap} checked={raidoTypeMap === 'digitalMap'} />
                    </div>
                    <div className="paperMap radio">
                      <label>{ nls('PaperMap')}</label>
                      <RadioButton inputId="city1" name="city" value="paperMap" onChange={(e) => setRaidoTypeMap(e.value)} checked={raidoTypeMap === 'paperMap'} />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header= {nls('Certificate')}>
                <div className='wp-pare-land'>
                  <CoreForm isLabelBorder ={true} ref={formRef} fieldConfig={fieldConfig}  information={information} layoutConfig={layOutConfig}  isLabelLeft={false} tabId={4} ></CoreForm>
                  {/* <div className='class-pare-land'>
                    <div className="class-pieces">
                      <label htmlFor="">Số tờ </label>
                      <InputText className='p-inputtext-sm block mb-2' value={piecesPaper} onChange={(e) => setPiecesPaper(e.target.value)}></InputText>
                    </div>
                    <div className="class-number-plot">
                      <label htmlFor="">Số thửa </label>
                      <InputText value={numberPlots} onChange={(e) => setNumberPlots(e.target.value)}></InputText>
                    </div>

                  </div> */}

                  <div className='btn-submit'>
                    <div className='btn'>
                        <Button icon="pi pi-refresh" label=  {nls('Reset')} className="p-button-raised p-button-success" onClick={onClickResetParcal} />
                        <Button icon="pi pi-search" label= {nls('Search')} className="p-button-raised p-button-info button-print" onClick={onSearchParcel} />
                      </div>
                    {/* <div className='btn btn-reset' onClick={onClickResetParcal}>
                      <label htmlFor="">Reset</label>
                    </div>
                    <div className='btn btn-search' onClick={onSearchParcel}>
                      <label htmlFor="">Tìm kiếm</label>
                    </div> */}
                  </div>
                </div>
              </TabPanel>
              <TabPanel header= {nls('Coordinates')}>
                <div className='wp-locator'>
                  <label className='lab'>{ nls('NoteCoordinate')}</label>
                  <label className='lab'># {nls('X')} {nls('Y')}</label>
                  <div className='row-coordinate'>
                    {
                      arrCoorDinate.map((item, index) =>
                        renderDynamicControl(index, item))
                    }
                  </div>
                  <div className='uploadfile-custom'>
                      <div className='uploadfile-custom__btn'>
                          <input className='uploadfile-custom__input' type="file" onChange={showFile} name="imageUpload" id="imageUpload" style={{ display: "none" }} accept=".xlsx" />
                          <label className='uploadfile-custom__label' htmlFor="imageUpload">
                              <i className="pi pi-fw pi-upload"></i>
                              {nls('CoordinateFile')}
                          </label>
                      </div>
                  </div>
                  <div className='btn-submit'>
                    <div className='btn'>
                      <Button icon="pi pi-refresh" label= {nls('Reset')} className="p-button-raised p-button-success" onClick={onClickReset} />
                      <Button icon="pi pi-search" label= {nls('Search')} className="p-button-raised p-button-info button-print" onClick={onSearchLocator} />
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className={showResults ? 'wp-result-search' : 'hidden'}>
        <div className='wp-title'>
          <div className='img-back'><img  className={!showResultsDetail ? 'hidden' : ''} src={back} alt="" onClick={onBackResult} /></div>
          <div className='title'>{nls('Information')}</div>
          <img className='img-close' src={close_icon} alt="" onClick={onClosResult} />
        </div>
        <div  className={showResultsPacel ? 'wp-class-result-search' : 'hidden'}>
          <div className='note'>
            <span>{nls('NoteInfomation')} </span>
          </div>
          <div className={showResultsPacelPlanning ? 'wp-result-search-planning' : 'hidden'}>
            <div className='result-search-planning'>
              {
                arrFieldListPlanning.length > 0 ? arrFieldListPlanning.map(field => renderViewResultPacelPlanning(field)) : ''
              }
            </div>
          </div>
          <div className={showResultsPacelPacel ? 'wp-result-search-pacel' : 'hidden'}>
            <div className='class-result-search'>
              {
                arrFieldList.length > 0 ? arrFieldList.map(field => renderViewResultPacel(field)) : ''
              }
            </div>
            <div className='wp-result-urban'>
            <label className='title-result'>{nls('PlanningInformation')}</label>
            <div className='wp-project'>
              <label>Đồ án</label>
              <div className='name-project' onClick={onClickDetailProject}>{dataProject !== null ? dataProject.features[1].attributes.TenDuAn : ''}</div>
            </div>
            <label className='title-detal-pacel'>{nls('DetailLand')}</label>
            <div className="wp-list-urban-pacel">
              <div className='list-urban-pacel'>
                {
                  dataUrbanPacel.length > 0 ? dataUrbanPacel.map(row => renderViewUrbanPacel(row)) : ''
                }
              </div>
            </div>
            <div className="div-button">
              <div className='btn'>
                <Button icon="pi pi-file-excel" label= {nls('ExportCoordinates')} className="p-button-raised p-button-success" onClick={onExport} />
                <Button icon="pi pi-print" label= {nls('PrintInformation')} className="p-button-raised p-button-info button-print" onClick={onPrint} />
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className={showResultsDetail ? 'wp-detail-result' : 'hidden'}>
          <div className='class-result-search'>
            <div className='note-qhkt'>
              <span><b>Lưu ý</b>: Đây là chỉ tiêu quy hoạch - kiến trúc của ô chức năng, không phải chỉ tiêu của khu đất.</span>
            </div>
            {
              arrFieldListDetail.length > 0 ? arrFieldListDetail.map(field => renderViewResultPacel(field)) : ''
            }
          </div>
        </div>
      </div>
    </div>)
}

export default Widget