/** @jsx jsx */
import '../../../styles.scss';
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import { React, AllWidgetProps, jsx, loadArcGISJSAPIModules } from 'jimu-core'
import { IMConfig } from '../config';
import WidgetStyle from "./styles";
import ThemeService from '../../../component/theme/theme.service';
import { TabView, TabPanel } from 'primereact/tabview';
import NetworkDiagrams from './components/network-diagrams';
import SearchFeatures from './components/search-features';
import TraceUN from './components/trace/index';
import Topology from './components/topology';

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {

    listOption = [
        { code: 1, descr: 'Create Diagrams' },
        { code: 2, descr: 'View Diagrams' },
    ]
    
    constructor(props) {
        super(props)

        this.state = {
            jimuMapView: null,
            activeIndex: 0,
            urlNetworkDiagram: this.props.config.urlRoot + '/NetworkDiagramServer',
            urlUtilityNetwork: this.props.config.urlRoot + '/UtilityNetworkServer',
            urlFeatureServer: this.props.config.urlRoot + '/FeatureServer'
        }

        console.log(props);

        ThemeService.setActiveTheme();
    }

    async loadConfig() {
        const [
            Map,
            MapView,
            MapImageLayer
        ] = await loadArcGISJSAPIModules([
            "esri/Map", "esri/views/MapView", "esri/layers/MapImageLayer"
        ]);

        const y = 'https://gisun.esrivn.net/server/rest/services/HCM/NetworkDiagramServer/diagrams/Dai%20Test%20Diagrams/map';
        const myMap = new Map({
            // basemap: "streets-vector" // Hiển thị diagrams không cần basemap
        });
        // Create a MapView instance (for 2D viewing) and reference the map instance
        const view = new MapView({
            map: myMap,
            container: 'mapDiv'
        });

        let layer = new MapImageLayer({
            url: y
        });

        myMap.add(layer);
        layer.on('layerview-create', (evt) => {
            view.goTo({
                target: evt.layerView.layer.fullExtent
            }, { duration: 1000 })
        });
        // const rq = new requestservice('arcgis');
        // const response = await rq.query({
        //     url: 'https://gisun.esrivn.net/server/rest/services/HCM/NetworkDiagramServer/templates',
        //     params: { f: 'json' }
        // });
        // if (response && response.data) {
        //     const arr = [];
        //     response.data.templates.forEach(item => {
        //         arr.push({
        //             code: item,
        //             descr: item
        //         })
        //     });
        //     this.setState({
        //         templateList: arr
        //     })
        // }
    }

    activeViewChangeHandler = (jmv: JimuMapView) => {
        if (jmv) {
            window['_map'] = jmv;
            this.setState({
                jimuMapView: jmv
            });
        }
    };

    setActiveIndex(index) {
        this.setState({
            activeIndex: index
        });
    }

    render() {
        return (
            <WidgetStyle>
                <div className="jimu-widget widget-utility-network" style={{ position: 'relative' }}>
                    {
                        this.props.useMapWidgetIds &&
                        this.props.useMapWidgetIds[0] && (
                            <JimuMapViewComponent
                                useMapWidgetId={this.props.useMapWidgetIds?.[0]}
                                onActiveViewChange={this.activeViewChangeHandler}
                            />
                        )
                    }
                    <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setActiveIndex(e.index)}
                        renderActiveOnly={false} scrollable>
                        <TabPanel header="Search Features">
                            <SearchFeatures jimuMapView={this.state.jimuMapView} layerConfig={this.props.config.fieldLayers}></SearchFeatures>
                        </TabPanel>
                        <TabPanel header="Trace">
                            <TraceUN jimuMapView={this.state.jimuMapView} urlUtilityNetwork={this.state.urlUtilityNetwork}></TraceUN>
                        </TabPanel>
                        <TabPanel header="Network Topology">
                            <Topology jimuMapView={this.state.jimuMapView}></Topology>
                        </TabPanel>
                        <TabPanel header="Associations">
                            Associations Work
                        </TabPanel>
                        <TabPanel header="Network Diagram">
                            <NetworkDiagrams jimuMapView={this.state.jimuMapView} urlNetworkDiagram={this.state.urlNetworkDiagram}
                                urlFeatureServer={this.state.urlFeatureServer}></NetworkDiagrams>
                        </TabPanel>
                        
                    </TabView>
                </div>
            </WidgetStyle>
        )
    }
}
