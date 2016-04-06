/**
 * Created by dfitzgerald on 2/24/16.
 */
$(document).ready(function() {
    $('#scan-get-info').click(function () {
        $(this).blur();
        $('#scan-sink').on('BarcodeListener:received', function (e, data) {
            var sink = $(this).off();
            $.get('/backbone/receive-barcode/', {
                barcode: data.capture
            }, function (data) {
                var fields = data[0].fields;
                sink.text(data);
            });
        });
        new BarcodeListener('#scan-sink', '#scan-status').listen();
    });

    $('#scan-check-in-sample').click(function () {
        $(this).blur();
        $('#scan-sink').CheckInSample();
    });
});