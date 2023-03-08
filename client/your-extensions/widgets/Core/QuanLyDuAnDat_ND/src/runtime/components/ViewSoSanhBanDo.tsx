import * as Swipe from 'esri/widgets/Swipe';
import { AllWidgetProps, React } from 'jimu-core';
import { Dropdown } from 'primereact/dropdown';
import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import getLayerBDSSType from '../core-esri/get-layer-bdss';

function ViewSoSanhBanDo(prod, ref) {
    const [selectedBanDo1, setSelectedBanDo1] = useState<any>();
    const [selectedBanDo2, setSelectedBanDo2] = useState<any>();

    const [swipe, setSwipe] = useState(null);

    const { jimuMapView, dataMaps } = prod;


    const viewSoSanhBanDoRef = useRef()


    useImperativeHandle(ref, () => ({
        removeSwipe() {
            if (swipe) {
                swipe.destroy();
                setSwipe(null);
            }
        }
    }))

    const handleChangeBanDo1 = (e) => {
        setSelectedBanDo1(e.value);
    }

    const handleChangeBanDo2 = (e) => {
        setSelectedBanDo2(e.value);
    }

    useEffect(() => {
        if (jimuMapView) {
            if (selectedBanDo1 && selectedBanDo2) {
                addLayerBanDo();
            }
        }
    }, [
        selectedBanDo1,
        selectedBanDo2
    ])

    // Add layer bản đồ 
    const addLayerBanDo = () => {
        const arrBanDoQH1 = [];
        const arrBanDoHT1 = []

        const arrBanDoQH2 = [];
        const arrBanDoHT2 = []

        if (swipe) {
            swipe.destroy();
            setSwipe(null);
        }
        if (jimuMapView) jimuMapView.view.map.removeAll();

        // Bản đồ 1
        if (selectedBanDo1) {
            if (selectedBanDo1.code === "QH" || selectedBanDo1.code === "KH") {
                if (selectedBanDo1.cap === "TINH") {
                    const getLayQHSDD = getLayerBDSSType(selectedBanDo1.data, selectedBanDo1.code);
                    if (getLayQHSDD) {
                        arrBanDoQH1.push({
                            MaTinh: selectedBanDo1.data.MaTinh,
                            layers: getLayQHSDD,
                            cap: selectedBanDo1.cap,
                            loai: selectedBanDo1.code
                        });
                    }
                }

                if (selectedBanDo1.cap === "HUYEN") {
                    selectedBanDo1.data.forEach(bando => {
                        const getLayQHSDD = getLayerBDSSType(bando, bando.LoaiBd);
                        if (getLayQHSDD) {
                            arrBanDoQH1.push({
                                MaHuyen: bando.MaHuyen,
                                layers: getLayQHSDD,
                                cap: selectedBanDo1.cap,
                                loai: selectedBanDo1.code
                            });
                        }
                    })
                }
            }

            if (selectedBanDo1.code === "HT") {
                if (selectedBanDo1.cap === "TINH") {
                    const getLayHTSDD = getLayerBDSSType(selectedBanDo1.data, selectedBanDo1.code);
                    console.log(getLayHTSDD);
                    if (getLayHTSDD) {
                        arrBanDoHT1.push({
                            MaTinh: selectedBanDo1.data.MaTinh,
                            layers: getLayHTSDD,
                            cap: selectedBanDo1.cap,
                            loai: selectedBanDo1.code
                        });
                    }
                }

                if (selectedBanDo1.cap === "HUYEN") {
                    selectedBanDo1.data.forEach(bando => {
                        const getLayHTSDD = getLayerBDSSType(bando, bando.LoaiBd);
                        if (getLayHTSDD) {
                            arrBanDoHT1.push({
                                MaHuyen: bando.MaHuyen,
                                layers: getLayHTSDD,
                                cap: selectedBanDo1.cap,
                                loai: selectedBanDo1.code
                            });
                        }
                    })
                }
            }
        }


        // Bản đồ 2
        if (selectedBanDo2) {
            if (selectedBanDo2.code === "QH" || selectedBanDo2.code === "KH") {
                if (selectedBanDo2.cap === "TINH") {
                    const getLayQHSDD = getLayerBDSSType(selectedBanDo2.data, selectedBanDo2.code);
                    console.log(getLayQHSDD);
                    if (getLayQHSDD) {
                        arrBanDoQH2.push({
                            MaTinh: selectedBanDo2.data.MaTinh,
                            layers: getLayQHSDD,
                            cap: selectedBanDo2.cap,
                            loai: selectedBanDo2.code
                        });
                    }
                }

                if (selectedBanDo2.cap === "HUYEN") {
                    selectedBanDo2.data.forEach(bando => {
                        const getLayQHSDD = getLayerBDSSType(bando, bando.LoaiBd);
                        if (getLayQHSDD) {
                            arrBanDoQH2.push({
                                MaHuyen: bando.MaHuyen,
                                layers: getLayQHSDD,
                                cap: selectedBanDo2.cap,
                                loai: selectedBanDo2.code
                            });
                        }
                    })
                }
            }

            if (selectedBanDo2.code === "HT") {
                if (selectedBanDo2.cap === "TINH") {
                    const getLayHTSDD = getLayerBDSSType(selectedBanDo2.data, selectedBanDo2.code);
                    console.log(getLayHTSDD);
                    if (getLayHTSDD) {
                        arrBanDoHT2.push({
                            MaTinh: selectedBanDo2.data.MaTinh,
                            layers: getLayHTSDD,
                            cap: selectedBanDo2.cap,
                            loai: selectedBanDo2.code
                        });
                    }
                }

                if (selectedBanDo2.cap === "HUYEN") {
                    selectedBanDo2.data.forEach(bando => {
                        const getLayHTSDD = getLayerBDSSType(bando, bando.LoaiBd);
                        if (getLayHTSDD) {
                            arrBanDoHT2.push({
                                MaHuyen: bando.MaHuyen,
                                layers: getLayHTSDD,
                                cap: selectedBanDo2.cap,
                                loai: selectedBanDo2.code
                            });
                        }
                    })
                }
            }
        }


        console.log('arrBanDoHT1', arrBanDoHT1);
        console.log('arrBanDoQH1', arrBanDoQH1);

        console.log('arrBanDoHT2', arrBanDoHT2);
        console.log('arrBanDoQH2', arrBanDoQH2);

        let _leadingLayers = [];
        let _trailingLayers = [];
        let arrLayersQH = [];
        let arrLayersHT = [];
        if (arrBanDoHT1) {
            arrBanDoHT1.forEach(bando => {
                _leadingLayers.push(bando.layers);
                arrLayersHT.push(bando.layers)
            })
        }

        if (arrBanDoHT2) {
            arrBanDoHT2.forEach(bando => {
                _trailingLayers.push(bando.layers)
                arrLayersHT.push(bando.layers)
            })
        }
        if (arrBanDoQH1) {
            arrBanDoQH1.forEach(bando => {
                _leadingLayers.push(bando.layers);
                arrLayersQH.push(bando.layers)
            })
        }
        if (arrBanDoQH2) {
            arrBanDoQH2.forEach(bando => {
                _trailingLayers.push(bando.layers)
                arrLayersQH.push(bando.layers)
            })
        }

        jimuMapView.view.map.addMany([...arrLayersHT, ...arrLayersQH]);

        // // tạo một tiện ích Swipe mới
        setSwipe(new Swipe({
            leadingLayers: _leadingLayers,
            trailingLayers: _trailingLayers,
            position: 35, // đặt vị trí của widget thành 35%
            view: jimuMapView.view,
            direction: "horizontal", //vertical" -- Nằm ngang >< "horizontal" -- Nằm dọc
        }));
    }

    useEffect(() => {
        if (jimuMapView) {
            if (swipe) {
                jimuMapView.view.ui.add(swipe);
            }
        }
    }, [swipe])

    return (
        <div className='block-1' ref={viewSoSanhBanDoRef}>
            <div className='contentBlock'>
                <div className="card">
                    <div className="p-fluid grid formgrid">
                        <div className="field col-12 md:col-12">
                            <label className='txt-lable-dropdown'>Bản đồ 1</label>
                            <Dropdown value={selectedBanDo1} options={dataMaps} onChange={handleChangeBanDo1} optionLabel="name" placeholder='Chọn bản đồ so sánh 1' />
                        </div>

                        <div className="field col-12 md:col-12">
                            <label className='txt-lable-dropdown'>Bản đồ 2</label>
                            <Dropdown value={selectedBanDo2} options={dataMaps} onChange={handleChangeBanDo2} optionLabel="name" placeholder='Chọn bản đồ so sánh 2' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(ViewSoSanhBanDo)