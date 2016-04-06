from models import *
from django.core.serializers import serialize
import json


def get_box(payload):
    box_pk = payload
    box = FreezerBox.objects.get(pk=box_pk)
    return {
        'pk': box.pk,
        'name': box.name,
        'description': box.description
    }

def get_sample_info(payload):
    sample_pk = payload
    sample = Sample.objects.get(pk=sample_pk)
    return {
        'pk': sample.pk,
        'name': sample.bid,
        'location': sample.box_location.name if sample.box_location else 'None'
    }


def map_barcode_opcode(opcode, payload):
    opcode_map = {
        '01': get_box,
        '02': get_sample_info
    }
    try:
        return opcode_map[opcode](payload)
    except Exception as e:
        return {
            'status': 'error',
            'message': e.message
        }