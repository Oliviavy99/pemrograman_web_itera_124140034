
def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # GET semua data matakuliah
    config.add_route(
        'matakuliah_list',
        '/api/matakuliah',
        request_method='GET'
    )

    # POST tambah matakuliah
    config.add_route(
        'matakuliah_create',
        '/api/matakuliah',
        request_method='POST'
    )

    # GET detail matakuliah
    config.add_route(
        'matakuliah_detail',
        '/api/matakuliah/{id}',
        request_method='GET'
    )

    # PUT ubah matakuliah
    config.add_route(
        'matakuliah_update',
        '/api/matakuliah/{id}',
        request_method='PUT'
    )

    # DELETE hapus matakuliah
    config.add_route(
        'matakuliah_delete',
        '/api/matakuliah/{id}',
        request_method='DELETE'
    )
