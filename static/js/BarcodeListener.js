/**
 * Created by dfitzgerald on 2/24/16.
 */

//var BarcodeListener = function(attach, listeningAttach) {
//    this.attach = attach === undefined ? window : attach;
//    this.listeningAttach = listeningAttach === undefined ? window : listeningAttach;
//    this.charBuffer = '';
//};
//
//BarcodeListener.prototype.listen = function(){
//    var barcodeListener = this;
//    var ENTER = 13;
//    $(barcodeListener.listeningAttach).trigger('BarcodeListener:listening');
//    $(window).keypress(function(e){
//        var keyCode = e.which;
//        var key = String.fromCharCode(keyCode);
//        if (keyCode == ENTER){
//            $(window).off('keypress');
//            $(barcodeListener.attach).trigger('BarcodeListener:received', {
//                capture: barcodeListener.charBuffer
//            });
//            $(barcodeListener.listeningAttach).trigger('BarcodeListener:finished');
//        }else{
//            barcodeListener.charBuffer += key;
//        }
//    });
//};




//function listenForBarcode(e){
//    var barcodeListener = e.target;
//    var ENTER = 13;
//    var keyCode = e.which;
//    var key = String.fromCharCode(keyCode);
//    if(keyCode == ENTER){
//        barcodeListener.barcodeBuffer.push(barcodeListener.charBuffer);
//        barcodeListener.charBuffer = '';
//        barcodeListener.listenFor -= 1;
//        if(barcodeListener.listenFor == 0){
//            window.removeEventListener('keypress', listenForBarcode);
//        }
//    }else{
//        barcodeListener.charBuffer += key;
//    }
//    console.log('Key pressed: ' + e.which);
//}

var BarcodeListener = function(numScans) {
    this.listenFor = numScans || 1;
    this.barcodeBuffer = [];
    this.charBuffer = '';
};

BarcodeListener.prototype.listen = function() {
    var barcodeListener = this;
    var ENTER = 13;

    var dfd = $.Deferred();

    $(window).keypress(function(e){
        var keyCode = e.which;
        var key = String.fromCharCode(keyCode);

        if(keyCode == ENTER){
            barcodeListener.barcodeBuffer.push(barcodeListener.charBuffer);
            barcodeListener.charBuffer = '';
            barcodeListener.listenFor -= 1;
            if(barcodeListener.listenFor == 0){
                $(window).off('keypress');
                dfd.resolve();
            }
        }else{
            barcodeListener.charBuffer += key;
        }
    });

    return dfd;
};

BarcodeListener.prototype.dump = function() {
    return this.barcodeBuffer;
};





//threeBarcodesListener = BarcodeListener(3);
//threeBarcodesListener.listen();
//listOfBarcodes = threeBarcodesListener.dump();
//threeBarcodesListener.stop();
//listOfBarcodes = [one, two, three];
//
//
//threeBarcodes = BarcodeListener(1);
//threeBarcodes = [one, two, three];
