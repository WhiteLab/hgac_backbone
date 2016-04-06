from django.shortcuts import render, get_object_or_404
from models import *
import json
import util
from django.http.response import HttpResponse

# Create your views here.


def index(request):
    return render(request, 'backbone/home.html')


def view_box(request):
    return render(request, 'backbone/box.html')


def receive_barcode(request):
    barcode_str = request.GET.get('barcode')
    barcode_opcode = barcode_str[:2]
    barcode_payload = barcode_str[2:]
    expected_opcode = request.GET.get('expected')
    if expected_opcode and expected_opcode != barcode_opcode:
        error = json.dumps({'status': 'error', 'message': 'Unexpected Barcode type'})
        return HttpResponse(error)
    return HttpResponse(json.dumps(util.map_barcode_opcode(barcode_opcode, barcode_payload)))


def check_in_sample(request):
    freezer_box_pk = request.GET.get('freezer_box_pk')
    sample_pk = request.GET.get('sample_pk')

    freezer_box = get_object_or_404(FreezerBox, pk=freezer_box_pk)
    sample = get_object_or_404(Sample, pk=sample_pk)
    sample.box_location = freezer_box
    try:
        sample.save()
        success = json.dumps({'status': 'success', 'message': 'Check-In successful'})
        return HttpResponse(success)
    except Exception as e:
        error = json.dumps({'status': 'error', 'message': e.message})
        return HttpResponse(error)
