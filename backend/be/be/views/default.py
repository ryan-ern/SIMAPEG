from pyramid.view import view_config
from pyramid.response import Response, FileResponse
from pyramid.request import Request
import os
from sqlalchemy.exc import SQLAlchemyError
import jwt
import datetime

from .. import models


@view_config(route_name='welcome', renderer='be:templates/mytemplate.jinja2')
def my_view(request):
    try:
        query = request.dbsession.query(models.MyModel)
        one = query.filter(models.MyModel.name == 'one').one()

    except SQLAlchemyError:
        return Response(db_err_msg, content_type='text/plain', status=500)
    return {'one': one, 'project': 'SIMAPEG '}


@view_config(route_name='index', renderer='json',  request_method="GET")
def index(request):
    return {
        'message': 'Server SIMAPEG Running!',
        'versi': '0.0.1'
    }


def auth_jwt_verify(request):
    authentication_header = request.cookies.get('token')
    if not authentication_header:
        authentication_header = request.headers.get('Authorization')
        if authentication_header and authentication_header.startswith('Bearer '):
            authentication_header = authentication_header.split(' ')[1]

    if authentication_header:
        try:
            decoded_user = jwt.decode(
                authentication_header, 'secret', algorithms=['HS256'])
            user_id = decoded_user.get('sub')

            if user_id:
                token = request.dbsession.query(models.Token).filter_by(
                    user_id=user_id, jwt_token=authentication_header).first()
                if token:
                    return decoded_user
        except jwt.ExpiredSignatureError:
            request.response.status = 401
    return None


def create_tokens(user_id):
    payload = {
        'sub': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }
    jwt_token = jwt.encode(payload, 'secret', algorithm='HS256')

    return jwt_token


@view_config(route_name='login', renderer='json',  request_method="POST")
def login(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        return {
            'message': 'error',
            'description': 'Already logged in'
        }

    username = request.POST['username']
    password = request.POST['password']

    try:
        user = request.dbsession.query(models.User).filter_by(
            username=username, password=password).first()
    except SQLAlchemyError:
        return Response(db_err_msg, content_type='text/plain', status=500)

    if user:
        jwt_token = create_tokens(user.id)

        try:
            new_token = models.Token(user_id=user.id, jwt_token=jwt_token)
            request.dbsession.add(new_token)
            request.dbsession.flush()

            request.response.set_cookie(
                'token', jwt_token, max_age=1800, httponly=True)

            return {
                'message': 'ok',
                'token': jwt_token,
                'description': 'login success!'
            }
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)
    else:
        request.response.status = 401
        return {
            'message': 'error',
            'description': 'Username atau Password salah!'
        }


@view_config(route_name='logout', renderer='json', request_method="DELETE")
def logout(request):
    auth_user = auth_jwt_verify(request)
    authentication_header = request.cookies.get('token')
    if not authentication_header:
        authentication_header = request.headers.get('Authorization')
    if auth_user:
        try:
            token = request.dbsession.query(models.Token).filter_by(
                jwt_token=authentication_header).first()
            request.dbsession.delete(token)
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)

        request.response.headers['Clear-Token'] = 'true'
        request.response.delete_cookie('token')
        return {
            'message': 'ok',
            'description': 'Successfully logged out'
        }
    request.response.status = 400
    return {
        'message': 'error',
        'description': 'Token not found'
    }


@view_config(route_name='auth-info', renderer='json', request_method='GET')
def get_auth_info(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        try:
            user = request.dbsession.query(models.User).filter_by(
                id=auth_user['sub']).first()
            position_name = request.dbsession.query(models.Position).filter_by(
                id=user.jabatan_id).first().name
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)

        avatar_path = user.avatar
        avatar_link = request.route_url(
            'get-avatar', username=user.username, path=avatar_path)
        avatar_link = avatar_link.replace("%5C", "/")
        return {
            'message': 'profil berhasil di perbaharui',
            'username': user.username,
            'name': user.name,
            'role': user.role,
            'avatar': avatar_link,
            'jatah_cuti': user.jatah_cuti,
            'nik': user.nik,
            'nohp': user.nohp,
            'jk_pegawai': user.jk_pegawai,
            'tgl_lahir': user.tgl_lahir.strftime('%Y-%m-%d'),
            'status': user.status,
            'jabatan':  position_name,
            'password':  user.password,
            'isLogin': True
        }
    else:
        request.response.status = 401
        return {
            'message': 'error',
            'description': 'User is not authenticated',
            'isLogin': False
        }


@view_config(route_name='edit-profile', renderer='json', request_method='POST')
def edit_profile(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        try:
            user = request.dbsession.query(models.User).filter_by(
                id=auth_user['sub']).first()
            current_avatar_path = os.path.join('assets', user.avatar)
            if os.path.exists(current_avatar_path) and user.avatar != 'default.png':
                os.remove(current_avatar_path)

            avatar = request.POST['avatar']
            user.name = request.POST['name']
            user.nohp = request.POST['nohp']
            user.status = request.POST['status']

            _, picture_extension = os.path.splitext(avatar.filename)

            timestamp = str(int(datetime.datetime.now().timestamp()))
            new_avatar_filename = f'{user.name}_{timestamp}{picture_extension}'
            picture_path = os.path.join('assets', new_avatar_filename)
            try:
                with open(picture_path, 'wb') as picture_file:
                    chunk_size = 4096
                    while chunk := avatar.file.read(chunk_size):
                        picture_file.write(chunk)
            except Exception as e:
                print("Exception:", e)

            user.avatar = new_avatar_filename
            user.nik = request.POST['nik']
            user.jk_pegawai = request.POST['jk_pegawai']
            user.tgl_lahir = request.POST['tgl_lahir']
            user.password = request.POST['password']
            user.jabatan = request.POST['jabatan']
            user.jatah_cuti = request.POST['jatah_cuti']

            request.dbsession.flush()
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)

        return {
            'message': 'Sukses Edit Profil',
        }
    else:
        request.response.status = 401
        return {
            'message': 'error',
            'description': 'User is not authenticated',
            'isLogin': False
        }


@view_config(route_name='get-avatar', renderer='json', request_method='GET')
def get_avatar(request):
    auth_user = auth_jwt_verify(request)
    if auth_user:
        try:
            user = request.dbsession.query(models.User).filter_by(
                id=auth_user['sub']).first()
            avatar_path = os.path.join('assets', user.avatar)

            if os.path.exists(avatar_path):
                return FileResponse(avatar_path, request=request)
            else:
                default_avatar_path = os.path.join(
                    'assets', 'default.png')
                return FileResponse(default_avatar_path, request=request)
        except SQLAlchemyError:
            return Response(db_err_msg, content_type='text/plain', status=500)
    else:
        request.response.status = 401
        return {
            'message': 'error',
            'description': 'User is not authenticated',
            'isLogin': False
        }


db_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for descriptions and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""
