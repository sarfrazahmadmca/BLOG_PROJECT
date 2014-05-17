from django import forms

class CreateBlog(forms.Form):
    subject=forms.CharField(max_length=100)
    body=forms.CharField(widget=forms.Textarea())



class CreateTag(forms.Form):
    tag_name=forms.CharField(max_length=30)
