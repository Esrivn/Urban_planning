import Graphic from "esri/Graphic";
import View from "esri/views/View";
import { JimuMapView } from "jimu-arcgis";
import { IMState, React, ReactRedux, FormattedMessage, AllWidgetProps } from "jimu-core";
import ReactDOM from "react-dom";
import RenderTemplateAttributes from "../../../../../../components/RenderTemplateAttributes";
import { queryFeatures } from "../../../utils";
import _location from "../../../../images/location.png";
import { IMConfig } from "../../../../config";
import { Loader } from "../../../../../../../component";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import defaultMessages from '../../../translations/default';
import './style.scss';
import { hooks } from "jimu-ui";

const {Fragment, useEffect, useState, useRef} = React;
const {useSelector, useDispatch} = ReactRedux;
export interface Props {
  jimuMapView: JimuMapView,
  config: IMConfig,
  allProps: AllWidgetProps<IMConfig>
}

function Detail(props: Props) {
  const nls = hooks.useTranslate(defaultMessages)
  const {jimuMapView, config} = props;
  const dispatch = useDispatch();
  const {pageCategories, typeLayout} = useSelector((state: IMState) => state.layoutState) as any;
  const [listCategoriesDetail, setListCategoriesDetail] = useState([]);
  const [_view, setMapView] = useState(null) as any;
  const [_categorieFeature, setCategorieFeature] = useState(null);
  const [isLoader, setIsLoader] = useState(null);

  useEffect(() => {
    if (jimuMapView) {  
      let view: View =  jimuMapView.view;
      setMapView(view);      
    }
  }, [jimuMapView]);


useEffect(() => {
  if (_view) {
    const tables:any[] = _view.map.tables.get('items');
    const categorieFeature = tables.find(f => f.title === "Categories"); 
    setCategorieFeature(categorieFeature);
  }
}, [_view])

  useEffect(() => {
    if (pageCategories) {
      setListCategoriesDetail(pageCategories[pageCategories.length-1].data);
    }
  }, [dispatch, pageCategories, typeLayout])

  useEffect(() => {    
  }, [listCategoriesDetail])


  const handleClickItemDetail = async (item) => {
    
    setIsLoader(true);
    handleClickHide();


    let layers = _view.layerViews.get('items');
    item.LOCATION_TYPE = item.LOCATION_TYPE ? item.LOCATION_TYPE : 0;
    let arrWhere = [{
      'layerName': 'Events',
      'where': `((((FACILITY_ID = '${item.LEVEL_NUMBER}') AND (LEVEL_NUMBER = ${item.LEVEL_NUMBER})) OR (FACILITY_ID <> '${item.FACILITY_ID}')) OR (VERTICAL_ORDER = ${item.VERTICAL_ORDER}))`
    },
    {
      'layerName': 'Places + Things',
      'where': `((((FACILITY_ID = '${item.FACILITY_ID}') AND (LEVEL_NUMBER = ${item.LEVEL_NUMBER})) OR (FACILITY_ID <> '${item.FACILITY_ID}')) OR (VERTICAL_ORDER = ${item.VERTICAL_ORDER}))`
    },
    {
      'layerName': 'Retail + Services',
      'where': `((((FACILITY_ID = '${item.FACILITY_ID}') AND (LEVEL_NUMBER = ${item.LEVEL_NUMBER})) OR (FACILITY_ID <> '${item.FACILITY_ID}')) OR (VERTICAL_ORDER = ${item.VERTICAL_ORDER}))`
    },
    {
      'layerName': 'Safety + Security',
      'where': `((((FACILITY_ID = '${item.FACILITY_ID}') AND (LEVEL_NUMBER = ${item.LEVEL_NUMBER})) OR (FACILITY_ID <> '${item.FACILITY_ID}')) OR (VERTICAL_ORDER = ${item.VERTICAL_ORDER}))`
    },
    {
      'layerName': 'People',
      'where': `(((FACILITY_ID = '${item.FACILITY_ID}') AND (LEVEL_NUMBER = ${item.LEVEL_NUMBER})) OR (FACILITY_ID <> '${item.FACILITY_ID}'))`
    },
    {
      'layerName': 'Details',
      'where': `(((FACILITY_ID = '${item.FACILITY_ID}') AND (LEVEL_NUMBER = ${item.LEVEL_NUMBER})) OR ((FACILITY_ID <> '${item.FACILITY_ID}') AND (VERTICAL_ORDER = ${item.VERTICAL_ORDER})))`
    },
    {
      'layerName': 'Units',
      'where': `(((FACILITY_ID = '${item.FACILITY_ID}') AND (LEVEL_NUMBER = ${item.LEVEL_NUMBER})) OR ((FACILITY_ID <> '${item.FACILITY_ID}') AND (VERTICAL_ORDER = ${item.VERTICAL_ORDER})))`
    },
    {
      'layerName': 'Levels',
      'where': `(((FACILITY_ID = '${item.FACILITY_ID}') AND (LEVEL_NUMBER = ${item.LEVEL_NUMBER})) OR ((FACILITY_ID <> '${item.FACILITY_ID}') AND (VERTICAL_ORDER = ${item.VERTICAL_ORDER})))`
    },
    {
      'layerName': 'Facilities',
      'where': `FACILITY_ID <> '${item.FACILITY_ID}'`
    }]

    if (layers && layers.length > 0) {
      _view.floors.items = [item.LEVEL_ID]
      layers.forEach((layer: any) => {
          if (layer.layer.type === 'feature') {
            console.log(layers);
            let _where:any = arrWhere.find((f: any) => f.layerName === layer.layer.title);
            _where = _where.where;
            layer.layer.definitionExpression = _where;
            layer.layer.refresh();
          }
      });
  }
    

    let symbol: any = {
      type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
      url: _location,
      width: "32px",
      height: "32px"
    };
    let where = `OBJECTID=${item.OBJECTID}`;
    await queryFeatures(item.urlLayer, where).then(async results => {
      const div = <RenderTemplateAttributes allProps={props.allProps} defaultMessages = {defaultMessages} handleClickHide={handleClickHide} results={results.features[0]} config={config} />;
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
      
      let pointGraphic:Graphic = new Graphic({
        geometry: results.features[0].geometry,
        symbol: symbol
      });
      _view.goTo({
        target: results.features[0].geometry,
        zoom: 35
      })

      _view.graphics.add(pointGraphic);

      setIsLoader(false);
    })
  }

  const handleClickHide = () => {
    _view.graphics.removeAll();
    let _tempID = _view.ui.find("tempID");
    if (_tempID) _view.ui.remove(_tempID);    
  }

  const abcTpl = (rowData) => {
return(<Fragment>
 <div className='category__item-container'>
                <span className='category__item-content'>
                  <img className="category__item-icon" src={rowData.urlImg} alt="" title="People" />
                  <span className="category__item-text">
                    <span className="category__item-title">{rowData.UNIT_NAME}</span>
                  </span>
                </span>
              </div>
</Fragment>)
  }

  const template2 = {
    layout: 'PrevPageLink CurrentPageReport NextPageLink',
    'CurrentPageReport': (options) => {
      let totalPage = 0;
      let rowPage = pageCategories.find(f => f.type === 'detail');
      if (rowPage && rowPage.data && rowPage.data.length) {
        let num = rowPage.data.length/options.rows;
        totalPage =  num > Math.floor(num) ? Math.floor(num) + 1 : Math.floor(num);
      }
        return (
            <span style={{ color: 'blue', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                {nls("Page")}
                
                {/* <FormattedMessage id="Page" defaultMessage={defaultMessages.Page}></FormattedMessage> */}
                <span style={{ paddingLeft: '5px' }}>{options.currentPage} / {totalPage}</span>
            </span>
        )
    }
};
const [rows2, setRows] = useState(15);
const [first2, setFirst] = useState(0);
const onCustomPage = (event) => {
  setFirst(event.first);
  setRows(event.rows);
}
    return (<Fragment>
       <Loader display={isLoader} ></Loader>
       <div className="category-list-detail">
                <DataTable selectionMode="single" 
                totalRecords={listCategoriesDetail.length} 
                value={listCategoriesDetail} 
                paginator paginatorTemplate={template2} 
                first={first2} 
                rows={rows2} 
                onPage={onCustomPage}
                paginatorClassName="justify-content-end" 
                className="mt-6" 
                responsiveLayout="scroll"
                onSelectionChange={e => handleClickItemDetail(e.value)}
                >
                    <Column body={abcTpl}></Column>
                </DataTable>
            </div>
      </Fragment>);
}

export default Detail;