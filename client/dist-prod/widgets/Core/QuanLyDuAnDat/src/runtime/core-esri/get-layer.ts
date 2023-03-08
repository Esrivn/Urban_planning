import * as FeatureLayer from "esri/layers/FeatureLayer"
import * as VectorTileLayer from "esri/layers/VectorTileLayer"

  const getLayerType = (arrBD, typeBD, visible, opacity) => {
    let urlLayerType = null;
    const _visible = visible;
    const _opacity = 1 - opacity / 100;
    if (arrBD) {
      if (arrBD.LoaiBd === typeBD) {
        if (arrBD.DuongDanLayer.includes("FeatureServer")) {
          urlLayerType = (new FeatureLayer({
              url: arrBD.DuongDanLayer,
              opacity: _opacity,
              visible: _visible
            }))
        }
        if (arrBD.DuongDanLayer.includes("FeatureServer") === false) {
          urlLayerType = (new VectorTileLayer({
              url: arrBD.DuongDanLayer,
              opacity: _opacity,
              visible: _visible,
            }))
        }
      }
    }
    return urlLayerType;
  }

  export default getLayerType