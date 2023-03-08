import { IMState, React, ReactRedux, FormattedMessage } from "jimu-core";
import { CoreButton } from "../../../component";
import { TabPanel, TabView } from "primereact/tabview";
import './style.scss';
import {sysCacheWindowService} from '../../../component/services';
import {Loader} from '../../../component';

const {useState, useEffect } = React;




const RenderTemplateAttributes = (props) => {
  
    const {results, handleClickHide, config, defaultMessages} = props;
    let attr = results.attributes;
    let title = attr.UNIT_NAME || attr.NAME;
    let arrTitleLayer = results.layer.title.split('-');
    let titleLayer = arrTitleLayer.length > 1 ? arrTitleLayer[1].trim() : results.layer.title;
    const [isLoader, setIsLoader] = useState(null);

  const [listData, setListData] = useState([]);
  const [configFields, setConfigFields] = useState(null);

    useEffect(() => {
      loadDataField();
    }, [])

    const loadDataField = async () => {
      setIsLoader(true);
      const rs: any = await sysCacheWindowService(config, titleLayer);
      setConfigFields(rs.fields)
      setIsLoader(false);
    }

    useEffect(() => {
      if (configFields) {
        let arr = [];
        for (const key in attr) {
          if (Object.prototype.hasOwnProperty.call(attr, key)) {
            const val = attr[key];
            const field = configFields.find(f => f.fieldname === key);
            console.log(field);
            if (field && field.isdisplaygrid === "Y") {
              arr.push(
                {
                  ...field,
                  value: val
                }
              );
            }
          }
        }
        setListData(arr);
  
        
        let _selector = `button[data-id='${attr.LEVEL_ID}']`;
        let btnLevel: any = document.querySelector(_selector);
        if (btnLevel) {
          btnLevel.click();
          handleSetLocalStorage('indoors__anonymous__recent-places');
        }
      }
    }, [configFields])

    
    const handleSetLocalStorage = (type: string) => {
      if (localStorage.getItem(type)) {
        let arrItem = JSON.parse(localStorage.getItem(type));
        let isCheckExist = arrItem.find(f => f.uniqueId === attr.OBJECTID && f.sourceKey === titleLayer);
        if (!isCheckExist) {
          if (arrItem.length > 9) {
            arrItem.pop();
          }
          arrItem.unshift({
            sourceKey: titleLayer,
            uniqueId: attr.OBJECTID,
            uniqueIdField: "OBJECTID",
            value: attr.UNIT_NAME
          })
          localStorage.setItem(type, JSON.stringify(arrItem));
        }
      } else {
        let arrItem = [{
          sourceKey: titleLayer,
          uniqueId: attr.OBJECTID,
          uniqueIdField: "OBJECTID",
          value: attr.UNIT_NAME
        }];
        localStorage.setItem(type, JSON.stringify(arrItem));
      }
    }

    const handleClickSetHome = () => {
      let objItem = {
        sourceKey: titleLayer,
        uniqueId: attr.OBJECTID,
        uniqueIdField: "OBJECTID",
        value: attr.UNIT_NAME
      };
      localStorage.setItem('indoors__anonymous__home-location', JSON.stringify(objItem));
    }

    const handleClickSaveFavorite = () => {
      handleSetLocalStorage('indoors__anonymous__favorite-places');
    }

    const handleClickShare = () => {
      console.log('handleClickShare', results);
    }

    const nls = (id: string) => {
      return props.allProps.intl ? props.allProps.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : id;
    }

    return (
      <div>
        <Loader display={isLoader} ></Loader>
        <div className="temp__header">
          <div className="header__title">
            <span className="title">{title}</span>
            <i className="pi pi-times btn-icon" onClick={handleClickHide} ></i>
          </div>
          <div className="header__btn">
              <span className="p-buttonset">
                  <CoreButton  labelName={nls('Set_Home')} icon="pi pi-home" onClick={handleClickSetHome} />
                  <CoreButton labelName={nls('Save')} icon="pi pi-star-fill" onClick={handleClickSaveFavorite}/>
                  <CoreButton labelName={nls('Share')} icon="pi pi-share-alt" onClick={handleClickShare}/>
              </span>
          </div>
          <div className="header__tab">
            <TabView>
                <TabPanel header="Attributes">
                  <div className="divAttributes">
                    <div className="content__title">{titleLayer}: {title}</div>
                      {listData.length > 0 && listData.map((item, idx) => (
                        <div className="rowItem" key={idx}>
                          <span className="rowItem__key">{item.fieldname}</span>
                          <span className="rowItem__value">{item.value}</span>
                        </div>
                      ))}
                  </div>
                </TabPanel>
                {/* <TabPanel header="Related Items">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
                </TabPanel> */}
            </TabView>
          </div>
        </div>

        <div className="temp__footer">
          
        </div>
      </div>
    )
  }

  export default RenderTemplateAttributes;