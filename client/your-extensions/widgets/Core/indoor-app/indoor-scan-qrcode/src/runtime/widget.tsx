/** @jsx jsx */
import { React, AllWidgetProps, jsx, loadArcGISJSAPIModules } from 'jimu-core'
import { IMConfig } from '../config';
import {CoreButton, CoreInput} from '../../../../component';
import ThemeService from '../../../../component/theme/theme.service';
// import { QrReader } from 'react-qr-reader';
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
// To use Html5QrcodeScanner (more info below)
import {Html5QrcodeScanner} from "html5-qrcode"

// To use Html5Qrcode (more info below)
import {Html5Qrcode} from "html5-qrcode"




const {useState, useEffect, useLayoutEffect, Fragment} = React;

export default function Widget(props: AllWidgetProps<IMConfig>, any) {  


  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState('No result');
  const [html5QrcodeScanner, setHtml5QrcodeScanner] = useState(null);


  useEffect(() => {
    ThemeService.setActiveTheme();
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10 },
    false);


    html5QrcodeScanner.render(success, error);
  }, []);

  const success = (e) => {
    console.log(e);
    
  };

  const error = (e) => { 
    console.log(e);
    
  };

  // Get Map View
  const [jimuMapView, setJimuMapView] = useState(null);
  const [_view, setView] = useState(null);

  useLayoutEffect(() => {
    console.log("render useLayoutEffect");
    if (jimuMapView) {  
      setView(jimuMapView.view)
    }
  }, [jimuMapView])


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

    const handleGetImageLib = () => {
      
    }


    const handleScan = (data) =>{
      setResult(data);
    }
    const handleError = (err) =>{
      console.error(err)
    }

   
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
          {/* <QrReader onResult={(result, error) => {
          if (!!result) {
            alert(result);
          }

          if (!!error) {
            alert(error);
          }
        }} /> */}
 
        <div style={{width: "100%"}} id="reader"></div>
        </div>

        <div className='tool-create-location' style={{ 
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          padding: '10px',
          flexDirection: 'column'
         }}>
          
            <CoreButton labelName='Ảnh từ thư viện' onClick={handleGetImageLib} />
        </div>
        <p>{result}</p>
      </div>
    )
}
