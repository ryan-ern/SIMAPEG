def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('index', '/')
    config.add_route('welcome', '/welcome')
    config.add_route('login', '/login')
    config.add_route('logout', '/logout')
    config.add_route('auth-info', '/auth-info')
    config.add_route('edit-profile', '/edit-profile')
    config.add_route('get-avatar', '/avatars/{username}/{path}')
    config.add_route('get-jabatan', '/jabatan', request_method='GET')
    config.add_route('add-jabatan', '/jabatan', request_method='POST')
    config.add_route('edit-jabatan', '/jabatan/{id}', request_method='PATCH')
    config.add_route('delete-jabatan',
                     '/jabatan/{id}', request_method='DELETE')
