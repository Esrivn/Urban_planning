/** @jsx jsx */
import { React, jsx, jimuHistory, DataSourceComponent, AllWidgetProps, IMState, IMUrlParameters, DataSourceManager } from 'jimu-core';
import { IMConfig } from '../config';
import './styles/style.scss';
import Map, { loadArcGISJSAPIModules, MapDataSource } from "jimu-arcgis";


export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {
  mapContainer: HTMLDivElement
  widgetContainer: HTMLDivElement

  Geometry: typeof __esri.Geometry
  InitialViewProperties: typeof __esri.InitialViewProperties
  TileLayer: typeof __esri.TileLayer
  Basemap: typeof __esri.Basemap
  MapView: typeof __esri.MapView
  SceneView: typeof __esri.SceneView
  Extent: typeof __esri.geometry.Extent
  Viewpoint: typeof __esri.Viewpoint
  PortalItem: typeof __esri.PortalItem
  Portal: typeof __esri.Portal
  WebMap: typeof __esri.WebMap
  WebScene: typeof __esri.WebScene
  Color: typeof __esri.Color

  mapView: __esri.MapView
  sceneView: __esri.SceneView
  mapDs: MapDataSource
  extentWatch: __esri.WatchHandle
  fatalErrorWatch: __esri.WatchHandle
  highLightHandles: {[layerId: string]: __esri.Handle} = {}
  mapBaseViewEventHandles: {[eventName: string]: __esri.Handle} = {}
  dsManager = DataSourceManager.getInstance()

  onExtented = null
  isFirstReceiveMessage = true
  isRequestingMap = false

  __unmount = false


  startRenderMap = () => {
    loadArcGISJSAPIModules([
      'esri/geometry/Extent',
      'esri/Viewpoint'
    ]).then(modules => {
      [
        this.Extent, this.Viewpoint
      ] = modules

      if (this.__unmount) {
        return
      }

      this.setState({
        isModulesLoaded: true
      })
    })
  }

  render () {
    return (
      <div className="widget-indoor">
        <div className="indoor_container">
          <div className="indoor__header">
            <div className="header__logo"></div>

            <div className="header__search"></div>
          </div>

          <div className="indoor__content">
            <div className="indoor_panel">
              <div className="panel__menu"></div>

              <div className="panel__content"></div>
            </div>

            <div className="indoor__map">
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}
