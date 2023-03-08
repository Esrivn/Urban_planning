import  query from 'esri/rest/query';
// import * as QueryTask from 'esri/tasks/QueryTask';
import  Query from "esri/rest/support/Query";
import * as FeatureLayer from "esri/layers/FeatureLayer";
const esriQueryTask = async (url, params, callback, error) => {
  // console.log('esriQueryTask', params),
    // var query = new Query();
    // for (const key in params) {
    //   if (Object.prototype.hasOwnProperty.call(params, key)) {
    //      query[key] = params[key];
    //   }
    // }
    // var task = new QueryTask({url: url});
    // await task.execute(query)
    // .then((resp) => callback(resp), 
    // (err) => error(err));
    
    const _params = new Query(params);

    await query.executeQueryJSON(url, _params).then((resp) => callback(resp), 
    (err) => error(err));
  }

export default esriQueryTask