/** @jsx jsx */
import { React, AllWidgetProps, jsx, loadArcGISJSAPIModules, classNames ,FormattedMessage, defaultMessages as jimuCoreDefaultMessage, css} from 'jimu-core';
import { IMConfig } from '../config';
import { hooks } from 'jimu-ui';
import defaultMessages from './translations/default';
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import './css/QuanLyDuAnDat.scss'
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
import { Accordion, AccordionTab } from 'primereact/accordion';

import TemPlateFile from './components/TemplateFile';
import ToastMessages from './components/ToastMessages';
import Loadding from './components/Loading';

import esriQueryTask from './core-esri/esri-query-task';
import esriRequest from './core-esri/esri-query-Request';
import EsriRequest from './core-esri/esri-request';
import {esriRequest1, printTask, queryData } from './core-esri/esri-request';
// import {esriRequest1, printTask, printTask1, queryData, addGraphicFill, addGraphicSampleLine, clearGraphic } from '../service/esri-request';
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
import  Query from"esri/rest/support/Query";
import  request from "esri/request";
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
import baseFileUrl from './assets/images/file_base.png';
import { combineLatest } from 'rxjs';

const { useState, useEffect, useRef, useReducer, useLayoutEffect } = React;

function Widget(props: AllWidgetProps<any>) {
  const nls = hooks.useTranslate(defaultMessages)
  let loadingRef = useRef<any>();

  const Config = props.config;
  const DS_ListForm = Config.DS_menu;
  const DS_ListFormQuyDatNho = Config.DS_menu_QuyDatNho;
  const DS_Table = Config.DS_Table;
  const DS_TableQuyDatNho = Config.DS_TableQuyDatNho;


  const [currentValue, setCurrentValue] = useState(null); // Giá trị hiện tại của các control đang được khởi tạo
  const [fieldList, setFieldList] = useState([]);
  const [fieldListQuyDatNho, setFieldListQuyDatNho] = useState([]);
  const [currentValueQuyDatNho, setCurrentValueQuyDatNho] = useState(null);
  const [dataTable, SetDataTable] = useState([]);
  const [dataTableQuyDatNho, SetDataTableQuyDatNho] = useState([]);
  const [dataTableListofcomments, SetDataTableListofcomments] = useState([]);
  const [listAttachment, setlistAttachment] = useState([]);

  const { user } = props;
  const messagesAppRef: React.MutableRefObject<any> = useRef()
  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(10);

  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [displayPrint, setDisplayPrint] = useState(false);
  const [LayoutConfig, setLayoutConfig] = useState(null);
  const [WindowConfig, setWindowConfig] = useState(null);
  const [fieldConfig, setfieldConfig] = useState(null);
  const [information, setinformation] = useState(null);
  const [tabId, settabId] = useState(1);
  const [sys_combo, setsys_combo] = useState(null);
  const [visible_Land, setVisible_Land] = useState(false);
  const [DtaLandClick, setDtaLandClick] = useState(null);
  const [DtaTableLandClick, setDtaTableLandClick] = useState(null);
  const [Map_View, setMapView] = useState(null);

  const [selectedLodat, SetSelectedLodat] = useState<any>({ code: 1, name: 'Quỹ đất lớn' });
  const [arrListofLodat, SetArrListofLodat] = useState<any>([{code: 1, name: 'Quỹ đất lớn'}, {code: 2, name: 'Quỹ đất tái định cư'}, {code: 3, name: '+ Có hạ tầng'}, {code: 4, name: '+ Không có hạ tầng'}]);

  const [selectedListofcomments, SetSelectedListofcomments] = useState<any>({code: 'ALL', name: 'Tất cả'});
  const [arrListofcomments, SetArrListofcomments] = useState<any>([{code: 'ALL', name: 'Tất cả'}, {code: '0', name: 'Chưa duyệt'}, {code: '1', name: 'Đã duyệt'}]);

  const [where_OBJECTID, setWhere_OBJECTID] = useState(null);
  const [messageConfirm, setmessageConfirm] = useState(null);
  const [StringContent, setStringContent] = useState(null);
  const [StringContentQDN, setStringContentQDN] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [ForcePage, setForcePage] = useState(0);
  const [display, setDisplay] = useState(false);
  const [showQuyDat, setshowQuyDat] = useState(true);
  const [showTableQuyDat, setTableQuyDat] = useState(true);
  const [activeIndex1, setActiveIndex1] = useState(1);
  const [showdisabledQD, setdisabledQD] = useState(false);
  const [showdisabledQDN, setdisabledQDN] = useState(true);
  const [featureCollection, setfeatureCollection] = useState(null);
  
  // loading của table Quỹ đất lớn
  const [loading, setLoading] = useState(true);

  const dt_QDL = useRef(null);
  const dt_QDN = useRef(null);
  const toast = useRef(null);
  const msgs1 = useRef(null);
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

  // Kiểm tra Map
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

  const onChangeLodat= (e) => {
    SetSelectedLodat(e.target.value);
    //console.log(e.target.value)
    if(e.target.value.code === 1){
      setshowQuyDat(true);
     // console.log(showQuyDat)
    } else {
      setshowQuyDat(false);
      //console.log(showQuyDat)
    }
  }


  useEffect(() => {
    if (jimuMapView) {
     // console.log('Config',Config);
      //loadingRef.current.hideLoading();
      ThemeService.setActiveTheme();
      // addLayerBanDo();
      loadConfigCotech();
      LoadFiedlist();
      LoadFiedlistQuyDatNho();
      TimKiemQuyDat();
    };
    //loadingRef.current.showLoading();

  }, [jimuMapView])


  const addLayerBanDo = () => { 
    if (jimuMapView) jimuMapView.view.map.removeAll();
    const fl = new FeatureLayer({
      url: "https://gisun.esrivn.net/server/rest/services/DaNang1/DaNang/FeatureServer/5",
      popupTemplate : {
        title: `<p style="color: #2196f3">Thông tin quỹ đất</p>`,
        content: populationChange,
        outFields: ["*"],
        returnGeometry: true
      }
    });
    jimuMapView.view.map.add(fl);
  }

    // Identify
    const populationChange = (feat) => {
      //console.log(feat);
      const attr = feat.graphic.attributes;
      const div = document.createElement("div");
      const contenTemp = `
        <p><b>Tên dự án:</b> ${attr.TENDUAN? attr.TENDUAN: ''}</p> 
        <p><b>Tên huyện:</b> ${attr.TENHUYEN? attr.TENHUYEN: ''}</p> 
        <p><b>Tên xã:</b> ${attr.TENXA? attr.TENXA: ''}</p> 
        <p><b>Địa chỉ:</b> ${attr.DIACHI? attr.DIACHI: ''}</p>
        <p><b>Diện tích:</b> ${attr.DIENTICH? attr.DIENTICH: ''}(m<sup>2</sup>)</p> 
        `;
      div.innerHTML = contenTemp;
      return div;
    }

  // load data config Cotech
  const loadConfigCotech = async () => { 
    if(showQuyDat){
      var url_sys_combo = "https://coretech.vn:1314/odata/Config/Init?appid=13&userid=1";
      var url ="https://coretech.vn:1314/odata/SysCaches/SysCacheWindow/13";
    } else{
      var url_sys_combo = "https://coretech.vn:1314/odata/Config/Init?appid=14&userid=1";
      var url ="https://coretech.vn:1314/odata/SysCaches/SysCacheWindow/14";
    }
    await fetch(url_sys_combo)
      .then((response) => response.json())
      .then((data) => {
        //console.log('data', data)
        if (data) { 
          setsys_combo(data.sys_combo);
         }
        
      })
      .catch ((error) => console.error(error));

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
      // console.log('data2', data);
        if (data && data.success) {
          setLayoutConfig(data.model.layout);
          setWindowConfig(data.model.config);
          const obj = parse(data.model.config);
          const config = mapConfig(obj);
          //console.log('config.tabs[0]', config.tabs[0]);
          if (config.tabs[0].fields && config.tabs[0].fields.length > 0) {
            config.tabs[0].fields.forEach(field => {
                // Bổ sung serviceType cho field
                field.serviceType = config.tabs[0].tabletype
            });
          }
          setfieldConfig(config.tabs[0].fields);
          settabId(config.tabs[0].tabid);
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
          //console.log('Information', Information)
          setinformation(Information);
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
          // Xử lý combobox quan hệ cha con
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
    // trước khi setFieldList thì phải tạo sẵn
    setFieldList(arr);
    
  }
  // load data form search Quỹ đất nhỏ
  const LoadFiedlistQuyDatNho = async () => { 
    const arr = [];
    DS_ListFormQuyDatNho.forEach(element => {
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
          // Xử lý combobox quan hệ cha con
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
    setCurrentValueQuyDatNho(obj);
    // trước khi setFieldList thì phải tạo sẵn 
    setFieldListQuyDatNho(arr);
  }

// onChange form search
  const setValueControl = (e, field) => {
    // console.log(e, field);
    const obj = {};
    

    if(showQuyDat){
      Object.keys(currentValue).forEach(key => {
        obj[key] = currentValue[key];
        if (key === field.FIELD_NAME) {
            obj[field.FIELD_NAME] = e.target.value;
        }
    });
      // quan hệ Farent
      fieldList.forEach(item => {
        // console.log(item.FIELD_PARENTID);
        if (field.FIELD_FIELDID){
          if (item.FIELD_PARENTID === field.FIELD_FIELDID) {
            (e.value) ? ((e.value.code ==="ALL") ? obj[item.FIELD_NAME] = null : obj[item.FIELD_NAME] = null) : obj[item.FIELD_NAME] = e.target.value;
            ComboboxFieldChange(e, item, field);
          }
        }
      });

      // zOOM những combobox có Extent
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
    } else {
      Object.keys(currentValueQuyDatNho).forEach(key => {
        obj[key] = currentValueQuyDatNho[key];
        if (key === field.FIELD_NAME) {
            obj[field.FIELD_NAME] = e.target.value;
        }
    });
      // quan hệ Farent
      fieldListQuyDatNho.forEach(item => {
        // console.log(item.FIELD_PARENTID);
        if (field.FIELD_FIELDID){
          if (item.FIELD_PARENTID === field.FIELD_FIELDID) {
            (e.value) ? ((e.value.code ==="ALL") ? obj[item.FIELD_NAME] = null : obj[item.FIELD_NAME] = null) : obj[item.FIELD_NAME] = e.target.value;
            ComboboxFieldChange(e, item, field);
          }
        }
      });

      // zOOM những combobox có Extent
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
      setCurrentValueQuyDatNho(obj);
    }
    
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
    if(showQuyDat){
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
    } else {

      fieldListQuyDatNho.forEach(element => {
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
      setFieldListQuyDatNho(arr);

    }
   
    // return fieldList;
  }


  // Điều kiến Where
  const returnWhere = () => {
    //  console.log('currentValue', currentValue);
    // console.log('selectedLodat', selectedLodat);
     var dk = '';
     if(showQuyDat){
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
     }else{
      fieldListQuyDatNho.forEach(item => {
        // console.log(item);
        if(item.FIELD_TYPE === 'select'){
          if (currentValueQuyDatNho[item.FIELD_NAME]!= undefined){
            dk +=  (currentValueQuyDatNho[item.FIELD_NAME].code != "" && currentValueQuyDatNho[item.FIELD_NAME].code != null && currentValueQuyDatNho[item.FIELD_NAME].code != "ALL") ?  (item.FIELD_NAME +  " = '" + currentValueQuyDatNho[item.FIELD_NAME].code + "' AND ") : "";
          }
        } else if(item.FIELD_TYPE === "text"){
          dk += (currentValueQuyDatNho[item.FIELD_NAME] != "" && currentValueQuyDatNho[item.FIELD_NAME]!= null && currentValueQuyDatNho[item.FIELD_NAME]!= undefined) ? "UPPER(" + item.FIELD_NAME +") like N'%" + currentValueQuyDatNho[item.FIELD_NAME].toUpperCase() + "%'" + " AND " : "";
        } else if(item.FIELD_TYPE === "date"){
          dk += (currentValueQuyDatNho[item.FIELD_NAME] != "" && currentValueQuyDatNho[item.FIELD_NAME]!= null && currentValueQuyDatNho[item.FIELD_NAME]!= undefined) ? item.FIELD_NAME +" = '" + currentValueQuyDatNho[item.FIELD_NAME].getTime() + "' AND " : "";
        } else {
          dk += (currentValueQuyDatNho[item.FIELD_NAME] != "" && currentValueQuyDatNho[item.FIELD_NAME]!= null && currentValueQuyDatNho[item.FIELD_NAME]!= undefined) ? "UPPER(" + item.FIELD_NAME +") like N'%" + currentValueQuyDatNho[item.FIELD_NAME].toUpperCase() + "%'" + " AND " : "";
        }
      });

      if (selectedLodat.code === 3) {
        dk += "hatang = 2 AND ";
      }
      if (selectedLodat.code === 4) {
          dk += "hatang = 1 AND ";
      }
      // if (that2.isBQLAccount) {
      //     dk += "BqlUserName = '" + that2.getUserHT() + "' AND ";
      // }
    }
     

    return dk === '' ? '1=1' : dk.substring(0, dk.length - 5);
  }

  //  Tìm kiếm quỹ Đất
  const TimKiemQuyDat = async () => {
    //console.log(returnWhere());
    loadConfigCotech();
    dialogFuncMap[`${'displayBasic'}`](false);
    dialogFuncMap[`${'displayConfirm'}`](false);
    dialogFuncMap[`${'displayAdd'}`](false);
    dialogFuncMap[`${'displayPrint'}`](false);
    var Url;
    if(showQuyDat){
      Url = Config.layerUrls.urlQuyDat;
      setTableQuyDat(true)
    } else{
      Url = Config.layerUrls.urlQuyDatNho;
      setTableQuyDat(false)
    }
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

    // count tổng số quỹ đất
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
      //spatialRel: 'esriSpatialRelIntersects',
     // outSR: jimuMapView.view.spatialReference.wkid,
      where: returnWhere(),
      resultOffset: 0,
      resultRecordCount: 10,
      //featureEncoding: 'esriDefault'
    };

    // phân trang
    await queryThongTinJson(Url + "/query", ThongtinJson2, 1);

    const _params = {
      f: 'json',
      outFields: [],
      returnGeometry: true,
      where: returnWhere(),
      spatialRel: 'esriSpatialRelIntersects',
      outSR: jimuMapView.view.spatialReference.wkid,
      featureEncoding: 'esriDefault'
    };

    // 1=1
    await queryZoomToDuAn(Url, _params);
  }

  // Query và zoom
  const queryZoomToDuAn = async (url, _params) => { 
    jimuMapView.view.graphics.removeAll()
    await EsriRequest(url + '/query', _params, "GET", async res => { 
     // console.log('queryZoomToDuAn', res);
      if (res.features.length>0) { 
          for (var i = 0; i < res.features.length; i++) {
            // console.log(results.data.features[i])
            var myQuyDat = res.features[i].geometry;
            let geometry_type = null;
            let Symbol = null;
            if (myQuyDat) { 
              //set kiểu type
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
                  url: (showQuyDat)?BoxPin1: BoxPinQuyDatNho,
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
              color: (showQuyDat)?[10, 10, 10, 1]:[255,255,255,1],
              haloColor: (showQuyDat)?[255,255,255,1]: [245,158,11,1],
              haloSize: "1px",
              text: thuTu,
              xoffset: (showQuyDat)?1:-3,
              yoffset: (showQuyDat)?3:3,
              font: { 
                family: "Times New Roman",
                size: (showQuyDat)?9:8,
                weight: "bold"
              }
            };
           
            jimuMapView.view.graphics.add(new Graphic({
              geometry: geometry_type,
              symbol: myTextSymbol
            }));
          };
        
      } else {

      }
    }, error => {
      console.log('error', error);
    })
  
  }
  
// phân trang
  const queryThongTinJson = async (url, ThongtinJson, soluongpage) => {
    setLoading(true);
    await EsriRequest(url + '/query', ThongtinJson, "GET", async res => { 
      if (res.features) { 
        const feats = res.features;
        percentLand(feats, res.fields, soluongpage);
        setLoading(false);
      } 
    }, error => {
      console.log('error', error);
      setLoading(false);
    })

    // esriRequest(url, ThongtinJson, results => {
    //   //console.log('queryThongTinJson', results);
    //   if (results.data) { 
    //     const feats = results.data.features;
    //     percentLand(feats, results.data.fields, soluongpage);
    //     setLoading(false);
    //   }
    // }, error => {
    //   console.log('error', error);
    //   setLoading(false);
    // })
  }

  //show dữ liệu ra table
  const percentLand = (evt, i, soluongpage) => {
    const dataTableResult = [];
    const FieldList = [];
    
    i.forEach(element => {
      if(showQuyDat){
        var a = DS_Table.filter(fil => fil.field === element.name);
      }else {
        var a = DS_TableQuyDatNho.filter(fil => fil.field === element.name);
      }

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
    SetDataTableQuyDatNho(dataTableResult);
  }

// thao tác bảng Quỹ dất lớn
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-plus" className="p-button-rounded p-button-info p-button-text" onClick={() => addProduct(rowData)} />
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-button-text" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  }
/// Danh sách thao tác của  List of comments
  const actionBodyTemplate_Listofcomments = (rowData) => {
    return (
      <React.Fragment>
        {
          (rowData.ThaoTac.feat.attributes.FILEDINHKEM !== null && rowData.ThaoTac.feat.attributes.FILEDINHKEM !== '')?<Button icon="pi pi-arrow-down" className="p-button-rounded p-button-info p-button-text" onClick={() => ShowFile_Listofcomments(rowData)} />: <div className="field col-3 md:col-2 combo"></div>
        }
        
        <Button icon="pi pi-user-edit" className="p-button-rounded p-button-success p-button-text" onClick={() => ApproveProduct_Listofcomments(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" onClick={() => confirmDeleteProduct_Listofcomments(rowData)} />
      </React.Fragment>
    );
  }

  // Click file đính kèm của DS ý kiến
  const ShowFile_Listofcomments= async (rowData) => { 
    window.open(rowData.ThaoTac.feat.attributes.FILEDINHKEM);
  }
// Click phê duyệt của DS ý kiến
  const ApproveProduct_Listofcomments= async (rowData) => { 
   // console.log(rowData, where_OBJECTID);
    setmessageConfirm("Phê duyệt ý kiến");
    setVisible_Land(true);
    var obj = {
      Url : Config.layerUrls.DS_YKien_QD_FeatureServer,
      OBJECTID:  rowData.ThaoTac.feat.attributes.OBJECTID,
      Type: "Approve",
      Search: "Ý kiến",
      Data: rowData.ThaoTac
    };
    setDtaLandClick(obj);
  }

  // click Xóa của DS ý kiến
  const confirmDeleteProduct_Listofcomments= async (rowData) => { 
    // console.log(rowData, where_OBJECTID)
    setmessageConfirm("Xóa dữ liệu");
    setVisible_Land(true);
    var obj = {
      Url : Config.layerUrls.DS_YKien_QD_FeatureServer,
      OBJECTID:  rowData.ThaoTac.feat.attributes.OBJECTID,
      Type: "Delete",
      Search: "Ý kiến",
      Data: rowData.ThaoTac
    };
    setDtaLandClick(obj);
  }

  // Zoom dự án khi click
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

  
  // qurry lấy dữ liệu của DS ý kiến
  const queryListofcomments = async (_where) => { 
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

   //show dữ liệu ra table danh sách ý kiến
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
        (e.name !=='PHEDUYET')? obj[e.name] = feat.attributes[e.name]:((feat.attributes[e.name]===1)?obj[e.name] = "Đã duyệt":obj[e.name] = "Chưa duyệt");
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

  // click edit Quỹ đất lớn
  const editProduct = (rowData) => {
    //console.log('editProduct', rowData);
    setDtaTableLandClick(rowData);
    zoomToDuAn_Click(rowData);
    dialogFuncMap[`${'displayConfirm'}`](true);
   
  }

  const addProduct= (rowData) => { 
    dialogFuncMap[`${'displayAdd'}`](true);
    setDtaTableLandClick(rowData);
  }

  // click Xóa Quỹ đất lớn
  const confirmDeleteProduct = (rowData) => {
    //console.log('confirmDeleteProduct', rowData)
    setmessageConfirm("Xóa dữ liệu");
    setVisible_Land(true)
    if(showQuyDat){
      var url = Config.layerUrls.urlQuyDat_FeatureServer;
    } else {
      var url = Config.layerUrls.urlQuyDatNho_FeatureServer;
    }
    var obj = {
      Url : url,
      OBJECTID:  rowData.ThaoTac.feat.attributes.OBJECTID,
      Type: "Delete",
      Search: "Quỹ đất",
      Data: rowData.ThaoTac
    };
    setDtaLandClick(obj);
  }


  /// thông báo
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
  // đồng ý
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
          toastFunc('success', 'Xóa thành công !!!')
          if(DtaLandClick.Search==="Quỹ đất"){
            TimKiemQuyDat();
          } else {
            SetSelectedListofcomments({code: 'ALL', name: 'Tất cả'});
            queryListofcomments(where_OBJECTID);
          }
      
        } else {
          toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
        }
        
      }, error => {
        console.log('error', error);
        toastFunc('error','Xảy ra lỗi,xin thử lại !!!')
        
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
          toastFunc('success', 'Phê duyệt thành công !!!')
          queryListofcomments(where_OBJECTID);
        } else {
          toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
        }
        
      }, error => {
        console.log('error', error);
        toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
      })

    }
  }

  // không đồng ý 
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



// tắt dialog
const onHide = (name) => {
  dialogFuncMap[`${name}`](false);
}
//Gọi khi hiển thị xong dialog
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
  ///console.log('DtaTableLandClick', DtaTableLandClick);
  if (DtaTableLandClick.ThaoTac.feat.geometry){
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
  
  
  
}



const dialogFuncMap = {
  'displayBasic': setDisplayBasic,
  'displayConfirm':setDisplayConfirm,
  'displayPrint': setDisplayPrint,
  'displayAdd': setDisplayAdd,
}


// click ok CoreForm
const onBtnOkClick= (e) => { 
 //console.log("onBtnOkClick", e);
 if (showQuyDat) {
  var url = Config.layerUrls.urlQuyDat_FeatureServer;
} else{
  var url = Config.layerUrls.urlQuyDatNho_FeatureServer;
}
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
if(e['CurrentValueShapefile'] !==null){
  const portalUrl = "https://www.arcgis.com";
  const params = {
    name: 'abc',
    targetSR: jimuMapView.view.spatialReference.wkid,
    maxRecordCount: 1000,
    enforceInputFileSizeLimit: true,
    enforceOutputJsonSizeLimit: true,
    generalize: true,
    maxAllowableOffset :10,
    reducePrecision :true,
    numberOfDigitsAfterDecimal: 0
  };
 

  const myContent = {
    filetype: "shapefile",
    publishParameters: JSON.stringify(params),
    f: "json"
  };
  request(portalUrl + "/sharing/rest/content/features/generate", {
    query: myContent,
    body: e['CurrentValueShapefile'],
    responseType: "json"
  }).then((response) => {
    if(response){
      param["geometry"] = response.data.featureCollection.layers[0].featureSet.features[0].geometry;  
      var ThongtinJson = {
        f: 'json',
        features: JSON.stringify([param]),
        method:"post",
        responseType: "json",
      };
      esriRequest(url + "/updateFeatures", ThongtinJson, results => {
        if(results.data.updateResults[0].success){
          toastFunc('success', 'Sửa thông tin thành công !!!');
          dialogFuncMap[`${'displayConfirm'}`](false);
          if(e['CurrentValueAttachment'] !==null){ 
            arcGISUploadFile(DtaTableLandClick.ThaoTac.feat.attributes.OBJECTID, e);
          }
          TimKiemQuyDat();
        } else {
          toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
        }
        
      }, error => {
        console.log('error', error);
        toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
      })
    }else{
      toastFunc('error', 'Kiểm tra lại file Zip !!!')
    }

    
  })
  .catch((errorHandler)=> {
    console.log('error', errorHandler);
    toastFunc('error', 'Kiểm tra lại file Zip !!!')
  });
} else{
  var ThongtinJson = {
    f: 'json',
    features: JSON.stringify([param]),
    method:"post",
    responseType: "json",
  };

   esriRequest(url + "/updateFeatures", ThongtinJson, results => {
    if(results.data.updateResults[0].success){
      toastFunc('success', 'Sửa thông tin thành công !!!');
      dialogFuncMap[`${'displayConfirm'}`](false);
      if(e['CurrentValueAttachment'] !==null){ 
        arcGISUploadFile(DtaTableLandClick.ThaoTac.feat.attributes.OBJECTID, e);
      }
      TimKiemQuyDat();
    } else {
      toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
    }
    
  }, error => {
    console.log('error', error);
    toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
  })
}
  
  
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

//thêm mới quỹ đất
const onBtnOkAddClick= (e) => { 
  console.log('onBtnOkAddClick', e)
  if (showQuyDat) {
    var url = Config.layerUrls.urlQuyDat_FeatureServer;
  } else{
    var url = Config.layerUrls.urlQuyDatNho_FeatureServer;
  }
  var param = {};
  param["attributes"] = {};
  DtaTableLandClick.ThaoTac.i.forEach(element => {
    // console.log(param["attributes"][element.name])
    if(element.name !='OBJECTID'){
      if(e[element.name] === null || e[element.name] === undefined) {
      } else if (e[element.name].code){
        param["attributes"][element.name] = e[element.name].code;
      } else {
        param["attributes"][element.name] = e[element.name];
      }
    }
   
  });

  if(e['CurrentValueShapefile'] !==null){
    const portalUrl = "https://www.arcgis.com";
    const params = {
      name: 'abc',
      targetSR: jimuMapView.view.spatialReference.wkid,
      maxRecordCount: 1000,
      enforceInputFileSizeLimit: true,
      enforceOutputJsonSizeLimit: true,
      generalize: true,
      maxAllowableOffset :10,
      reducePrecision :true,
      numberOfDigitsAfterDecimal: 0
    };
   
  
    const myContent = {
      filetype: "shapefile",
      publishParameters: JSON.stringify(params),
      f: "json"
    };
    request(portalUrl + "/sharing/rest/content/features/generate", {
      query: myContent,
      body: e['CurrentValueShapefile'],
      responseType: "json"
    }).then((response) => {
      if(response){
        param["geometry"] = response.data.featureCollection.layers[0].featureSet.features[0].geometry;  
        var ThongtinJson = {
          f: 'json',
          features: JSON.stringify([param]),
          method:"post",
          responseType: "json",
        };
        
          esriRequest(url + "/addFeatures", ThongtinJson, results => {
            if(results.data.addResults[0].success){
              toastFunc('success', 'Thêm thông tin thành công !!!');
              if(e['CurrentValueAttachment'] !==null){ 
                arcGISUploadFile(results.data.addResults[0].objectId, e);
              }
              
              dialogFuncMap[`${'displayConfirm'}`](false);
              TimKiemQuyDat();
            } else {
              toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
            }
            
          }, error => {
            console.log('error', error);
            toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
          })
      }else{
        toastFunc('error', 'Kiểm tra lại file Zip !!!')
      }

      
    })
    .catch((errorHandler)=> {
      console.log('error', errorHandler);
      toastFunc('error', 'Kiểm tra lại file Zip !!!')
    });
  } else {
    var ThongtinJson = {
      f: 'json',
      features: JSON.stringify([param]),
      method:"post",
      responseType: "json",
    };
    
    esriRequest(url + "/addFeatures", ThongtinJson, results => {
      if(results.data.addResults[0].success){
        toastFunc('success', 'Thêm thông tin thành công !!!');
        if(e['CurrentValueAttachment'] !==null){ 
          arcGISUploadFile(results.data.addResults[0].objectId, e);
        }
        dialogFuncMap[`${'displayConfirm'}`](false);
        TimKiemQuyDat();
      } else {
        toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
      }
      
    }, error => {
      console.log('error', error);
      toastFunc('error', 'Xảy ra lỗi,xin thử lại !!!')
    })
  }

  
 
  
}
const arcGISUploadShapefiles= async (Attachment) => { 
  console.log('Attachment', Attachment);
 

  
}
const arcGISUploadFile = async (e, Attachment) => { 
    if (showQuyDat) {
      var URL = "https://gisun.esrivn.net/server/rest/services/DaNang1/DaNang/FeatureServer/5";
    } else{
      var URL = "https://gisun.esrivn.net/server/rest/services/DaNang1/DaNang/FeatureServer/6";
    }
    
    const featureLayer = new FeatureLayer( {url:URL});
    const query = new Query();
    query.where =  "OBJECTID =" + e;
    query.outFields= ['*'],
    query.returnGeometry = true;
   
    let attachmentQuery = {
      objectIds: e,
    };

    featureLayer.queryFeatures(query).then(function(results){
      //console.log(results.features[0]);  // prints the array of features to the consol
      
       if (results){
         // Xóa Attment trước đó
        // featureLayer.queryAttachments(attachmentQuery).then(function (attachments) {
          
        //      var arr = [];
        //     if(attachments[e].length >0){
        //       attachments[e].forEach(function (item) {
        //         arr.push(item.id);
        //       });
        //       featureLayer.deleteAttachments(results.features[0], arr).then(function(evt){
        //       }).catch(function (err) {
        //         console.log("attachment delete failed: ", err);
        //       });
            
        //     }
            
        // }).catch(function (error) {
        //   console.log("attachment query error", error);
        // })
       }

       // Add Attachment
       if(Attachment['CurrentValueAttachment']){
        featureLayer.addAttachment(results.features[0], Attachment['CurrentValueAttachment']).then((result) => {
              //console.log("attachment added: ", result);
              toastFunc('success', 'Upload thành công !!!');
            })
            .catch(function (err) {
              console.log("attachment adding failed: ", err);
        });
       }
      
    });

}

const afterSave=(type = 'insert') =>{ 
  if (type === 'insert') { 
    toastFunc('success', 'Upload thành công !!!');
  }
}

const deleteArcGISAttachment=(hasInsert = false, i) =>{
  let url = i['CurrentValueAttachment'].url;
  const featureLayer = new FeatureLayer(url);
  const listRequest: any[] = [];
}

 /** Xóa dữ liệu trên control */
 const onClear = (e) => {
  const obj = {};
  const typeCheck = ['select', 'date'];
 
  if(showQuyDat){
    fieldList.forEach(element => {
      obj[element.FIELD_NAME] = null;
      if (!typeCheck.includes(element.FIELD_TYPE)) { // Nếu field type không nằm trong type Check
          obj[element.FIELD_NAME] = '';
      }
  });
    setCurrentValue(obj);
  } else {
    fieldListQuyDatNho.forEach(element => {
      obj[element.FIELD_NAME] = null;
      if (!typeCheck.includes(element.FIELD_TYPE)) { // Nếu field type không nằm trong type Check
          obj[element.FIELD_NAME] = '';
      }
  });
    setCurrentValueQuyDatNho(obj);
  }
  // props.onClearCallBack();
}

const handleExportCSV = () => {
  if(showQuyDat){
    dt_QDL.current.exportCSV();
  } else {
    dt_QDN.current.exportCSV();
  }
  
}

const onChangeListofcomments= (e) => {
  SetSelectedListofcomments(e.target.value);
 // console.log(e.target.value, where_OBJECTID);
  let _where;
 (e.target.value.code === "ALL")?_where = where_OBJECTID : _where = where_OBJECTID + " AND PHEDUYET=" + e.target.value.code;

  queryListofcomments(_where);
}


 
const PrintPhieu = async() => {
  //console.log('DtaTableLandClick',DtaTableLandClick);
  if (DtaTableLandClick.ThaoTac.feat.geometry !== undefined){
    

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
    dialogFuncMap[`${'displayPrint'}`](true);
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
      titleText: "Sơ đồ thửa đất",
      authorText: "",
      copyrightText:"",
      legendLayers : [],
      customTextElements: [],
    },
    showLabels: true,
    forceFeatureAttributes: true,
    
   });

  

   var params = new PrintParameters({
    view:  view,
    template: template,
    extraParameters: true,
   });
   //params.declaredClass =  true;
   await printTask(urlPrinTask, params, res => {
    
    if (res &&  res.url) {
     // console.log('res', res.url)
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
                              <span>SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG</span>
                              <br/><span>THÀNH PHỐ ĐÀ NẴNG</span>
                              <br/><span style="font-weight: bold">TRUNG TÂM PHÁT TRIỂN QUỸ ĐẤT</span>
                              <br/><span>_____________</span>
                              <br/><span style="margin: 5pt 0;display: block; font-size:12pt;">Số:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/TTPTQĐ-</span>
                          </p>
                      </center>
                  </td>
                  <td style='width:52%'>
                      <center>
                          <p style="font-size: 10pt">
                              <span style="font-weight: bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                              <br/><span style="font-weight: bold; font-size: 12pt">Độc lập - Tự do - Hạnh phúc</span>
                              <br/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                              <br/><span>_____________</span>
                              <br/><span style="font-size: 12pt"><i>Đà Nẵng, ngày ..... tháng ..... năm .......</i></span>
                          </p>
                      </center>
                  </td>
              </tr>
          </table>

          <table style='width:100%; font-size: 13pt'>
              <tr>
                  <td colspan="2" style="text-align: center;">
                      <div style="font-size: 14pt; font-weight: bold"><br/>
                      PHIẾU CUNG CẤP THÔNG TIN LÔ ĐẤT
                          <center>
                          <span style="display: block;height: 1px;border-top: 1px solid;width: 35%;"></span>
                          </center>
                      </div>
                      <br/>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="text-align: center;">
                  <br/>Kính gửi:.................
                  </td>
              </tr>
              <tr>
                  <td colspan="2">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trung tâm Phát triển quỹ đất thành phố Đà Nẵng cung cấp phiếu thông tin tổng hợp của khu đất (lô đất) phục vụ kêu gọi đầu tư như sau:</span>
                  </td>
              </tr>
          </table>

          <table style='width:100%; font-size: 13pt;'>
              <tr>
                  <td colspan="2">
                      <strong>I. Hình thể, vị trí lô đất:</strong>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="text-align: center;">
                      <img style='border:solid; with:300px' src='${url}' />
                  </td>
              </tr>
              
              <tr>
                  <td colspan="2">
                      <strong>II. Thông tin khu đất, dự án:</strong>
                  </td>
              </tr>
              
              <tr>
                  <td style='width:50%'>
                      - Tên dự án: ${txtTENDUAN}
                  </td>
                  <td style='width:50%'>
                      - Mã dự án: ${txtMADUAN}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Ký hiệu: ${txtKYHIEU}
                  </td>
                  <td style='width:50%'>
                      - Mã khu đất: ${txtMAKHUDAT}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Quận, huyện: ${txtTENHUYEN}
                  </td>
                  <td style='width:50%'>
                      - Xã, phường: ${txtTENXA}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Số tờ: ${txtSOTO}
                  </td>
                  <td style='width:50%'>
                      - Số thửa: ${txtSOTHUA}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Địa chỉ: ${txtDIACHI}
                  </td>
                  <td style='width:50%'>
                      - Diện tích: ${txtDIENTICH}
                  </td>
              </tr>
              
              <tr>
                  <td colspan="2">
                      <strong>III. Thông tin, chỉ tiêu quy hoạch:</strong>
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Tầng cao công trình: ${txtTANGCAO}
                  </td>
                  <td style='width:50%'>
                      - Hiện trạng khu đất: ${txtHIENTRANG}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Mật độ xây dựng: ${txtMATDO}
                  </td>
                  <td style='width:50%'>
                      - Mục đích sử dụng đất:
                  </td>
              </tr>
              
              <tr>
                  <td style='width:50%'>
                      - Chiều cao xây dựng: ${txtCHIEUCAOXD}
                  </td>
                  <td style='width:50%;'>
                      &nbsp;+ QH chi tiết: ${txtQHCT}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Hệ số sử dụng đất: ${txtHESOSDD}
                  </td>
                  <td style='width:50%'>
                      &nbsp;+ QH phân khu: ${txtQHPK}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Khoảng lùi: ${txtKHOANGLUI}
                  </td>
                  <td style='width:50%'>
                      &nbsp;+ QH chung: ${txtQHCHUNG}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Điều kiện HTKT liên quan: ${txtDKHTKTLQ}
                  </td>
                  <td style='width:50%'>
                      - Kế hoạch sử dụng đất: ${txtKHSDD}
                  </td>
              </tr>
              <tr>
                  <td colspan="2">
                      - Các chỉ tiêu quy hoạch khác: ${txtCCTQHK}
                  </td>
              </tr>
              
              <tr>
                  <td colspan="2">
                      <strong>IV. Chủ trương sử dụng đất và kêu gọi đầu tư:</strong>
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - Chủ trương SDĐ: ${txtCTSDD}
                  </td>
                  <td style='width:50%'>
                      - Kế hoạch khai thác: ${txtKHKT}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - QĐ phê duyệt danh mục: ${txtQDPDDM}
                  </td>
                  <td style='width:50%'>
                      - Phương án đấu giá: ${txtPADG}
                  </td>
              </tr>
              <tr>
                  <td style='width:50%'>
                      - QĐ đấu giá: ${txtQDDG}
                  </td>
                  <td style='width:50%'>
                      - Hình thức thu tiền: ${txtHTTT}
                  </td>
              </tr>
              <tr>
                  <td colspan="2">- Đơn giá khởi điểm: ${txtDGKD}</td>
              </tr>
              <tr>
                  <td colspan='2'>
                      - Ghi chú: ${txtGHICHU}
                  </td>
              </tr>
              </table>
          <table style='width:100%; font-size: 13pt;'>
              <tr>
                  <td colspan='2'>
                  <br>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trên đây là tổng hợp thông tin về lô đất kêu gọi đầu tư của Sở Tài nguyên và Môi trường Đà Nẵng./.</span>
                  </td>
              </tr>
              <tr>
                  <td colspan='2'>
                      <br>
                  </td>
              </tr>
              <tr>
                  <td style='width:50%; font-size:10pt'>
                  <i><strong>Nơi nhận;</strong>
                  <br/>-Như trên;
                  <br/>-STNMT(báo cáo);
                  <br/>-Lưu: VT, ......;
                  </i>
                  </td>
                  <td style='width:50%;'>
                  <center>
                  <p><strong>GIÁM ĐỐC</strong><br><i>(Ký, ghi rõ họ tên và đóng dấu)</i></p>
                  </center>
                  </td>
              </tr>
          </table>
      </center>
  </div>`;
  var html = preHtml + stringContent + endHtml;
  // 
  // export or view
  if (isExported) {
      // xuat ra word
      var myBlob = new Blob(["\ufeff", html], {
          type: 'application/msword;charset=utf-8'
      });
      window.open(URL.createObjectURL(myBlob));
      window.close;
  } else {
      var win = window.open();
      win.document.write(html);
      // win.close();
  }
}


const ChangePage = ({ selected }) => {
  //console.log('selected', selected);
  setForcePage(selected);
  var pageQuery = ((selected+1) == 1) ? 0 : ((selected+1) - 1) * 10;
  // console.log(selected, pageQuery, returnWhere);
  if(jimuMapView){
    var Url;
    if(showQuyDat){
      Url = Config.layerUrls.urlQuyDat;
    } else{
      Url = Config.layerUrls.urlQuyDatNho;
    }
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

// click table Quỹ đất lớn
const clickrowQuyDatLon = (selected) => { 
    //console.log('selected', selected, 'showTableQuyDat' , showTableQuyDat);
    dialogFuncMap[`${'displayBasic'}`](true);
    setDtaTableLandClick(selected.data);
    zoomToDuAn_Click(selected.data);
    SetSelectedListofcomments({code: 'ALL', name: 'Tất cả'});
    queryAttachments(selected.data.ThaoTac.feat.attributes.OBJECTID);
    if(showTableQuyDat){
      setActiveIndex1(0)
      setdisabledQD(false);
      setdisabledQDN(true);
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
                        <strong>I. Thông tin khu đất, dự án:</strong>
                    </td>
                </tr>
                
                <tr class="">
                    <td style='width:50%'>
                        - Tên dự án: <b> ${txtTENDUAN}</b>
                    </td>
                    <td style='width:50%'>
                        - Mã dự án: <b>${txtMADUAN}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Ký hiệu: <b>${txtKYHIEU}</b>
                    </td>
                    <td style='width:50%'>
                        - Mã khu đất: <b>${txtMAKHUDAT}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Quận, huyện:<b> ${txtTENHUYEN}</b>
                    </td>
                    <td style='width:50%'>
                        - Xã, phường: <b>${txtTENXA}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Số tờ: <b>${txtSOTO}</b>
                    </td>
                    <td style='width:50%'>
                        - Số thửa: <b>${txtSOTHUA}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Địa chỉ: <b>${txtDIACHI}</b>
                    </td>
                    <td style='width:50%'>
                        - Diện tích: <b>${txtDIENTICH}</b>
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
                        <strong>II. Thông tin, chỉ tiêu quy hoạch:</strong>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Tầng cao công trình: <b>${txtTANGCAO}</b>
                    </td>
                    <td style='width:50%'>
                        - Hiện trạng khu đất: <b>${txtHIENTRANG}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Mật độ xây dựng: <b>${txtMATDO}</b>
                    </td>
                    <td style='width:50%'>
                        - Mục đích sử dụng đất:
                    </td>
                </tr>
                
                <tr>
                    <td style='width:50%'>
                        - Chiều cao xây dựng: <b>${txtCHIEUCAOXD}</b>
                    </td>
                    <td style='width:50%'>
                        &nbsp;+ QH chi tiết: <b>${txtQHCT}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Hệ số sử dụng đất: <b>${txtHESOSDD}</b>
                    </td>
                    <td style='width:50%'>
                        &nbsp;+ QH phân khu: <b>${txtQHPK}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Khoảng lùi: <b>${txtKHOANGLUI}</b>
                    </td>
                    <td style='width:50%' >
                        &nbsp;+ QH chung: <b>${txtQHCHUNG}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Điều kiện HTKT liên quan: <b>${txtDKHTKTLQ}</b>
                    </td>
                    <td style='width:50%'>
                        - Kế hoạch sử dụng đất: <b>${txtKHSDD}</b>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        - Các chỉ tiêu quy hoạch khác: <b>${txtCCTQHK}</b>
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
                        <strong>III. Chủ trương sử dụng đất và kêu gọi đầu tư:</strong>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Chủ trương SDĐ: <b>${txtCTSDD}</b>
                    </td>
                    <td style='width:50%'>
                        - Kế hoạch khai thác: <b>${txtKHKT}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - QĐ phê duyệt danh mục: <b>${txtQDPDDM}</b>
                    </td>
                    <td style='width:50%'>
                        - Phương án đấu giá: <b>${txtPADG}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - QĐ đấu giá: <b>${txtQDDG}</b>
                    </td>
                    <td style='width:50%'>
                        - Hình thức thu tiền: <b>${txtHTTT}</b>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">- Đơn giá khởi điểm: <b>${txtDGKD}</b></td>
                </tr>
                <tr>
                    <td colspan='2'>
                        - Ghi chú: <b>${txtGHICHU}</b>  
                    </td>
                </tr>
                </table>
        </center>
     </div>`;
     setStringContent(stringContent);
    }else{
      setActiveIndex1(2)
      setdisabledQD(true);
      setdisabledQDN(false);
      var data = selected.data.ThaoTac.feat.attributes;
      var txtTENDUAN = (data.TenDuAn) ? data.TenDuAn : '';
      var txtTENHUYEN = (data.TENHUYEN) ? data.TENHUYEN : '';
      var txtTENXA = (data.Phuong) ? data.Phuong : '';
      var txtSOTO = (data.ToBando) ? data.ToBando : '';
      var txtSOTHUA = (data.SoThua) ? data.SoThua : '';
      var txtDIACHI = (data.DiaChi) ? data.DiaChi : '';
      var txtPHANKHU = (data.Phankhu) ? data.Phankhu : '';
      var txtSOLO = (data.SoLo) ? data.SoLo : '';
      var txtDIENTICHQH = (data.MATDO) ? data.DienTichQH : '';
      var txtHATANG = (data.hatang) ? data.hatang : '';
      var txtDONVIQUANLY = (data.Donviquanly) ? data.Donviquanly : '';
      var txtGHICHU = (data.GhiChu) ? data.GhiChu: '';
      var txtVITRI = (data.ViTri) ? data.ViTri: ''; 
      var txtMDSD = (data.MDSD) ? data.MDSD: ''; 
     
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
                        <strong>I. Thông tin dự án tái định cư:</strong>
                    </td>
                </tr>
                
                <tr class="">
                    <td colspan="2">
                        - Tên dự án: <b> ${txtTENDUAN}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Quận/Huyện:<b>${txtTENHUYEN}</b>
                    </td>
                    <td style='width:50%'>
                        - Phường/Xã: <b>${txtTENXA}</b>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        - Địa chỉ:<b> ${txtDIACHI}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Loại đường: <b></b>
                    </td>
                    <td style='width:50%'>
                        - Vị trí lô đất: <b>${txtVITRI}</b>
                    </td>
                </tr>
                <tr>
                    <td style='width:50%'>
                        - Phân khu: <b>${txtPHANKHU}</b>
                    </td>
                    <td style='width:50%'>
                        - Số lô: <b>${txtSOLO}</b>
                    </td>
                </tr>
                <tr>
                  <td style='width:50%'>
                      - Số tờ : <b>${txtSOTO}</b>
                  </td>
                  <td style='width:50%'>
                      - Số thửa: <b>${txtSOTHUA}</b>
                  </td>
                </tr>
                <tr>
                  <td style='width:50%'>
                      - Diện tích : <b>${txtDIENTICHQH}</b>
                  </td>
                  <td style='width:50%'>
                      - hạ tầng: <b>${txtHATANG}</b>
                  </td>
                </tr>
                <tr>
                <td colspan="2">
                    - Mục đích SDĐ : <b>${txtMDSD}</b>
                </td>
               
              </tr>
              <tr>
              <td colspan="2">
                  - Hiện trạng:<b></b>
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
                        <strong>II. Chủ trương sử dụng:</strong>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        - Đơn vị quản lý: <b>${txtDONVIQUANLY}</b>
                    </td>
                    
                </tr>
                <tr>
                    <td colspan="2">
                        - Chủ trương sử dụng: <b></b>
                    </td>
                    
                </tr>
                <tr> 

                </tr>
                     <td colspan="2"> 
                        <div style="margin: 5px;display: flex;align-items: center;">
                          <label class="small">+ Bố trí tái định cư:</label>
                        </div>
                        <div style="border: 1px solid #b5b8bd;border-radius: 5px;margin: 5px">
                          <div class="col-12 box-input mt-1" style="margin: 5px 0;display: flex;align-items: center;">
                            <label class="small">Theo QĐ:</label>
                          </div>
                          <table style="width: 100%; font-size:10pt; margin: 0 0 0 13px;">
                            <tr>
                              <td style='width:50%'>
                                Chồng: <b></b>
                              </td>
                              <td style='width:50%'>
                                CCCD/CMND: <b></b>
                              </td>
                            </tr>

                            <tr>
                              <td style='width:50%'>
                                Ngày sinh: <b></b>
                              </td>
                              <td style='width:50%'>
                                Ngày cấp: <b></b>
                              </td>
                            </tr>
                            <tr>
                              <td style='width:50%'>
                                Điện thoại: <b></b>
                              </td>
                              <td style='width:50%'>
                                Nơi cấp: <b></b>
                              </td>
                            </tr>
                         </table>
                          

                          <div class="col-12 border-top mt-1" style="border-top: 1px solid #dee2e6!important;"></div>

                          <table style="width: 100%; font-size:10pt; margin: 0 0 0 13px;">
                            <tr>
                              <td style='width:50%'>
                                Vợ: <b></b>
                              </td>
                              <td style='width:50%'>
                                CCCD/CMND: <b></b>
                              </td>
                            </tr>

                            <tr>
                              <td style='width:50%'>
                                Ngày sinh: <b></b>
                              </td>
                              <td style='width:50%'>
                                Ngày cấp: <b></b>
                              </td>
                            </tr>
                            <tr>
                              <td style='width:50%'>
                                Điện thoại: <b></b>
                              </td>
                              <td style='width:50%'>
                                Nơi cấp: <b></b>
                              </td>
                            </tr>
                         </table>
                          

                        </div>
                     </td>
                <tr>
                    <td colspan="2" style='width: 100%;
                    background: #ff9800b0 !important;
                    color: #ffffff;
                    margin-top: 0;
                    margin-bottom: 5px;
                    padding: 5px;
                    margin-top: 5px;
                    font-size: 10pt'>
                        <strong>III. Thông tin khác::</strong>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        - Hồ sơ đính kèm: <b></b>
                    </td>
                    
                </tr>
                <tr>
                    <td colspan='2'>
                        - Ghi chú:<b>${txtGHICHU}</b>
                    </td>
                    
                </tr>
                
                </table>
        </center>
     </div>`;
     setStringContentQDN(stringContent);
    }
}

const queryAttachments= async (ID) => { 
  const arrlistDeteleAttachment = [];
  setlistAttachment([]);
  //console.log('ID', ID);
    if (showQuyDat) {
      var URL = "https://gisun.esrivn.net/server/rest/services/DaNang1/DaNang/FeatureServer/5";
    } else{
      var URL = "https://gisun.esrivn.net/server/rest/services/DaNang1/DaNang/FeatureServer/6";
    }
    let attachmentQuery = {
      objectIds: ID,
    };

    const featureLayer = new FeatureLayer( {url:URL});
    featureLayer.queryAttachments(attachmentQuery).then(function (attachments) {
      //console.log('attachments', attachments)
        if(attachments[ID].length >0){
          attachments[ID].forEach(function (item) {
            arrlistDeteleAttachment.push({
              id: null,
              contentType: item.contentType,
              size: item.size,
              name: item.name,
              url: isImage(item.contentType) ? item.url : baseFileUrl,
              link: item.url
            });
          });
          setlistAttachment(arrlistDeteleAttachment);
        }
        
     }).catch(function (error) {
      console.log("attachment query error", error);
    })

}

const isImage=(type: string): boolean =>{
  if (type && type.split('/').length > 0) {
      if (type.split('/')[0] === 'image') {
          return true;
      }
  }
  return false;
}

let Type :any= 'arcgis'; // Kiểu dịch vụ của attachment (arcgis, sql, postgre)
const onOpenFile= (item: any) => {
  if (Type === 'sql') {
      // const url = this.appService.urlOdataAttachment + '/' + item.urlFile;
      // window.open(url, '_blank');
  } else {
      window.open(item.link, '_blank');
  }
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
      {/* Confirm dữ liệu */}
        <ConfirmDialog visible={visible_Land} onHide={() => setVisible_Land(false)} message={messageConfirm}
                    header="Thông báo" icon="pi pi-exclamation-triangle" accept={acceptFunc} reject={rejectFunc} />
      
        {/* Dialog show data search  style={styles.DialogQD} */ }
        <Dialog header="Thông tin dự án" visible={displayBasic}  style={{ width: 'auto', maxWidth: '100%'}} modal={false} onHide={() => onHide('displayBasic')}>
          <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}> 

            <TabPanel header="Dự án lớn" disabled={showdisabledQD}> 
              <div className="col-12 md:col-4" dangerouslySetInnerHTML={{ __html: `${StringContent}` }}></div>
                {/* <CoreForm fieldConfig={fieldConfig} layoutConfig={LayoutConfig} information={information} lookupData={sys_combo} tabId={tabId} isLabelLeft={true} showFooter = {false}></CoreForm> */}
                <Accordion activeIndex={0}>
                <AccordionTab header="Danh sách tệp đính kèm">
                  <div style={{ display: 'flex'}}>
                    {
                          listAttachment && listAttachment.length > 0 &&
                          listAttachment.map(item => { 
                              switch (item) {
                                    default:
                                      return  <div className="attachment-bounder"  style={{ marginLeft: '7px'}}>
                                                  <div className="attachment-item" style={{backgroundImage: 'url(' + item.url + ')'}}
                                                    onClick={() =>onOpenFile(item)} ></div>
                                                  <div className="attachment-desc">{item.name}</div>
                                              </div>
                                      break;
                              }
                          })
                        }
                  </div>
                   
                  </AccordionTab> 
                </Accordion>
                <div className="form_QLDA">
                  <div className="div-button-Tab">
                    <div style={styles.divbutton}>
                      <Button icon="pi pi-print" label="In phiếu thông tin"  style={{ margin: '20px 0 0 0' ,fontSize: '10pt'}} className="p-button-raised p-button-success button-print" onClick={PrintPhieu} />
                    </div>
                  </div>
                </div>
              
            </TabPanel>

            <TabPanel header="Danh sách ý kiến quỹ đất lớn" disabled={showdisabledQD}>
              <div className="divform" style={styles.divform}> 
                <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                  <label style={styles.txtLabel} >Lọc ý kiến:</label>
                  <Dropdown
                    value={selectedListofcomments}
                    options={arrListofcomments}
                    optionLabel="name"
                    placeholder=""
                    onChange={onChangeListofcomments}/>
                </div>
              </div>
              <div className="div-tab" >

                  <div className="wp-list" style={styles.wplist}>
                    <DataTable  value={dataTableListofcomments} emptyMessage="Không tìm thấy dữ liệu cho bảng"  first={first1} rows={rows1} onPage={onCustomPage1} responsiveLayout="scroll" size="small"  scrollHeight="420px" >{/* scrollable*/}
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

            <TabPanel header="Dự án tái định cư" disabled={showdisabledQDN}>
              <div className="col-12 md:col-4" dangerouslySetInnerHTML={{ __html: `${StringContentQDN}` }}></div>
              <Accordion activeIndex={0}>
                <AccordionTab header="Danh sách tệp đính kèm">
                    {
                        listAttachment && listAttachment.length > 0 &&
                        listAttachment.map(item => { 
                            switch (item) {
                                  default:
                                    return  <div className="attachment-bounder"  style={{ marginLeft: '5px'}}>
                                                <div className="attachment-item" style={{backgroundImage: 'url(' + item.url + ')'}}
                                                  onClick={() =>onOpenFile(item)} ></div>
                                                <div className="attachment-desc">{item.name}</div>
                                            </div>
                                    break;
                            }
                        })
                      }
                  </AccordionTab> 
                </Accordion>
            </TabPanel>
          </TabView>
         
        </Dialog>

        {/* Dialog show edit search */}       
        <Dialog header={showQuyDat ? 'Quỹ đất lớn' : 'Quỹ đất tái định cư'} visible={displayConfirm} style={{ maxWidth: '80vw', width: 'auto' }} modal={true}  onHide={() => onHide('displayConfirm')} onShow={() => onShow()}>
          <CoreForm fieldConfig={fieldConfig} layoutConfig={LayoutConfig}  information={information} lookupData={sys_combo} tabId={tabId} isLabelLeft={false} showFooter={true} onOkCallBack={(e) => {onBtnOkClick(e) }} onClearCallBack={onClearCallBack} isDisplayClear={false} isDisplaySearch={false} ref={refForm} labelClear={'Đặt lại'} labelSearch={'Cập nhật'}></CoreForm>
        </Dialog>

         {/* Dialog show add quỹ đất */}       
         <Dialog header={showQuyDat ? 'Quỹ đất lớn' : 'Quỹ đất tái định cư'} visible={displayAdd} style={{ maxWidth: '80vw', width: 'auto' }} modal={true}  onHide={() => onHide('displayAdd')}>
          <CoreForm fieldConfig={fieldConfig} layoutConfig={LayoutConfig} information={information} lookupData={sys_combo} tabId={tabId} isLabelLeft={false} showFooter={true} onOkCallBack={(e) => {onBtnOkAddClick(e) }} onClearCallBack={onClearCallBack} isDisplayClear={false} isDisplaySearch={false} labelClear={'Đặt lại'} labelSearch={'Thêm mới'}></CoreForm>
        </Dialog>
        {/* Dialog show Print search */}       
        <Dialog header="In thông tin dự án" visible={displayPrint} modal={false}  onHide={() => onHide('displayPrint')} onShow={() => onShowPrint()}>
          <div style={styles.mapDiv} ref={MapElement} id="divBanDo_gc"> </div>
          {/* <center>
          <img  style={styles.mapDiv} src={ImgLand} />
          </center> */}
          
          {/* </div> */}
          <div style={styles.divbutton}>
              <div style={{fontSize: '14px' }}>
                <b style={{color: 'red'}}>*Chú ý:</b> Khi tải tệp về với định dạng Word,nội dung văn bản sẽ hiển
                        thị dưới dạng <b>Web layout</b>.<br></br>Để xem và in đúng định dạng văn
                        bản thông thường, người dùng nên chuyển
                        về chế độ <b>Print layout</b><br></br>
                        <center>
                          {/* <img src={webLayout} ></img> <i className="pi pi-angle-double-right"></i> 
                          <img src={printLayout}></img> */}
                        </center>
              </div>
            </div>
          <div style={styles.divbutton}>
            <Button icon="pi pi-print" label="Xem phiếu" style={{fontSize: '10pt'}}  className="p-button-raised p-button-success button-print" onClick={(val) =>createDataPrinting(false)} />
            <Button icon="pi pi-print" label="Xuất phiếu"  style={{ margin: '0 0 0 3px', fontSize: '10pt' }} className="p-button-raised p-button-success button-print" onClick={(val) =>createDataPrinting(true)} />
          </div>
          
        </Dialog>
        <Toast ref={toast} position="bottom-right"/>

        {/* Form tìm kiếm */}
      
          <div className="title_search">{nls('field1')}</div>
          <div className="form_QLDA">
            <div className="div-form"> 
              <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                <label className="txtLabel">{nls('field2')}</label>
                <Dropdown
                      value={selectedLodat}
                      options={arrListofLodat}
                      optionLabel="name"
                      onChange={onChangeLodat}
                    />
              </div>
            </div>
      
              <div className={showQuyDat ? 'Show' : 'hidden'}>
                {/* <CoreForm mode="search" fieldConfig={fieldConfig} layoutConfig={LayoutConfig} information={information} lookupData={sys_combo} tabId={tabId} isLabelLeft={true} showFooter = {true} onOkCallBack={(e) => {onBtnOkClick(e) }}></CoreForm> */}
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

            <div className={!showQuyDat ? 'Show' : 'hidden'}>
            {
                fieldListQuyDatNho && fieldListQuyDatNho.length > 0 &&
                fieldListQuyDatNho.map(el => {
                  switch (el.FIELD_TYPE) {
                    case 'date':
                      return <div className="div-form">
                        <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                          <label className="txtLabel">{el.FIELD_LABEL}</label>
                          <Calendar className="field col-12"  value={currentValueQuyDatNho[el.FIELD_NAME]} showIcon onChange={(val) => setValueControl(val, el)} />
                        </div>
                        </div>
                      break;
                    case 'text':
                      return <div className="div-form">
                        <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                        <label className="txtLabel">{el.FIELD_LABEL}</label>
                          <InputText className="field col-8" value={currentValueQuyDatNho[el.FIELD_NAME]} onChange={(val) => setValueControl(val, el)} />
                        </div>
                        </div>
                      break;
                    case 'select':
                      return <div className="div-form">
                        <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                        <label className="txtLabel">{el.FIELD_LABEL}</label>
                          <Dropdown showClear={true} value={currentValueQuyDatNho[el.FIELD_NAME]} options={el.FIELD_LOOKUP} onChange={(val) => setValueControl(val, el)} optionLabel="name" />
                        </div>
                        </div>
                      break;
                    default:
                      return <div className="div-form">
                        <div className="field col md:col-3 combo" style={{ display: 'flex' }}>
                          <label className="txtLabel">{el.FIELD_LABEL}</label>
                          <InputText className="field col-8" value={currentValueQuyDatNho[el.FIELD_NAME]} onChange={(val) => setValueControl(val, el)} />
                        </div>
                        </div>
                      break;
                  }
                })
              }
            </div>
          </div>
          <br />
          <div className="div-button">
            <Button icon="pi pi-search" label={nls('field3')} className="p-button-warning" onClick={TimKiemQuyDat} />
            <Button icon="pi pi-replay" label={nls('field4')} className="p-button-outlined p-button-warning button-print" onClick={onClear} />
            <Button icon="pi pi-file-excel" label={nls('field5')} className="p-button-raised p-button-success button-print" onClick={handleExportCSV}/>
          </div>
       

        <br />
        <div className="div-tab">
          {/* <TabView>
            <TabPanel header="Bảng"> */}
              <div className="wp-list">
                {/* table Quỹ đất lớn */}
                <div className={showTableQuyDat ? 'Show' : 'hidden'}> 
                <DataTable ref={dt_QDL} value={dataTable} emptyMessage="Không tìm thấy dữ liệu cho bảng"  size="small" scrollable  onRowClick={(e) => { clickrowQuyDatLon(e) }} loading={loading}>
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
                  
               

                <div className={!showTableQuyDat ? 'Show' : 'hidden'}>
                  <DataTable ref={dt_QDN} value={dataTableQuyDatNho} emptyMessage="Không tìm thấy dữ liệu cho bảng" size="small"  scrollable onRowClick={(e) => { clickrowQuyDatLon(e) }} loading={loading}>
                        {
                          DS_TableQuyDatNho && DS_TableQuyDatNho.length > 0 &&
                          DS_TableQuyDatNho.map(el => { 
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
