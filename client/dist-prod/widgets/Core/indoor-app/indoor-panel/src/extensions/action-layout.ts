import { extensionSpec, ImmutableObject, IMState } from 'jimu-core';

export enum EnumActionKeys {
    MenuItemAction = 'MenuItem_Action',
    GetDataCategory = 'GetData_Category',
    DataCategoryCurrent = 'DataCategoryCurrent',
    DataCategoryPrevous = 'DataCategoryPrevous',
    PageCategories = 'PageCategories'
}

export interface IMenuItemAction {
    type: EnumActionKeys.MenuItemAction;
    val: string;
}

export interface IGetDataCategory {
    type: EnumActionKeys.GetDataCategory;
    val: any;
}

export interface IDataCategoryCurrent {
    type: EnumActionKeys.DataCategoryCurrent;
    val: any;
}

export interface IDataCategoryPrevous {
    type: EnumActionKeys.DataCategoryPrevous;
    val: any;
}

export interface IPageCategories {
    type: EnumActionKeys.PageCategories;
    val: any;
}


type ActionTypes = IMenuItemAction | IGetDataCategory | IDataCategoryCurrent | IDataCategoryPrevous | IPageCategories

interface LayoutState {
    typeLayout: string;
    dataCategory: any,
    dataCategoryCurrent: any,
    dataCategoryPrevous: any,
    pageCategories: any
}

type IMLayoutState = ImmutableObject<LayoutState>;

declare module 'jimu-core/lib/types/state' {
    interface State {
        layoutState?: IMLayoutState
    }
}

export default class LayoutReduxStoreExtension implements extensionSpec.ReduxStoreExtension {
    id = 'layout-local-redux-store-extension';

    getActions() {
        return Object.keys(EnumActionKeys).map(k => EnumActionKeys[k]);
    }

    getReducer() {
        return (localState: IMLayoutState, action: ActionTypes, appState: IMState): IMLayoutState => {
            switch (action.type) {
                case EnumActionKeys.MenuItemAction:
                    return localState.set('typeLayout', action.val);

                case EnumActionKeys.GetDataCategory:
                    return localState.set('dataCategory', action.val);

                case EnumActionKeys.DataCategoryCurrent:
                    return localState.set('dataCategoryCurrent', action.val);

                case EnumActionKeys.DataCategoryPrevous:
                    return localState.set('dataCategoryPrevous', action.val);

                case EnumActionKeys.PageCategories:
                    return localState.set('pageCategories', action.val);
                default:
                    return localState;
            }
        }
    }

    getInitLocalState() {
        return {
            typeLayout: {
                type: '',
                title: 'Indoor'
            },
            dataCategory: null,
            dataCategoryCurrent: null,
            dataCategoryPrevous: null,
            pageCategories: [
                {
                    type: '',
                    title: 'Indoor',
                    subTitle: '',
                    data: null,
                    level: 0,
                    page: 0
                }
            ]
        }
    }

    getStoreKey() {
        return 'layoutState';
    }
}