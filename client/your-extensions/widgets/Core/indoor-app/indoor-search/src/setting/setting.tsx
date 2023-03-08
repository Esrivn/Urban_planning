/** @jsx jsx */
import { jsx, DataSourceJson, css, ImmutableArray } from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { TextInput } from 'jimu-ui'
import { JimuMapViewSelector, SearchDataConfig, SearchDataSetting, SearchDataType, SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import React from 'react'
import { IMConfig, SearchServiceType } from '../config'
import SearchResultSetting from './component/search-setting-option'
// import ArrangementStyleSetting from './component/arrangement-style'
interface ExtraProps {
  id: string
}
const {useState, useEffect} = React;
type SettingProps = AllWidgetSettingProps<IMConfig> & ExtraProps

const Setting = (props: SettingProps) => {
  const { config, id, portalUrl, onSettingChange, useDataSources } = props
  const [urlSysCaheWindow, setUrlSysCaheWindow] = useState(null);
  const [urlConfigInit, setUrlConfigInit] = useState(null);
  const [urlMapServer, setUrlMapServer] = useState(null);
  const [urlFeature, setUrlFeature] = useState(null);
  const [urlCategory, setUrlCategory] = useState(null);

  const SYLE = css`
    .suggestion-setting-con  {
      padding-bottom: 0;
    }
  `

  const onDataSettingChange = (datasourceConfig: ImmutableArray<SearchDataConfig>) => {
    if (!datasourceConfig) return false
    const newConfig = config?.setIn(['datasourceConfig'], datasourceConfig)
    onSettingChange({ id, config: newConfig })
  }

  const createOutputDs = (outputDsJsonList: DataSourceJson[], datasourceConfig: ImmutableArray<SearchDataConfig>) => {
    if (!datasourceConfig) return false
    const newConfig = config?.setIn(['datasourceConfig'], datasourceConfig)
    onSettingChange({
      id,
      config: newConfig,
      useUtilities: getUseUtilities(newConfig)
    }, outputDsJsonList)
  }

  const getUseUtilities = (config: IMConfig) => {
    const useUtilities = []
    config?.datasourceConfig?.forEach(configItem => {
      if (configItem?.searchServiceType === SearchServiceType.GeocodeService) {
        useUtilities.push(configItem?.useUtility)
      }
    })
    return useUtilities
  }

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

  return (
    <div className='widget-setting-search jimu-widget-search' css={SYLE}>
      <SearchDataSetting
        id={id}
        portalUrl={portalUrl}
        useDataSources={useDataSources}
        createOutputDs={true}
        onSettingChange={onDataSettingChange}
        onOutputDsSettingChange={createOutputDs}
        datasourceConfig={config?.datasourceConfig}
        searchDataSettingType={SearchDataType.Both}
      />
      <SearchResultSetting
        id={id}
        config={config}
        onSettingChange={onSettingChange}
        useDataSources={useDataSources}
      />
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

      {/* <ArrangementStyleSetting
        id={id}
        config={config}
        onSettingChange={onSettingChange}
      /> */}

    </div>
  )
}

export default Setting
