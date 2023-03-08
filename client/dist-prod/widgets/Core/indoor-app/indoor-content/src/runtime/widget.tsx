/** @jsx jsx */
import { React, AllWidgetProps, jsx } from 'jimu-core'
import { IMConfig } from '../config';

const {useEffect} = React;

export default function Widget (props: AllWidgetProps<IMConfig> & any) {


  useEffect(() => {
  
  }, [])


    return (
      <div className="widget-demo jimu-widget m-2">
        <p>Simple Widget</p>
      </div>
    )
}
