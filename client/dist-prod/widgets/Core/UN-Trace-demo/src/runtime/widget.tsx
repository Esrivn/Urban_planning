/** @jsx jsx */
import { React, AllWidgetProps, jsx } from 'jimu-core'
import {
    JimuMapViewComponent,
    JimuMapView,
    loadArcGISJSAPIModules
} from 'jimu-arcgis'
import { IMConfig } from '../config'
import { CoreButton, CoreCheckBox, CoreInput, CoreSelect } from '../../../component';
import ThemeService from '../../../component/theme/theme.service';
import './styles.scss';
import { DataSourceManager } from 'jimu-core'

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any>  {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            jmv: null,
            loadSuccess: false,
            formValue: {
                traceType: this.lookupTraceType[0],
                includeContainer: false,
                includeContent: false,
                includeStructure: false,
                includeBarrierFeature: true,
                validateConsistency: true,
                ignoreBarrierAtStartingPoint: false
            },
            activeStartingPoint: false,
            activeBarrier: false
        }

        ThemeService.setActiveTheme();
    }

    handleEventClick: any = null;

    lookupTraceType = [
        { code: 'connected', descr: 'Connected' },
        { code: 'subnetwork', descr: 'Subnetwork' },
        { code: 'subnetworkController', descr: 'Subnetwork Controllers' },
        { code: 'upstream', descr: 'Upstream' },
        { code: 'downstream', descr: 'Downstream' },
        { code: 'loops', descr: 'Loops' },
        { code: 'shortestPath', descr: 'Shortest Path' },
        { code: 'isolation', descr: 'Isolation' }
    ]

    dsRef = React.createRef<HTMLDivElement>();
    // viewModel = WidgetModel.getInstance();
    defaultColor = {
        color: [255, 255, 0, 0.6],
        haloOpacity: 0.9,
        fillOpacity: 0.2,
        hex: '#FFFF00'
    };

    onActiveViewChange = (jimuMapView: JimuMapView) => {
        this.setState({
            jmv: jimuMapView,
            loadSuccess: true
        })

        this.loadTraceConfig(jimuMapView);
    };

    loadTraceConfig = (jimuMapView: JimuMapView) => {
        const map: any = jimuMapView.view.map;
        if (map && map.utilityNetworks) {
            const items = map.utilityNetworks.get('items');
            if (items && items.length > 0) {
                const un = items[0];
                const urlUNService = un.networkServiceUrl;
            }
        }
    }

    renderForm = () => {
        return <div className='form-control-body p-fluid grid formgrid'>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreSelect onChange={(val) => this.setValueControl(val, 'traceType')} isRequired={true}
                    configLookup={null} valueField={null} value={this.state.formValue['traceType']}
                    labelName="Trace Type" isLabelLeft={false} dataSource={this.lookupTraceType}></CoreSelect>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreButton typeButton={this.state.activeStartingPoint ? 'Primary' : null}
                    icon={null} onClick={this.onClickStartingPoint} labelName='Starting Point'></CoreButton>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreButton typeButton={this.state.activeBarrier ? 'Primary' : null}
                    icon={null} onClick={this.onClickBarrier} labelName='Barrier'></CoreButton>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreCheckBox onChange={(val) => this.setValueControl(val, 'includeContainer')}
                    typeValue='boolean' checked={this.state.formValue['includeContainer']}
                    name="Include Containers" isLabelLeft={false}></CoreCheckBox>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreCheckBox onChange={(val) => this.setValueControl(val, 'includeContent')}
                    typeValue='boolean' checked={this.state.formValue['includeContent']}
                    name="Include Content" isLabelLeft={false}></CoreCheckBox>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreCheckBox onChange={(val) => this.setValueControl(val, 'includeStructure')}
                    typeValue='boolean' checked={this.state.formValue['includeStructure']}
                    name="Include Structures" isLabelLeft={false}></CoreCheckBox>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreCheckBox onChange={(val) => this.setValueControl(val, 'includeBarrierFeature')}
                    typeValue='boolean' checked={this.state.formValue['includeBarrierFeature']}
                    name="Include Barrier Features" isLabelLeft={false}></CoreCheckBox>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreCheckBox onChange={(val) => this.setValueControl(val, 'validateConsistency')}
                    typeValue='boolean' checked={this.state.formValue['validateConsistency']}
                    name="Validate Consistency" isLabelLeft={false}></CoreCheckBox>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreCheckBox onChange={(val) => this.setValueControl(val, 'ignoreBarrierAtStartingPoint')}
                    typeValue='boolean' checked={this.state.formValue['ignoreBarrierAtStartingPoint']}
                    name="Ignore Barrier At Starting Point" isLabelLeft={false}></CoreCheckBox>
            </div>
            <div className='form-control-item field col-12 md:col-12'>
                <CoreButton icon={null} onClick={this.onClickRunTrace} typeButton='save' labelName='Run'></CoreButton>
            </div>
        </div>
    }

    componentDidUpdate(): void {
        const view = this.state.jmv.view;
        if (this.handleEventClick) {
            this.handleEventClick.remove();
            this.handleEventClick = null;
            view.popup.autoOpenEnabled = true;
        }

        if (this.state.activeStartingPoint) {
            view.popup.autoOpenEnabled = false;
            this.handleEventClick = view.on('click', (evt) => {
                this.queryPointNearest(evt.mapPoint);
            });
        }

        if (this.state.activeBarrier) {
            view.popup.autoOpenEnabled = false;
            this.handleEventClick = view.on('click', (evt) => {
                this.queryPointNearest(evt.mapPoint);
            });
        }
    }

    queryPointNearest = async (mapPoint: any) => {
        // Step: tạo buffer => query từng layerview theo buffer => tìm geometry có khoảng cách gần nhất => 
        const [geometryEngine] = await loadArcGISJSAPIModules(['esri/geometry/geometryEngine']);
        // Tạo buffer
        const buffer = geometryEngine.geodesicBuffer(mapPoint, 5, 'meters');
        const dsObj = DataSourceManager.getInstance();
        const dataSources = dsObj.getDataSourcesAsArray().filter(fil => fil.jimuChildId);
        const items = this.state.jmv.view.allLayerViews.get('items');
        const array = []; const arrayFeatures = [];
        // Query từng layerView
        for (let i = 0; i < dataSources.length; i++ ) {
            const item = dataSources[i];
            const layers = items.filter(fil => fil.layer && fil.layer.id === item.jimuChildId);
            if (layers && layers.length > 0) {
                const query = layers[0].createQuery();
                query.geometry = buffer;
                query.outSpatialReference = 102100;
                query.where = '1=1';
                query.returnGeometry = true;
                query.outFields = ['*'];
                const resp = await layers[0].queryFeatures(query);

                if (resp && resp.features && resp.features.length > 0) {
                    resp.features.forEach(element => {
                        const val = geometryEngine.nearestCoordinate(element.geometry, mapPoint);
                        array.push(val);
                        arrayFeatures.push(element);
                    });
                }
            }
        }

        // Tìm features có khoảng cách gần nhất
        let minDistance = array && array.length > 0 ? array[0].distance : null;
        let features = array && array.length > 0 ? arrayFeatures[0] : null;;
        array.forEach((item, index) => {
            if (minDistance && minDistance > item.distance) {
                minDistance = item.distance;
                features = arrayFeatures[index];
            }
        });

        if (features) {
            console.log(features);
        }
        // console.log(dataSources, mapPoint);
        // const [esriRequest] = await loadArcGISJSAPIModules(['esri/request'])
        // const response = await esriRequest(url, {
        //     responseType: "json",
        //     query: postJson,
        //     method: 'post'
        // });
        // for (let key in dataSources) {
        //     const dataSource = dataSources[key];
        //     console.log(`${dataSource.id} >>>> type: ${dataSource.type}`);
        // }
        // console.log(this.state.jmv.view.map.allLayers.get('items'));
    }

    onClickStartingPoint = (evt: any) => {
        this.setState({
            activeStartingPoint: !this.state.activeStartingPoint,
            activeBarrier: false
        });
    }

    onClickBarrier = (evt: any) => {
        this.setState({
            activeStartingPoint: false,
            activeBarrier: !this.state.activeBarrier
        });
    }

    onClickRunTrace = () => {
        if (!this.checkRequire()) {
            alert('Vui lòng nhập đầy đủ trường bắt buộc!!!');
            return;
        }
    }

    checkRequire = () => {
        let valid = true;
        if (this.state.formValue.traceType === null || this.state.formValue.traceType === undefined) {
            valid = false;
        }
        return valid;
    }

    setValueControl = (val: any, field: any) => {
        let value = val.target ? val.target.value : val.value;
        if (val.target && val.target.type === 'checkbox') {
            value = val.target.checked;
        }
        console.log(val, field);
        const newObj = {};
        for (let i in this.state.formValue) {
            newObj[i] = this.state.formValue[i];
        }

        newObj[field] = value;
        this.setState({
            formValue: newObj
        });
    }

    render() {
        return (
            <div className="app-un-trace">
                {this.props.useMapWidgetIds &&
                    this.props.useMapWidgetIds[0] &&
                    <JimuMapViewComponent
                        useMapWidgetId={this.props.useMapWidgetIds?.[0]}
                        onActiveViewChange={this.onActiveViewChange}
                    />
                }

                {
                    this.state.loadSuccess &&
                    this.renderForm()
                }
            </div>
        )
    }
}
