from django import forms

from django.contrib.auth.forms import UserCreationForm

class RegisterrationForm(UserCreationForm):
    email=forms.EmailField()
    




class LoginForm(forms.Form):
    username = forms.CharField(max_length=50)
    password = forms.CharField(max_length=80, widget=forms.PasswordInput())

class ChangePasswordForm(forms.Form):
    old_password=forms.CharField(max_length=30, widget=forms.PasswordInput())
    new_password=forms.CharField(max_length=30, widget=forms.PasswordInput())
    confirm_password=forms.CharField(max_length=30, widget=forms.PasswordInput())

