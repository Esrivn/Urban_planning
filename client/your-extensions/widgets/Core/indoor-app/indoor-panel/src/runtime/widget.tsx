/** @jsx jsx */
import { React, AllWidgetProps, jsx, ReactRedux, IMState, Immutable } from 'jimu-core'
import { IMConfig } from '../config';
import './styles/style.scss';
import { Fragment } from 'react';
import { JimuMapView, JimuMapViewComponent, loadArcGISJSAPIModules } from 'jimu-arcgis';
import Header from './layout/Header';
import Content from './layout/Content';
import { getAppConfigAction } from 'jimu-for-builder';
import { configInitService} from '../../../../component/services';
import ReactDOM from 'react-dom';
import RenderTemplateAttributes from '../../../components/RenderTemplateAttributes';
import defaultMessages from './translations/default';
import { hooks } from 'jimu-ui';



// require('./assets/icons/location.png');
const { useSelector, useDispatch } = ReactRedux;
const { useState, useEffect, useLayoutEffect, useRef } = React;



let handleClickView = null; 
export default function Widget(props: AllWidgetProps<IMConfig> & any) {
  const { config  } = props
  const handleClick = () => {
    console.log(sidebarWidgetId);
    
    const appConfigAction = getAppConfigAction()
    appConfigAction.editWidgetConfig(sidebarWidgetId, Immutable(config).set('size', 500)).exec()
  }
  const [sidebarWidgetId, setSidebarWidgetId] = useState(null as string);
const [configInit, setConfigInit] = useState(null);
const typeLayout:any = useSelector((state: IMState) => state.layoutState.typeLayout);
  // Get Map View
  const [jimuMapView, setJimuMapView] = useState(null);
  const [_view, setView] = useState(null);


useEffect(() => {
  loadConfig();
}, [])

const loadLocation = async () => {
        let a = window.location.search.replace('?', '');
        let b = a.split('&');
        let lat = '';
        let long = '';
        let levelId = '';
        b.forEach((item: any) => {
          if(item.includes('lat')) {
            lat = item.replace('lat=', '');
          }

          if(item.includes('long')) {
            long = item.replace('long=', '');
          }

          if(item.includes('levelId')) {
            levelId = item.replace('levelId=', '');
          }
        })

        if (lat !== '' && long !== '') {
          const [
            Point, projection
          ] = await loadArcGISJSAPIModules([
            "esri/geometry/Point",
            "esri/geometry/projection",
          ]);
          let point = new Point({
            latitude: Number(lat),
            longitude: Number(long)
          });
  
  
          await projection.load()
          point = projection.project(point, _view.spatialReference);
          
          if (levelId !== '') {
            let _selector = `button[data-id='${levelId}']`;
            let btnLevel: any = document.querySelector(_selector);
            if (btnLevel) {
              btnLevel.click();
            }
          }


          _view.goTo({
            target: point,
            zoom: 40
          })
        }
}

const loadConfig = async () => {
  const rs = await configInitService(config);
  setConfigInit(rs);
}

useEffect(() => {
  if (_view && configInit) {
      _view.when(async () => {  
        // await getGraphicLayer(_view, 'layer_grpPoint');
        loadLocation();
        if (handleClickView) handleClickView.remove();
        handleClickView = _view.on("click", executeIdentify);
      })
    }
}, [configInit, _view])


  useLayoutEffect(() => {
    console.log("render useLayoutEffect");
    if (jimuMapView) {  
      setView(jimuMapView.view);
    }
  }, [jimuMapView])

  // Get list layerId hiển thị
  const getLayerIdIdentify = () => {
    let results = [];
    configInit.layers.forEach(item => {
      if (item.isIdentify === "Y") {
        results.push(item.layerIndex);
      }
    });

    if (results.length > 0) return results.sort((a, b) => (a - b));
  }
  
  const executeIdentify = async (evt) => {
    handleClickHide();
    const [
      identify,
      IdentifyParameters
    ] = await loadArcGISJSAPIModules([
      "esri/rest/identify",
      "esri/rest/support/IdentifyParameters"
    ]);
    let _layerIds = await getLayerIdIdentify();
    console.log('_layerIds', _layerIds);
    
    let params = new IdentifyParameters();
    params.tolerance = 3;
    params.layerIds = [..._layerIds];
    params.layerOption = "top";
    params.returnGeometry = true;
    params.geometry = evt.mapPoint;
    params.mapExtent = _view.extent;
    let identifyURL = configInit.services[0].urlView;
    identify
    .identify(identifyURL, params)
    .then(function (response) {

      const results = response.results;
      if (results.length > 0) {
        let feature:any = results[0].feature;
        let layerName = results[0].layerName;
        feature.attributes.layerName = layerName;
        feature.layer = {
          title: layerName
        };


        const div = <RenderTemplateAttributes allProps={props} defaultMessages = {defaultMessages} handleClickHide={handleClickHide} results={feature} config={config} />;
            let _divTemp = document.createElement('div');
            _divTemp.className = 'temp';
            _divTemp.id = 'tempID';
            _divTemp.style.position = 'absolute'
            _divTemp.style.top = '0';
            _divTemp.style.bottom = '15px';
            _divTemp.style.backgroundColor = '#fff';
            _divTemp.style.right = '10px';
            _divTemp.style.zIndex = '99999';
            _divTemp.style.maxHeight = '800px';
            _divTemp.style.height = '100vh';
            ReactDOM.render(div, _divTemp);
            _view.ui.add(_divTemp, 'top-right');
      }
 
      // if (config.services.sysTables.length > 0 && response.results && response.results.length > 0) {
        // let table = config.services.sysTables.find(f => f.layerIndex === response.results[0].layerId);
        // console.log('response', table);
      // }
    })
  }



  const handleClickHide = () => {
    _view.graphics.removeAll();
    let _tempID = _view.ui.find("tempID");
    if (_tempID) _view.ui.remove(_tempID);    
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
    <div className={typeLayout.type !== '' ? 'indoor__panel indoor__panel_item' : 'indoor__panel'}>
        {/* Config App */}
        <ViewMap />
        <div className='indoor__header'>
          <Header />
        </div>
        <div className="indoor__content">
          <Content jimuMapView={jimuMapView} config={config} allProps={props} />
        </div>
          {/* <button onClick={handleClick}>Click</button> */}
    </div>
  )
}
