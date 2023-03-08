/** @jsx jsx */
import { React, AllWidgetProps, jsx, loadArcGISJSAPIModules } from 'jimu-core'
import { IMConfig } from '../config';
import {CoreButton, CoreInput} from '../../../../component';
import ThemeService from '../../../../component/theme/theme.service';
// import QRCode from "react-qr-code";
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import { config } from 'process';

const {useState, useEffect, useLayoutEffect, Fragment} = React;

export default function Widget(props: AllWidgetProps<IMConfig>, any) {
  useEffect(() => {
    ThemeService.setActiveTheme();
  }, []);
const [valLat, setValLat] = useState();
const [valQRCode, setValQRCode] = useState('');
  // Get Map View
  const [jimuMapView, setJimuMapView] = useState(null);
  const [_view, setView] = useState(null);

  useLayoutEffect(() => {
    console.log("render useLayoutEffect");
    if (jimuMapView) {  
      setView(jimuMapView.view)
    }
  }, [jimuMapView])

  useLayoutEffect(() => {
    if (_view) {
      _view.on('click', async (evt: any) => {
        console.log('evt map', _view.toMap(evt));
        let lat = _view.toMap(evt).latitude;
        let long = _view.toMap(evt).longitude;
        let levelFloorActive = document.querySelector('ul[data-id="levels"] .esri-widget--button-active');
        let urlApp = `${props.config.urlAppViewer}&lat=${lat}&long=${long}`;
        if (levelFloorActive) {
          let levelId = levelFloorActive.attributes['data-id'].value;
          urlApp += `&levelId=${levelId}`;
        }

        setValQRCode(prev => urlApp);
        console.log('urlApp', urlApp);
        
      })
    }
  }, [_view])

const handleClickCreatePoint = () => {
  console.log('handleClickCreatePoint');
  
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


        const onImageDownload = () => {
          let svg: any = document.getElementById("QRCode");
          const svgData = new XMLSerializer().serializeToString(svg);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "QRCode";
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
          };
          img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        };
    return (
      <div className="widget-create-qrcode">
        <ViewMap />
        <div className='tool-create-location' style={{ 
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          padding: '10px',
          flexDirection: 'column'
         }}>
          <CoreButton onClick={handleClickCreatePoint} labelName='Tạo điểm' />
          <span style={{ 
            padding: '5px',
            display: 'block',
            width: '100%',
            textAlign: 'center',
            fontSize: '9pt'
           }}>
            Click vào bản đồ để lấy vị trí tạo ảnh QR Code
          </span>
        </div>
      {
        valQRCode && <Fragment>
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 120, width: "100%" }}>
            {/* <QRCode  id='QRCode'
            size={300}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={valQRCode}
            viewBox={`0 0 300 300`}
            /> */}
        </div>
                <div className='tool-create-location' style={{ 
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  padding: '10px',
                  flexDirection: 'column'
                }}>
                  <CoreButton onClick={onImageDownload} labelName='Tải xuống' />
                </div>
        </Fragment>
      }
      </div>
    )
}
