/** @jsx jsx */
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import { React, AllWidgetProps, jsx, loadArcGISJSAPIModules, classNames, ReactDOM } from 'jimu-core'
import { IMConfig } from '../config';
import { useState } from 'react';

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {

    constructor(props) {
        super(props)

        this.state = {
            imgLogo: "./assets/images/logo.png"
        }
    }

    test = (name) => {
        console.log(name)
    }

    render() {
        return (
            <div className="widget-demo jimu-widget wp-header d-flex align-items-center">
                <div className="logo col-md-1">
                    <img src={require('./assets/images/logo.png')} alt="logo" style={{
                        width: '50px',
                        height: '50px'
                    }} />
                </div>
                <div className="title-app" style={{
                    color: '#969694',
                    fontSize: '21px',
                    fontWeight: '500'
                }}>
                    <span>Utility Network Editor</span>
                </div>
            </div >
        )
    }
}
