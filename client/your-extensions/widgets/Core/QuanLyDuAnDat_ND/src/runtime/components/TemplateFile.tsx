import { AllWidgetProps, React } from 'jimu-core';

const TemPlateFile = (data) => {
    const attr = data.attributes;
    return (
        <div className="product-item">
            <img src={attr.DuongDan} onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={attr.TenTepTin} />
            <div className="product-detail">
                <div className="product-name">{attr.TenTepTin}</div>
                <div className="product-description">{attr.MoTa}</div>
                <i className="pi pi-tag product-category-icon"></i><span className="product-category">{attr.LoaiTepTin}</span>
            </div>
            <div className="product-action">
                <a href={attr.DuongDan} target="Tải xuống"><i className='pi pi-arrow-down'></i></a>
            </div>
        </div>
    );
}

export default TemPlateFile