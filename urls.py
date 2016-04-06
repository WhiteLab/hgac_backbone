from django.conf.urls import url
import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^boxes/$', views.view_box),
    url(r'^receive-barcode/$', views.receive_barcode),

    url(r'^check-in-sample/$', views.check_in_sample)
]