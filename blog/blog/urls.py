from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:

    url(r'^create/$','blogapp.views.create_blog',name='create_blog'),
    url(r'^$','blogapp.views.blogs',name='all_blogs'),
    url(r'^blog/(\d+)/$','blogapp.views.blog_detail',name='particular_blog'),
    url(r'^create_tag/$','blogapp.views.create_tag',name='create_tag'),
   
    # url(r'^$', 'blog.views.home', name='home'),
    # url(r'^blog/', include('blog.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
