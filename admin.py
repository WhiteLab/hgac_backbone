from django.contrib import admin
from models import *


class SampleAdmin(admin.ModelAdmin):
    list_display = ('pk', 'bid', 'box_location')

# Register your models here.
admin.site.register(Sample, SampleAdmin)
admin.site.register(FreezerBox)
admin.site.register(Freezer)
admin.site.register(Building)
