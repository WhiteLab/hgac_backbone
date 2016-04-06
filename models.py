from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Building(models.Model):
    name = models.CharField('Building Name', max_length=128, unique=True)
    institution = models.CharField('Building Institution', max_length=128)

    def __unicode__(self):
        return self.name


class Freezer(models.Model):
    name = models.CharField('Freezer Name', max_length=128)
    temperature = models.SmallIntegerField('Freezer Temperature')
    building = models.ForeignKey('Building')

    def __unicode__(self):
        return self.name


class Sample(models.Model):
    class SampleStatus:
        (PREPARED,
         IN_FREEZER,
         IN_QC1,
         PASS_QC1,
         LIBRARY_GENERATION,
         IN_QC2,
         PASS_QC2,
         CAPTURE_PROTOCOL,
         IN_QC3,
         PASS_QC3,
         STAGED_FOR_SEQUENCING,
         SEQUENCING,
         DEMULTIPLEXING,
         SEQUENCING_COMPLETE,
         RELEASED) = range(15)
    bid = models.CharField(max_length=12)
    box_location = models.ForeignKey('FreezerBox', null=True, blank=True)
    # status = models.SmallIntegerField()

    def __unicode__(self):
        return self.bid


class FreezerBox(models.Model):
    name = models.CharField('Freezer Box Name', max_length=128)
    description = models.TextField('Freezer Box Description')
    freezer = models.ForeignKey('Freezer')

    class Meta:
        verbose_name_plural = 'Freezer Boxes'

    def __unicode__(self):
        return self.name
