angular.module('ghr.contactos', []) // Creamos este modulo para la entidad contactos
  .component('ghrContactos', { // Componente que contiene la url que indica su html
    templateUrl: '../bower_components/component-contactos/contactos.html',
    // El controlador de ghrContactos
    controller() {
      const vm = this;

      /**
       * Al iniciar
       * @return {[type]} [description]
       */
    }

  })
  .component('ghrContactosList', {
    templateUrl: '../bower_components/component-contactos/contactos-list.html',
    controller() {
      const vm = this;

      /**
       * Al iniciar
       * @return {[type]} [description]
       */
      function generarTecnologias() {
        const vm = this;
        vm.arrayTecnologias = crearTecnologias();
        vm.totalItems = vm.arrayTecnologias.length;
        vm.currentPage = 1;

        vm.setPage = function (pageNo) {
          vm.currentPage = pageNo;
        };

        vm.maxSize = 10;
        // INTENTO DE BOTON
        // vm.items = [
        //   'opcion 1',
        //   'opcion 2',
        //   'opcion 3'
        // ],
        // vm.status ={
        //   isopen = false;
        // },
        // vm.toggleDropdown = function($event) {
        //   vm.preventDefault();
        //   vm.stopPropagation();
        //   vm.status.isopen = !$vm.status.isopen;
        // }
        // FIN DE BOTÓN
      }

      var nombres = ['java', 'javaScript', 'CSS', 'HTML',
        'Angular', 'XML', 'C++', 'PHP', 'Pascal', 'Ajax', 'Assembly',
        'Scheme', 'Arduino', 'Python', 'Forth', 'Swift', 'Cuda', 'Delphi',
        '.NET', 'Cobol', 'Visual Basic', 'WebDNA', 'Groovy', 'Smalltalk',
        'Active Server Page', 'Scratch', 'Objective-C', 'TCL'
      ];
      var descripciones = ['descripcion1', 'descripcion2', 'descripcion3',
        'descripcion4', 'descripcion5', 'descripcion6', 'descripcion7', 'descripcion8', 'descripcion9'
      ];

      function crearTecnologias() {
        var arrayTecnologias = [];
        for (var i = 1; i < 200; i++) {
          arrayTecnologias.push(crearTecnologia(i));
        }
        return arrayTecnologias;
      }

      function crearTecnologia(i) {
        tecnologia = {
          id: i,
          nombre: obtenerValor(nombres),
          descripcion: obtenerValor(descripciones)
        };
        return tecnologia;
      }

      function aleatorio(rango) {
        return Math.floor(Math.random() * rango);
      }

      function obtenerValor(array) {
        return array[aleatorio(array.length)];
      }
    }
  })

  .run($log => {
    $log.log('Ejecutando Componente Contactos');
  });
