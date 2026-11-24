
import json

from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError

from .. import models



def json_response(data, status=200):
    return Response(
        json.dumps(data),
        status=status,
        content_type='application/json; charset=UTF-8'
    )



@view_config(route_name='matakuliah_list', renderer='json')
def get_all(request):
    data = request.dbsession.query(models.Matakuliah).all()
    return [item.to_dict() for item in data]


@view_config(route_name='matakuliah_detail', renderer='json')
def get_by_id(request):
    item = request.dbsession.get(
        models.Matakuliah, int(request.matchdict['id'])
    )

    if item is None:
        return json_response({'message': 'Matakuliah tidak ditemukan'}, 404)

    return item.to_dict()


@view_config(route_name='matakuliah_create', renderer='json')
def create(request):
    data = request.json_body

    required = ['kode_mk', 'nama_mk', 'sks', 'semester']

    if any(field not in data or data[field] in (None, '') for field in required):
        return json_response({'message': 'Semua field wajib diisi'}, 400)

    try:
        sks = int(data['sks'])
        semester = int(data['semester'])
    except (ValueError, TypeError):
        return json_response({'message': 'SKS dan semester harus berupa angka'}, 400)

    if sks <= 0 or semester <= 0:
        return json_response({'message': 'SKS dan semester harus lebih dari 0'}, 400)

    item = models.Matakuliah(
        kode_mk=data['kode_mk'],
        nama_mk=data['nama_mk'],
        sks=sks,
        semester=semester
    )

    request.dbsession.add(item)

    try:
        request.dbsession.flush()
    except IntegrityError:
        return json_response({'message': 'Kode mata kuliah sudah digunakan'}, 400)

    return item.to_dict()


@view_config(route_name='matakuliah_update', renderer='json')
def update(request):
    item = request.dbsession.get(
        models.Matakuliah, int(request.matchdict['id'])
    )

    if item is None:
        return json_response({'message': 'Matakuliah tidak ditemukan'}, 404)

    data = request.json_body

    try:
        sks = int(data.get('sks', item.sks))
        semester = int(data.get('semester', item.semester))
    except (ValueError, TypeError):
        return json_response({'message': 'SKS dan semester harus berupa angka'}, 400)

    if sks <= 0 or semester <= 0:
        return json_response({'message': 'SKS dan semester harus lebih dari 0'}, 400)

    item.kode_mk = data.get('kode_mk', item.kode_mk)
    item.nama_mk = data.get('nama_mk', item.nama_mk)
    item.sks = sks
    item.semester = semester

    try:
        request.dbsession.flush()
    except IntegrityError:
        return json_response({'message': 'Kode mata kuliah sudah digunakan'}, 400)

    return item.to_dict()


@view_config(route_name='matakuliah_delete', renderer='json')
def delete(request):
    item = request.dbsession.get(
        models.Matakuliah, int(request.matchdict['id'])
    )

    if item is None:
        return json_response({'message': 'Matakuliah tidak ditemukan'}, 404)

    request.dbsession.delete(item)

    return {'message': 'Matakuliah berhasil dihapus'}
