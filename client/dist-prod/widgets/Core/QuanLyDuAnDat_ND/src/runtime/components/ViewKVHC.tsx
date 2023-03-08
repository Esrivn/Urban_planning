import { AllWidgetProps, React } from 'jimu-core';
import { Checkbox } from 'primereact/checkbox';
const { useState, forwardRef, useImperativeHandle, useRef } = React;

const ViewKVHC = (prod, ref) => {
    let KVHCRef = useRef<any>()
    // Lựa chọn danh sách khu vực hành chính
    const [selectedKVHC, setSelectedKVHC] = useState([]);
    // Trạng thái chọn bật tắt các KVHC
    const [checkedAllKVHC, setCheckedAllKVHC] = useState(true);
    // Load Quy trạng thái quy hoạch mỗi lần thay đổi
    const [loadedQH, setLoadedQH] = useState(true);

    useImperativeHandle(ref, () => ({
        handleAllKVHCChecked(e)  {
            let checkedall = e.checked ? true : false;
            selectedKVHC.forEach(kvhc => (kvhc.isChecked = e.target.checked));
            setSelectedKVHC(selectedKVHC);
            setLoadedQH(!loadedQH);
            setCheckedAllKVHC(checkedall);
        },
        onCategoryKVHCChange(e){
            let isCountChecked = 0;
            selectedKVHC.forEach(kvhc => {
                if (kvhc.key === e.target.value.key)
                    kvhc.isChecked = e.target.checked;
                if (kvhc.isChecked) isCountChecked++;
            });
            let checkedall = isCountChecked > 0 ? true : false;
            setSelectedKVHC(selectedKVHC);
            setLoadedQH(!loadedQH);
            setCheckedAllKVHC(checkedall);
        }
    }))

    return (
        (<div ref={KVHCRef} className='block-1'>
            <div className='contentBlock'>
                <div className="field-checkbox">
                    <Checkbox inputId="allKVHC" onChange={KVHCRef.current.handleAllKVHCChecked} value="allKVHC" checked={checkedAllKVHC} />
                    <label htmlFor="allKVHC">TỈNH HẢI DƯƠNG</label>
                </div>
                <div className='listCheckboxKVHC'>
                    {
                        selectedKVHC.map((kvhc) => {
                            return (
                                <div key={kvhc.key} className="field-checkbox">
                                    <Checkbox inputId={kvhc.key} name="kvhc" value={kvhc} onChange={KVHCRef.current.onCategoryKVHCChange} checked={kvhc.isChecked} />
                                    <label htmlFor={kvhc.key}>{kvhc.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>)
    )
}

export default forwardRef(ViewKVHC)