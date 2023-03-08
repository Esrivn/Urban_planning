import { JimuMapView } from "jimu-arcgis";
import { IMState, React, ReactRedux, AllWidgetProps  } from "jimu-core";
import { ExloreIcon, MyPlacesIcon } from "../../assets/icons";
import { IMConfig } from '../../../config'
import defaultMessages from '../../translations/default';
import { hooks } from "jimu-ui";
const { Fragment } = React;
const { useSelector, useDispatch } = ReactRedux;

export interface Props {
  jimuMapView: JimuMapView,
  allProps: AllWidgetProps<IMConfig>
}
function Explore(props: Props) {
  const nls = hooks.useTranslate(defaultMessages)
  const dispatch = useDispatch();
  const { pageCategories, typeLayout } = useSelector((state: IMState) => state.layoutState) as any;


  const handleClickBtnItem = (type: string) => {

    let title = '';
    switch (type) {
      case 'explore':
        title = 'Explore This Area';
        break;
      case 'myplaces':
        title = 'My Places';
        break;

      default:
        title = 'Indoor'
        break;
    }
    dispatch({
      type: 'MenuItem_Action',
      val: {
        type: type,
        title: title
      }
    });

    dispatch({
      type: 'PageCategories',
      val: [
        {
          type: '',
          title: 'Indoor',
          subTitle: '',
          data: null,
          level: 0,
          page: 0
        }
      ]
    });
  }

  return (
    <Fragment>
      <div className="indoor__panel--btn">
        <div className="indoor__panel--btn-icon">
          <button title={nls('Explore')} className="i-sidebar-button" onClick={() => handleClickBtnItem('explore')}>
            <div className="i-sidebar-icon-container">
              <ExloreIcon color="#fff" className="icon-svg" />
              <div className="i-sidebar-button-caption">
                {nls("Explore")}
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="indoor__panel--btn">
        <div className="indoor__panel--btn-icon">
          <button title={nls('My_Places')} className="i-sidebar-button" onClick={() => handleClickBtnItem('myplaces')}>
            <div className="i-sidebar-icon-container">
              <MyPlacesIcon color="#fff" className="icon-svg" />
              <div className="i-sidebar-button-caption">
                {nls("My_Places")}
              </div>
            </div>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Explore;