/** @jsx jsx */
import { React, AllWidgetProps, jsx, loadArcGISJSAPIModules, classNames } from 'jimu-core';
import { IMConfig } from '../config';
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import './css/QuanLyDuAnDat_ND.scss'
import '../../../styles.scss';
import GloableStyles from './GloableStyles'
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";

import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Slider } from 'primereact/slider';
import { Tooltip } from 'primereact/tooltip';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable'
import { Calendar } from 'primereact/calendar';
import { Ripple } from 'primereact/ripple';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column'
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { DataScroller } from 'primereact/datascroller';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

import TemPlateFile from './components/TemplateFile';
import ToastMessages from './components/ToastMessages';
import Loadding from './components/Loading';

import esriQueryTask from './core-esri/esri-query-task';
import esriRequest from './core-esri/esri-query-Request';
import EsriRequest from './core-esri/esri-request';
import {esriRequest1, printTask, queryData } from './core-esri/esri-request';

import Extent from "esri/geometry/Extent";
import projection from "esri/geometry/projection";
import FeatureLayer from "esri/layers/FeatureLayer";
import PictureMarkerSymbol  from "esri/symbols/PictureMarkerSymbol";
import SimpleFillSymbol   from "esri/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import Color from "esri/Color";
import Polygon from "esri/geometry/Polygon";
import Graphic from "esri/Graphic";
import TextSymbol from "esri/symbols/TextSymbol";
import Font from "esri/symbols/Font";
import Polyline from "esri/geometry/Polyline";
import Point from "esri/geometry/Point";
import Map from "esri/Map";
import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import MapImageLayer from "esri/layers/MapImageLayer";
import ImageParameters from "esri/layers/support/ImageParameters";
import  geodesicUtils from "esri/geometry/support/geodesicUtils";
import  LabelClass from "esri/layers/support/LabelClass";
import  PrintTemplate from "esri/rest/support/PrintTemplate";
import  PrintParameters from "esri/rest/support/PrintParameters";
import  print from 'esri/rest/print'
import { Label } from 'jimu-ui';

import { parse } from 'zipson/lib';
import { mapConfig } from '../../../component/services/mapConfig';
import ThemeService from '../../../component/theme/theme.service';
import CoreForm from '../../../component/CoreForm';
import Loader from '../../../component/Loader';

import { convertJSAPIFieldsToJimuFields } from 'dist/widgets/arcgis/directions/src/utils';
import { isFuzzyFromDsIds } from 'jimu-ui/advanced/lib/data-source-selector/utils';

import BoxPin1 from './assets/images/pin_00.png';
import BoxPinQuyDatNho from './assets/images/pin_QuyDatNho.png';
import webLayout from './assets/images/webLayout.png';
import printLayout from './assets/images/printLayout.png';
import ReactPaginate from 'react-paginate';
import getSeriesWithQuery from 'dist/widgets/common/chart/src/runtime/runtimes/chart/web-chart/with-feature-layer/get-series-with-query';
import { ShownMode } from 'dist/widgets/common/share/src/runtime/components/items/base-item';



const { useState, useEffect, useRef, useReducer, useLayoutEffect } = React;

function Widget(props: AllWidgetProps<any>) {

  let loadingRef = useRef<any>();

  const Config = props.config;
  const DS_ListForm = Config.DS_menu;
  const DS_Table = Config.DS_Table;
 


  const [currentValue, setCurrentValue] = useState(null); // Gi?? tr??? hi???n t???i c???a c??c control ??ang ???????c kh???i t???o
  const [fieldList, setFieldList] = useState([]);
  const [dataTable, SetDataTable] = useState([]);
  const [dataTableListofcomments, SetDataTableListofcomments] = useState([]);
  
  const { user } = props;
  const messagesAppRef: React.MutableRefObject<any> = useRef()
  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(10);

  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [displayPrint, setDisplayPrint] = useState(false);
  const [displayAddComment, setDisplayAddComment] = useState(false);
  const [LayoutConfig, setLayoutConfig] = useState(null);
  const [WindowConfig, setWindowConfig] = useState(null);
  const [fieldConfig, setfieldConfig] = useState(null);
  const [tabId, settabId] = useState(1);
  const [fieldConfigComment, setfieldConfigComment] = useState(null);
  const [tabIdComment, settabIdComment] = useState(1);
  const [sys_combo, setsys_combo] = useState(null);
  const [visible_Land, setVisible_Land] = useState(false);
  const [DtaLandClick, setDtaLandClick] = useState(null);
  const [DtaTableLandClick, setDtaTableLandClick] = useState(null);
  const [Map_View, setMapView] = useState(null);

  

  const [selectedListofcomments, SetSelectedListofcomments] = useState<any>({code: 'ALL', name: 'T???t c???'});
  const [arrListofcomments, SetArrListofcomments] = useState<any>([{code: 'ALL', name: 'T???t c???'}, {code: '0', name: 'Ch??a duy???t'}, {code: '1', name: '???? duy???t'}]);

  const [where_OBJECTID, setWhere_OBJECTID] = useState(null);
  const [messageConfirm, setmessageConfirm] = useState(null);
  const [StringContent, setStringContent] = useState(null);
  const [StringContentQDN, setStringContentQDN] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [ForcePage, setForcePage] = useState(0);
  const [display, setDisplay] = useState(false);
  const [activeIndex1, setActiveIndex1] = useState(1);


  // loading c???a table Qu??? ?????t l???n
  const [loading, setLoading] = useState(true);

  const toast = useRef(null);
  const refForm = useRef(null);
  const MapElement = useRef(null);
  let highlightGeometry= useRef(null);
  const [currentPage, setCurrentPage] = useState(null);
  
  // Get Map View
  const [jimuMapView, setJimuMapView] = useState(null);

  // Set MapView
  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) setJimuMapView(jmv);
  };

  // css
  const styles =  {
    container: {
      height: '100vh',
      width: '100vw'
    },
    mapDiv: {
      padding: 0,
      margin: 0,
      border: '1px solid',
      width: 'auto',
      height:'550px',
    },
    divbutton: {
      'margin-top': '10px',
      display: 'flex',
      'justify-content': 'center',
    },
    divform: {
      width: '100%',
      padding: '5px',
      display: 'grid',
     'justify-content': 'center',
     fontSize: '10pt'
    },
    txtLabel: {
      height: '32px',
      lineHeight: '32px',
      marginBottom: '0',
      width: '188px',
      textAlign: 'right',
      paddingRight: '0px',
      marginRight: '5px',
      fontWeight: 'bold',
      /* font-size: 14px; */
      // font-size: 10pt;
      color: '#474747 !important',
      // font-weight: 600;
    },
    wplist: {
      fontSize: '10pt',
      fontWeight: 'normal',
      margin: '10px',
      width: 'auto' //380px
    },
    DialogQD: {
      width: 'auto'
    }
    
  }

  // Ki???m tra Map
  const isMapConfigured = () => {
    return props.useMapWidgetIds && props.useMapWidgetIds.length === 1;
  }

  // View Map
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




  useEffect(() => {
    if (jimuMapView) {
      //console.log('Config',Config);
      ThemeService.setActiveTheme();
      loadConfigCotech();
      LoadFiedlist();
      TimKiemQuyDat();
    };


  }, [jimuMapView])


  // load data config Cotech
  const loadConfigCotech = async () => { 
   
      var url_sys_combo = "https://coretech.vn:1314/odata/Config/Init?appid=13&userid=1";
      var url ="https://coretech.vn:1314/odata/SysCaches/SysCacheWindow/13";
   
    await fetch(url_sys_combo)
      .then((response) => response.json())
      .then((data) => {
       // console.log('data', data)
        if (data) { 
          setsys_combo(data.sys_combo);
         }
        
      })
      .catch ((error) => console.error(error));

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
       //console.log('data2', data);
        if (data && data.success) {
          setLayoutConfig(data.model.layout);
          setWindowConfig(data.model.config);
          const obj = parse(data.model.config);
          const config = mapConfig(obj);
          if (config.tabs[0].fields && config.tabs[0].fields.length > 0) {
            config.tabs[0].fields.forEach(field => {
                // B??? sung serviceType cho field
                field.serviceType = config.tabs[0].tabletype
            });
          }
          setfieldConfig(config.tabs[0].fields);
          settabId(config.tabs[0].tabid);

          setfieldConfigComment(config.tabs[0].tabs[0].fields);
          settabIdComment(config.tabs[0].tabs[0].tabid)
        }
      })
      .catch ((error) => console.error(error));
     
  }

  // load data form search
  const LoadFiedlist = async () => {
    const arr = [];
    DS_ListForm.forEach(element => {
      arr.push({
        FIELD_LABEL: element.name,
        FIELD_NAME: element.properties.key,
        FIELD_TYPE: element.properties.type,
        FIELD_LOOKUP: element.properties.value,
        FIELD_URL: element.properties.url,
        FIELD_FIELDID: element.properties.FieldId,
        FIELD_PARENTID: element.properties.FarentId,
        FIELD_SETVALUE: element.properties.setvalue,
        FIELD_EXTENT: element.properties.Extent,
        FIELD_WHERE: element.properties.Where,
        FIELD_RETURNGEOMETRY: element.properties.returnGeometry,
        FIELD_OUTFIELDS: element.properties.outFields,
        FIELD_FIELDSCODE: element.properties.FieldsCode,
        FIELD_FIELDSNAME: element.properties.FieldsName,
      })
    });

    const obj = {};
    for(var i=0; i<arr.length; i++) {
      const item = arr[i];
      obj[item.FIELD_NAME] = null;
      if (item.FIELD_TYPE === 'select') {
        if (item.FIELD_LOOKUP){
          // console.log('item', item);
          obj[item.FIELD_NAME] = item.FIELD_LOOKUP[0]
        } else {
          // X??? l?? combobox quan h??? cha con
          if (item.FIELD_URL && item.FIELD_PARENTID === null){
            // console.log(item.FIELD_NAME)
            const Arr_DOMAIN = await getDataComboboxField(item);
            // console.log(Arr_DOMAIN);
            item.FIELD_LOOKUP = Arr_DOMAIN;
            obj[item.FIELD_NAME] = Arr_DOMAIN[0] ?? null
          } else if(item.FIELD_URL && item.FIELD_FIELDID === null){
            // obj[item.FIELD_NAME] = item.FIELD_LOOKUP
            const Arr_DOMAIN = await getDataComboboxNotField(item);
            // console.log(Arr_DOMAIN);
            item.FIELD_LOOKUP = Arr_DOMAIN;
            obj[item.FIELD_NAME] = Arr_DOMAIN[0] ?? null
          } 
        }
          
      }
    }
    // console.log(obj);
    setCurrentValue(obj);
    // tr?????c khi setFieldList th?? ph???i t???o s???n
    setFieldList(arr);
    
  }


// onChange form search
  const setValueControl = (e, field) => {
    // console.log(e, field);
    const obj = {};
    

   
      Object.keys(currentValue).forEach(key => {
        obj[key] = currentValue[key];
        if (key === field.FIELD_NAME) {
            obj[field.FIELD_NAME] = e.target.value;
        }
    });
      // quan h??? Farent
      fieldList.forEach(item => {
        // console.log(item.FIELD_PARENTID);
        if (field.FIELD_FIELDID){
          if (item.FIELD_PARENTID === field.FIELD_FIELDID) {
            (e.value) ? ((e.value.code ==="ALL") ? obj[item.FIELD_NAME] = null : obj[item.FIELD_NAME] = null) : obj[item.FIELD_NAME] = e.target.value;
            ComboboxFieldChange(e, item, field);
          }
        }
      });

      // zOOM nh???ng combobox c?? Extent
        if(e.target.value&&e.target.value.DATA){
          // console.log('field',field, 'e', e);
          const extent = new Extent({
            xmin: e.target.value.DATA.xmin,
            ymin: e.target.value.DATA.ymin,
            xmax: e.target.value.DATA.xmax,
            ymax: e.target.value.DATA.ymax,
            spatialReference: e.target.value.DATA.spatialReference
          });
          loadArcGISJSAPIModules(['esri/geometry/projection']).then(async ([projection]) => {
            await projection.load();
            const newExtent = projection.project(extent, { wkid: 102100 });
            jimuMapView.view.extent = newExtent;
          });
        }
      // console.log(obj)
      
      setCurrentValue(obj);
    
    
  }
  
// Query Data Combobox not Field
  const getDataComboboxNotField = async (item) => {
    // console.log('getDataComboboxNotField', item);
    var arrData = [];
    const params = {
      orderByFields: [item.FIELD_FIELDID],
      outFields: item.FIELD_OUTFIELDS,
      returnGeometry: item.FIELD_RETURNGEOMETRY,
      where: item.FIELD_WHERE,
      outSpatialReference:jimuMapView.view.spatialReference
    }

    if(item.FIELD_EXTENT){
      arrData = [{
        code: item.FIELD_SETVALUE[0].code,
        name: item.FIELD_SETVALUE[0].name,
        DATA: {
          xmin: item.FIELD_EXTENT.X_min,
          ymin: item.FIELD_EXTENT.Y_min,
          xmax: item.FIELD_EXTENT.X_max,
          ymax: item.FIELD_EXTENT.Y_max,
          spatialReference: {
            wkid: 102100
          }
        },
      },];

      const extent = new Extent({
        xmin: item.FIELD_EXTENT.X_min,
        ymin: item.FIELD_EXTENT.Y_min,
        xmax: item.FIELD_EXTENT.X_max,
        ymax: item.FIELD_EXTENT.Y_max,
        spatialReference: jimuMapView.view.spatialReference
      });
      jimuMapView.view.extent = extent;
      await esriQueryTask(item.FIELD_URL, params, results => {
        // console.log('results', results.features)
        if (results.features) { 
          const feats = results.features;
          feats.forEach(feat => {
            arrData.push({
              code: feat.attributes[item.FIELD_FIELDSCODE],
              name: feat.attributes[item.FIELD_FIELDSNAME],
              DATA: {
                xmin: feat.geometry.extent.xmin,
                ymin: feat.geometry.extent.ymin,
                xmax: feat.geometry.extent.xmax,
                ymax: feat.geometry.extent.ymax,
                spatialReference: feat.geometry.extent.spatialReference
              }
            });
          });
        }
      }, error => {
        console.log('error', error);
      })
    } else {
      await esriQueryTask(item.FIELD_URL, params, results => {
        // console.log('results', results.features)
        if (results.features) { 
          const feats = results.features;
          feats.forEach(feat => {
            arrData.push({
              code: feat.attributes[item.FIELD_FIELDSCODE],
              name: feat.attributes[item.FIELD_FIELDSNAME],
            });
          });
        }
       
      }, error => {
        console.log('error', error);
      })
    }
    return arrData;
  }

  // Query Data Combobox Field
  const getDataComboboxField = async (item) => {
    // console.log('getDataComboboxField', item);
    var arrData = [];
    const params = {
      orderByFields: [item.FIELD_FIELDID],
      outFields: item.FIELD_OUTFIELDS,
      returnGeometry: item.FIELD_RETURNGEOMETRY,
      where: item.FIELD_WHERE
    }
    // console.log('params', params)
    if(item.FIELD_EXTENT){
      arrData = [{
        code: item.FIELD_SETVALUE[0].code,
        name: item.FIELD_SETVALUE[0].name,
        DATA: {
          xmin: item.FIELD_EXTENT.X_min,
          ymin: item.FIELD_EXTENT.Y_min,
          xmax: item.FIELD_EXTENT.X_max,
          ymax: item.FIELD_EXTENT.Y_max,
          spatialReference: {
            wkid: 102100
          }
        },
      },];

      const extent = new Extent({
        xmin: item.FIELD_EXTENT.X_min,
        ymin: item.FIELD_EXTENT.Y_min,
        xmax: item.FIELD_EXTENT.X_max,
        ymax: item.FIELD_EXTENT.Y_max,
        spatialReference: jimuMapView.view.spatialReference
      });
      jimuMapView.view.extent = extent;

      await esriQueryTask(item.FIELD_URL, params, results => {
        // console.log('results', results)
        if (results.features) { 
          const feats = results.features;
          feats.forEach(feat => {
            arrData.push({
              code: feat.attributes[item.FIELD_FIELDSCODE],
              name: feat.attributes[item.FIELD_FIELDSNAME],
              DATA: {
                xmin: feat.geometry.extent.xmin,
                ymin: feat.geometry.extent.ymin,
                xmax: feat.geometry.extent.xmax,
                ymax: feat.geometry.extent.ymax,
                spatialReference: feat.geometry.extent.spatialReference
              }
            });
          });
         }
       
      }, error => {
        console.log('error', error);
      })
    } else {
      await esriQueryTask(item.FIELD_URL, params, results => {
        // console.log('results', results.features)
        if (results.features) { 
          const feats = results.features;
          feats.forEach(feat => {
            arrData.push({
              code: feat.attributes[item.FIELD_FIELDSCODE],
              name: feat.attributes[item.FIELD_FIELDSNAME],
            });
          });
         }
       
      }, error => {
        console.log('error', error);
      })
    }
    return arrData;
  }

  // Combobox Field onchange
  const ComboboxFieldChange = (e, item, field) => {
    // console.log("e", e, "item", item, "field", field)
    GetDataComboboxFarent(e.target.value, item, field);
  }

   // Get Data Combobox Farent
   const GetDataComboboxFarent = async (e, item, field) => {
    // console.log("e", e, "item", item, "field", field)
    var arrData = [];
    if(item.FIELD_TYPE === 'select'){
      if(e){
        if (e.code === "ALL") {
          arrData = [];
        } else {
          if(field.FIELD_EXTENT){ 
            arrData = [{
                code: item.FIELD_SETVALUE[0].code,
                name: item.FIELD_SETVALUE[0].name,
                DATA: {
                  xmin: e.DATA.xmin,
                  ymin: e.DATA.ymin,
                  xmax: e.DATA.xmax,
                  ymax: e.DATA.ymax,
                  spatialReference: e.DATA.spatialReference
                },
              },];
              const _where = field. FIELD_NAME + "='" + e.code + "'";
               const params = {
                 orderByFields: [item.FIELD_FIELDID],
                 outFields: item.FIELD_OUTFIELDS,
                 returnGeometry: item.FIELD_RETURNGEOMETRY,
                 where: _where
               }
  
               await esriQueryTask(item.FIELD_URL, params, results => {
                if (results.features) { 
                  const feats = results.features;
                  feats.forEach(feat => {
                    arrData.push({
                      code: feat.attributes[item.FIELD_FIELDSCODE],
                      name: feat.attributes[item.FIELD_FIELDSNAME],
                      DATA: {
                        xmin: feat.geometry.extent.xmin,
                        ymin: feat.geometry.extent.ymin,
                        xmax: feat.geometry.extent.xmax,
                        ymax: feat.geometry.extent.ymax,
                        spatialReference: feat.geometry.extent.spatialReference
                      }
                    });
                  });
                 }
               
              }, error => {
                console.log('error', error);
              })
          } else {
            arrData = [{
              code: item.FIELD_SETVALUE[0].code,
              name: item.FIELD_SETVALUE[0].name,
            },];
  
            const _where = field. FIELD_NAME + "='" + e.code + "'";
               const params = {
                 orderByFields: [item.FIELD_FIELDID],
                 outFields: item.FIELD_OUTFIELDS,
                 returnGeometry: item.FIELD_RETURNGEOMETRY,
                 where: _where
               }
  
               await esriQueryTask(item.FIELD_URL, params, results => {
                if (results.features) { 
                  const feats = results.features;
                  feats.forEach(feat => {
                    arrData.push({
                      code: feat.attributes[item.FIELD_FIELDSCODE],
                      name: feat.attributes[item.FIELD_FIELDSNAME],
                    });
                  });
                }
                
              }, error => {
                console.log('error', error);
              })
          }
         
        }
      } else {
        arrData = [];
      }
        
    } else {

    }

    // console.log('arrData', arrData);
    var arr = [];
   
      fieldList.forEach(element => {
        if(item.FIELD_LABEL === element.FIELD_LABEL){
          // element.FIELD_LOOKUP = arrData;
          arr.push({
            FIELD_LABEL: element.FIELD_LABEL,
            FIELD_NAME: element.FIELD_NAME,
            FIELD_TYPE: element.FIELD_TYPE,
            FIELD_LOOKUP: arrData,
            FIELD_URL: element.FIELD_URL,
            FIELD_FIELDID: element.FIELD_FIELDID,
            FIELD_PARENTID: element.FIELD_PARENTID,
            FIELD_SETVALUE: element.FIELD_SETVALUE,
            FIELD_EXTENT: element.FIELD_EXTENT,
            FIELD_WHERE: element.FIELD_WHERE,
            FIELD_RETURNGEOMETRY: element.FIELD_RETURNGEOMETRY,
            FIELD_OUTFIELDS: element.FIELD_OUTFIELDS,
            FIELD_FIELDSCODE: element.FIELD_FIELDSCODE,
            FIELD_FIELDSNAME: element.FIELD_FIELDSNAME,
          })
        } else {
          arr.push({
            FIELD_LABEL: element.FIELD_LABEL,
            FIELD_NAME: element.FIELD_NAME,
            FIELD_TYPE: element.FIELD_TYPE,
            FIELD_LOOKUP: element.FIELD_LOOKUP,
            FIELD_URL: element.FIELD_URL,
            FIELD_FIELDID: element.FIELD_FIELDID,
            FIELD_PARENTID: element.FIELD_PARENTID,
            FIELD_SETVALUE: element.FIELD_SETVALUE,
            FIELD_EXTENT: element.FIELD_EXTENT,
            FIELD_WHERE: element.FIELD_WHERE,
            FIELD_RETURNGEOMETRY: element.FIELD_RETURNGEOMETRY,
            FIELD_OUTFIELDS: element.FIELD_OUTFIELDS,
            FIELD_FIELDSCODE: element.FIELD_FIELDSCODE,
            FIELD_FIELDSNAME: element.FIELD_FIELDSNAME,
          })
        }
      });
      setFieldList(arr);
    

    
   
    // return fieldList;
  }


  // ??i???u ki???n Where
  const returnWhere = () => {
    //  console.log('currentValue', currentValue);
     var dk = '';
    
      fieldList.forEach(item => {
        // console.log(item);
        if(item.FIELD_TYPE === 'select'){
          if (currentValue[item.FIELD_NAME]!= undefined){
            dk +=  (currentValue[item.FIELD_NAME].code != "" && currentValue[item.FIELD_NAME].code != null && currentValue[item.FIELD_NAME].code != "ALL") ?  (item.FIELD_NAME +  " = '" + currentValue[item.FIELD_NAME].code + "' AND ") : "";
          }
        } else if(item.FIELD_TYPE === "text"){
          dk += (currentValue[item.FIELD_NAME] != "" && currentValue[item.FIELD_NAME]!= null && currentValue[item.FIELD_NAME]!= undefined) ? "UPPER(" + item.FIELD_NAME +") like N'%" + currentValue[item.FIELD_NAME].toUpperCase() + "%'" + " AND " : "";
        } else if(item.FIELD_TYPE === "date"){
          dk += (currentValue[item.FIELD_NAME] != "" && currentValue[item.FIELD_NAME]!= null && currentValue[item.FIELD_NAME]!= undefined) ? item.FIELD_NAME +" = '" + currentValue[item.FIELD_NAME].getTime() + "' AND " : "";
        } else {
          dk += (currentValue[item.FIELD_NAME] != "" && currentValue[item.FIELD_NAME]!= null && currentValue[item.FIELD_NAME]!= undefined) ? "UPPER(" + item.FIELD_NAME +") like N'%" + currentValue[item.FIELD_NAME].toUpperCase() + "%'" + " AND " : "";
        }
        
      });
     
     

    return dk === '' ? '1=1' : dk.substring(0, dk.length - 5);
  }

  //  T??m ki???m qu??? ?????t
  const TimKiemQuyDat = async () => {
    //console.log(returnWhere());
    loadConfigCotech();
    dialogFuncMap[`${'displayBasic'}`](false);
    dialogFuncMap[`${'displayConfirm'}`](false);
    dialogFuncMap[`${'displayAdd'}`](false);
    dialogFuncMap[`${'displayPrint'}`](false);
    dialogFuncMap[`${'displayAddComment'}`](false);
     var Url = Config.layerUrls.urlQuyDat;
    
    var ThongtinJson = {
      f: "json",
      returnGeometry: false,
      where: returnWhere(),
      returnCountOnly: true,
      spatialRel: 'esriSpatialRelIntersects',
      featureEncoding: 'esriDefault',
      units: 'esriSRUnit_Foot',
    };

    
    await EsriRequest(Url + '/query', ThongtinJson, "GET", async res => { 
      console.log('EsriRequest', res);
      if (res) { 
        var param_chiatrang = {
          total: res.count,
          resultPage: 10
        }
        setPageCount(chiaTrang(param_chiatrang));
        ChangePage({selected:0});
      }
    }, error => {
      console.log('error', error);
    })
    // count t???ng s??? qu??? ?????t
    // await esriRequest(Url + "/query", ThongtinJson, results => {
    //   if (results.data) { 
    //     var param_chiatrang = {
    //       total: results.data.count,
    //       resultPage: 10
    //     }
    //     setPageCount(chiaTrang(param_chiatrang));
    //     ChangePage({selected:0});
    //   }
     
    // }, error => {
    //   console.log('error', error);
    // })

    var ThongtinJson2 = {
      f: 'json',
      outFields: ['*'],
      returnGeometry: true,
      spatialRel: 'esriSpatialRelIntersects',
      outSR: jimuMapView.view.spatialReference.wkid,
      where: returnWhere(),
      resultOffset: 0,
      resultRecordCount: 10,
      featureEncoding: 'esriDefault'
    };

    // ph??n trang
    await queryThongTinJson(Url + "/query", ThongtinJson2, 1);

    const _params = {
      f: 'json',
      outFields: [],
      returnGeometry: true,
      spatialRel: 'esriSpatialRelIntersects',
      outSR: jimuMapView.view.spatialReference.wkid,
      where: returnWhere(),
      featureEncoding: 'esriDefault'
    };

    // 1=1
    await queryZoomToDuAn(Url, _params);
  }

  // Query v?? zoom
  const queryZoomToDuAn = async (url, _params) => { 
    jimuMapView.view.graphics.removeAll()
    await EsriRequest(url + '/query', _params, "GET", async res => { 
      //console.log('queryZoomToDuAn', results);
      if (res.features.length) { 
        for (var i = 0; i < res.features.length; i++) {
          // console.log(results.data.features[i])
          var myQuyDat = res.features[i].geometry;
          let geometry_type = null;
          let Symbol = null;
          if (myQuyDat) { 
            //set ki???u type
            if(res.geometryType === 'esriGeometryPolygon'){
              var polygonJson = {
                hasZ: true,
                hasM: true,
                rings: myQuyDat.rings,
                spatialReference: {
                  wkid : jimuMapView.view.spatialReference.wkid
                }
              };
               geometry_type = new Polygon(polygonJson);
              Symbol = {
                type: "simple-fill",
                color: [255, 255, 0, 0.25],  // Orange, opacity 80% [227, 139, 79, 0.8]
                outline: {
                    color: [227, 139, 79, 0.8],//[255, 255, 255]
                    width: 1
                }
              }
            } else if(res.geometryType ==='esriGeometryPoint'){
              geometry_type = { //Create a point
                type: "point",
                longitude: myQuyDat.longitude,
                latitude: myQuyDat.latitude,
                spatialReference: {
                  wkid : jimuMapView.view.spatialReference.wkid
                }
              };
              Symbol = {
                type: "simple-marker",
                color: [226, 119, 40],  // Orange
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
             };
            } else if(res.geometryType ==='esriGeometryPolyline'){ 
              var polylineJson = {
                hasZ: false,
                hasM: true,
                paths: myQuyDat.paths,
                spatialReference: {
                  wkid : jimuMapView.view.spatialReference.wkid
                }
              };
               geometry_type = new Polyline(polylineJson);
               Symbol = {
                type: "simple-line",
                color: [226, 119, 40], // Orange
                width: 2
              };
            }
           
            //  console.log('Symbol', Symbol)
            var green = new Graphic({
              geometry: geometry_type,
              symbol: Symbol,
            })

            jimuMapView.view.graphics.add(green);

             let picSymbol: any = {
                type: "picture-marker",
                url: BoxPin1,
                width: "50px",
                height: "42px"
              };

              const graphic_picture = new Graphic({
                geometry: geometry_type,
                symbol: picSymbol,
              });
        
            jimuMapView.view.graphics.add(graphic_picture);
          }
          // set STT label
          let thuTu = i + 1;
          let myTextSymbol = {
            type: "text", 
            color: [10, 10, 10, 1],
            haloColor: [255,255,255,1],
            haloSize: "1px",
            text: thuTu,
            xoffset: 1,
            yoffset: 3,
            font: { 
              family: "Times New Roman",
              size: 9,
              weight: "bold"
            }
          };
         
          jimuMapView.view.graphics.add(new Graphic({
            geometry: geometry_type,
            symbol: myTextSymbol
          }));
        };
      }
    }, error => {
      console.log('error', error);
  })

  }
  
// ph??n trang
  const queryThongTinJson = async (url, ThongtinJson, soluongpage) => {
    setLoading(true);
    await EsriRequest(url + '/query', ThongtinJson, "GET", async res => { 
     // console.log('queryThongTinJson', results);
      if (res.features) { 
        const feats = res.features;
        percentLand(feats, res.fields, soluongpage);
        setLoading(false);
      }
    }, error => {
      console.log('error', error);
      setLoading(false);
    })
  }

  //show d??? li???u ra table
  const percentLand = (evt, i, soluongpage) => {
    const dataTableResult = [];
    const FieldList = [];
    
    i.forEach(element => {
        var a = DS_Table.filter(fil => fil.field === element.name);
      if (a && a.length > 0) {
        FieldList.push(element);
      }
    });

    var stt = 0;
    if (soluongpage != undefined) {
      stt += ((soluongpage - 1) * 10) +1;
    }
    evt.forEach(feat => {
      var STT = stt++;
      const obj = {};
      FieldList.forEach(e => { 
          obj[e.name] = feat.attributes[e.name],
          obj['key'] = STT;
          obj['ThaoTac'] = {feat,i};
      })
      dataTableResult.push(obj);
    })

    SetDataTable(dataTableResult);
  }

// thao t??c b???ng Qu??? d???t l???n
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
         {
          (rowData.ThaoTac.feat.attributes.TEPTIN !== null && rowData.ThaoTac.feat.attributes.TEPTIN !== "")?<Button icon="pi pi-arrow-down" className="p-button-rounded p-button-text" onClick={() => DowloadTepTin(rowData)} />: <div className="field col-3 md:col-2 combo"></div>
        }
      </React.Fragment>
    );
  }
/// Danh s??ch thao t??c c???a  List of comments
  const actionBodyTemplate_Listofcomments = (rowData) => {
    return (
      <React.Fragment>
        {
          (rowData.ThaoTac.feat.attributes.FILEDINHKEM !== null)?<Button icon="pi pi-arrow-down" className="p-button-rounded p-button-text" onClick={() => ShowFile_Listofcomments(rowData)} />: <div className="field col-3 md:col-2 combo"></div>
        }
        
      </React.Fragment>
    );
  }

  // Click file ????nh k??m c???a DS ?? ki???n
  const ShowFile_Listofcomments= async (rowData) => { 
    window.open(rowData.ThaoTac.feat.attributes.FILEDINHKEM);
  }
// Click ph?? duy???t c???a DS ?? ki???n
  const ApproveProduct_Listofcomments= async (rowData) => { 
   // console.log(rowData, where_OBJECTID);
    setmessageConfirm("Ph?? duy???t ?? ki???n");
    setVisible_Land(true);
    var obj = {
      Url : Config.layerUrls.DS_YKien_QD_FeatureServer,
      OBJECTID:  rowData.ThaoTac.feat.attributes.OBJECTID,
      Type: "Approve",
      Search: "?? ki???n",
      Data: rowData.ThaoTac
    };
    setDtaLandClick(obj);
  }

  // click X??a c???a DS ?? ki???n
  const confirmDeleteProduct_Listofcomments= async (rowData) => { 
    //console.log(rowData, where_OBJECTID)
    setmessageConfirm("X??a d??? li???u");
    setVisible_Land(true);
    var obj = {
      Url : Config.layerUrls.DS_YKien_QD_FeatureServer,
      OBJECTID:  rowData.ThaoTac.feat.attributes.OBJECTID,
      Type: "Delete",
      Search: "?? ki???n",
      Data: rowData.ThaoTac
    };
    setDtaLandClick(obj);
  }

  // Zoom d??? ??n khi click
  const zoomToDuAn_Click = async (rowData) => { 
    // jimuMapView.view.graphics.removeAll()
    // console.log('highlightGeometry', highlightGeometry);
    if (highlightGeometry.current) {
      jimuMapView.view.graphics.remove(highlightGeometry.current);
    }

    if(rowData.ThaoTac.feat.geometry){
      var myQuyDat = rowData.ThaoTac.feat.geometry;
      let geometry_type = null;
  
      var polygonJson = {
        hasZ: true,
        hasM: true,
        rings: myQuyDat.rings,
        spatialReference: {
          wkid : jimuMapView.view.spatialReference.wkid
        }
      };
  
      const _Symbol = {
        type: "simple-fill",
        color: [247, 245, 242, 0],
        outline: {
            color:  [36, 211, 233, 1],
            width: 1.5
        }
      }
    
       geometry_type = new Polygon(polygonJson);
  
       highlightGeometry.current = new Graphic({
        geometry: geometry_type,
        symbol: _Symbol,
      })
      jimuMapView.view.graphics.add(highlightGeometry.current);
      jimuMapView.view.goTo(geometry_type);
      
    }
    
 
    // let myTextSymbol = {
    //   type: "text", 
    //   color: [10, 10, 10, 1],
    //   haloColor: [255,255,255,1],
    //   haloSize: "1px",
    //   text: rowData.key,
    //   xoffset: 1,
    //   yoffset: 3,
    //   font: { 
    //     family: "Times New Roman",
    //     size: 9,
    //     weight: "bold"
    //   }
    // };

    // jimuMapView.view.graphics.add(new Graphic({
    //   geometry: geometry_type,
    //   symbol: myTextSymbol
    // }));
    

  }

  
  // qurry l???y d??? li???u c???a DS ?? ki???n
  const queryListofcomments = async (_where) => { 
    _where = _where + " AND PHEDUYET=1";
    console.log(_where);
    const _params = {
      outFields: ["*"],
      returnGeometry: true,
      where: _where,
      // returnCountOnly: true
    };
    await esriQueryTask(Config.layerUrls.DS_YKien_QD, _params, results => {
      //console.log('queryListofcomments', results);
      if(results){
        percentLandListofcomments(results.features, results.fields,results.features.length);
      }
    }, error => {
      console.log('error', error);
    })
  }

   //show d??? li???u ra table danh s??ch ?? ki???n
   const percentLandListofcomments = (evt, i, soluongpage) => {
    const dataTableResult = [];
    const FieldListofcomments = [];
    i.forEach(element => {
      const a = Config.DS_TableListofcomments.filter(fil => fil.field === element.name);
      if (a && a.length > 0) {
        FieldListofcomments.push(element);
      }
    });

    // console.log(FieldList);
    // var stt = 1;
    var stt = 0;
    if (soluongpage != undefined) {
      // stt += (soluongpage - 1) * 10;
      stt +=1;
    }
    evt.forEach(feat => {
     var STT = stt++;
      const obj = {};
      FieldListofcomments.forEach(e => { 
        (e.name !=='PHEDUYET')? obj[e.name] = feat.attributes[e.name]:((feat.attributes[e.name]===1)?obj[e.name] = "???? duy???t":obj[e.name] = "Ch??a duy???t");
          // obj[e.name] = feat.attributes[e.name],
          obj['key'] = STT;
          obj['ThaoTac'] = {feat,i};
      })
      dataTableResult.push(obj);
    })
    // console.log('dataTableResult' ,dataTableResult)
    SetDataTableListofcomments(dataTableResult);
    //loadingRef.current.hideLoading();
  }

  // click edit Qu??? ?????t l???n
  const editProduct = (rowData) => {
    //console.log('editProduct', rowData);
    setDtaTableLandClick(rowData);
    zoomToDuAn_Click(rowData);
    dialogFuncMap[`${'displayConfirm'}`](true);
   
  }

  const DowloadTepTin= (rowData) => { 
    //console.log(rowData);
    window.open(rowData.ThaoTac.feat.attributes.TEPTIN);
    // dialogFuncMap[`${'displayAdd'}`](true);
    // setDtaTableLandClick(rowData);
  }

  // click X??a Qu??? ?????t l???n
  const confirmDeleteProduct = (rowData) => {
    //console.log('confirmDeleteProduct', rowData)
    setmessageConfirm("X??a d??? li???u");
    setVisible_Land(true)
   
      var url = Config.layerUrls.urlQuyDat_FeatureServer;
    
    var obj = {
      Url : url,
      OBJECTID:  rowData.ThaoTac.feat.attributes.OBJECTID,
      Type: "Delete",
      Search: "Qu??? ?????t",
      Data: rowData.ThaoTac
    };
    setDtaLandClick(obj);
  }


  /// th??ng b??o
  const toastFunc = (Severity,Detail) => { 
    if (Severity == 'success') {
      var _Severity = 'success';
      var _Summary = 'Success Message';
    } else if(Severity == 'error'){ 
      var _Severity = 'error';
      var _Summary = 'Error Message';
    } else if(Severity == 'info'){ 
      var _Severity = 'info';
      var _Summary = 'Info Message';
    } else if(Severity == 'error'){ 
      var _Severity = 'warn';
      var _Summary = 'Warn Message';
    }

    toast.current.show({severity: _Severity, summary: _Summary, detail:Detail, life: 3000});
  }
  // ?????ng ??
  const acceptFunc = () => {
    //console.log('where_OBJECTID',where_OBJECTID);
    //console.log('DtaLandClick', DtaLandClick);
    setVisible_Land(false)
    if (DtaLandClick.Type==="Delete"){
      var ThongtinJson = {
        f: 'json',
        objectIds: Number(DtaLandClick.OBJECTID),
        method:"post",
      };
      //console.log('ThongtinJson', ThongtinJson)
     
      esriRequest(DtaLandClick.Url + "/deleteFeatures", ThongtinJson, results => {
        //console.log('results',results)
        if(results.data.deleteResults[0].success){
          toastFunc('success', 'X??a th??nh c??ng !!!')
          if(DtaLandClick.Search==="Qu??? ?????t"){
            TimKiemQuyDat();
          } else {
            SetSelectedListofcomments({code: 'ALL', name: 'T???t c???'});
            queryListofcomments(where_OBJECTID);
          }
      
        } else {
          toastFunc('error', 'X???y ra l???i,xin th??? l???i !!!')
        }
        
      }, error => {
        console.log('error', error);
        toastFunc('error','X???y ra l???i,xin th??? l???i !!!')
        
      })
    } else{
      var param ={"attributes":{"OBJECTID":Number(DtaLandClick.OBJECTID),"PHEDUYET":"1"}}
      var ThongtinJson2 = {
        f: 'json',
        features: JSON.stringify([param]),
        method:"post",
        responseType: "json",
      };

       esriRequest(DtaLandClick.Url + "/updateFeatures", ThongtinJson2, results => {
        //console.log('results',results)
        if(results.data.updateResults[0].success){
          toastFunc('success', 'Ph?? duy???t th??nh c??ng !!!')
          queryListofcomments(where_OBJECTID);
        } else {
          toastFunc('error', 'X???y ra l???i,xin th??? l???i !!!')
        }
        
      }, error => {
        console.log('error', error);
        toastFunc('error', 'X???y ra l???i,xin th??? l???i !!!')
      })

    }
  }

  // kh??ng ?????ng ?? 
  const rejectFunc = () => {
    setVisible_Land(false)
    dialogFuncMap[`${'displayConfirm'}`](false);
    dialogFuncMap[`${'displayAdd'}`](false);
  }

  const chiaTrang = (param) => {
    var TongBanGhi = param.total;
    var SoBanGhiTrenMotTrang = param.resultPage;
    var TongTrang = (TongBanGhi % SoBanGhiTrenMotTrang == 0) ? (TongBanGhi / SoBanGhiTrenMotTrang) : (Math.floor(TongBanGhi / SoBanGhiTrenMotTrang) + 1);
    return TongTrang;
  };

  const template1 = {
    layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
    'PrevPageLink': (options) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                <span className="p-3"><i className="pi pi-chevron-left"></i></span>
                <Ripple />
            </button>
        )
    },
    'NextPageLink': (options) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                <span className="p-3"><i className="pi pi-chevron-right"></i></span>
                <Ripple />
            </button>
        )
    },
    'PageLinks': (options) => {
        if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
            const className = classNames(options.className, { 'p-disabled': true });

            return <span className={className} style={{ userSelect: 'none' }}>...</span>;
        }

        return (
            <button type="button" className={options.className} onClick={options.onClick}>
                {options.page + 1}
                <Ripple />
            </button>
        )
    }
};



const onCustomPage1 = (event) => {
  setFirst1(event.first);
  setRows1(event.rows);
  setCurrentPage(event.page + 1);
}



// t???t dialog
const onHide = (name) => {
  dialogFuncMap[`${name}`](false);
}
//G???i khi hi???n th??? xong dialog
const onShow = () => {
 //console.log('DtaTableLandClick', DtaTableLandClick);
 const Attributes = DtaTableLandClick.ThaoTac.feat.attributes;
 var param = {};

 DtaTableLandClick.ThaoTac.i.forEach(element => {
   // console.log(param["attributes"][element.name])
   if(element.type === "esriFieldTypeInteger" ) {
    if(Attributes[element.name] == null || Attributes[element.name] == undefined){
      param[element.name] = '';
    }else{
      param[element.name] = Attributes[element.name].toString();
     
    }
     //Number(Attributes[element.name])

   } else {
     param[element.name] = Attributes[element.name];
   }
 });

  //console.log('param', param)
 
  setTimeout(() => {
    if (refForm.current) {
      
      refForm.current.onBindData(param);
    } else {
      onShow()
    }
  }, 800);
}

const onShowPrint= async () =>{
  // console.log('MapElement', MapElement);
  setDisplay(true);  
  //console.log('DtaTableLandClick', DtaTableLandClick);
  var polygonJson = {
    hasZ: true,
    hasM: true,
    rings: DtaTableLandClick.ThaoTac.feat.geometry.rings,
    spatialReference: {
      wkid : jimuMapView.view.spatialReference.wkid
    }
  };

   const geometry_type = new Polygon(polygonJson);
  const map = new Map({
    basemap: "topo-vector"
  });
  
  const view = new MapView({
    container: MapElement.current,
    map: map,
    extent: geometry_type.extent,
    // center: [-86.049, 38.485],
    zoom: 3
  });
    
  view.goTo(geometry_type);
   view.when(() => {
    const featureLayer = new FeatureLayer({
      source:[],
      fields: [{
        name: "ChieuDai",
        alias: "ChieuDai",
        type: "string"
      }],
      title: "",
      objectIdField: "OBJECTID",
      geometryType: "polyline",
    //  labelingInfo: [statesLabelClass]
    });
  
    const featureLayer2 = new FeatureLayer({
      source:[],
      fields: [{
        name: "ChieuDai",
        alias: "ChieuDai",
        type: "string"
      }],
      title: "",
      objectIdField: "OBJECTID", 
      geometryType: "polyline",
      // labelingInfo: [statesLabelClass]
    });
   

    for (let index = 0; index < DtaTableLandClick.ThaoTac.feat.geometry.rings[0].length - 1; index++) {
      const element = DtaTableLandClick.ThaoTac.feat.geometry.rings[0][index];
      const nextElement = DtaTableLandClick.ThaoTac.feat.geometry.rings[0][index + 1];
      let point1 = new Point({
          x: element[0],
          y: element[1],
          spatialReference: { wkid: 102100 }
      });
      point1 = projection.project(point1, { wkid: 4326 });
      let point2 = new Point({
          x: nextElement[0],
          y: nextElement[1],
          spatialReference: { wkid: 102100 }
      });
      point2 = projection.project(point2, { wkid: 4326 });
      const distance = geodesicUtils.geodesicDistance(point1, point2, "meters");
      const lengths = distance.distance.toFixed(2); 
      const attributes = {};
      attributes["ChieuDai"] = lengths + " m";

      const polyline = new Polyline({
        hasZ: false,
        hasM: false,
        paths: [
          [element[0], element[1]],
          [nextElement[0], nextElement[1]]
      ],
        spatialReference: { wkid: 102100 }
      });
     
      const graphic = new Graphic({
        geometry: polyline,
        attributes: attributes
      });
      // view.graphics.add(graphic);
  
      var kiemTra = (polyline.paths[0][1][0] - polyline.paths[0][0][0])
     
      if (kiemTra > 0) {
        //console.log(">0",kiemTra)
        featureLayer.applyEdits({
          addFeatures: [graphic]
        })
      } else {
        featureLayer2.applyEdits({
          addFeatures: [graphic]
        })
      }
    
  }
  
    const statesLabelClass = new LabelClass({
      symbol: {
        type: "text",
        color: "black",
        haloSize: 1,
        haloColor: "white",
      },
      labelPlacement: "below-right",//
      labelExpressionInfo: { expression: "$feature.ChieuDai" },
      maxScale: 0,
      minScale: 25000000,
      
    });
    //console.log('a')
    featureLayer.labelingInfo = [ statesLabelClass ];
    featureLayer2.labelingInfo = [ statesLabelClass ];
  
    map.addMany([featureLayer]);
    map.addMany([featureLayer2]);
    setMapView(view)
    setDisplay(false);  
    // setTimeout(() => {
    //    printParcel(view);
    // }, 1500);
    
  }).catch((err: any) => {
      console.error("MapView rejected:", err);
  });
  
  
}



const dialogFuncMap = {
  'displayBasic': setDisplayBasic,
  'displayConfirm':setDisplayConfirm,
  'displayPrint': setDisplayPrint,
  'displayAddComment': setDisplayAddComment,
  'displayAdd': setDisplayAdd,
}


// click ok CoreForm
const onBtnOkClick= (e) => { 
 //console.log(e);
 var param = {};
 param["attributes"] = {};
 param["attributes"]["OBJECTID"]=DtaTableLandClick.ThaoTac.feat.attributes.OBJECTID;
 // console.log(param)
 DtaTableLandClick.ThaoTac.i.forEach(element => {
   // console.log(param["attributes"][element.name])
   if(e[element.name] === null || e[element.name] === undefined) {
    //  param["attributes"][element.name] = '';
   } else if (e[element.name].code){
     param["attributes"][element.name] = e[element.name].code;
   } else {
     param["attributes"][element.name] = e[element.name];
   }
 });

//console.log(param);
  
    var url = Config.layerUrls.urlQuyDat_FeatureServer;
 
  var ThongtinJson = {
    f: 'json',
    features: JSON.stringify([param]),
    method:"post",
    responseType: "json",
  };

   esriRequest(url + "/updateFeatures", ThongtinJson, results => {
    // console.log('onBtnOkClick',results)
    if(results.data.updateResults[0].success){
      toastFunc('success', 'S???a th??ng tin th??nh c??ng !!!');
      dialogFuncMap[`${'displayConfirm'}`](false);
      TimKiemQuyDat();
    } else {
      toastFunc('error', 'X???y ra l???i,xin th??? l???i !!!')
    }
    
  }, error => {
    console.log('error', error);
    toastFunc('error', 'X???y ra l???i,xin th??? l???i !!!')
  })

}
// click Clear CoreForm
const onClearCallBack = () => {
  //console.log('DtaTableLandClick', DtaTableLandClick);
  const Attributes = DtaTableLandClick.ThaoTac.feat.attributes;
 var param = {};

 DtaTableLandClick.ThaoTac.i.forEach(element => {
   // console.log(param["attributes"][element.name])
   if(element.type === "esriFieldTypeInteger" ) {
    if(Attributes[element.name] == null || Attributes[element.name] == undefined){
      param[element.name] = '';
    }else{
      param[element.name] = Attributes[element.name].toString();
     
    }
     //Number(Attributes[element.name])

   } else {
     param[element.name] = Attributes[element.name];
   }
 });

  //console.log('param', param)
  setTimeout(function () {
    if (refForm.current) {
      //const Attributes = DtaTableLandClick.ThaoTac.feat.attributes;
      refForm.current.onBindData(param);
    } else {
      onClearCallBack()
    }
  }, 200)
}

//th??m m???i qu??? ?????t
const onBtnOkAddClick= (e) => { 
  //console.log('e', e)
  var param = {};
  param["attributes"] = {};
  DtaTableLandClick.ThaoTac.i.forEach(element => {
    // console.log(param["attributes"][element.name])
    if(element.name !='OBJECTID'){
      if(e[element.name] === null || e[element.name] === undefined) {
        // param["attributes"][element.name] = '';
      } else if (e[element.name].code){
        param["attributes"][element.name] = e[element.name].code;
      } else {
        param["attributes"][element.name] = e[element.name];
      }
    }
   
  });
  //console.log(param)
  
    var url = Config.layerUrls.urlQuyDat_FeatureServer;
 
  var ThongtinJson = {
    f: 'json',
    features: JSON.stringify([param]),
    method:"post",
    responseType: "json",
  };
  
  esriRequest(url + "/addFeatures", ThongtinJson, results => {
    // console.log('onBtnOkClick',results)
    if(results.data.addResults[0].success){
      toastFunc('success', 'Th??m th??ng tin th??nh c??ng !!!');
      dialogFuncMap[`${'displayConfirm'}`](false);
      TimKiemQuyDat();
    } else {
      toastFunc('error', 'X???y ra l???i,xin th??? l???i !!!')
    }
    
  }, error => {
    console.log('error', error);
    toastFunc('error', 'X???y ra l???i,xin th??? l???i !!!')
  })

}

const onBtnAddCommentClick = (e) => { 
  //console.log('onBtnAddCommentClick', e)
  var param = {};
  param["attributes"] = e;
  param["attributes"]["ID_DUAN"]=DtaTableLandClick.ThaoTac.feat.attributes.OBJECTID;
  param["attributes"]["PHEDUYET"] = 0;
  //console.log(param);
  var url = Config.layerUrls.DS_YKien_QD_FeatureServer;
 
  var ThongtinJson = {
    f: 'json',
    features: JSON.stringify([param]),
    method:"post",
    responseType: "json",
  };
  
  esriRequest(url + "/addFeatures", ThongtinJson, results => {
    // console.log('onBtnOkClick',results)
    if(results.data.addResults[0].success){
      toastFunc('success', 'Th??m m???i th??nh c??ng !!!');
      let _where = "ID_DUAN= "+ DtaTableLandClick.ThaoTac.feat.attributes.OBJECTID;
      queryListofcomments(_where);
      dialogFuncMap[`${'displayAddComment'}`](false);
    } else {
      toastFunc('error', 'X???y ra l???i,xin th??? l???i !!!')
    }
    
  }, error => {
    console.log('error', error);
    toastFunc('error', 'X???y ra l???i,xin th??? l???i !!!')
  })
 }

 /** X??a d??? li???u tr??n control */
 const onClear = (e) => {
  const obj = {};
  const typeCheck = ['select', 'date'];
 
  
    fieldList.forEach(element => {
      obj[element.FIELD_NAME] = null;
      if (!typeCheck.includes(element.FIELD_TYPE)) { // N???u field type kh??ng n???m trong type Check
          obj[element.FIELD_NAME] = '';
      }
  });
    setCurrentValue(obj);

  // props.onClearCallBack();
}

const onChangeListofcomments= (e) => {
  SetSelectedListofcomments(e.target.value);
 // console.log(e.target.value, where_OBJECTID);
  let _where;
 (e.target.value.code === "ALL")?_where = where_OBJECTID : _where = where_OBJECTID + " AND PHEDUYET=" + e.target.value.code;

  queryListofcomments(_where);
}

const AddComments = async() => { 
  
  dialogFuncMap[`${'displayAddComment'}`](true);
}
 
const PrintPhieu = async() => {
  //console.log('DtaTableLandClick',DtaTableLandClick);
  if (DtaTableLandClick.ThaoTac.feat.geometry !== undefined){
    dialogFuncMap[`${'displayPrint'}`](true);

    var polygonJson = {
      hasZ: true,
      hasM: true,
      rings: DtaTableLandClick.ThaoTac.feat.geometry.rings,
      spatialReference: {
        wkid : jimuMapView.view.spatialReference.wkid
      }
    };
  
     const geometry_type = new Polygon(polygonJson);
  
    jimuMapView.view.goTo(geometry_type);
  }

  

}

const createDataPrinting= async (isExported = false) => {
   printParcel(Map_View, isExported);
}

const printParcel =async (view, isExported) => {
  setDisplay(true);  
  const urlPrinTask = 'https://gisun.esrivn.net/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';
  var template = new PrintTemplate({
    format: "png8",
    exportOptions: {
      dpi: 50
    },
    layout: "letter-ansi-a-landscape",
    layoutOptions: {
      titleText: "S?? ????? th???a ?????t",
      authorText: "",
      copyrightText:"",
      legendLayers : [],
      customTextElements: [],
    },
    showLabels: false
   });

   var params = new PrintParameters({
    view:  view,
    template: template
   });
   await printTask(urlPrinTask, params, res => {
    
    if (res &&  res.url) {
      //console.log('res', res.url)
      setDisplay(false);  
      xuatPhieuThongTin(isExported, res.url);
    } else{
      setDisplay(false);  
    }
    
  }, err => {
    console.log('err', err);
    setDisplay(false);  
  });
  
}

const xuatPhieuThongTin= (isExported, url) =>{
  //console.log(DtaTableLandClick);
  var data = DtaTableLandClick.ThaoTac.feat.attributes;

  var txtTENDUAN = (data.TENDUAN) ? data.TENDUAN : '';
  var txtMADUAN = (data.MADUAN) ? data.MADUAN : '';
  var txtKYHIEU = (data.KYHIEU) ? data.KYHIEU : '';
  var txtMAKHUDAT = (data.MALODAT) ? data.MALODAT : '';
  var txtTENHUYEN = (data.TENHUYEN) ? data.TENHUYEN : '';
  var txtTENXA = (data.TENXA) ? data.TENXA : '';
  var txtSOTO = (data.SOTO) ? data.SOTO : '';
  var txtSOTHUA = (data.SOTHUA) ? data.SOTHUA : '';
  var txtDIACHI = (data.DIACHI) ? data.DIACHI : '';
  var txtDIENTICH = (data.DIENTICH) ? data.DIENTICH : '';
  var txtTANGCAO = (data.TANGCAO) ? data.TANGCAO : '';
  var txtMATDO = (data.MATDO) ? data.MATDO : '';
  var txtCHIEUCAOXD = (data.CHIEUCAO_CT) ? data.CHIEUCAO_CT : '';
  var txtHESOSDD = (data.HESO) ? data.HESO : '';
  var txtKHOANGLUI = (data.KHOANGLUI) ? data.KHOANGLUI : '';
  var txtDKHTKTLQ = (data.DKHTKTLQ) ? data.DKHTKTLQ : '';
  var txtCCTQHK = (data.CHITIETKHAC) ? data.CHITIETKHAC : '';
  var txtHIENTRANG = (data.HIENTRANG) ? data.HIENTRANG : '';
  var txtQHCT = (data.QUYHOACH_CT) ? data.QUYHOACH_CT : '';
  var txtQHPK = (data.QUYHOACH_PK) ? data.QUYHOACH_PK : '';
  var txtQHCHUNG = (data.QUYHOACH_CHUNG) ? data.QUYHOACH_CHUNG : '';
  var txtKHSDD = (data.THEO_KHSDD) ? data.THEO_KHSDD : '';
  var txtCTSDD = (data.CHUTRUONGSDD) ? data.CHUTRUONGSDD : '';
  var txtKHKT = (data.KEHOACHKHAITHAC) ? data.KEHOACHKHAITHAC : '';
  var txtQDPDDM = (data.PHEDUYET) ? data.PHEDUYET : '';
  var txtPADG = (data.PHUONGANDAUGIA) ? data.PHUONGANDAUGIA : '';
  var txtQDDG = (data.QD_DAUGIA) ? data.QD_DAUGIA : '';
  var txtHTTT = (data.TEN_HTTT) ? data.TEN_HTTT : '';
  var txtDGKD = (data.DONGIA_KHOIDIEM) ? data.DONGIA_KHOIDIEM : '';
  var txtGHICHU = (data.GHICHU) ? data.GHICHU : '';
  //
  // generate content by html css
  var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title><style>	td { vertical-align: top }</style></head><body>";
  var endHtml = "</body></html>";
  var stringContent = `<div style='width: 21cm; margin: 0 auto;'>
      <center style='font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; margin: 2cm 2cm 2cm 3cm'>
          <table style='width: 100%; font-size:12pt'>
              <tr>
                  <td style='width:48%'>
                      <center>
                          <p style="font-size: 10pt">
                              <span>S??? T??I NGUY??N V?? M??I TR?????NG</span>
                              <br/><span>TH??NH PH??? ???? N???NG</span>
                              <br/><span style="font-weight: bold">TRUNG T??M PH??T TRI???N QU??? ?????T</span>
                              <br/><span>_____________</span>
                              <br/><span style="margin: 5pt 0;display: block; font-size:12pt;">S???:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/TTPTQ??-</span>
                          </p>
                      </center>
                  </td>
                  <td style='width:52%'>
                      <center>
                          <p style="font-size: 10pt">
                              <span style="font-weight: bold">C???NG H??A X?? H???I CH??? NGH??A VI???T NAM</span>
                              <br/><span style="font-weight: bold; font-size: 12pt">?????c l???p - T??? do - H???nh ph??c</span>
                              <br/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                              <br/><span>_____________</span>
                              <br/><span style="font-size: 12pt"><i>???? N???ng, ng??y ..... th??ng ..... n??m .......</i></span>
                          </p>
                      </center>
                  </td>
              </tr>
          </table>

          <table style='width:100%; font-size: 13pt'>
              <tr>
                  <td colspan="2" style="text-align: center;">
                      <div style="font-size: 14pt; font-weight: bold"><br/>
                      PHI???U CUNG C???P TH??NG TIN L?? ?????T
                          <center>
                          <span style="display: block;height: 1px;border-top: 1px solid;width: 35%;"></span>
                          </center>
                      </div>
                      <br/>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="text-align: center;">
                  <br/>K??nh g???i:.................
                  </td>
              </tr>
              <tr>
                  <td colspan="2">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trung t??m Ph??t tri???n qu??? ?????t th??nh ph??? ???? N???ng cung c???p phi???u th??ng tin t???ng h???p c???a khu ?????t (l?? ?????t) ph???c v??? k??u g???i ?????u t?? nh?? sau:</span>
                  </td>
              </tr>
          </table>

          <table style='width:100%; font-size: 13pt;'>
              <tr>
                  <td colspan="2">
                      <strong>I. H??nh th???, v??? tr?? l?? ?????t:</strong>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="text-align: center;">
                      <img style='border:solid; with:300px' src='${url}' />
                  </td>
              </tr>
              
              <tr>
                  <td colspan="2">
                      <strong>II. Th??ng tin khu ?????t, d??? ??n:</strong>
                  </td>
              </tr>
              
              <tr>
                  <td style='width:50%'>
                      - T??n d??? ??n: ${txtTENDUAN}
                  </td>
                  <td style='width:50%'>
                      - M?? d??? ??n: ${txtMADUAN}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - K?? hi???u: ${txtKYHIEU}
                  </td>
                  <td style='width:50%'>
                      - M?? khu ?????t: ${txtMAKHUDAT}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Qu???n, huy???n: ${txtTENHUYEN}
                  </td>
                  <td style='width:50%'>
                      - X??, ph?????ng: ${txtTENXA}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - S??? t???: ${txtSOTO}
                  </td>
                  <td style='width:50%'>
                      - S??? th???a: ${txtSOTHUA}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - ?????a ch???: ${txtDIACHI}
                  </td>
                  <td style='width:50%'>
                      - Di???n t??ch: ${txtDIENTICH}
                  </td>
              </tr>
              
              <tr>
                  <td colspan="2">
                      <strong>III. Th??ng tin, ch??? ti??u quy ho???ch:</strong>
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - T???ng cao c??ng tr??nh: ${txtTANGCAO}
                  </td>
                  <td style='width:50%'>
                      - Hi???n tr???ng khu ?????t: ${txtHIENTRANG}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - M???t ????? x??y d???ng: ${txtMATDO}
                  </td>
                  <td style='width:50%'>
                      - M???c ????ch s??? d???ng ?????t:
                  </td>
              </tr>
              
              <tr>
                  <td style='width:50%'>
                      - Chi???u cao x??y d???ng: ${txtCHIEUCAOXD}
                  </td>
                  <td style='width:50%;'>
                      &nbsp;+ QH chi ti???t: ${txtQHCT}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - H??? s??? s??? d???ng ?????t: ${txtHESOSDD}
                  </td>
                  <td style='width:50%'>
                      &nbsp;+ QH ph??n khu: ${txtQHPK}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Kho???ng l??i: ${txtKHOANGLUI}
                  </td>
                  <td style='width:50%'>
                      &nbsp;+ QH chung: ${txtQHCHUNG}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - ??i???u ki???n HTKT li??n quan: ${txtDKHTKTLQ}
                  </td>
                  <td style='width:50%'>
                      - K??? ho???ch s??? d???ng ?????t: ${txtKHSDD}
                  </td>
              </tr>
              <tr>
                  <td colspan="2">
                      - C??c ch??? ti??u quy ho???ch kh??c: ${txtCCTQHK}
                  </td>
              </tr>
              
              <tr>
                  <td colspan="2">
                      <strong>IV. Ch??? tr????ng s??? d???ng ?????t v?? k??u g???i ?????u t??:</strong>
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Ch??? tr????ng SD??: ${txtCTSDD}
                  </td>
                  <td style='width:50%'>
                      - K??? ho???ch khai th??c: ${txtKHKT}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Q?? ph?? duy???t danh m???c: ${txtQDPDDM}
                  </td>
                  <td style='width:50%'>
                      - Ph????ng ??n ?????u gi??: ${txtPADG}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Q?? ?????u gi??: ${txtQDDG}
                  </td>
                  <td style='width:50%'>
                      - H??nh th???c thu ti???n: ${txtHTTT}
                  </td>
              </tr>
              <tr>
                  <td colspan="2">- ????n gi?? kh???i ??i???m: ${txtDGKD}</td>
              </tr>
              <tr>
                  <td colspan='2'>
                      - Ghi ch??: ${txtGHICHU}
                  </td>
              </tr>
              </table>
          <table style='width:100%; font-size: 13pt;'>
              <tr>
                  <td colspan='2'>
                  <br>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tr??n ????y l?? t???ng h???p th??ng tin v??? l?? ?????t k??u g???i ?????u t?? c???a S??? T??i nguy??n v?? M??i tr?????ng ???? N???ng./.</span>
                  </td>
              </tr>
              <tr>
                  <td colspan='2'>
                      <br>
                  </td>
              </tr>
              <tr>
                  <td style='width:50%; font-size:10pt'>
                  <i><strong>N??i nh???n;</strong>
                  <br/>-Nh?? tr??n;
                  <br/>-STNMT(b??o c??o);
                  <br/>-L??u: VT, ......;
                  </i>
                  </td>
                  <td style='width:50%;'>
                  <center>
                  <p><strong>GI??M ?????C</strong><br><i>(K??, ghi r?? h??? t??n v?? ????ng d???u)</i></p>
                  </center>
                  </td>
              </tr>
          </table>
      </center>
  </div>`;
  var html = preHtml + stringContent + endHtml;
  // 
  // export or view
  // if (isExported) {
      // xuat ra word
      var myBlob = new Blob(["\ufeff", html], {
          type: 'application/msword;charset=utf-8'
      });
      window.open(URL.createObjectURL(myBlob));
      window.close;
  // } else {
      var win = window.open();
      win.document.write(html);
      // win.close();
  // }
}


const ChangePage = ({ selected }) => {
  //console.log('selected', selected);
  setForcePage(selected);
  var pageQuery = ((selected+1) == 1) ? 0 : ((selected+1) - 1) * 10;
  // console.log(selected, pageQuery, returnWhere);
  if(jimuMapView){
    var Url;
    
      Url = Config.layerUrls.urlQuyDat;
    
    var ThongtinJson = {
      f: 'json',
      outFields: ['*'],
      returnGeometry: true,
      spatialRel: 'esriSpatialRelIntersects',
      outSR: jimuMapView.view.spatialReference.wkid,
      where: returnWhere(),
      resultOffset: pageQuery,
      resultRecordCount: 10
    };
    // console.log('ThongtinJson', ThongtinJson);
    queryThongTinJson(Url + "/query", ThongtinJson, (selected+1));
  }
  
};

// click table Qu??? ?????t l???n
const clickrowQuyDatLon = (selected) => { 
    //console.log('selected', selected,  );
    dialogFuncMap[`${'displayBasic'}`](true);
    setDtaTableLandClick(selected.data);
    zoomToDuAn_Click(selected.data);
    SetSelectedListofcomments({code: 'ALL', name: 'T???t c???'});

  
      setActiveIndex1(0)
      let _where = "ID_DUAN= "+selected.data.ThaoTac.feat.attributes.OBJECTID;
      setWhere_OBJECTID(_where);
      queryListofcomments(_where);
      var data = selected.data.ThaoTac.feat.attributes;
      var txtTENDUAN = (data.TENDUAN) ? data.TENDUAN : '';
      var txtMADUAN = (data.MADUAN) ? data.MADUAN : '';
      var txtKYHIEU = (data.KYHIEU) ? data.KYHIEU : '';
      var txtMAKHUDAT = (data.MALODAT) ? data.MALODAT : '';
      var txtTENHUYEN = (data.TENHUYEN) ? data.TENHUYEN : '';
      var txtTENXA = (data.TENXA) ? data.TENXA : '';
      var txtSOTO = (data.SOTO) ? data.SOTO : '';
      var txtSOTHUA = (data.SOTHUA) ? data.SOTHUA : '';
      var txtDIACHI = (data.DIACHI) ? data.DIACHI : '';
      var txtDIENTICH = (data.DIENTICH) ? data.DIENTICH : '';
      var txtTANGCAO = (data.TANGCAO) ? data.TANGCAO : '';
      var txtMATDO = (data.MATDO) ? data.MATDO : '';
      var txtCHIEUCAOXD = (data.CHIEUCAO_CT) ? data.CHIEUCAO_CT : '';
      var txtHESOSDD = (data.HESO) ? data.HESO : '';
      var txtKHOANGLUI = (data.KHOANGLUI) ? data.KHOANGLUI : '';
      var txtDKHTKTLQ = (data.DKHTKTLQ) ? data.DKHTKTLQ : '';
      var txtCCTQHK = (data.CHITIETKHAC) ? data.CHITIETKHAC : '';
      var txtHIENTRANG = (data.HIENTRANG) ? data.HIENTRANG : '';
      var txtQHCT = (data.QUYHOACH_CT) ? data.QUYHOACH_CT : '';
      var txtQHPK = (data.QUYHOACH_PK) ? data.QUYHOACH_PK : '';
      var txtQHCHUNG = (data.QUYHOACH_CHUNG) ? data.QUYHOACH_CHUNG : '';
      var txtKHSDD = (data.THEO_KHSDD) ? data.THEO_KHSDD : '';
      var txtCTSDD = (data.CHUTRUONGSDD) ? data.CHUTRUONGSDD : '';
      var txtKHKT = (data.KEHOACHKHAITHAC) ? data.KEHOACHKHAITHAC : '';
      var txtQDPDDM = (data.PHEDUYET) ? data.PHEDUYET : '';
      var txtPADG = (data.PHUONGANDAUGIA) ? data.PHUONGANDAUGIA : '';
      var txtQDDG = (data.QD_DAUGIA) ? data.QD_DAUGIA : '';
      var txtHTTT = (data.TEN_HTTT) ? data.TEN_HTTT : '';
      var txtDGKD = (data.DONGIA_KHOIDIEM) ? data.DONGIA_KHOIDIEM : '';
      var txtGHICHU = (data.GHICHU) ? data.GHICHU : '';
  
      var stringContent = `<div style='width: 100%; margin: 0 auto;'>
        <center style='font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; margin: 2'>
  
            <table style='width: 100%; font-size:10pt'>
              
                <tr>
                    <td colspan="2" style='width: 100%;
                    background: #ff9800b0 !important;
                    color: #ffffff;
                    margin-top: 0;
                    margin-bottom: 5px;
                    padding: 5px;
                    margin-top: 5px;
                    font-size: 10pt'>
                        <strong>I. Th??ng tin khu ?????t, d??? ??n:</strong>
                    </td>
                </tr>
                
                <tr class="">
                    <td style='width:50%'>
                        - T??n d??? ??n: <b> ${txtTENDUAN}</b>
                    </td>
                    <td style='width:50%'>
                        - M?? d??? ??n: <b>${txtMADUAN}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - K?? hi???u: <b>${txtKYHIEU}</b>
                    </td>
                    <td style='width:50%'>
                        - M?? khu ?????t: <b>${txtMAKHUDAT}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Qu???n, huy???n:<b> ${txtTENHUYEN}</b>
                    </td>
                    <td style='width:50%'>
                        - X??, ph?????ng: <b>${txtTENXA}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - S??? t???: <b>${txtSOTO}</b>
                    </td>
                    <td style='width:50%'>
                        - S??? th???a: <b>${txtSOTHUA}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - ?????a ch???: <b>${txtDIACHI}</b>
                    </td>
                    <td style='width:50%'>
                        - Di???n t??ch: <b>${txtDIENTICH}</b>
                    </td>
                </tr>
                
                <tr>
                    <td colspan="2" style='width: 100%;
                    background: #ff9800b0 !important;
                    color: #ffffff;
                    margin-top: 0;
                    margin-bottom: 5px;
                    padding: 5px;
                    margin-top: 5px;
                    font-size: 10pt'>
                        <strong>II. Th??ng tin, ch??? ti??u quy ho???ch:</strong>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - T???ng cao c??ng tr??nh: <b>${txtTANGCAO}</b>
                    </td>
                    <td style='width:50%'>
                        - Hi???n tr???ng khu ?????t: <b>${txtHIENTRANG}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - M???t ????? x??y d???ng: <b>${txtMATDO}</b>
                    </td>
                    <td style='width:50%'>
                        - M???c ????ch s??? d???ng ?????t:
                    </td>
                </tr>
                
                <tr>
                    <td style='width:50%'>
                        - Chi???u cao x??y d???ng: <b>${txtCHIEUCAOXD}</b>
                    </td>
                    <td style='width:50%'>
                        &nbsp;+ QH chi ti???t: <b>${txtQHCT}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - H??? s??? s??? d???ng ?????t: <b>${txtHESOSDD}</b>
                    </td>
                    <td style='width:50%'>
                        &nbsp;+ QH ph??n khu: <b>${txtQHPK}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Kho???ng l??i: <b>${txtKHOANGLUI}</b>
                    </td>
                    <td style='width:50%' >
                        &nbsp;+ QH chung: <b>${txtQHCHUNG}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - ??i???u ki???n HTKT li??n quan: <b>${txtDKHTKTLQ}</b>
                    </td>
                    <td style='width:50%'>
                        - K??? ho???ch s??? d???ng ?????t: <b>${txtKHSDD}</b>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        - C??c ch??? ti??u quy ho???ch kh??c: <b>${txtCCTQHK}</b>
                    </td>
                </tr>
                
                <tr>
                    <td colspan="2" style='width: 100%;
                    background: #ff9800b0 !important;
                    color: #ffffff;
                    margin-top: 0;
                    margin-bottom: 5px;
                    padding: 5px;
                    margin-top: 5px;
                    font-size: 10pt'>
                        <strong>III. Ch??? tr????ng s??? d???ng ?????t v?? k??u g???i ?????u t??:</strong>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Ch??? tr????ng SD??: <b>${txtCTSDD}</b>
                    </td>
                    <td style='width:50%'>
                        - K??? ho???ch khai th??c: <b>${txtKHKT}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Q?? ph?? duy???t danh m???c: <b>${txtQDPDDM}</b>
                    </td>
                    <td style='width:50%'>
                        - Ph????ng ??n ?????u gi??: <b>${txtPADG}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Q?? ?????u gi??: <b>${txtQDDG}</b>
                    </td>
                    <td style='width:50%'>
                        - H??nh th???c thu ti???n: <b>${txtHTTT}</b>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">- ????n gi?? kh???i ??i???m: <b>${txtDGKD}</b></td>
                </tr>
                <tr>
                    <td colspan='2'>
                        - Ghi ch??: <b>${txtGHICHU}</b>  
                    </td>
                </tr>
                </table>
        </center>
     </div>`;
     setStringContent(stringContent);
    
   
    
   
    
}

  return (
    
    <GloableStyles>
      <Loader display={display} ></Loader>
      <ToastMessages ref={messagesAppRef} />
      {/* <ViewMap /> */}
      {
        props.useMapWidgetIds &&
        props.useMapWidgetIds[0] && (
          <JimuMapViewComponent
            useMapWidgetId={props.useMapWidgetIds?.[0]}
            onActiveViewChange={activeViewChangeHandler}
          />
        )
      }
      <div className="QuanLyDuAnDatWidget">
      {/* Confirm d??? li???u */}
        <ConfirmDialog visible={visible_Land} onHide={() => setVisible_Land(false)} message={messageConfirm}
                    header="Th??ng b??o" icon="pi pi-exclamation-triangle" accept={acceptFunc} reject={rejectFunc} />
      
        {/* Dialog show data search  style={styles.DialogQD} */ }
        <Dialog header="Th??ng tin d??? ??n" visible={displayBasic}  style={{ width: 'auto', maxWidth: '100%'}} modal={false} onHide={() => onHide('displayBasic')}>
          <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}> 

            <TabPanel header="D??? ??n l???n"> 
              <div className="col-12 md:col-4" dangerouslySetInnerHTML={{ __html: `${StringContent}` }}></div>
                {/* <CoreForm fieldConfig={fieldConfig} layoutConfig={LayoutConfig} lookupData={sys_combo} tabId={tabId} isLabelLeft={true} showFooter = {false}></CoreForm> */}
                <div className="form_QLDA">
                  <div className="div-button-Tab">
                  
                    <div style={styles.divbutton}>
                      <Button icon="pi pi-comment" label="????ng g??p ?? ki???n"  style={{ margin: '20px 0 0 0' ,fontSize: '10pt'}} className="p-button-raised p-button-success button-print" onClick={AddComments} />
                      <Button icon="pi pi-print" label="In phi???u th??ng tin"  style={{ margin: '20px 0 0 5px' ,fontSize: '10pt'}} className="p-button-raised p-button-success button-print" onClick={PrintPhieu} />
                    </div>
                  </div>
                </div>
              
            </TabPanel>

            <TabPanel header="Danh s??ch ?? ki???n qu??? ?????t l???n">
              <div className="divform" style={styles.divform}> 
                <div className="field col md:col-3 combo" style={{ display: 'flex' }}  >
                {/* */}
                  {/* <label style={styles.txtLabel} >L???c ?? ki???n:</label>
                  <Dropdown
                    value={selectedListofcomments}
                    options={arrListofcomments}
                    optionLabel="name"
                    placeholder=""
                    onChange={onChangeListofcomments}/> */}
                </div>
              </div>
              <div className="div-tab" >
              
                  <div className="wp-list" style={styles.wplist}>
                    <DataTable  value={dataTableListofcomments} emptyMessage="Kh??ng t??m th???y d??? li???u cho b???ng" first={first1} rows={rows1} onPage={onCustomPage1}  dataKey="id" size="small" scrollable scrollHeight="420px">
                      {
                        Config.DS_TableListofcomments && Config.DS_TableListofcomments.length > 0 &&
                        Config.DS_TableListofcomments.map(el => { 
                          switch (el.field) {
                            case 'ThaoTac':
                              return  <Column field={el.field} body={actionBodyTemplate_Listofcomments} exportable={true} style={{ minWidth: '8rem' }}   ></Column>
                              break;
                            default:
                              return  <Column field={el.field} header={el.name} style={{ width: 'auto', fontSize: '10pt', fontFamily: 'Arial'}} sortable={true}></Column>
                              break;
                          }
                        })
                      }
                    </DataTable>
                  </div>
              </div>
            </TabPanel>
          </TabView>
         
        </Dialog>

        {/* Dialog show edit search */}       
        <Dialog header={'Qu??? ?????t l???n'} visible={displayConfirm} style={{ maxWidth: '80vw', width: 'auto' }} modal={true}  onHide={() => onHide('displayConfirm')} onShow={() => onShow()}>
          <CoreForm fieldConfig={fieldConfig} layoutConfig={LayoutConfig} lookupData={sys_combo} tabId={tabId} isLabelLeft={false} showFooter={true} onOkCallBack={(e) => {onBtnOkClick(e) }} onClearCallBack={onClearCallBack} isDisplayClear={false} isDisplaySearch={false} ref={refForm} labelClear={'?????t l???i'} labelSearch={'C???p nh???t'}></CoreForm>
        </Dialog>

         {/* Dialog show add qu??? ?????t */}       
         <Dialog header={'Qu??? ?????t l???n'} visible={displayAdd} style={{ maxWidth: '80vw', width: 'auto' }} modal={true}  onHide={() => onHide('displayAdd')}>
          <CoreForm fieldConfig={fieldConfig} layoutConfig={LayoutConfig} lookupData={sys_combo} tabId={tabId} isLabelLeft={false} showFooter={true} onOkCallBack={(e) => {onBtnOkAddClick(e) }} onClearCallBack={onClearCallBack} isDisplayClear={false} isDisplaySearch={false} labelClear={'?????t l???i'} labelSearch={'Th??m m???i'}></CoreForm>
        </Dialog>
        <Dialog header="????ng g??p ?? ki???n" visible={displayAddComment} modal={false}  onHide={() => onHide('displayAddComment')}>
        <CoreForm  mode="search" fieldConfig={fieldConfigComment} layoutConfig={LayoutConfig} lookupData={sys_combo} tabId={tabIdComment} isLabelLeft={false} showFooter={true} onOkCallBack={(e) => {onBtnAddCommentClick(e) }} onClearCallBack={onClearCallBack} isDisplayClear={false} isDisplaySearch={false} ref={refForm} labelClear={'?????t l???i'} labelSearch={'G???i ?? ki???n'}></CoreForm>
        </Dialog>
        {/* Dialog show Print search */}       
        <Dialog header="In th??ng tin d??? ??n" visible={displayPrint} modal={false}  onHide={() => onHide('displayPrint')} onShow={() => onShowPrint()}>
          <div style={styles.mapDiv} ref={MapElement} id="divBanDo_gc"> </div>
          {/* <center>
          <img  style={styles.mapDiv} src={ImgLand} />
          </center> */}
          
          {/* </div> */}
          <div style={styles.divbutton}>
              <div style={{fontSize: '14px' }}>
                <b style={{color: 'red'}}>*Ch?? ??:</b> Khi t???i t???p v??? v???i ?????nh d???ng Word,n???i dung v??n b???n s??? hi???n
                        th??? d?????i d???ng <b>Web layout</b>.<br></br>????? xem v?? in ????ng ?????nh d???ng v??n
                        b???n th??ng th?????ng, ng?????i d??ng n??n chuy???n
                        v??? ch??? ????? <b>Print layout</b><br></br>
                        <center>
                          {/* <img src={webLayout} ></img> <i className="pi pi-angle-double-right"></i> 
                          <img src={printLayout}></img> */}
                        </center>
              </div>
            </div>
          <div style={styles.divbutton}>
            <Button icon="pi pi-print" label="In th??ng tin" style={{fontSize: '10pt'}}  className="p-button-raised p-button-success button-print" onClick={(val) =>createDataPrinting(false)} />
            {/* <Button icon="pi pi-print" label="Xu???t phi???u"  style={{ margin: '0 0 0 3px', fontSize: '10pt' }} className="p-button-raised p-button-success button-print" onClick={(val) =>createDataPrinting(true)} /> */}
          </div>
          
        </Dialog>
        <Toast ref={toast} position="bottom-right"/>

        {/* Form t??m ki???m */}
      
          <div className="title_search">T??m ki???m d??? ??n</div>
          <div className="form_QLDA">
              
                {/* <CoreForm mode="search" fieldConfig={fieldConfig} layoutConfig={LayoutConfig} lookupData={sys_combo} tabId={tabId} isLabelLeft={true} showFooter = {true} onOkCallBack={(e) => {onBtnOkClick(e) }}></CoreForm> */}
              {
                fieldList && fieldList.length > 0 &&
                fieldList.map(el => {
                  switch (el.FIELD_TYPE) {
                    case 'date':
                      return <div className="div-form">
                        <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                          <label className="txtLabel">{el.FIELD_LABEL}</label>
                          <Calendar className="field col-12"  value={currentValue[el.FIELD_NAME]} showIcon onChange={(val) => setValueControl(val, el)} />
                        </div>
                        </div>
                      break;
                    case 'text':
                      return <div className="div-form">
                        <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                        <label className="txtLabel">{el.FIELD_LABEL}</label>
                          <InputText className="field col-8" value={currentValue[el.FIELD_NAME]} onChange={(val) => setValueControl(val, el)} />
                        </div>
                        </div>
                      break;
                    case 'select':
                      return <div className="div-form">
                        <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                        <label className="txtLabel">{el.FIELD_LABEL}</label>
                          <Dropdown showClear={true} value={currentValue[el.FIELD_NAME]} options={el.FIELD_LOOKUP} onChange={(val) => setValueControl(val, el)} optionLabel="name" />
                        </div>
                        </div>
                      break;
                    default:
                      return <div className="div-form">
                        <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                          <label className="txtLabel">{el.FIELD_LABEL}</label>
                          <InputText className="field col-8" value={currentValue[el.FIELD_NAME]} onChange={(val) => setValueControl(val, el)} />
                        </div>
                        </div>
                      break;
                  }
                })
              }
         

           
          </div>
          <br />
          <div className="div-button">
            <Button icon="pi pi-search" label="T??m ki???m" className="p-button-warning" onClick={TimKiemQuyDat} />
            <Button icon="pi pi-replay" label="Nh???p l???i" className="p-button-outlined p-button-warning button-print" onClick={onClear} />
            {/* <Button icon="pi pi-file-excel" label="Xu???t Execl" className="p-button-raised p-button-success button-print" onClick={handleExportCSV}/> */}
          </div>
       

        <br />
        <div className="div-tab">
          {/* <TabView>
            <TabPanel header="B???ng"> */}
              <div className="wp-list">
                {/* table Qu??? ?????t l???n */}
              
                <DataTable value={dataTable} emptyMessage="Kh??ng t??m th???y d??? li???u cho b???ng"  size="small" scrollable  onRowClick={(e) => { clickrowQuyDatLon(e) }} loading={loading}>
                      {
                       
                        DS_Table && DS_Table.length > 0 &&
                        DS_Table.map(el => { 
                          switch (el.field) {
                            case 'ThaoTac':
                              return  <Column field={el.field} body={actionBodyTemplate} exportable={true} style={{ width: el.width }}   ></Column>
                              break;
                            default:
                              return  <Column field={el.field} header={el.name} style={{ width: el.width }} sortable={true} ></Column>
                              break;
                          }
                        })
                        
                      }
                    </DataTable>
                   
              </div>
            {/* </TabPanel>
          </TabView> */}
        </div>

        <div className="_stylePagination col-md-12 col-12 text-center">
          {/* https://www.npmjs.com/package/react-paginate */}
            <ReactPaginate
                previousLabel={<i className="pi pi-chevron-left"></i>}
                nextLabel={<i className="pi pi-chevron-right"></i>}
                pageCount={pageCount}
                onPageChange={ChangePage}
                containerClassName={"paginationBttns"}
                activeClassName={"paginationActive"}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                forcePage={ForcePage}
                breakLabel = "..."
                renderOnZeroPageCount = { null }
            ></ReactPaginate>
          </div>

      </div>
    </GloableStyles>
  )
  // admin1/P0rtal.2022
}

export default Widget
