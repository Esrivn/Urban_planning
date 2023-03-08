import { React } from 'jimu-core'
import { ProgressSpinner } from 'primereact/progressspinner';
const { useState, useRef, forwardRef, useImperativeHandle } = React


function Loadding(prod, ref) {
    const [showLoading, setShowLoading] = useState(false)
    let loadingRef = useRef()
    useImperativeHandle(ref, () => ({
        showLoading() {
            setShowLoading(true)
        },
        hideLoading() {
            setShowLoading(false)
        }
    }))

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            background: '#2196f34d',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999999999
        }} ref={loadingRef} hidden={!showLoading} >
            <ProgressSpinner style={{ width: 50, height: 50 }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
    )
}

export default forwardRef(Loadding)