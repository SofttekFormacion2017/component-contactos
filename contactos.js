angular.module('ghr.contactos', []) // Creamos este modulo para la entidad contactos
    .component('ghrContactos', { // Componente que contiene la url que indica su html
        templateUrl: '../bower_components/component-contactos/contactos.html',
        // El controlador de ghrContactos
        controller($stateParams, contactosFactory, $state) {
            const vm = this;

            vm.mode = $stateParams.mode;

            contactosFactory.getAll().then(function onSuccess(response) {
                vm.arrayContactos = response.filter(function(contacto) {
                    return contacto.idCandidato == $stateParams.id;
                });
            });

            vm.update = function(user) {
                if ($stateParams.id == 0) {
                    delete $stateParams.id;
                    contactosFactory.create(vm.contacto).then(function(contacto) {
                        $state.go($state.current, {
                            id: contacto.id
                        });
                    });
                }
                if (vm.form.$dirty === true) {
                    contactosFactory.update(vm.contacto).then(function(contacto) {});
                }
            };

            vm.reset = function(form) {
                vm.contacto = angular.copy(vm.original);
            };
            if ($stateParams.id != 0) {
                vm.original = contactosFactory.read($stateParams.id).then(
                    function(contacto) {
                        vm.contacto = contacto;
                    }
                );
            }

            vm.desplegar = function() {
                vm.opcionesDesplegable = [{
                        tipo: 'Teléfono',
                        icon: 'phone'
                    },
                    {
                        tipo: 'Correo',
                        icon: 'envelope'
                    },
                    {
                        tipo: 'Facebook',
                        icon: 'facebook'
                    },
                    {
                        tipo: 'LinkedIn',
                        icon: 'linkedin'
                    },
                    {
                        tipo: 'Twitter',
                        icon: 'twitter'
                    }
                ];
                vm.selectTipo = vm.opcionesDesplegable[0];
            };
            vm.desplegar();

            vm.mostrarIconoContacto = function(tipo) {
                if (tipo == 'Teléfono') return 'phone';
                else if (tipo == 'Correo') return 'envelope';
                else if (tipo == 'Facebook') return 'facebook';
                else if (tipo == 'LinkedIn') return 'linkedin';
                else if (tipo == 'Twitter') return 'twitter';
            }
        }
    })
    .constant('contBaseUrl', 'http://localhost:3003/api/')
    .constant('contEntidad', 'contactos')
    .factory('contactosFactory', function crearContactos($http, contBaseUrl, contEntidad) {
        var serviceUrl = contBaseUrl + contEntidad;
        return {
            // sistema CRUD de contacto
            getAll: function getAll() {
                return $http({
                    method: 'GET',
                    url: serviceUrl
                }).then(function onSuccess(response) {
                        return response.data;
                    },
                    function onFailirure(reason) {

                    });
            },
            create: function create(contacto) {
                return $http({
                    method: 'POST',
                    url: serviceUrl,
                    data: contacto
                }).then(function onSuccess(response) {
                        return response.data;
                    },
                    function onFailirure(reason) {

                    });
            },
            read: function read(id) {
                return $http({
                    method: 'GET',
                    url: serviceUrl + '/' + id
                }).then(function onSuccess(response) {
                    return response.data;
                });
                return angular.copy(_getReferenceById(id));
            },
            update: function update(contacto) {
                return $http({
                    method: 'PATCH',
                    url: serviceUrl + '/' + contacto.id,
                    data: contacto
                }).then(function onSuccess(response) {
                    return response.data;
                });
            },
            delete: function _delete(selectedItem) {
                return $http({
                    method: 'DELETE',
                    url: serviceUrl + '/' + selectedItem
                });
            }
        };
    })
    .component('ghrContactosList', {
        templateUrl: '../bower_components/component-contactos/contactos-list.html',
        controller(contactosFactory, $uibModal, $log, $document) {
            const vm = this;

            contactosFactory.getAll().then(function onSuccess(response) {
                vm.arrayContactos = response;
                vm.contacto = vm.arrayContactos;
            });

            vm.currentPage = 1;
            vm.setPage = function(pageNo) {
                vm.currentPage = pageNo;
            };

            vm.maxSize = 10; // Elementos mostrados por página
            vm.open = function(id, nombre) {
                var modalInstance = $uibModal.open({
                    component: 'eliminarContactoModal',
                    resolve: {
                        seleccionado: function() {
                            return id;
                        }
                    }
                });

                modalInstance.result.then(function(selectedItem) {
                    vm.arrayContactos = contactosFactory.getAll();
                    contactosFactory.delete(selectedItem).then(function() {
                        contactosFactory.getAll().then(function(contacto) {
                            vm.arrayContactos = contacto;
                        });
                    });
                });
            };
        }
    })
    .run($log => {
        $log.log('Ejecutando Componente Contactos');
    });
