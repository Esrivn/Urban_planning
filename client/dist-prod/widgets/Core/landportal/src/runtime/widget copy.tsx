

/** @jsx jsx */
import { React, AllWidgetProps, jsx } from 'jimu-core'
import { IMConfig } from '../config'
import '../../../styles.scss';                              //icons
import { Button } from 'primereact/button';
import {CoreInput, CoreButton, CoreCheckBox, CoreSelect,CoreColorPicker, CoreDatetime,CoreRadioButton, CoreMessage} from '../../../component';
import ThemeService from '../../../component/theme/theme.service';
import { color } from 'jimu-ui/basic/color-picker';
import { useState, useEffect, useRef, useReducer, useLayoutEffect } from 'react';

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {

 
  valueInput = 'abcd'
  myRef: React.MutableRefObject<any>;
  constructor(props) {
    super(props)
   
    console.log(props.config);
    this.state = {
      value_text: 'abcd',
      checked :false,
      color : 'ff0000',
      date: null,
      value_dropdown: 1,
     
    }
    this.myRef = React.createRef();
    this.handlerClick = this.handlerClick.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
    this.handlerOnchange = this.handlerOnchange.bind(this);
    this.handlerColorOnchange = this.handlerColorOnchange.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
    ThemeService.setActiveTheme();
  }
  handlerDateOnchange=(e) =>
  {
    this.setState({Date: e.value});
  }
  handlerColorOnchange=(e) =>
  {
    this.setState({color: e.value});
  }
  handlerOnchange =(e)=>
  {
    this.setState({checked: e.checked});
    console.log(e);
  }
  handlerClick = () => {
    //alert('xxx');
    this.myRef.current.getMessages('success','thành công!');
  }
  handlerChange = (val) => {
    // alert('xxx');
    // this.valueInput = val;
    alert(val)
    this.setState({ value_text: val ? val : null })
    // alert(this.state)
  }
  render() {
    const list = [{ name: 'Accounting', key: 'A', isDisabled: false, isShowLabel: false }, { name: 'Marketing', key: 'M', isDisabled: false, isShowLabel: true }, { name: 'Production', key: 'P', isDisabled: false, isShowLabel: true }, { name: 'Research', key: 'R', isDisabled: true, isShowLabel: true }];
    return (
      <div className="widget-demo jimu-widget m-2">
        <CoreMessage ref={this.myRef} />
        <Button label="Save" />
        {/* datetime  */}
        <CoreDatetime id='basic'  dateFormat="dd/mm/yy" selectionMode = "range" labelName = 'Datetime' showTime = {true} isRequired = {true}  hourFormat = '24' showIcon= {true} value={this.state.date}  onChange={this.handlerDateOnchange} ></CoreDatetime>
        {/* colorpicker format="hsb" || format="rgb"   */}
        <CoreColorPicker value={this.state.color} onChange={this.handlerColorOnchange} format="rgb"></CoreColorPicker>
        {/* giá trị của checkbox typeValue='string' || typeValue='boolean' */}
        <CoreCheckBox name='abcđ' typeValue='string' checked = {this.state.checked} onChange = {this.handlerOnchange} ></CoreCheckBox>
        <CoreButton isOnlyIcon={true} onClick={this.handlerClick} typeButton ='Secondary'  labelName='abc'></CoreButton>
        <CoreInput onChange={this.handlerChange} labelName = "Input Label" mode = "text" isLabelLeft = "true" showLabel = {false} isRequired = {true}></CoreInput>
        <CoreInput onChange={this.handlerChange} labelName = "Input Label" mode = "text" isLabelLeft = "true" showLabel = {false} isRequired = {true} value = {this.state.value_text}></CoreInput>
        <CoreInput onChange={this.handlerChange} labelName = "Input Number" mode = "number" showLabel = {true}></CoreInput>
        <CoreInput onChange={this.handlerChange} labelName = "Textarea" mode = "text-area" showLabel = {true}></CoreInput>
        <CoreSelect onChange={this.handlerChange} labelName = "Dropdown Label" dataSource = {[{code: 1, descr: 'A'}, {code: 2, descr: 'B'}]} value = {this.state.value_dropdown}></CoreSelect>
        <CoreButton onClick={this.handlerClick}></CoreButton>
        <CoreInput onChange={this.handlerChange} labelName="Input Label" mode="text" isLabelLeft="true" showLabel={false} isRequired={true} value={this.state.value_text}></CoreInput>
        <CoreInput onChange={this.handlerChange} labelName="Input Number" mode="number" showLabel={true}></CoreInput>
        <CoreInput onChange={this.handlerChange} labelName="Textarea" mode="text-area" showLabel={true}></CoreInput>
        <CoreRadioButton defaultValue = 'A' orientation = 'horizontal' onChange={this.handlerChange} listRadio={list}></CoreRadioButton>
        <CoreSelect isRequired={true} onChange={this.handlerChange} labelName="Dropdown Label" dataSource={[{ code: 1, descr: 'A' }, { code: 2, descr: 'B' }]} value={this.state.value_dropdown}></CoreSelect>
        <p>exampleConfigProperty: {this.props.config.exampleConfigProperty}</p>
      </div>
    )
  }
}
