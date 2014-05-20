from django.shortcuts import render_to_response,redirect ,get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from .forms import RegisterrationForm,LoginForm

def create_user(request):
    ci=RequestContext(request)
    form=RegisterrationForm(request.POST or None)
    if request.method=="POST":
        if form.is_valid():
            username=form.cleaned_data['username']
            password=form.cleaned_data['password1']
            email=form.cleaned_data['email']
            
            user=User.objects.create_user(username=username,password=password,email=email)
            return HttpResponseRedirect('/user/login/')

                
        else:
            return render_to_response('create_user.html',{'form':form},ci)
        pass
    else:
        return render_to_response('create_user.html',{'form':form},ci)
    

from django.contrib.auth import authenticate, login, logout

def login_user(request):
    form = LoginForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
	    username = form.cleaned_data['username']
	    password = form.cleaned_data['password']
	    user = authenticate(username=username, password=password)
	    if user:
	        login(request, user)
		username = request.user.username
		user = request.user
		return HttpResponseRedirect('/blogs/blogs/')
	    else:
	        msg = 'username or password is not valid'
		return render_to_response('login.html',{'form':form,'msg':msg},context_instance=RequestContext(request))
	else:
	    return render_to_response('login.html',{'form':form}, context_instance=RequestContext(request))
    else:
        return render_to_response('login.html',{'form':form}, context_instance=RequestContext(request))
