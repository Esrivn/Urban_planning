/** @jsx jsx */
import '../../../styles.scss';
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import { React, AllWidgetProps, jsx, loadArcGISJSAPIModules } from 'jimu-core'
import { IMConfig } from '../config';
import WidgetStyle from "./styles";
import ThemeService from '../../../component/theme/theme.service';
import { TabView, TabPanel } from 'primereact/tabview';
import CreateDiagrams from './components/create-diagrams/create-digrams';
import ViewDiagrams from './components/view-diagrams/view-diagrams';

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
            sketchViewModel: null // sketchViewModel dùng để kích hoạt sự kiện vẽ
        }

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

    

    async queryData(obj: any) {

    }

    async activeSelectFeatures() {
        this.state.sketchViewModel.create("rectangle");
    }

    async measureLine(vertices) {
    }

    setActiveIndex(index) {
        this.setState({
            activeIndex: index
        });
    }

    render() {
        return (
            <WidgetStyle>
                <div className="app-network-diagrams jimu-widget">
                    {
                        this.props.useMapWidgetIds &&
                        this.props.useMapWidgetIds[0] && (
                            <JimuMapViewComponent
                                useMapWidgetId={this.props.useMapWidgetIds?.[0]}
                                onActiveViewChange={this.activeViewChangeHandler}
                            />
                        )
                    }
                    <div style={{ width: "100%", height: "800px", position: "relative" }}>
                        <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setActiveIndex(e.index)}>
                            <TabPanel header="View Diagrams">
                                <ViewDiagrams jimuMapView={this.state.jimuMapView} urlNetworkDiagram={this.props.config.urlNetworkDiagram}></ViewDiagrams>
                            </TabPanel>
                            <TabPanel header="Create Diagrams">
                                <CreateDiagrams jimuMapView={this.state.jimuMapView} urlNetworkDiagram={this.props.config.urlNetworkDiagram}></CreateDiagrams>
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </WidgetStyle>
        )
    }
}
