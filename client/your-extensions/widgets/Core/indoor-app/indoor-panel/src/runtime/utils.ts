
import { geometryUtils, loadArcGISJSAPIModules, JimuMapView, LayerTypes, JimuFeatureLayerView, JimuSceneLayerView } from 'jimu-arcgis'
import request from 'esri/request';

export function queryFeatures(url, where) {
    return loadArcGISJSAPIModules([
        "esri/layers/FeatureLayer"
    ]).then(modules => {
        let FeatureLayer: typeof __esri.FeatureLayer;
        [FeatureLayer] = modules
        const layer = new FeatureLayer({
            url: url
        });
        const query = layer.createQuery();
        query.where = where
        query.outFields = ['*']
        query.returnGeometry = true
        return layer.queryFeatures(query).then(featureSet => {
            return featureSet
        })
    })
}

export function queryAttachments(layerObject, attachmentQuery) {
    return layerObject.queryAttachments(attachmentQuery).then(featureSet => {
        return featureSet
    })
}

export const esriRequest = (url, params, method) => {
    return new Promise((resolve) => {
        try {
            request(url, {
                query: params,
                responseType: 'json',
                useProxy: false,
                method: method
            }).then((result) => {
                resolve(result)
            }, (err) => {
                console.error(err)
                resolve(false)
            })
        } catch (e) {
            console.error(e)
            resolve(false)
        }
    })
}
