import View from 'esri/views/View';
import { React, AllWidgetProps, jsx, getAppStore, appActions, ReactRedux, WidgetProps, WidgetManager, IMState } from 'jimu-core';
import { Fragment } from 'react';
import { ArrowBackIcon } from '../../assets/icons';
import { queryAttachments, queryFeatures } from '../../utils';
import './style.scss';
import Explore from '../Explore';

const {useSelector, useDispatch} = ReactRedux;
const { useEffect, useState} = React;

function Header(props) {
  const dispatch = useDispatch();
  const {pageCategories, typeLayout} = useSelector((state: IMState) => state.layoutState) as any;

  const [itemCategory, setItemCategory] = useState(null) as any;
  useEffect(() => {
    if (pageCategories) {
      setItemCategory(pageCategories[pageCategories.length-1])
    }
  }, [dispatch, pageCategories, typeLayout])

  useEffect(() => {
    console.log('itemCategory', itemCategory);
    
  }, [itemCategory])

  const {jimuMapView} = props;
  const [listCategories, setListCategories] = useState([]);
  const [_view, setMapView] = useState(null);
  const [_categorieFeature, setCategorieFeature] = useState(null);

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

    const eventBackCategory  = () => {
      // if (_categorieFeature) {
      //   let where = '';
      //   if (typeLayout.level === 1) {
      //     where = 'CATEGORY_LEVEL=1';
      //   }
      //   queryFeatures(_categorieFeature, where).then(results => {
      //     console.log(results);
      //     results.features.forEach(async element => {
      //       let attributes = element.attributes;
      //       let urlImg = await getUrlImg(_categorieFeature, attributes.OBJECTID);
      //       attributes.urlImg = urlImg;
      //       setListCategories(prev => [...prev, attributes]);
      //     });
      //   })
      // }
    }
    
    const getUrlImg = (categories, id) => {
      let attachmentQuery = {
        objectIds: id
      };
      return new Promise(async (resolve, reject) => {
        await queryAttachments(categories, attachmentQuery).then(data => {
          if (data && data[id]) {
            resolve(data[id][data[id].length - 1].url);
          } else {
            resolve(null);
          }
        })
      })
    }

    const handleClickBtnClose = () => {
      dispatch({
        type: 'MenuItem_Action',
        val: {
          type: '',
          title: 'Indoor'
        }
      })
    }

    const handleBack = () => {
      let type = '';
      let title = 'Indoor';
      let subTitle = '';
      pageCategories && pageCategories.length > 1 && pageCategories.splice(pageCategories.length - 1, 1);
      if (pageCategories.length < 2) {
        handleClickBtnClose();
      } else {
        dispatch({
          type: 'MenuItem_Action',
          val: { 
            type: 'explore',
            title: typeLayout.title,
            subTitle: typeLayout.subTitle,
          }
        })
      }
    }

    return (<Fragment>
        {
          <div className={typeLayout.type !== '' ? 'header__caption color_title_detail' : 'header__caption color_title'}>
          <Fragment>
            {typeLayout.type === '' && <span>{typeLayout.title}</span>}
          </Fragment>

          <Fragment>
            {typeLayout.type === 'myplaces' && <span>{typeLayout.title}</span>}
          </Fragment>

          <Fragment>
            {typeLayout.type === 'explore' && <span><span onClick={handleBack} className='iconBack'><ArrowBackIcon /> </span>{itemCategory && itemCategory.title}</span>}
          </Fragment>

          <Fragment>
            {typeLayout.type === 'detail' && 
              <span className='header__title'>
                <span onClick={handleBack} className='iconBack'>
                  <ArrowBackIcon /> 
                </span>
                  {itemCategory && itemCategory.title}
                <span className='header__subtitle'>{itemCategory && itemCategory.level > 1 ? itemCategory.subTitle : ''}</span>
              </span> }
          </Fragment>

          <span onClick={handleClickBtnClose} className={typeLayout.type !== '' ? 'header__btnclose_detail' : 'header__btnclose'}>&times;</span>
        </div>
        }
      </Fragment>);
}

export default Header;