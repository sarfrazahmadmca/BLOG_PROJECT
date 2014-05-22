from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:

    url(r'^create/$','profileapp.views.create_user',name='create_user'),
    url(r'^login/$','profileapp.views.login_user',name='login_user'),
    url(r'^logout/$','profileapp.views.logout_user',name='logout_user'),
    url(r'^change_password/$','profileapp.views.change_password',name='change_password'),
   # url(r'^blog/(\d+)/$','blogapp.views.blog_detail',name='particular_blog'),
   # url(r'^create_tag/$','blogapp.views.create_tag',name='create_tag'),
   
    # url(r'^$', 'blog.views.home', name='home'),
    # url(r'^blog/', include('blog.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
