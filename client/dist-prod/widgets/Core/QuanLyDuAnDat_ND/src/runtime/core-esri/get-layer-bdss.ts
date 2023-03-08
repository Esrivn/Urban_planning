import * as FeatureLayer from "esri/layers/FeatureLayer"
import * as VectorTileLayer from "esri/layers/VectorTileLayer"

  const getLayerBDSSType = (arrBD, typeBD) => {
    let urlLayerType = null;
    if (arrBD) {
      if (arrBD.LoaiBd === typeBD) {
        if (arrBD.DuongDanLayer.includes("FeatureServer")) {
          urlLayerType = (new FeatureLayer({
              url: arrBD.DuongDanLayer,
              opacity: 1,
              visible: true
            }))
        }
        if (arrBD.DuongDanLayer.includes("FeatureServer") === false) {
          urlLayerType = (new VectorTileLayer({
              url: arrBD.DuongDanLayer,
              opacity: 1,
              visible: true,
            }))
        }
      }
    }
    return urlLayerType;
  }

  export default getLayerBDSSType