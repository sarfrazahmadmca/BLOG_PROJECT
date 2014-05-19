from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext

from .models import Blog,Tag
from .forms import CreateBlog,CreateTag

def create_blog(request):
    ci=RequestContext(request)
    if request.method=='POST':
        form=CreateBlog(request.POST)
        if form.is_valid():
            subject=form.cleaned_data['subject']
            body=form.cleaned_data['body']
            blog=Blog.objects.create(subject=subject,blog_body=body)
            return render_to_response('create_blog.html',{'form':CreateBlog(),'message':'blog has been created','blog':blog},ci)
        else:
            return render_to_response('create_blog.html',{'form':form},ci)
    return render_to_response('create_blog.html',{'form':CreateBlog()},ci)


def blogs(request):
    blogs=Blog.objects.all()
    i=0
    for blog in blogs:
        i=i+1
        blog.index=i
    return render_to_response('blogs.html',{'blogs':blogs})

def blog_detail(request,id):
    blog=Blog.objects.get(id=id)
    return render_to_response('blog_detail.html',{'blog':blog})

def create_tag(request):
    ci=RequestContext(request)
    if request.method=='POST':
        form=CreateTag(request.POST)
        if form.is_valid():
            name=form.cleaned_data['tag_name']
            tag=Tag.objects.create(name=name)
            return HttpResponseRedirect('/')
        else:
            return render_to_response('create_tag.html',{'form':form},ci)
    else:
        return render_to_response('create_tag.html',{'form':CreateTag()},ci)
    return render_to_response('base.html')
