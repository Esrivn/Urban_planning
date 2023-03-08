import './styles.scss';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { classNames, DataSourceManager, loadArcGISJSAPIModules, React } from 'jimu-core';
import MapView from 'esri/views/MapView';

import { CoreButton, CoreInput, CoreSelect, CoreCheckBox } from '../../../../../component';
import { Tooltip } from 'primereact/tooltip';

import TrashBin from "../../../images/trash-bin.png";
import StoreDiagrams from "../../../images/StoreDiagram32.png";
import NewDiagrams from "../../../images/NewDiagram32.png";
import SelectFeature from "../../../images/SelectionSelectTool32.png";
import AppendToDiagram from "../../../images/AppendToDiagram32.png";
import AppendToMap from "../../../images/OpenDiagView32.png";
import StartPointImg from "../../../images/startPoint.png";
import BarrierImg from "../../../images/barrier.png";
import DeleteImg from "../../../images/GenericDeleteRed32.png";
import { JimuMapView, featureUtils, JimuMapViewComponent } from 'jimu-arcgis';

// Ghi chú: các biến toàn cục cần thay đổi thì phải đưa ra ngoài hook function, các biến hằng số thì để bên trong (mỗi lần re-render luôn cố định 1 giá trị)

function TraceUN(prod, ref) {
    const { jimuMapView, urlUtilityNetwork } = prod;
    const [active, setActive] = useState({ startingPoint: false, barrier: false });
    const [loadSuccess, setLoadSuccess] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [fieldList, setFieldList] = useState([]);

    const lookupTraceType = [
        { code: 'connected', descr: 'Connected', indexFieldShow: [5, 7, 8, 9, 10, 11, 13, 15] },
        { code: 'subnetwork', descr: 'Subnetwork', indexFieldShow: [0, 1, 3, 5, 7, 8, 9, 10, 11, 13, 15] },
        { code: 'subnetworkController', descr: 'Subnetwork Controllers', indexFieldShow: [0, 1, 5, 7, 8, 9, 10, 11, 13, 15] },
        { code: 'upstream', descr: 'Upstream', indexFieldShow: [0, 1, 2, 5, 7, 8, 9, 10, 11, 13, 14, 15] },
        { code: 'downstream', descr: 'Downstream', indexFieldShow: [0, 1, 2, 5, 7, 8, 9, 10, 11, 13, 14, 15] },
        { code: 'loops', descr: 'Loops', indexFieldShow: [5, 7, 8, 9, 10, 11, 13, 15] },
        { code: 'shortestPath', descr: 'Shortest Path', indexFieldShow: [4, 5, 7, 8, 9, 10, 11, 13, 15] },
        { code: 'isolation', descr: 'Isolation', indexFieldShow: [0, 1, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    ];


    useEffect(() => {
        if (jimuMapView) {
            setLoadSuccess(true);
            //  { fieldtype: '', fieldname: '', fieldalias: '', fielddisplay: false, defaultValue: false },
            const fieldList = [
                { fieldtype: 'select', fieldname: 'domainNetworkName', fieldalias: 'Domain Network', fielddisplay: false, defaultValue: null }, //0
                { fieldtype: 'select', fieldname: 'tierName', fieldalias: 'Tier', fielddisplay: false, defaultValue: null }, //1
                { fieldtype: 'select', fieldname: 'targetTierName', fieldalias: 'Target Tier', fielddisplay: false, defaultValue: null }, //2
                { fieldtype: 'select', fieldname: 'subnetworkName', fieldalias: 'Subnetwork Name', fielddisplay: false, defaultValue: null }, //3
                { fieldtype: 'select', fieldname: 'shortestPathNetworkAttributeName', fieldalias: 'Shortest Path Network Attribute Name', fielddisplay: false, defaultValue: null }, //4
                { fieldtype: 'checkbox', fieldname: 'includeContainers', fieldalias: 'Include Containers', fielddisplay: false, defaultValue: false }, //5
                { fieldtype: 'checkbox', fieldname: 'includeUpToFirstSpatialContainer', fieldalias: 'Include up to First Spatial Container', fielddisplay: false, defaultValue: false }, //6
                { fieldtype: 'checkbox', fieldname: 'includeContent', fieldalias: 'Include Content', fielddisplay: false, defaultValue: false }, //7
                { fieldtype: 'checkbox', fieldname: 'includeStructures', fieldalias: 'Include Structures', fielddisplay: false, defaultValue: false }, //8
                { fieldtype: 'checkbox', fieldname: 'includeBarriers', fieldalias: 'Include Barrier Features', fielddisplay: false, defaultValue: true }, //9
                { fieldtype: 'checkbox', fieldname: 'validateConsistency', fieldalias: 'Validate Consistency', fielddisplay: false, defaultValue: true }, //10
                { fieldtype: 'checkbox', fieldname: 'validateLocatability', fieldalias: 'Validate Locatability', fielddisplay: false, defaultValue: false }, //11
                { fieldtype: 'checkbox', fieldname: 'includeIsolated', fieldalias: 'Include Isolated Features', fielddisplay: false, defaultValue: false }, //12
                { fieldtype: 'checkbox', fieldname: 'ignoreBarriersAtStartingPoints', fieldalias: 'Ignore Barrier At Starting Points', fielddisplay: false, defaultValue: false }, //14
                { fieldtype: 'checkbox', fieldname: 'allowIndeterminateFlow', fieldalias: 'Allow Indeterminate Flow', fielddisplay: false, defaultValue: false }, //14
                { fieldtype: 'checkbox', fieldname: 'runInAsyncModeOnTheServer', fieldalias: 'Run in asynchronous mode on the server', fielddisplay: false, defaultValue: false } //15
            ];
            setFieldList(fieldList);
        }

    }, [jimuMapView])

    const setValueControl = (val, fieldname) => {
        let value = val.target ? val.target.value : val.value;
        if (val.target && val.target.type === 'checkbox') {
            value = val.target.checked;
        }
        const newObj = {};
        for (let i in formValue) {
            newObj[i] = formValue[i];
        }

        newObj[fieldname] = value;
        setFormValue(newObj);
    }

    const onClickStartingPoint = () => {
        //{F6D3006A-3609-4ADD-BFE0-FB546856C5E9}
    }

    const onClickBarrier = () => {
        //	{10668E38-3BB6-4705-97F5-B1A9CD3C4978}
        // 	{BBE421E5-8A43-4341-853B-DDE047719ED6}
    }

    const onClickRunTrace = async () => {
        if (!checkRequire()) {
            alert('Vui lòng nhập đầy đủ trường bắt buộc!!!');
            return;
        }

        const params = {
            f: 'json',
            gdbVersion: 'SDE.DEFAULT',
            sessionID: null,
            moment: null,
            traceType: 'connected',
            traceLocations: [
                {
                    "traceLocationType": "startingPoint",
                    "globalId": "{F6D3006A-3609-4ADD-BFE0-FB546856C5E9}",
                    "terminalId": 1
                },
                {
                    "traceLocationType": "barrier",
                    "globalId": "{F6D3006A-3609-4ADD-BFE0-FB546856C5E9}",
                    "terminalId": 2
                },
                {
                    "traceLocationType": "barrier",
                    "globalId": "{F6D3006A-3609-4ADD-BFE0-FB546856C5E9}",
                    "terminalId": 3
                }
            ],
            traceConfiguration: {
                "includeContainers": true,
                "includeContent": false,
                "includeStructures": true,
                "includeBarriers": true,
                "validateConsistency": true,
                "validateLocatability": false,
                "includeIsolated": false,
                "ignoreBarriersAtStartingPoints": false,
                "includeUpToFirstSpatialContainer": false,
                "allowIndeterminateFlow": true,
                "domainNetworkName": "",
                "tierName": "",
                "targetTierName": "",
                "subnetworkName": "",
                "diagramTemplateName": "",
                "shortestPathNetworkAttributeName": "",
                "filterBitsetNetworkAttributeName": "",
                "traversabilityScope": "junctionsAndEdges",
                "conditionBarriers": [],
                "functionBarriers": [],
                "arcadeExpressionBarrier": "",
                "filterBarriers": [],
                "filterFunctionBarriers": [],
                "filterScope": "junctionsAndEdges",
                "functions": [],
                "nearestNeighbor": {},
                "outputFilters": [],
                "outputConditions": [],
                "propagators": null
            },
            async: false
        }

        for (let key in formValue) {
            if (key !== 'tracetype') {
                params.traceConfiguration[key] = formValue[key];
            } else {
                params.traceType = formValue['traceType'].code;
            }
        }

        const urlTrace = urlUtilityNetwork + '/trace';
        const query: any = { ...params };
        query.traceLocations = JSON.stringify(params.traceLocations);
        query.traceConfiguration = JSON.stringify(params.traceConfiguration);

        const [esriRequest] = await loadArcGISJSAPIModules(["esri/request"]);
        try {
            let res = await esriRequest(urlTrace, {
                responseType: "json",
                query
            });

            console.log('Query Thành công: >>> ', res);
        } catch (error) {
            console.log('Query Thất bại >>>>> ', error);
        }
     
    }

    const checkRequire = () => {
        let valid = true;
        if (formValue['traceType'] === null || formValue['traceType'] === undefined) {
            valid = false;
        }
        return valid;
    }

    const onChangeTraceType = (val) => {
        let value = val.target ? val.target.value : val.value;
        if (val.target && val.target.type === 'checkbox') {
            value = val.target.checked;
        }
        const newObj = {};
        for (let i in formValue) {
            newObj[i] = formValue[i];
        }

        newObj['traceType'] = value;
        const newfieldList = [...new Set(fieldList)];
        newfieldList.forEach(item => item.fielddisplay = false);

        if (value && value.indexFieldShow) {
            value.indexFieldShow.forEach(index => {
                newfieldList[index].fielddisplay = true;
                newObj[newfieldList[index].fieldname] = newfieldList[index].defaultValue;
            });
        }
        
        
        setFormValue(newObj);
        setFieldList(newfieldList);
    }

    const renderForm = () => {
        return <div className='form-control-body p-fluid grid formgrid'>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreSelect onChange={(val) => onChangeTraceType(val)} isRequired={true}
                    configLookup={null} valueField={null} value={formValue['traceType']}
                    labelName="Trace Type" isLabelLeft={false} dataSource={lookupTraceType}></CoreSelect>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreButton typeButton={active.startingPoint ? 'Primary' : null}
                    icon={null} onClick={onClickStartingPoint} labelName='Starting Point'></CoreButton>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreButton typeButton={active.barrier ? 'Primary' : null}
                    icon={null} onClick={onClickBarrier} labelName='Barrier'></CoreButton>
            </div>
            {
                fieldList && fieldList.length > 0 &&
                fieldList.map(item => renderFields(item))
            }
            <div className='form-control-item field col-12 md:col-12'>
                <CoreButton icon={null} onClick={onClickRunTrace} typeButton='save' labelName='Run'></CoreButton>
            </div>
        </div>
    }

    /** Tạo field động theo lựa chọn của trace type */
    const renderFields = (field) => {
        if (!field.fielddisplay) {
            return <div></div>
        }

        switch (field.fieldtype) {
            case 'select':
                return <div className='form-control-item field col-12 md:col-4'>
                    <CoreSelect configLookup={null} valueField={null} onChange={(val) => setValueControl(val, field.fieldname)} isLabelLeft={false}
                        labelName={field.fieldalias} dataSource={null} value={formValue[field.fieldname]}></CoreSelect>
                </div>
                break;
            case 'checkbox':
                return <div className='form-control-item field col-12 md:col-12'>
                    <CoreCheckBox onChange={(val) => setValueControl(val, field.fieldname)}
                        typeValue='boolean' checked={formValue[field.fieldname]}
                        name={field.fieldalias} isLabelLeft={false}></CoreCheckBox>
                </div>
                break;
            default:
                return <div className='form-control-item field col-12 md:col-12'>
                    <CoreCheckBox onChange={(val) => setValueControl(val, field.fieldname)}
                        typeValue='boolean' checked={formValue[field.fieldname]}
                        name={field.fieldalias} isLabelLeft={false}></CoreCheckBox>
                </div>
                break;
        }
    }

    return (
        <div className='widget-trace-un'>
            <Tooltip target=".prime-tooltip"></Tooltip>
            {
                loadSuccess &&
                renderForm()
            }
        </div>
    )
}

export default forwardRef(TraceUN);
