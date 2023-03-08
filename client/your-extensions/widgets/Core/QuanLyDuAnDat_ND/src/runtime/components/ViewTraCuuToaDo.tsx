import { AllWidgetProps, React } from 'jimu-core';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import * as Graphic from 'esri/Graphic';


const { useState, forwardRef, useImperativeHandle, useRef } = React;

function ViewTraCuuToaDo(prod: any, ref) {
    const { jimuMapView } = prod;
    const [value1, setValue1] = useState('106.488379');
    const [value2, setValue2] = useState('21.021702');

    const zoomToPointMap = () => {
        const x = parseFloat(value1);
        const y = parseFloat(value2);

        const point = { //Create a point
            type: "point",
            longitude: x,
            latitude: y
         };

         const simpleMarkerSymbol = {
            type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
            url: '../assets/location.png',
            width: "64px",
            height: "64px"
          };

         const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol
         });
         jimuMapView.view.graphics.add(pointGraphic);


        jimuMapView.view.goTo({
            center: [x, y],
            zoom: 15
          });
    }

    return (
        <div className='block-1'>
            <div className='contentBlock'>
                <div className="card">
                    <div className="p-fluid grid formgrid">

                        <div className="field col-6 md:col-12">
                            <label>Tọa độ X</label>
                            <InputText placeholder='Nhập kinh độ' value={value1} onChange={(e) => setValue1(e.target.value)} />
                        </div>

                        <div className="field col-6 md:col-12">
                            <label>Tọa độ Y</label>
                            <InputText placeholder='Nhập vĩ độ' value={value2} onChange={(e) => setValue2(e.target.value)} />
                        </div>

                        <div className="field col-12 md:col-12" style={{textAlign: "right", marginTop: "10px"}}>
                            <Button onClick={zoomToPointMap} icon="pi pi-search" label='Tìm kiếm' className='p-button-outlined p-button-info' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(ViewTraCuuToaDo)