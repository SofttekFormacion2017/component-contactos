angular.module('ghr.contactos') // Creamos este modulo para la entidad contactos
  .component('ghrContactos', { // Componente que contiene la url que indica su html

    // El controlador de ghrContactos tiene las funciones de reset y de copiar a un objeto "master"
    controller() {
      const vm = this;

      /**
       * Al iniciar
       * @return {[type]} [description]
       */
    }

  })

  .run($log => {
    $log.log('Ejecutando Componente Contactos');
  });
