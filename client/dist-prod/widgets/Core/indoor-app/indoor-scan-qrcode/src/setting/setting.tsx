import { React, jsx } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import { IMConfig } from "../config";
import { JimuMapViewSelector, SettingRow, SettingSection } from "jimu-ui/advanced/setting-components";
import { TextInput } from "jimu-ui";

const {useState, useEffect} = React;

export default function (props: AllWidgetSettingProps<IMConfig>) {
    const [urlAppViewer, setUrlAppViewer] = useState(null);
    const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
        props.onSettingChange({
            id: props.id,
            useMapWidgetIds: useMapWidgetIds
        });
    };

    useEffect(() => {
        setUrlAppViewer(props.config.urlAppViewer);
    }, [])

    const handleOnChangeUrlAppViewer = (val: string)  => {
        setUrlAppViewer(val);
        let config: any = {...props.config};
        config.urlAppViewer = val;
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
                            Indoor view url
                        </label>
                        <TextInput
                            value={urlAppViewer}
                            onChange={(evt: any) => handleOnChangeUrlAppViewer(evt.target.value)}
                            style={{ height: '26px' }}
                            placeholder="Nhập url..."
                        />
                    </div>
                </SettingRow>
            </SettingSection>
        </div>
    )
}
