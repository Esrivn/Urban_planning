import esriRequest from 'esri/request';

const esriRequest_function = async (url, params, callback, error) => {

  await esriRequest(url, {
      query: params,
      responseType: 'json',
      useProxy: false,
      // responseType: "json",
      // method:"post",
      body:JSON.stringify(params)
      
  }).then((resp) => callback(resp), 
    (err) => error(err));
}
export default esriRequest_function