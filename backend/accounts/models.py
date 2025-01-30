from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        '''
        Create and return a regular user with an email and password.
        '''
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        '''
        Create and return a superuser with an email, username, and password.
        '''
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)

    def get_by_natural_key(self, email):
        '''
        Retrieve a user by email (USERNAME_FIELD).
        '''
        return self.get(email=email)


class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    @classmethod
    def get_by_natural_key(cls, email):
        return cls.objects.get(email=email)

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        '''
        Does the user have a specific permission?
        '''
        return self.is_superuser

    def has_module_perms(self, app_label):
        '''
        Does the user have permissions to view the app `app_label`?
        '''
        return self.is_superuser
