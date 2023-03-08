/** @jsx jsx */
import { jsx } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import { IMConfig } from "../config";
import { JimuMapViewSelector, SettingRow, SettingSection } from "jimu-ui/advanced/setting-components";
import { useEffect } from "react";
import '../../../styles.scss';
import ThemeService from '../../../component/theme/theme.service';

export default function (props: AllWidgetSettingProps<IMConfig>) {
    useEffect(() => {
        ThemeService.setActiveTheme();
    }, [])

    const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
        props.onSettingChange({
            id: props.id,
            useMapWidgetIds: useMapWidgetIds
        });

    };

    return (
        <div className="custom-setting">
            <SettingSection>
                <SettingRow>
                    <JimuMapViewSelector onSelect={onMapWidgetSelected} useMapWidgetIds={props.useMapWidgetIds} />
                </SettingRow>
            </SettingSection>
        </div>
    )
}