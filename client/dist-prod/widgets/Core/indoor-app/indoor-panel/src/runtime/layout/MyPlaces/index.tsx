import Graphic from "esri/Graphic";
import { JimuMapView } from "jimu-arcgis";
import { AllWidgetProps, React } from "jimu-core";
import ReactDOM from "react-dom";
import RenderTemplateAttributes from "../../../../../components/RenderTemplateAttributes";
import {HomeIcon, LocatorIcon, FavoriteIcon} from "../../assets/icons";
import { queryFeatures } from "../../utils";
import './style.scss';
import _location from "../../../images/location.png";
import { CoreMessage } from "../../../../../../component";
import { IMConfig } from "../../../config";
import { Loader } from "../../../../../../component";
import defaultMessages from '../../translations/default';

const {Fragment, useState, useEffect, useRef} = React;

export interface Props {
  jimuMapView: JimuMapView,
  config: IMConfig,
  allProps: AllWidgetProps<IMConfig>
}

function MyPlaces(props: Props) {
  const {jimuMapView, config} = props;
  const [isLoader, setIsLoader] = useState(null);
  const messageRef:React.MutableRefObject<any> = useRef();
  let homeLocation = JSON.parse(localStorage.getItem('indoors__anonymous__home-location'));
  let favoritePlaces = JSON.parse(localStorage.getItem('indoors__anonymous__favorite-places'));
  let recentPlaces = JSON.parse(localStorage.getItem('indoors__anonymous__recent-places'));
    const [homeLocationValue, setHomeLocationValue] = useState('') as any;
    const [favoritePlacesList, setFavoritePlacesList] = useState('') as any;
    const [recentPlacesList, setRecentPlacesList] = useState('') as any;
    
    useEffect(() => {
      console.log('setHomeLocationValue', homeLocation);
      setHomeLocationValue(homeLocation);
      console.log('setFavoritePlacesList', favoritePlaces);
      setFavoritePlacesList(favoritePlaces);
      console.log('setRecentPlacesList', recentPlaces);
      setRecentPlacesList(recentPlaces);
    }, [])

    const handleClickItemDetail = async (item) => {
      setIsLoader(true);
      // messageRef.current.getMessages('success','thành công!');
      
      const layers: any[] = jimuMapView.view.allLayerViews.get('items');
      const layer = layers.find(f => f.layer.title === item.sourceKey);
      let url = '';
      if (layer) {
        url = layer.layer.url + '/' + layer.layer.layerId
      }
      handleClickHide();
  
      let symbol: any = {
        type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
        url: _location,
        width: "32px",
        height: "32px"
      };



      let where = `${item.uniqueIdField}=${item.uniqueId}`;
      let results = await queryFeatures(url, where);
        const div = <RenderTemplateAttributes allProps={props} defaultMessages = {defaultMessages} handleClickHide={handleClickHide} results={results.features[0]} config={config} />;
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
              jimuMapView.view.ui.add(_divTemp, 'top-right');
        
        let pointGraphic:Graphic = new Graphic({
          geometry: results.features[0].geometry,
          symbol: symbol
        });
  
        jimuMapView.view.graphics.add(pointGraphic);
  
  
        jimuMapView.view.goTo({
          zoom: 22,
          center: results.features[0].geometry
        })
        setIsLoader(false);
    }
  
    const handleClickHide = () => {
      jimuMapView.view.graphics.removeAll();
      let _tempID = jimuMapView.view.ui.find("tempID");
      if (_tempID) jimuMapView.view.ui.remove(_tempID);    
    }



    return (<Fragment>
      <Loader display={isLoader} ></Loader>
      <CoreMessage ref={messageRef} />
        <div className='content_myplaces'>
          <h6>SAVED</h6>
          <ul className="list-item">
            <li className="item" onClick={() => handleClickItemDetail(homeLocationValue)}>
              <span><HomeIcon className='i-feature-item-text' /></span>
              <span className="item__content">
                <span>Home</span>
                <span>{homeLocationValue && homeLocationValue.value}</span>
              </span>
            </li>
          </ul>
          <ul className="list-item">
            {favoritePlacesList && favoritePlacesList.map(item => (
              <li onClick={() => handleClickItemDetail(item)} className="item"><span><FavoriteIcon className='i-feature-item-text' /></span>{item.value}</li>
            ))}
          </ul>
          <h6>RECENT</h6>
          <ul className="list-item">
          {recentPlacesList && recentPlacesList.map(item => (
              <li onClick={() => handleClickItemDetail(item)} className="item"><span><LocatorIcon className='i-feature-item-text' /></span>{item.value}</li>
            ))}
          </ul>
        </div>
      </Fragment>);
}

export default MyPlaces;