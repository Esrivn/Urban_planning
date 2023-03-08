import React from 'react';
import { AppMode, dataSourceUtils } from 'jimu-core'
import { IFeature } from '@esri/arcgis-rest-types'
import { geometryUtils, loadArcGISJSAPIModules, JimuMapView, LayerTypes, JimuFeatureLayerView, JimuSceneLayerView } from 'jimu-arcgis'
import { OdataParams, QdataParams, SearchResponse } from './config';
import axios, { AxiosRequestConfig } from 'axios';
class odataservices extends React.Component {
    constructor() {
        super(null);
        this.state = { color: "red" };
        //this.canhbao = this.canhbao.bind(this);
    }

    fetchClient = (q: QdataParams) => {
        const defaultOptions: any = {
            baseURL: q.url,
            method: q.method,
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: q.responseType ?? 'json'
        };

        // Create instance
        let instance = axios.create(defaultOptions);

        // Set the AUTH token for any request
        instance.interceptors.request.use(function (config) {
            // bỏ load token
            //   const token = localStorage.getItem('token');
            //   config.headers.Authorization =  token ? `Bearer ${token}` : '';
            return config;
        });

        return instance;
    };

    fetchSearchClient = (q: OdataParams) => {
        const defaultOptions: AxiosRequestConfig = {
            url: q.url,
            method: 'GET'
            // baseURL: q.url,
            // method: q.method,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // responseType: q.responseType ?? 'json'
        };

        // Create instance
        let instance = axios.create(defaultOptions);

        // Set the AUTH token for any request
        instance.interceptors.request.use(function (config) {
            // bỏ load token
            //   const token = localStorage.getItem('token');
            //   config.headers.Authorization =  token ? `Bearer ${token}` : '';
            return config;
        });

        return instance;
    };


    query = async (q: QdataParams) => {
        try {
            return await this.fetchClient(q).get(q.url).then(handleResponse);
        } catch (error) {
            console.log(error);
        }
    }
    search = async (p: OdataParams) => {
        try {

            const _url = p.url; // this.appService.urlWs;
            const val = decodeSql1(p.where);
            let convertWhere = val;
            if (p.or) {
                convertWhere += `(${convertWhere}) or (${decodeSql(p.or, 'and')})`;
            }
            if (p.and) {
                convertWhere += `(${convertWhere}) and (${decodeSql(p.or, 'or')})`;
            }

            if (p.select) { convertWhere += '&$select=' + p.select; }
            if (p.orderBy) {
                convertWhere += '&$orderby=' + p.orderBy.join(',');
            }
            let url = `${_url}/?$count=true`;

            // Nếu truyền pageNumber và pageSize thì => lazyload, còn không sẽ load toàn bộ
            if (p.pageSize) {
                url += `&$top=${p.pageSize}`;
            }
            if (p.startRecord) {
                url += `&$skip=${p.startRecord}`;
            }

            url = convertWhere !== '' ? `${url}&${convertWhere}` : url;
            p.url = url;
            return await this.fetchSearchClient(p).get(p.url).then(handleResponseOdata);
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return null;
    }
}
export default odataservices;


export const listOperatorSqlOdata = [
    { key: '=', value: 'eq' },
    { key: '<>', value: 'ne' },
    { key: '>', value: 'gt' },
    { key: '>=', value: 'ge' },
    { key: '<', value: 'lt' },
    { key: '<=', value: 'le' },
    { key: 'like', value: 'like' },
    { key: 'in', value: 'in' },
    { key: '!=', value: 'not eq' },
    { key: '!<>', value: 'not ne' },
    { key: '!>', value: 'not gt' },
    { key: '!>=', value: 'not ge' },
    { key: '!<', value: 'not lt' },
    { key: '!<=', value: 'not le' },
    { key: '!like', value: 'not like' },
    { key: '!in', value: 'not in' }
];
export const getDomainName = (url: string) => {
    const domainNameStartIndex = url.indexOf('//');
    let domainName = '';

    if (domainNameStartIndex >= 0) {
        domainName = url.substring(domainNameStartIndex + 2);
    } else {
        domainName = url;
    }
    const domainNameEndIndex = domainName.indexOf('/');
    if (domainNameEndIndex >= 0) {
        domainName = domainName.substring(0, domainNameEndIndex);

        // cắt phế thêm cả port nếu có
        const portIndex = domainName.indexOf(':');
        if (portIndex >= 0) {
            domainName = domainName.substring(0, portIndex);
        }
    }
    return domainName;
}


const decodeSql = (where: any, logic: string) => {
    let decode1 = '';
    if (where) {
        if (where.length > 0) {
            decode1 += '$filter=';
            if (Array.isArray(where[0])) {
                // Trường hợp multi
                where.forEach((item: any, index: number) => {
                    decode1 = decode(item);
                    decode1 += index < (where.length - 1) && logic ? ` ${logic} ` : '';
                });
            } else {
                // Trường hợp where chỉ là dạng [key, operator, value]
                decode1 = decode(where);
            }
        }
    }
    // if (p.select) { decode += '&select=' + p.select; }
    return decode1;
}
const replaceSpecialCharacters = (attribute: any) => {
    // replace the single quotes
    attribute = attribute.replace(/%/g, '%25');
    attribute = attribute.replace(/\+/g, '%2B');
    attribute = attribute.replace(/\//g, '%2F');
    attribute = attribute.replace(/\?/g, '%3F');

    attribute = attribute.replace(/#/g, '%23');
    attribute = attribute.replace(/&/g, '%26');
    return attribute;
}
const decode = (item: any[]) => {
    let str = '';
    // item là 1 array có dạng [key, operator, value];
    let val = item[2];
    let key = item[0];
    const resp = listOperatorSqlOdata.filter(fil => fil.key === item[1]);

    if (typeof (val) === 'string') {
        // if (val.startsWith(this.appService.c$)) {
        //     val = eval(val);
        //     if (typeof (val) === 'string') {
        //         val = `'${val}'`;
        //     }
        // } else {
        val = replaceSpecialCharacters(val);
        const first = val.charAt(0);
        const last = val.charAt(val.length - 1);
        if (first === '\'' && last === '\'') {
            val = '\'' + eval(val.substring(1, val.length - 1)) + '\'';
            val = val.toLowerCase();
            key = `tolower(${key})`;
        } else if (first === '{' && last === '}') {
            val = eval(val.substring(1, val.length - 1));
        } else if (first === '(' && last === ')') {
            val = val.substring(1, val.length - 1);
            val = val.split(',');
            // key = `tolower(${key})`;
        } else {
            val = `'${val}'`.toLowerCase();
            key = `tolower(${key})`;
        }
        // }
    } else {
        try {
            // convert to date format
            val = val.toISOString();
        } catch (error) {
        }
    }

    switch (resp[0].value) {
        case 'like':
            str += `contains(${key}, ${val})`;
            break;
        case 'in':
            if (val.length === 0) {
                str += '1 = 2';
            } else {
                str += `(${key} in (${val.join(',')}))`;
            }
            break;
        case 'not in':
            if (val.length === 0) {
                str += '1 = 1';
            } else {
                str += `not(${key} in (${val.join(',')}))`;
            }
            break;
        default:
            str += `${key} ${resp[0].value} ${val}`;
            break;
    }

    return str;
}
const decodeSql1 = (where: string | any[], isBase = true) => {
    let decode1 = ''; let logic = 'and';
    if (where) {
        if (where.length > 0) {
            if (isBase) {
                decode1 = '$filter=';
            }
            let cloneWhere: any = (where);
            if (!Array.isArray(cloneWhere[0]) && cloneWhere[0] !== 'and' && cloneWhere[0] !== 'or') {
                // Trường hợp mảng 1 chiều
                decode1 += decode(cloneWhere);
            } else {
                cloneWhere.forEach((item: string | any[], index: number) => {
                    if (index === 0 && (item === 'and' || item === 'or')) {
                        logic = item;
                    } else {
                        if (Array.isArray(item)) {
                            if (item.length === 0) {
                                // mảng rỗng thì bỏ qua
                                return;
                            }
                            if (item[0] === 'and' || item[0] === 'or') {
                                // đệ quy lần nữa để lấy dữ liệu
                                decode1 += `(${decodeSql1(item, false)})`;
                            } else if (Array.isArray(item[0])) {
                                // item là 1 array có dạng [[key, operator, value], ...]
                                logic = 'and';
                                decode1 += `(${decodeSql1(item, false)})`;
                            } else {
                                // item là 1 array có dạng [key, operator, value];
                                decode1 += decode(item);
                            }
                            decode1 += index < (cloneWhere.length - 1) && logic ? ` ${logic} ` : '';
                        } else {
                            // cloneWhere bây giờ là dạng [key, operator, value], chỉ chạy 1 lần duy nhất với index === 0;
                            if (index === 0) {
                                decode1 += decode(cloneWhere);
                            }
                        }
                    }
                });
            }

        }
    }
    return decode1;
}
function handleResponse(response) {
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);



    //     return data;
    // });

    if (response.statusText !== 'OK') {
        // if ([401, 403].includes(response.status) && auth?.token) {
        //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        //     localStorage.removeItem('user');
        //     setAuth(null);
        //     history.push('/account/login');
        // }

        const error = (response.data) || response.statusText;
        //alertActions.error(error);
        return Promise.reject(error);
    }
    else {
        return Promise.resolve(response.data);
    }
}
function handleResponseOdata(response) {
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);



    //     return data;
    // });

    if (response.statusText !== 'OK') {
        // if ([401, 403].includes(response.status) && auth?.token) {
        //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        //     localStorage.removeItem('user');
        //     setAuth(null);
        //     history.push('/account/login');
        // }

        const error = (response.data) || response.statusText;
        //alertActions.error(error);
        return Promise.reject(error);
    }
    else {
        const resp = {
            total: 0,
            success: false,
            features: [],
            message: 'Tìm thất bại'
        };
        if (response.data) {
            resp.total = response.data['@odata.count'] || response.data['value'].length;
            resp.success = true;
            resp.features = response.data['value'];
            resp.message = 'Tìm kiếm thành công';
        }
        return Promise.resolve(resp);
    }
}
const cloneDeep = (where: any) => {
    let data: any = null;
    data = JSON.parse(JSON.stringify(where));
    return data;
}