/** @jsx jsx */
import { React, jsx } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import { IMConfig } from "../config";
import { JimuMapViewSelector, SettingRow, SettingSection } from "jimu-ui/advanced/setting-components";
import { MapViewManager } from "jimu-arcgis";
import { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import '../../../styles.scss';
import ThemeService from '../../../component/theme/theme.service';
import './style.scss'

export default function (props: AllWidgetSettingProps<IMConfig>) {
    const [listLayer, setListLayer] = useState(null);
    const [lookupFields, setLookupFields] = useState(null);
    const [fieldForSearch, setFieldForSearch] = useState(null);
    const [urlRoot, setUrlRoot] = useState(null);

    const mvManager: MapViewManager = MapViewManager.getInstance();

    useEffect(() => {
        ThemeService.setActiveTheme();
        getAvailableDataSources(props.useMapWidgetIds, true)
    }, [])

    const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
        props.onSettingChange({
            id: props.id,
            useMapWidgetIds: useMapWidgetIds
        });

        if (useMapWidgetIds.length === 0) {
            setListLayer(null);
            setLookupFields(null);
        } else {
            getAvailableDataSources(useMapWidgetIds);
        }

    };

    const getAvailableDataSources = async (useMapWidgetIds, firstInit = false) => {
        const mapViewGroups = mvManager.getJimuMapViewGroup(useMapWidgetIds);

        if (mapViewGroups && mapViewGroups.jimuMapViews) {
            for (const id in mapViewGroups.jimuMapViews) {
                let layers = [];
                const lookup = {};
                if (mapViewGroups.jimuMapViews[id].jimuLayerViews) {
                    for (const i in mapViewGroups.jimuMapViews[id].jimuLayerViews) {
                        const layer = mapViewGroups.jimuMapViews[id].jimuLayerViews[i].layer;
                        const fields = layer.fields;
                        layers.push({
                            code: layer.id,
                            descr: layer.title ?? layer.id
                        });

                        lookup[layer.id] = [];
                        fields.forEach(element => {
                            lookup[layer.id].push({
                                code: element.name,
                                descr: element.alias
                            })
                        });
                    }
                }

                if (firstInit) {
                    const defaultValue = {};
                    for (let i in props.config.fieldList) {
                        const item = props.config.fieldList[i];
                        defaultValue[i] = item ? lookup[i].filter(fil => fil.code === item['code'])[0] : null;
                    }
                    setFieldForSearch(defaultValue);
                    setUrlRoot(props.config.urlRoot);
                }

                layers = layers.sort((a, b) => a.code - b.code);

                setListLayer(layers);
                setLookupFields(lookup);
            }
        }
    };

    const onFieldLayerChange = (row, evt) => {
        const value = evt.target ? evt.target.value : evt.value;
        const obj = { ...fieldForSearch };
        obj[row.code] = value;
        setFieldForSearch(obj);
        const config = { ...props.config };
        config.fieldList = obj;
        props.onSettingChange({
            id: props.id,
            config
        });
    }

    const renderRow = (row) => {
        return <SettingRow>
            <div className="div-row-setting">
                <div className="div-row-setting-label">{row.descr}</div>
                <Dropdown showClear value={fieldForSearch[row.code]} options={lookupFields[row.code]} onChange={(val) => onFieldLayerChange(row, val)}
                    optionLabel="descr" />
            </div>
        </SettingRow>
    }

    const onSetUrlRoot = (val) => {
        setUrlRoot(val);
        const config = { ...props.config };
        config.urlRoot = val;
        props.onSettingChange({
            id: props.id,
            config
        });
    }

    return (
        <div className="custom-setting">
            <SettingSection>
                <SettingRow>
                    <JimuMapViewSelector onSelect={onMapWidgetSelected} useMapWidgetIds={props.useMapWidgetIds} />
                </SettingRow>
            </SettingSection>
            {
                listLayer && listLayer.length > 0 &&
                <SettingSection>
                    <SettingRow>
                        <div className="div-row-setting">
                            <div className="div-row-setting-label">Url to Utility Network</div>
                            <InputText value={urlRoot} onChange={(e) => onSetUrlRoot(e.target.value)} ></InputText>
                        </div>
                    </SettingRow>
                    {/* Tạm thời không dùng tới đoạn dưới */}
                    {/* <SettingRow>
                        <div className="div-row-setting-label">Select field search for each layer</div>
                    </SettingRow>
                    {
                        listLayer.map(item => renderRow(item))
                    } */}
                </SettingSection>
            }
        </div>
    )
}