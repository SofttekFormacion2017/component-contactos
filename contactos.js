angular.module('ghr.contactos', []) // Creamos este modulo para la entidad contactos
  .component('ghrContactos', { // Componente que contiene la url que indica su html
    templateUrl: '../bower_components/component-contactos/contactos.html',
    // El controlador de ghrContactos
    controller: formularioContactoController

  })
  .constant('tecBaseUrl', 'http://localhost:3003/api/')
  .constant('tecEntidad', 'contactos')
  .factory('contactoFactory', function crearContactos($http, tecBaseUrl, tecEntidad) {
    var serviceUrl = tecBaseUrl + tecEntidad;
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
      /**
       * [read description]
       * @method read
       * @param  {number} id id contacto
       * @return {tecno}    [description]
       */

      read: function read(id) {
        return $http({
          method: 'GET',
          url: serviceUrl + '/' + id
        }).then(function onSuccess(response) {
          return response.data;
        });
        return angular.copy(_getReferenceById(id));
      },

      // UTILIZAR PATCH

      update: function update(contacto) {
        console.log(contacto);
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
      // delete: function _delete(contacto) {
      //   if (!contacto.id) {
      //     throw 'el objeto carece de id y no se borra' + JSON.stringify(contacto);
      //   }
      //   oldTecno = _getReferenceById(contacto.id);
      //   if (oldTecno) {
      //     var indice = arrayContactos.indexOf(oldTecno);
      //     if (indice > -1) {
      //       arrayContactos.splice(indice, 1);
      //     } else {
      //       throw 'el objeto carece de id y no se borra' + JSON.stringify(contacto);
      //     }
      //   }
      // }

    };
    // creacion de un objeto contacto
    function crearContacto(i) {
      contacto = {
        id: i,
        nombre: obtenerValor(nombres),
        descripcion: obtenerValor(descripciones)
      };
      return contacto;
    }
    // numero aleatorio para seleccionar un nombre y una descripcion de sus arrays.
    function aleatorio(rango) {
      return Math.floor(Math.random() * rango);
    }

    function obtenerValor(array) {
      return array[aleatorio(array.length)];
    }
  })
  .component('ghrContactosList', {
    templateUrl: '../bower_components/component-contactos/contactos-list.html',
    controller: generarContactos
  })
  .run($log => {
    $log.log('Ejecutando Componente Contactos');
  });

function formularioContactoController($stateParams, contactoFactory, $state) {
  const vm = this; // Imprime por pantalla $stateParams
  vm.update = function (user) {
    //   var x = (tecnologiasFactory.getAll().length)+1;
    //   console.log('ultimo objeto:' + tecnologia.id+'=' + = (tecnologiasFactory.getAll().length)+1;);
    //   console.log('longitudad del array:'+ tecnologiasFactory.getAll().length);
    if ($stateParams.id == 0) {
      console.log('creando nuevo contacto');
      delete $stateParams.id;
      contactosFactory.create(vm.contacto).then(function (contacto) {
        $state.go($state.current, {
          id: contacto.id
        });
      });
    }
    if (vm.form.$dirty === true) {
      contactosFactory.update(vm.contacto).then(function (contacto) {});
      console.log('actualizando contacto');
    }
  };

  vm.reset = function (form) {
    vm.contacto = angular.copy(vm.original);
  };
  if ($stateParams.id != 0) {
    vm.original = contactosFactory.read($stateParams.id).then(
      function (contacto) {
        vm.contacto = contacto;
      }
    );
  }

  // vm.reset();
  //
  // if ($stateParams != 0) {
  //   tecnologiasFactory.read($stateParams.id).then(
  //     function (tecnologia) {
  //       vm.original = vm.tecnologia = tecnologia;
  //     });
  // }
}

function generarContactos(contactoFactory, $uibModal, $log, $document) {
  const vm = this;
  contactoFactory.getAll().then(function onSuccess(response) {
    vm.arrayContactos = response;
    vm.contacto = vm.arrayContactos;
  });

  vm.currentPage = 1;
  vm.setPage = function (pageNo) {
    vm.currentPage = pageNo;
  };

  vm.maxSize = 10; // Elementos mostrados por página
  vm.open = function (id, nombre) {
    var modalInstance = $uibModal.open({
      component: 'eliminarContactoModal',
      resolve: {
        seleccionado: function () {
          return id;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log('selectedItem -->' + selectedItem);
      vm.arrayContactos = contactoFactory.getAll();
      contactoFactory.delete(selectedItem).then(function () {
        contactoFactory.getAll().then(function (contacto) {
          vm.arrayContactos = contacto;
        });
      });
    });
  };
}
