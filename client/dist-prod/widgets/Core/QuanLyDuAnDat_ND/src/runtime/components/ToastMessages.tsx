import { AllWidgetProps, React } from 'jimu-core';
import { Toast } from 'primereact/toast';

const {useRef, forwardRef, useImperativeHandle} = React;

interface ObjectMesaages {
    type: string,
    content: string
}

function ToastMessages(prod, ref) {
    const toastMessages: React.MutableRefObject<any> = useRef()
    const arrMessages = [
        {
            severity: "success",
            summary: "Thành công"
        },
        {
            severity: "info",
            summary: "Thông tin"
        },
        {
            severity: "warn",
            summary: "Cảnh báo"
        },
        {
            severity: "error",
            summary: "Lỗi"
        }
    ]
   
    useImperativeHandle(ref, () => ({
        getMessages ({type, content}) {
          const {severity, summary} = arrMessages.filter(f => f.severity === type)[0];
            toastMessages.current.show(
                {
                    severity: severity,
                    summary: summary,
                    detail: content, 
                    life: 3000
                }
            );
        }
    }))

    return (
        <Toast ref={toastMessages} position="top-right" />
    )
}

export default forwardRef(ToastMessages)