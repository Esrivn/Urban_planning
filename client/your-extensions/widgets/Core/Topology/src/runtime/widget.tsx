/** @jsx jsx */
import '../../../styles.scss';
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import { React, AllWidgetProps, jsx, loadArcGISJSAPIModules, classNames, ReactDOM } from 'jimu-core'
import { IMConfig } from '../config';
import WidgetStyle from "./styles";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState } from 'react';

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
            isDialog: false,
            testLabel: 'Test label',
            jimuMapView: null,
            activeMode: 'home',
            imgBtnValid: require("./assets/images/entire_extent.png"),
            imgTerminal: require("./assets/images/terminal_conn.png")
        }

        // this.loadArcGISModules();
    }

    test = (name) => {
        console.log(name)
    }

    // private async loadArcGISModules() {
    //     const [
    //         projection,
    //         SpatialReference
    //     ] = await loadArcGISJSAPIModules([
    //         'esri/geometry/projection',
    //         'esri/geometry/SpatialReference'
    //     ]);
    //     await projection.load();
    //     this.projection = projection;
    //     this.SpatialReference = SpatialReference;
    // }

    // activeViewChangeHandler = (jmv: JimuMapView) => {
    //     if (jmv) {
    //         this.setState({
    //             jimuMapView: jmv
    //         });
    //     }
    // };

    // homeCallback = (e) => {
    //     this.listData = e;
    //     this.setState({
    //         activeMode: 'all-records'
    //     });
    // }

    // allRecordsBack = () => {
    //     this.setState({
    //         activeMode: 'home'
    //     });
    // }

    // detailsBack = () => {
    //     this.setState({
    //         activeMode: 'all-records'
    //     });
    // }

    // allRecordsDetail = (e) => {
    //     this.currentData = e;
    //     this.setState({
    //         activeMode: 'details'
    //     });
    // }

    // render() {
    //     return (
    //         <WidgetStyle>
    //             <div className="app-network-diagrams jimu-widget">
    //                 {
    //                     this.props.useMapWidgetIds &&
    //                     this.props.useMapWidgetIds[0] && (
    //                         <JimuMapViewComponent
    //                             useMapWidgetId={this.props.useMapWidgetIds?.[0]}
    //                             onActiveViewChange={this.activeViewChangeHandler}
    //                         />
    //                     )
    //                 }
    //                 <div>TOPOLOGY</div>
    //             </div>
    //         </WidgetStyle>
    //     )
    // }

    render() {
        return (
            // <div className="widget-demo jimu-widget wp-topology">
            //     <Dialog visible={this.state.isDialog} onHide={() => this.setState({ isDialog: false })}>
            //   HEEEEE
            //     </Dialog>

            //     <Button label="Show" onClick={() => this.setState({ isDialog: true })} />
            // </div>
            <WidgetStyle>
                <div className="widget-demo jimu-widget wp-topology">
                    {/* <Button label="Show" onClick={(e: any) => this.test(e.type)} /> */}
                    <div className="header-widget d-flex align-items-center">
                        <div className="title col-md-6">
                            <span>Network topology</span>
                        </div>
                        <div className="btn-header col-md-6 d-flex align-items-center">
                            <div className="btn-validate" style={{backgroundImage: `url(${( this.state.imgBtnValid)})`}}></div>
                            <i className="btn-error-ins "></i>
                            <i className="pi pi-shield"></i>
                            <div className="btn-terminnal" style={{backgroundImage: `url(${( this.state.imgTerminal)})`}}></div>
                        </div>
                    </div>
                    {/* url(${require('./assets/defaultimg.svg')}) center center no-repeat; */}

                    <div className="content-widget">
                        <div className="act-validate">
                            {/* <Button label="Show" onClick={(e: any) => this.test(e.type)} />
                        <Button label="Show" onClick={(e: any) => this.test(e.type)} /> */}
                            {/* Button validate */}
                        </div>
                        <div className="act-error-ins">
                            {/* List error */}
                        </div>
                        <div className="act-terminnal">
                            {/* Edit line terminal */}
                        </div>
                    </div>
                </div>
            </WidgetStyle>
        )
    }
}
