import { loadArcGISJSAPIModules } from "jimu-arcgis";

const getGraphicLayer = async (view: any, id: any) => {
    const [GraphicsLayer] = await loadArcGISJSAPIModules(["esri/layers/GraphicsLayer"]);
    const items = view.map.allLayers.get('items');
    let graphicLayer = null;
    if (items && items.length > 0) {
        items.forEach(item => {
            if (item.id === id) {
                graphicLayer = item;
            }
        });
    }


    if (!graphicLayer) {
        graphicLayer = new GraphicsLayer({ id });
        view.map.add(graphicLayer);
    }

    return graphicLayer;
}

export default getGraphicLayer;