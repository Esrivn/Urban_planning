import FeatureLayer from "esri/layers/FeatureLayer";
import Map from "esri/Map";
import View from "esri/views/View";
import { JimuMapView, loadArcGISJSAPIModules } from "jimu-arcgis";
import { AllWidgetProps, IMState, React, ReactRedux } from "jimu-core";
import { config } from "process";
import { Loader } from "../../../../../../../component";
import { IMConfig } from "../../../../config";
import { queryFeatures, queryAttachments, esriRequest } from "../../../utils";
const { Fragment, useEffect, useState } = React;
const { useSelector, useDispatch } = ReactRedux;
export interface Props {
  jimuMapView: JimuMapView,
  config: IMConfig
}

function Categories(props: Props) {
  const { jimuMapView, config } = props;
  const dispatch = useDispatch();
  const { pageCategories, typeLayout } = useSelector((state: IMState) => state.layoutState) as any;
  const [listCategories, setListCategories] = useState([]);
  const [_view, setMapView] = useState(null);
  const [_categorieFeature, setCategorieFeature] = useState(null);
  const [isLoader, setIsLoader] = useState(null);


  const [itemCategory, setItemCategory] = useState(null) as any;
  useEffect(() => {
    console.log(typeLayout);
    if (pageCategories) {
      setItemCategory(pageCategories[pageCategories.length - 1])
      setListCategories(pageCategories[pageCategories.length - 1].data);
    }
  }, [dispatch, pageCategories, typeLayout])

  useEffect(() => {
    console.log('itemCategory', itemCategory);

  }, [itemCategory])


  useEffect(() => {
    if (jimuMapView) {
      let view: View = jimuMapView.view;
      setMapView(view);
    }
  }, [jimuMapView]);


  const addFeature = () => {
    const urlCategory = config.services[2].url;
    return loadArcGISJSAPIModules([
      "esri/layers/FeatureLayer"
  ]).then(modules => {
      let FeatureLayer: typeof __esri.FeatureLayer;
      [FeatureLayer] = modules
      const layer = new FeatureLayer({
          url: urlCategory
      });
      if (itemCategory.level !== 2) {
        setCategorieFeature(layer);
      }
    });
  }

  useEffect(() => {
    if (_view) {
      addFeature();
      // const tables: any[] = _view.map.tables.get('items');
      // const categorieFeature = tables.find(f => f.title === "Categories");
      // if (itemCategory.level !== 2) {
      //   setCategorieFeature(categorieFeature);

      // }
    }
  }, [_view])

  useEffect(() => {
    if (_categorieFeature) {
      queryCategoryFeature();
    }
  }, [_categorieFeature])

  useEffect(() => {
    console.log('pageCategories', pageCategories);
  }, [dispatch, pageCategories])

  const queryCategoryFeature = () => {
    setIsLoader(true);
    let layerUrl = config.services[2].url;
    queryFeatures(layerUrl, 'CATEGORY_LEVEL=1').then(async results => {
      console.log(results);
      let arr = [];
      for (let i = 0; i < results.features.length; i++) {
        let attributes = results.features[i].attributes;
        let urlImg = await getUrlImg(_categorieFeature, attributes.OBJECTID);
        attributes.urlImg = urlImg;
        arr.push(attributes);
      }

      let page = {
        type: 'explore',
        title: 'Explore This Area',
        subTitle: '',
        data: arr,
        level: 1,
        page: 1
      }

      dispatch({
        type: 'PageCategories',
        val: [...pageCategories, page]
      });
      dispatch({
        type: 'MenuItem_Action',
        val: {
          type: 'explore',
          title: 'Explore This Area',
        }
      });
      setIsLoader(false)
    })
  }

  const queryCategoryFeatureBack = (title) => {
    console.log('Thay doi', title);
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


  const handleClickBtnCategory = (type: string, category: any) => {
    {
      setIsLoader(true);
      if (category.CHILD_FIELD) {
        const items: any[] = _view.allLayerViews.get('items');
        const urlCategoryFeature = items.find(f => f.layer.title === category.LAYER);
        if (urlCategoryFeature) {
          const urlFeature = `${urlCategoryFeature.layer.url}/${urlCategoryFeature.layer.layerId}/query`;
          let level = category.CATEGORY_LEVEL + 1;
          let layer = category.LAYER;
          let idCategory = category.OBJECTID;
          let params = {
            where: `1=1`,
            f: 'json',
            outFields: ['CATEGORY_SUBTYPE'],
            returnGeometry: false,
            returnDistinctValues: true
          }
          esriRequest(urlFeature, params, 'GET').then((res: any) => {
            let featuresCategory = res.data.features;
            console.log('featuresCategory', featuresCategory);

            if (featuresCategory) {
              // const tables: any[] = _view.map.tables.get('items');
              // const categoriesFeature = tables.find(f => f.title === "Categories");
              let layerUrl = config.services[2].url;
              let where = `CATEGORY_LEVEL=${level} AND LAYER = '${layer}'`;
              queryFeatures(layerUrl, where).then(async results => {
                let arr = [];
                for (let i = 0; i < results.features.length; i++) {
                  let attributes = results.features[i].attributes;
                  let isCategoryShow = featuresCategory.some(f => f.attributes.CATEGORY_SUBTYPE === attributes.NAME);
                  if (isCategoryShow) {
                    let urlImg = await getUrlImg(_categorieFeature, attributes.OBJECTID);
                    attributes.urlImg = await getUrlImg(_categorieFeature, idCategory);
                    if (urlImg) {
                      attributes.urlImg = urlImg;
                    }
                    arr.push(attributes)
                  }
                }

                if (!pageCategories.find(f => f.level === level)) {
                  let page = {
                    type: 'explore',
                    title: category.LAYER,
                    subTitle: '',
                    data: arr,
                    level: level,
                    page: level
                  }
                  dispatch({
                    type: 'PageCategories',
                    val: [...pageCategories, page]
                  });
                  dispatch({
                    type: 'MenuItem_Action',
                    val: {
                      type: 'explore',
                      title: category.LAYER,
                    }
                  });
                }
                setIsLoader(false);
              })
            }
          })
        }
      } else {
        if (!category.CHILD_FIELD) {
          getCategoriesDetail(category);
        }
      }
    }
  }

  const getCategoriesDetail = async (category) => {
    const layers: FeatureLayer[] = _view.allLayerViews.get('items');
    const layerDetail: any = layers.find((f: any) => f.layer.title === category.LAYER);
    const layerUrl = `${layerDetail.layer.url}/${layerDetail.layer.layerId}`;
    let where = `CATEGORY_SUBTYPE='${category.NAME}'`;
    if (category.CATEGORY_LEVEL === 1) {
      where = '1=1';
    }
    await queryFeatures(layerUrl, where).then(async results => {
      console.log('detail', results);
      let arr = [];
      for (let i = 0; i < results.features.length; i++) {
        let attributes = results.features[i].attributes;
        attributes.urlImg = category.urlImg;
        attributes.urlLayer = layerUrl;
        attributes.layerName = category.NAME;
        arr.push(attributes)
      }

      let page = {
        type: 'detail',
        title: category.LAYER,
        subTitle: category.PARENT ? category.NAME : '',
        data: arr,
        level: category.CATEGORY_LEVEL + 1,
        page: category.CATEGORY_LEVEL + 1
      }

      dispatch({
        type: 'PageCategories',
        val: [...pageCategories, page]
      });
      dispatch({
        type: 'MenuItem_Action',
        val: {
          type: 'detail',
          title: category.LAYER,
        }
      });
      setIsLoader(false);
    })
  }

  return (<Fragment>
    <Loader display={isLoader} ></Loader>
    <div className='content_explore'>
      <ul className="i-categories" aria-label="List of categories">
        {listCategories && listCategories.length > 0 && listCategories.map(category => (
          <li onClick={() => handleClickBtnCategory('category', category)}>
            <span>
              <img src={category.urlImg} alt="" />
              <p>{category.NAME}</p>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </Fragment>);
}

export default Categories;