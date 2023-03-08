const getBanDoProperty = (data) => {
    let result = null;
    result = {
        OBJECTID: data.OBJECTID,
        Cap: data.Cap,
        DuongDanLayer: data.DuongDanLayer,
        LoaiBd: data.LoaiBd,
        LoaiLayer: data.LoaiLayer,
        MaTinh: data.MaTinh,
        MaHuyen: data.MaHuyen,
        MaXa: data.MaXa,
        Nam: data.Nam,
        ServiceQuery: data.ServiceQuery,
        SoQuyetDinh: data.SoQuyetDinh,
        opacity: 1,
        visible: true
    }
    return result;
}

export default getBanDoProperty