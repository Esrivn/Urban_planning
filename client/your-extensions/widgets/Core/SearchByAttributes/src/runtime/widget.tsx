/** @jsx jsx */
import '../../../styles.scss'; 
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import { React, AllWidgetProps, jsx, loadArcGISJSAPIModules, classNames } from 'jimu-core'
import { IMConfig } from '../config';
import WidgetStyle from "./styles";
import ThemeService from '../../../component/theme/theme.service';

import HomeAttributes from "./components/home/home";
import AllRecords from "./components/all-records/all-records";
import RecordDetails from './components/record-details/record-details';

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {
 
    // Module of ArcGIS JS API
    projection: typeof __esri.projection;
    SpatialReference: typeof __esri.SpatialReference;
    listData = null; // Danh sách dữ liệu tìm được
    currentData = null; // Dữ liệu hiện tại đang chọn

    constructor(props) {
        super(props)

        this.projection = null;
        this.SpatialReference = null;

        this.state = {
            testLabel: 'Test label',
            jimuMapView: null,
            activeMode: 'home' // 'home', 'all-records', 'details'
        }

        ThemeService.setActiveTheme();
        // this.loadArcGISModules();
    }

    private async loadArcGISModules() {
        const [
            projection,
            SpatialReference
        ] = await loadArcGISJSAPIModules([
            'esri/geometry/projection',
            'esri/geometry/SpatialReference'
        ]);
        await projection.load();
        this.projection = projection;
        this.SpatialReference = SpatialReference;
    }

    activeViewChangeHandler = (jmv: JimuMapView) => {
        if (jmv) {
            console.log(this.props.config.item_template);
            this.setState({
                jimuMapView: jmv
            });
        }
    };

    homeCallback = (e) => {
        this.listData = e;
        this.setState({
            activeMode: 'all-records'
        });
    }

    allRecordsBack = () => {
        this.setState({
            activeMode: 'home'
        });
    }

    detailsBack = () => {
        this.setState({
            activeMode: 'all-records'
        });
    }

    allRecordsDetail = (e) => {
        this.currentData = e;
        this.setState({
            activeMode: 'details'
        });
    }

    render() {
        return (
            <WidgetStyle>
                <div className="app-search-by-attributes jimu-widget">
                    {
                        this.props.useMapWidgetIds &&
                        this.props.useMapWidgetIds[0] && (
                            <JimuMapViewComponent
                                useMapWidgetId={this.props.useMapWidgetIds?.[0]}
                                onActiveViewChange={this.activeViewChangeHandler}
                            />
                        )
                    }
                    <div className={classNames({ 'd-none': this.state.activeMode !== 'home' })}>
                        <HomeAttributes jimuMapView={this.state.jimuMapView} homeCallback = {this.homeCallback}></HomeAttributes>
                    </div>
                    <div className={classNames({ 'd-none': this.state.activeMode !== 'all-records' })}>
                        <AllRecords jimuMapView={this.state.jimuMapView} listData={this.listData} template={this.props.config.item_template}
                            btnBackCallback={this.allRecordsBack} btnDetailCallback={this.allRecordsDetail}></AllRecords>
                    </div>
                    <div className={classNames({ 'd-none': this.state.activeMode !== 'details' })}>
                        <RecordDetails jimuMapView={this.state.jimuMapView} data={this.currentData}
                            btnBackCallback={this.detailsBack}></RecordDetails>
                    </div>
                    {/* {
                        this.state.activeMode === 'home' &&
                        <div className={classNames({ 'd-none': this.state.activeMode !== 'home' })}>
                            <HomeAttributes jimuMapView={this.state.jimuMapView} homeCallback = {this.homeCallback}></HomeAttributes>
                        </div>
                    }
                    {
                        this.state.activeMode === 'all-records' &&
                        <AllRecords jimuMapView={this.state.jimuMapView} listData={this.listData}
                            btnBackCallback={this.allRecordsBack}></AllRecords>
                    } */}
                    
                </div>
            </WidgetStyle>
        )
    }
}
