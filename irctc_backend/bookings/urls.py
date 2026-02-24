from django.urls import path
from .views import BookSeatView, ViewBookingsView

urlpatterns = [
    path('book/', BookSeatView.as_view()),
    path('history/', ViewBookingsView.as_view()),
    ]