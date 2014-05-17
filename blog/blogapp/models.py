from django.db import models

class Blog(models.Model):
    subject=models.CharField(max_length=100)
    blog_body=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
   
    def __unicode__(self):
        return self.subject

    def get_absolute_url(self):
        from django.core.urlresolvers import reverse
        return reverse('blogapp.views.blog_detail',args=[str(self.id)])

class Tag(models.Model):
    name=models.CharField(max_length=30)

    def __unicode__(self):
        return self.name
