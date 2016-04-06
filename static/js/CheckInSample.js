/**
 * Created by dfitzgerald on 2/24/16.
 */

$.fn.CheckInSample = function() {
    this.empty();
    var FREEZER_BOX_OPCODE = '01';
    var SAMPLE_OPCODE = '02';
    var receiveBarcodeUrl = '/backbone/receive-barcode/';
    var checkInSampleUrl = '/backbone/check-in-sample/';
    var freezer_box_pk, sample_pk;

    var $boxInfo = $('<div>').attr({
        id: 'check-in-box-info',
        class: 'check-in-sample'
    }).on('BarcodeListener:listening', function(){
        $(this).text('Scan freezer box now...').css('display', 'block');
    }).appendTo(this);
    var $sampleInfo = $('<div>').attr({
        id: 'check-in-sample-info',
        class: 'check-in-sample'
    }).on('BarcodeListener:listening', function(){
        $(this).text('Scan sample now...').css('display', 'block');
    }).appendTo(this);
    var $response = $('<div>').attr({
        id: 'check-in-response',
        class: 'check-in-sample'
    }).appendTo(this);

    var boxInfoQuery = '#' + $boxInfo.attr('id');
    new BarcodeListener(boxInfoQuery, boxInfoQuery).listen();
    $boxInfo.on('BarcodeListener:received', function(e, data){
        $boxInfo.off();
        $.getJSON(receiveBarcodeUrl, {
            barcode: data.capture,
            expected: '01'
        }, function(fields){
            if(fields.status !== undefined && fields.status == 'error'){
                $boxInfo.html('Barcode is not a Freezer Box');
                return;
            }
            $boxInfo.html(fields.name + '<br><br>' + fields.description);
            freezer_box_pk = fields.pk;

            var sampleInfoQuery = '#' + $sampleInfo.attr('id');
            new BarcodeListener(sampleInfoQuery, sampleInfoQuery).listen();
            $sampleInfo.on('BarcodeListener:received', function(e, data){
                $sampleInfo.off();
                $.getJSON(receiveBarcodeUrl, {
                    barcode: data.capture,
                    expected: '02'
                }, function(fields){
                    if(fields.status !== undefined && fields.status == 'error'){
                        $sampleInfo.html('Barcode is not a Sample');
                        return;
                    }
                    $sampleInfo.html(fields.name + '<br>In box: ' + fields.location);
                    sample_pk = fields.pk;

                    $.getJSON(checkInSampleUrl, {
                        freezer_box_pk: freezer_box_pk,
                        sample_pk: sample_pk
                    }, function(response){
                        $response.css('display', 'block')
                            .html(response.status + '<br><br>' + response.message);
                    });
                });
            });
        });
    });
};