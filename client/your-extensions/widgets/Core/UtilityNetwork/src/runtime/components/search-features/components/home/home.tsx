import './home.scss';
import { forwardRef, useState, useEffect } from 'react';
import { React } from 'jimu-core';
import MapView from 'esri/views/MapView';

import { CoreButton, CoreDatetime, CoreInput, CoreSelect } from '../../../../../../../component';
import requestservice from '../../../../../../../core-esri/requestservice';


function HomeAttributes(prod, ref) {
    const [view, setView] = useState(null); // View Map
    const [selectedLayer, setSelectedLayer] = useState<any>(null); // Giá trị của control Select Layer
    const [layers, setLayers] = useState([]); // Danh sách layer
    const [lookupLayers, setLookupLayers] = useState([]); // Danh sách field của các layer
    const [fieldList, setFieldList] = useState(null); // Danh sách field hiển thị ở form search
    const [currentValue, setCurrentValue] = useState(null); // Giá trị hiện tại của các control đang được khởi tạo
    const [lookupAssetGroup, setLookupAssetGroup] = useState([]);
    const [lookupAssetType, setLookupAssetType] = useState([]);
    const { jimuMapView, layerConfig } = prod;

    // Theo dõi sự thay đổi của biến jimuMapView
    useEffect(() => {
        if (jimuMapView) {
            setView(jimuMapView.view);
            const _view: MapView = jimuMapView.view;
            const items: any[] = _view.map.allLayers.get('items');
            const _layers = [];
            const _lookupLayer: any = {};
            for (let key in layerConfig) {
                const layer = layerConfig[key];
                _layers.push({
                    code: key,
                    descr: key
                });
                _lookupLayer[key] = layer;
            }

            const listItems = items.filter(item => item.fields);
            const assetLookup = {};
            listItems.forEach(item => {
                const check = _layers.filter(fil => fil.code === item.title);
                if (check && check.length > 0) {
                    
                    const fieldList = [];
                    layerConfig[item.title].forEach(elem => {
                        let field = item.fields.filter(fil => fil.name === elem.fieldname);
                        if (field && field.length > 0) {
                            field = field[0];
                            let domain = null;
                            if (field.domain) {
                                const _domain = [];
                                field.domain.codedValues.forEach(element => {
                                    _domain.push({
                                        code: element.code,
                                        descr: element.name
                                    });
                                });
                                domain = _domain;
                            }
                            const obj = {
                                FIELD_NAME: field.name,
                                FIELD_LABEL: field.alias,
                                FIELD_DEFAULT_VALUE: field.defaultValue,
                                FIELD_DESCR: field.description,
                                FIELD_DOMAIN: domain,
                                FIELD_TYPE: domain ? 'select' : field.type
                            };

                            if (obj.FIELD_NAME === 'ASSETGROUP' || obj.FIELD_NAME === 'ASSETTYPE') {
                                obj.FIELD_TYPE = 'select';
                            }
                            fieldList.push(obj);
                        }
                    });
                    
                    getAssetsGroup(item, assetLookup);
                    _lookupLayer[check[0].code] = fieldList;
                }
            });

            setLayers(_layers);
            setLookupLayers(_lookupLayer);
        }
    }, [jimuMapView])

    /** Sự kiện khi thay đổi layer */
    const onLayerChange = (e: any) => {
        // setSelectedCity1(e.value);
        if (e && e.value) {
            setSelectedLayer(e.value);
        } else {
            setSelectedLayer(null);
        }

        createFormSearch(e.value);
    }

    /** Tạo giá trị mặc định cho form Search */
    const createFormSearch = (e) => {
        if (!e) {
            /// Clear form
            setCurrentValue(null);
            setFieldList(null);
            return;
        }
        console.log(e, lookupAssetGroup, lookupLayers);
        const obj = {};
        lookupLayers[e.code].forEach(item => {
            obj[item.FIELD_NAME] = null;

            if (item.FIELD_NAME === 'ASSETGROUP') {
                const domain = [];
                lookupAssetGroup[e.code].forEach(x => {
                    domain.push({
                        code: x.code,
                        descr: x.name,
                        subDomains: x.domains
                    });
                });
                item.FIELD_DOMAIN = domain;
            }
        });
        setCurrentValue(obj);
        setFieldList(lookupLayers[e.code]);
    }

    const getAssetsGroup = async (item, assetLookup) => {
        const url = `${item.url}/${item.layerId}`;
        const request = new requestservice('arcgis');
        const res = await request.queryCustom({
            url,
            params: {
                f: 'json'
            }
        });
        if (res && res.data) {
            // Fix cứng subtypes là lookup của ASSETGROUP, trong mỗi phần tử lại có lookup của ASSETTYPE tương ứng
            // Giống quan hệ cha con giữa 2 control select
            const subtypes = res.data.subtypes;
            assetLookup[item.title] = subtypes;
            setLookupAssetGroup(assetLookup);
        }
    }

    /** Hàm tạo thẻ control dựa trên cấu hình của mỗi trường dữ liệu */
    const renderControl = (e) => {
        switch (e.FIELD_TYPE) {
            case 'date':
                return <div className='form-control-item field col-12 md:col-4'>
                    <div className='item-label'>{e.FIELD_LABEL}</div>
                    <CoreDatetime selectionMode="range" hourFormat='24' showIcon={true} value={currentValue[e.FIELD_NAME]}
                        onChange={(val) => setValueControl(val, e)} ></CoreDatetime>
                </div>
                break;
            case 'string':
            case 'global-id':
                return <div className='form-control-item field col-12 md:col-4'>
                    <CoreInput onChange={(val) => setValueControl(val, e)}
                        labelName={e.FIELD_LABEL} mode="text" isLabelLeft={false} value={currentValue[e.FIELD_NAME]}></CoreInput>
                </div>
                break;
            case 'select':
                return <div className='form-control-item field col-12 md:col-4'>
                    <CoreSelect configLookup={null} valueField={null} onChange={(val) => setValueControl(val, e)} isLabelLeft={false}
                        labelName={e.FIELD_LABEL} dataSource={e.FIELD_DOMAIN} value={currentValue[e.FIELD_NAME]}></CoreSelect>
                </div>
                break;
            default:
                return <div className='form-control-item field col-12 md:col-4'>
                    <CoreInput onChange={(val) => setValueControl(val, e)}
                        labelName={e.FIELD_LABEL} mode="text" isLabelLeft={false} value={currentValue[e.FIELD_NAME]}></CoreInput>
                </div>
                break;
        }
    }

    /** Hàm gán dữ liệu của control vào biến currentValue để tạo câu lệnh query */
    const setValueControl = (e, field) => {
        console.log(field);
        const obj = {};
        const val = e.target ? e.target.value : e.value;
        Object.keys(currentValue).forEach(key => {
            obj[key] = currentValue[key];
            if (key === field.FIELD_NAME) {
                obj[field.FIELD_NAME] = val;
            }
        });

        if (field.FIELD_NAME === 'ASSETGROUP') {
            const checked = lookupLayers[selectedLayer.code].filter(fil => fil.FIELD_NAME === 'ASSETTYPE');
            if (checked && checked.length > 0) {
                if (!val) {
                    checked[0].FIELD_DOMAIN = null;
                } else {
                    const _domainType = val.subDomains.ASSETTYPE;
                    const domain = [];
                    _domainType['codedValues'].forEach(item => {
                        domain.push({
                            code: item.code,
                            descr: item.name
                        });
                    });
                    checked[0].FIELD_DOMAIN = domain;
                   
                }

                obj['ASSETTYPE'] = null;
             
                setFieldList(lookupLayers[selectedLayer.code]);
            }
        }

        setCurrentValue(obj);
    }

    /** Tìm kiếm */
    const onSearch = async (e) => {
        console.log(e, selectedLayer);
        if (!selectedLayer) {
            return;
        }
        const where = convertWhere();
        const _view: MapView = view;
        const items: any = _view.map.allLayers.get('items');
        const a = items.filter(fil => fil.title === selectedLayer.code);
        if (a && a.length > 0) {
            const layer = a[0];
            if (layer.queryFeatures) {
                const query = layer.createQuery();
                query.where = where;
                query.returnGeometry = true;
                layer.queryFeatures(query).then((response) => {
                    prod.homeCallback({
                        data: response,
                        layer: selectedLayer.descr,
                        layerCode: selectedLayer.code
                    });
                });
            }
        }
    }

    /** Xóa dữ liệu trên control */
    const onClear = (e) => {
        const obj = {};
        const typeCheck = ['select', 'date'];
        fieldList.forEach(element => {
            obj[element.FIELD_NAME] = null;
            if (!typeCheck.includes(element.FIELD_TYPE)) { // Nếu field type không nằm trong type Check
                obj[element.FIELD_NAME] = '';
            }
        });
        setCurrentValue(obj);
    }

    /** Decode lại các giá trị control thành câu lệnh where */
    const convertWhere = () => {
        let string = '';
        fieldList.forEach(field => {
            let val = currentValue[field.FIELD_NAME];
            if (val) {
                if (field.FIELD_TYPE === 'date') {
                    // Dữ liệu kiểu date => tìm theo khoảng
                    if (val[0]) {
                        if (!val[1]) {
                            val[1] = val[0];
                        }

                        // string += `${field.FIELD_NAME} >= ${convertDate(val[0], 'first')} and ${field.FIELD_NAME} <= ${convertDate(val[1], 'last')} and `
                        string += `${field.FIELD_NAME} >= DATE '${convertDateTime(val[0], 'first')}' and ${field.FIELD_NAME} <= DATE '${convertDateTime(val[1], 'last')}' and `
                    }
                } else if (field.FIELD_TYPE === 'select') {
                    // Dữ liệu kiểu dropdown
                    val = val.code;
                    string += `${field.FIELD_NAME} = ${val} and `
                } else if (field.FIELD_TYPE === 'string' || field.FIELD_TYPE === 'global-id') {
                    string += `${field.FIELD_NAME} LIKE N'%${val}%' and `
                } else {
                    // Mặc định kiểu number
                    string += `${field.FIELD_NAME} = ${Number(val)} and `
                }
            }
        });

        if (string.length > 5) {
            string = string.substring(0, string.length - 5);
        } else {
            string = '1=1';
        }

        return string;
    }

    /** Hàm trả về timestamp */
    const convertDate = (timestamp, type) => {
        const d = new Date(timestamp);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;

        let str = [month, day, year].join('/');
        if (type === 'first') {
            str += ' 00:00:00';
        } else if (type === 'last') {
            str += ' 23:59:59';
        }
        return new Date(str).getTime();
    }

    /** Hàm trả về string */
    const convertDateTime = (timestamp, type) => {
        const d = new Date(timestamp);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;

        let str = [year, month, day].join('-');
        if (type === 'first') {
            str += ' 00:00:00';
        } else if (type === 'last') {
            str += ' 23:59:59';
        }
        return str;
    }

    return (
        <div className='app-home-attributes'>
            <div className='form-control-header layer-select'>
                {
                    layers && layers.length > 0 &&
                    <CoreSelect valueField={null} onChange={onLayerChange} labelName="Layers: " dataSource={layers} value={selectedLayer} placeholder="Select a Layer"></CoreSelect>
                }
                {/* <Dropdown showClear={true} value={selectedLayer} options={layers} onChange={onLayerChange} optionLabel="descr" placeholder="Select a Layer" /> */}
            </div>
            <div className='form-control-body p-fluid grid formgrid'>
                {   // tạo control động
                    fieldList && fieldList.length > 0 &&
                    fieldList.map(el =>
                        renderControl(el)
                    )
                }
            </div>

            {
                // Tạo nút search và clear
                fieldList && fieldList.length > 0 &&
                <div className='form-control-footer footer-item'>
                    <div className='mr-3'>
                        <CoreButton icon="search" onClick={onClear} typeButton='Secondary' labelName='Clear'></CoreButton>
                    </div>
                    <div>
                        <CoreButton icon="search" onClick={onSearch} typeButton='Secondary' labelName='Search'></CoreButton>
                    </div>
                </div>
            }
        </div>
    )
}

export default forwardRef(HomeAttributes);
