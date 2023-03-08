
// import {React, FormattedMessage} from 'jimu-core';
// import {AllWidgetSettingProps} from 'jimu-for-builder';
// import {IMConfig} from '../config';
// import defaultI18nMessages from './translations/default';
// import {Input} from '../../../../core-prime';

// export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig>, any>{
//   onP1Change = (evt: React.FormEvent<HTMLInputElement>) => {
//     this.props.onSettingChange({
//       id: this.props.id,
//       config: this.props.config.set('p1', evt.currentTarget.value)
//     });
//   }

//   onP2Change = (evt) => {
//     this.props.onSettingChange({
//       id: this.props.id,
//       config: this.props.config.set('p2', evt.target.value)
//     });
//   }

//   onP3Change = (evt) => {
//     this.props.onSettingChange({
//       id: this.props.id,
//       config: this.props.config.set('test', evt.target.value)
//     });
//   }

//   render(){
//     return <div className="widget-setting-demo">
//       {/* <div><FormattedMessage id="p1" defaultMessage={defaultI18nMessages.p1}/>: <input defaultValue={this.props.config.p1} onChange={this.onP1Change}/></div>
//       <div><FormattedMessage id="p2" defaultMessage={defaultI18nMessages.p2}/>: <input defaultValue={this.props.config.p2} onChange={this.onP2Change}/></div> */}
//       a1: <Input value={this.props.config.p2} onChange={this.onP2Change} />
//       a2: <Input value={this.props.config.test} onChange={this.onP3Change} />
//     </div>
//   }
// }


/** @jsx jsx */
import { React, jsx } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import { IMConfig } from "../config";
import { JimuMapViewSelector, SettingRow, SettingSection } from "jimu-ui/advanced/setting-components";
import { TextInput } from 'jimu-ui';

const {useState, useEffect} = React;



export default function (props: AllWidgetSettingProps<IMConfig>) {
    const [urlSysCaheWindow, setUrlSysCaheWindow] = useState(null);
    const [urlConfigInit, setUrlConfigInit] = useState(null);
    const [urlMapServer, setUrlMapServer] = useState(null);
    const [urlFeature, setUrlFeature] = useState(null);
    const [urlCategory, setUrlCategory] = useState(null);

    const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
        props.onSettingChange({
            id: props.id,
            useMapWidgetIds: useMapWidgetIds
        });
    };

    useEffect(() => {
        console.log(123);
        let services = props.config.services;
        setUrlSysCaheWindow(props.config.SysCacheWindow);
        setUrlConfigInit(props.config.ConfigInit);
        setUrlMapServer(services[0].url);
        setUrlFeature(services[1].url);
        setUrlCategory(services[2].url);
    }, [])

    const handleOnChangeUrlSysCaheWindow = (val: string)  => {
        setUrlSysCaheWindow(val);
        let config: any = {...props.config};
        config.SysCacheWindow = val;
        props.onSettingChange({
            id: props.id,
            config
        });
    }

    const handleOnChangeUrlConfigInit = (val: string)  => {
        setUrlConfigInit(val);
        let config: any = {...props.config};
        config.ConfigInit = val;
        props.onSettingChange({
            id: props.id,
            config
        });
    }

    const handleOnChangeUrlMapServer = (val: string)  => {
        setUrlMapServer(val);
        let config: any = {...props.config};
        config.services[0].url = val;
        props.onSettingChange({
            id: props.id,
            config
        });
    }

    const handleOnChangeUrlFeatureServer = (val: string)  => {
        setUrlFeature(val);
        let config: any = {...props.config};
        config.services[1].url = val;
        props.onSettingChange({
            id: props.id,
            config
        });
    }

    const handleOnChangeUrlCategory = (val: string)  => {
        setUrlCategory(val);
        let config: any = {...props.config};
        config.services[2].url = val;
        props.onSettingChange({
            id: props.id,
            config
        });
    }



    return (
        <div>
            <SettingSection>
                <SettingRow>
                    <JimuMapViewSelector onSelect={onMapWidgetSelected} useMapWidgetIds={props.useMapWidgetIds} />
                </SettingRow>

                <SettingRow>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}
                        >
                        <label style={{ 
                            justifyContent: 'left'
                         }}>
                            Cache window
                        </label>
                        <TextInput
                            value={urlSysCaheWindow}
                            onChange={(evt: any) => handleOnChangeUrlSysCaheWindow(evt.target.value)}
                            style={{ height: '26px' }}
                            placeholder="Nhập url..."
                        />
                    </div>
                </SettingRow>

                <SettingRow>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}
                        >
                        <label style={{ 
                            justifyContent: 'left'
                         }}>
                            Config init
                        </label>
                        <TextInput
                            value={urlConfigInit}
                            onChange={(evt: any) => handleOnChangeUrlConfigInit(evt.target.value)}
                            style={{ height: '26px' }}
                            placeholder="Nhập url..."
                        />
                    </div>
                </SettingRow>

                <SettingRow>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}
                        >
                        <label style={{ 
                            justifyContent: 'left'
                         }}>
                            MapServer url
                        </label>
                        <TextInput
                            value={urlMapServer}
                            onChange={(evt: any) => handleOnChangeUrlMapServer(evt.target.value)}
                            style={{ height: '26px' }}
                            placeholder="Nhập url..."
                        />
                    </div>
                </SettingRow>

                <SettingRow>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}
                        >
                        <label style={{ 
                            justifyContent: 'left'
                         }}>
                            FeatureServer url
                        </label>
                        <TextInput
                            value={urlFeature}
                            onChange={(evt: any) => handleOnChangeUrlFeatureServer(evt.target.value)}
                            style={{ height: '26px' }}
                            placeholder="Nhập url..."
                        />
                    </div>
                </SettingRow>

                <SettingRow>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}
                        >
                        <label style={{ 
                            justifyContent: 'left'
                         }}>
                            Category url
                        </label>
                        <TextInput
                            value={urlCategory}
                            onChange={(evt: any) => handleOnChangeUrlCategory(evt.target.value)}
                            style={{ height: '26px' }}
                            placeholder="Nhập url..."
                        />
                    </div>
                </SettingRow>
            </SettingSection>
        </div>
    )
}
