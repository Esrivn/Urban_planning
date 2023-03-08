import './record-details.scss';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { React } from 'jimu-core';
import { Button } from 'primereact/button';


function RecordDetails(prod, ref) {
    const [objectIdKey, setObjectIdKey] = useState('');
    const { data } = prod;

    // Theo dõi sự thay đổi của biến jimuMapView
    useEffect(() => {
        if (data) {
            setObjectIdKey(data.layer.objectIdField);
        }
    }, [data])

    const onBack = () => {
        prod.btnBackCallback();
    }

    const renderItem = (key) => {
        return <div className='form-control-item field col-12 md:col-4'>
            <div className='item-label'>{key} :</div>
            <div className='item-value'>{data.attributes[key]}</div>
        </div>
    }

    return (
        <div className='app-record-details'>
            <div className='form-control-header layer-select'>
                {
                    data &&
                    <div>Details ObjectId: {data.attributes[objectIdKey]}</div>
                }
            </div>
            <div className='form-control-body p-fluid grid formgrid'>
                {
                    data &&
                    Object.keys(data.attributes).map(key =>
                        renderItem(key)
                    )
                }
            </div>
            <div className='form-control-footer footer-item'>
                <Button label="Back" onClick={onBack} />
            </div>
        </div>
    )
}

export default forwardRef(RecordDetails);
