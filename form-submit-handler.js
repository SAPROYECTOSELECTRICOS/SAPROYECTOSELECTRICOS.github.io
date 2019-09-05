( funci�n () {
  // obtener todos los datos en forma y devolver el objeto
  funci�n  getFormData ( formulario ) {
    elementos var =  forma . elementos ;
    var honeypot;

    campos var =  objeto . claves (elementos). filtro ( funci�n ( k ) {
      if (elementos [k]. nombre  ===  " honeypot " ) {
        honeypot = elementos [k]. valor ;
        devuelve  falso ;
      }
      volver  verdadero ;
    }). mapa ( funci�n ( k ) {
      if (elementos [k]. nombre  ! ==  indefinido ) {
        elementos de retorno [k]. nombre ;
      // caso especial para la colecci�n html de Edge
      } else  if (elementos [k]. longitud  >  0 ) {
        elementos de retorno [k]. art�culo ( 0 ). nombre ;
      }
    }). filter ( function ( item , pos , self ) {
      volver a  s� mismo . indexOf (item) == pos && item;
    });

    var formData = {};
    campos . forEach ( function ( name ) {
      var elemento = elementos [nombre];
      
      // los elementos de forma singular solo tienen un valor
      formData [nombre] =  elemento . valor ;

      // cuando nuestro elemento tiene varios elementos, obtenga sus valores
      if ( elemento . longitud ) {
        datos var = [];
        para ( var i =  0 ; i <  elemento . longitud ; i ++ ) {
          var item =  elemento . �tem (i);
          if ( elemento . verificado  ||  elemento . seleccionado ) {
            los datos . empuje ( �tem . valor );
          }
        }
        formData [nombre] =  datos . unirse ( ' , ' );
      }
    });

    // agrega valores espec�ficos del formulario a los datos
    formData . formDataNameOrder  =  JSON . stringify (campos);
    formData . formGoogleSheetName  =  formulario . conjunto de datos . hoja  ||  " respuestas " ; // nombre de hoja predeterminado
    formData . formGoogleSend
      =  forma . conjunto de datos . correo electr�nico  ||  " " ; // no hay correo electr�nico por defecto

    return {data : formData, honeypot : honeypot};
  }

  function  handleFormSubmit ( event ) {   // maneja el env�o del formulario sin jquery
    evento . preventDefault ();           // enviamos a trav�s de xhr a continuaci�n
    var forma =  evento . objetivo ;
    var formData =  getFormData (formulario);
    var data =  formData . datos ;

    // Si se llena un campo honeypot, suponga que lo hizo un bot de spam.
    if ( formData . honeypot ) {
      devuelve  falso ;
    }

    disableAllButtons (formulario);
    var url =  forma . la acci�n ;
    var xhr =  new  XMLHttpRequest ();
    xhr . abierto ( ' POST ' , url);
    // xhr.withCredentials = true;
    xhr . setRequestHeader ( " Content-Type " , " application / x-www-form-urlencoded " );
    xhr . onreadystatechange  =  function () {
        if ( xhr . readyState  ===  4  &&  xhr . status  ===  200 ) {
          formulario . restablecer ();
          var formElements =  formulario . querySelector ( " .form-elements " )
          if (formElements) {
            formElements . estilo . display  =  " none " ; // ocultar formulario
          }
          var thankYouMessage =  formulario . querySelector ( " .thankyou_message " );
          if (thankYouMessage) {
            gracias . estilo . display  =  " bloque " ;
          }
        }
    };
    // url codifica datos de formulario para enviar como datos de publicaci�n
    var codificado =  Objeto . claves (datos). mapa ( funci�n ( k ) {
        return  encodeURIComponent (k) +  " = "  +  encodeURIComponent (datos [k]);
    }). unirse ( ' & ' );
    xhr . enviar (codificado);
  }
  
  funci�n  cargada () {
    // enlaza al evento de env�o de nuestro formulario
    var formas =  documento . querySelectorAll ( " form.gform " );
    for ( var i =  0 ; i <  formas . longitud ; i ++ ) {
      formas [i]. addEventListener ( " submit " , handleFormSubmit, false );
    }
  };
  documento . addEventListener ( " DOMContentLoaded " , cargado, falso );

  funci�n  disableAllButtons ( formulario ) {
    botones var =  forma . querySelectorAll ( " bot�n " );
    para ( var i =  0 ; i <  botones . longitud ; i ++ ) {
      botones [i]. deshabilitado  =  verdadero ;
    }
  }
}) ();