import request from 'esri/request';
import { loadArcGISJSAPIModules } from 'jimu-arcgis';


export const esriRequest1 = (url, params, method) => {
  const options: any = {
    query: params,
    responseType: "json",
    useProxy: false,
    method: method
  };
  return request(url, options)
}

const esriRequest = (url, params, method, callback?, error?) => {
  const options: any = {
    query: params,
    responseType: "json",
    useProxy: false,
    method: method
  };
  request(url, options).then((resp) => callback(resp.data),
    (err) => error(err));
}

export const queryData = (url, geometry, callback, error) => {
  const param = {
    geometry: geometry,
    f: 'json',
    outFields: ['*'],
    outSR: 102100,
    returnGeometry: true,
    geometryType: 'esriGeometryPolygon'
  };
  esriRequest(url, param,'GET', res => {
    callback(res)
    
  }, err => {
    error(err)
  })
}

export const printTask = async (url: string, printParam: any = {}, callback?, error? ) => {
  const [print] = await loadArcGISJSAPIModules([ 'esri/rest/print'])
  print.execute(url, printParam).then((response) => callback(response), (err) => error(err))
}

export default esriRequest

