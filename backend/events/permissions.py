from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    '''
    Custom permission to only allow owners of an event to edit it.
    '''

    def has_object_permission(self, request, view, obj):
        # If the request method is a safe method (GET, HEAD, OPTIONS), allow access
        if request.method in permissions.SAFE_METHODS:
            return True
        # Otherwise, the user must be the owner of the event
        return obj.user == request.user
