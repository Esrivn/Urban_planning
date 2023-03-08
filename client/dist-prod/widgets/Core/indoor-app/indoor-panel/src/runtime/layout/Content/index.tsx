import Map from "esri/Map";
import { JimuMapView } from "jimu-arcgis";
import { AllWidgetProps, IMState, React, ReactRedux } from "jimu-core";
import { IMConfig } from "../../../config";
import Explore from "../Explore";
import Categories from "../Explore/Categories";
import Detail from "../Explore/Detail";
import MyPlaces from "../MyPlaces";

const {Fragment, useEffect, useState} = React;
const {useSelector, useDispatch} = ReactRedux;


export interface Props {
  jimuMapView: JimuMapView,
  config: IMConfig,
  allProps: AllWidgetProps<IMConfig>
}

function Content(props: Props) {
  const dispatch = useDispatch();
  const {jimuMapView, config} = props;
  const {typeLayout} = useSelector((state: IMState) => state.layoutState) as any;

    return (<Fragment>
        <Fragment>
          {typeLayout.type === '' && <Explore jimuMapView={jimuMapView} allProps={props.allProps} />}
        </Fragment>

        <Fragment>
          {typeLayout.type === 'explore' && <Categories jimuMapView={jimuMapView} config={config} />}
        </Fragment>

        <Fragment>
          {typeLayout.type === 'myplaces' && <MyPlaces jimuMapView={jimuMapView} config={config} allProps={props.allProps} />}
        </Fragment>

        <Fragment>
          {typeLayout.type === 'detail' && <Detail config={config} jimuMapView={jimuMapView} allProps={props.allProps} />}
        </Fragment>
    </Fragment>);
}

export default Content;