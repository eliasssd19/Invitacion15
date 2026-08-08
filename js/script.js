/* ==========================================================================
   INVITACIÓN DIGITAL · MIS XV · Tema "La Princesa y el Sapo"
   Lógica de interacción — script.js
   ========================================================================== */
const videoBaile = document.getElementById("videoBaile");
const contenedorParticulas = document.getElementById("contenedorParticulas");


document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------------
     0. CONFIGURACIÓN GENERAL
     Edita estos valores para ajustar el proyecto a tus datos reales.
     ------------------------------------------------------------------------ */
  const CONFIGURACION = {
    // Fecha y hora exacta del evento (usada por el contador regresivo).
    // Formato: 'AAAA-MM-DDTHH:MM:SS'
    fechaEvento: '2026-08-22T20:00:00',

    // Número de WhatsApp de contacto para la confirmación (código de país + número, sin "+" ni espacios).
    numeroWhatsapp: '51999999999',

    // Mensaje predefinido que se enviará al confirmar asistencia.
    mensajeWhatsapp: 'CONFIRMO MI ASISTENCIA',

    // Texto que se escribe con efecto de máquina de escribir en la Parte 1.
    nombreManuscrito: 'Milenka',

    // Velocidad del efecto de escritura (milisegundos por letra).
    velocidadEscritura: 140
  };

  /* ------------------------------------------------------------------------
     1. REFERENCIAS A ELEMENTOS DEL DOM
     ------------------------------------------------------------------------ */
  const parte1 = document.getElementById('parte1');
  const parte2 = document.getElementById('parte2');
  const parte3 = document.getElementById('parte3');

  const escenaTitulo = document.getElementById('escenaTitulo');
  const contenedorCorona = document.getElementById('contenedorCorona');
  const tituloMis15 = document.getElementById('tituloMis15');
  const nombreManuscrito = document.getElementById('nombreManuscrito');
  const textoManuscrito = document.getElementById('textoManuscrito');
  const cursorEscritura = document.getElementById('cursorEscritura');
  const contenedorSobre = document.getElementById('contenedorSobre');

  const videoBaile = document.getElementById('videoBaile');
  const contenedorParticulas = document.getElementById('contenedorParticulas');

  const audioFondo = document.getElementById('audioFondo');
  const enlaceWhatsapp = document.getElementById('enlaceWhatsapp');

  let transicionEnCurso = false; // evita que la transición se dispare dos veces

  /* ------------------------------------------------------------------------
     2. SECUENCIA DE INTRODUCCIÓN (PARTE 1)
     Orden: corona aparece -> corona y textos suben -> título "MIS 15"
     -> nombre manuscrito se escribe -> aparece el sobre.
     ------------------------------------------------------------------------ */
  function iniciarSecuenciaIntroduccion() {
    // 1) La corona aparece con su animación de escala + brillo.
    setTimeout(function () {
      contenedorCorona.classList.add('mostrar');
    }, 300);

    // 2) La corona y el bloque de texto suben suavemente, dando continuidad.
    setTimeout(function () {
      escenaTitulo.classList.add('subir');
    }, 1400);

    // 3) Aparece el título "MIS 15".
    setTimeout(function () {
      tituloMis15.classList.add('mostrar');
    }, 1900);

    // 4) El nombre manuscrito se revela con efecto de escritura.
    setTimeout(function () {
      nombreManuscrito.classList.add('mostrar');
      escribirNombreManuscrito();
    }, 2600);

    // 5) Aparece el sobre flotante con la flecha indicadora.
    const tiempoEscritura = CONFIGURACION.nombreManuscrito.length * CONFIGURACION.velocidadEscritura;
    setTimeout(function () {
      contenedorSobre.classList.remove('oculto');
      requestAnimationFrame(function () {
        contenedorSobre.classList.add('visible');
      });
    }, 2600 + tiempoEscritura + 400);
  }

  // Efecto de "máquina de escribir" para el nombre manuscrito.
  function escribirNombreManuscrito() {
    const texto = CONFIGURACION.nombreManuscrito;
    let indice = 0;

    const intervalo = setInterval(function () {
      textoManuscrito.textContent = texto.substring(0, indice + 1);
      indice++;
      if (indice >= texto.length) {
        clearInterval(intervalo);
        // El cursor deja de parpadear una vez terminada la escritura.
        setTimeout(function () {
          cursorEscritura.style.display = 'none';
        }, 900);
      }
    }, CONFIGURACION.velocidadEscritura);
  }

  /* ------------------------------------------------------------------------
     3. INTERACCIÓN CON EL SOBRE -> INICIA LA TRANSICIÓN A LA PARTE 2
     ------------------------------------------------------------------------ */
  function manejarAperturaSobre() {
    if (transicionEnCurso) return;
    transicionEnCurso = true;

    // Fundido de salida de la Parte 1.
    parte1.style.opacity = '0';

    setTimeout(function () {
      parte1.classList.add('oculto');
      iniciarParte2();
    }, 900);
  }

  contenedorSobre.addEventListener('click', manejarAperturaSobre);
  contenedorSobre.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      manejarAperturaSobre();
    }
  });

  /* ------------------------------------------------------------------------
     4. PARTE 2 · BAILE Y TRANSFORMACIÓN EN PARTÍCULAS
     ------------------------------------------------------------------------ */
  function iniciarParte2() {
    parte2.classList.remove('oculto');
    requestAnimationFrame(function () {
      parte2.classList.add('visible');
    });

    // Intenta reproducir la música de fondo (requiere interacción del usuario, ya cumplida con el click).
    if (audioFondo) {
      audioFondo.play().catch(function () {
        // Si el navegador bloquea la reproducción automática, se ignora silenciosamente.
      });
    }

    // Reproduce la animación del baile.
    let yaAvanzo = false;
    function avanzarAParticulas() {
      if (yaAvanzo) return;
      yaAvanzo = true;
      lanzarParticulas();
      
      
    }
    
    let magiaIniciada = false;
//nuevo
videoBaile.addEventListener("timeupdate", function () {

    if (magiaIniciada) return;

    if (videoBaile.currentTime >= videoBaile.duration * 0.95) {

        magiaIniciada = true;

        lanzarParticulas();

    }

});

    if (videoBaile) {
        
      crearLuciernagas();
      videoBaile.play().catch(function () {
        // Si el video no puede reproducirse automáticamente, se avanza igual tras un tiempo prudente.
      });
      
      
      
      // Salvaguarda: si el video no dispara "ended" (por ejemplo, aún no se cargó el archivo real),
      // se avanza igualmente después de 6 segundos para no dejar al usuario esperando.
      setTimeout(avanzarAParticulas, 6000);
    } else {
      setTimeout(avanzarAParticulas, 4000);
    }
  }

  // Genera partículas doradas que emergen del centro y se dispersipan,
  // simbolizando que la magia del baile se transforma en la invitación.
  function lanzarParticulas() {
    if (videoBaile) {
        
     
     
     videoBaile.style.transition =
    "opacity 4s ease, filter 4s ease";

videoBaile.style.opacity = ".75";

videoBaile.style.filter =
    "saturate(.90) brightness(1.03)";
    }

    const totalParticulas =20;
    const centroX = window.innerWidth / 2;
    const centroY = window.innerHeight / 2;

    

let creadas = 0;

const intervalo = setInterval(function () {

    for(let i=0;i<4;i++){

        if(creadas>=totalParticulas){

            clearInterval(intervalo);
            return;

        }

        creadas++;

        const particula=document.createElement("span");

        particula.className="particula";

        const angulo=Math.random()*Math.PI*2;

        const distancia=120+Math.random()*220;

        const dx=Math.cos(angulo)*distancia;

        const dy=Math.sin(angulo)*distancia;

        particula.style.left=centroX+"px";
        particula.style.top=centroY+"px";

        particula.style.setProperty("--dx",dx+"px");
        particula.style.setProperty("--dy",dy+"px");

        contenedorParticulas.appendChild(particula);

        setTimeout(function(){

            particula.remove();

        },4500);

    }

},70);



    // Tras la dispersión de partículas, se revela la invitación (Parte 3).
    setTimeout(function () {
      parte2.style.transition="opacity 2.5s";

      

      parte2.style.opacity='0';
      
      setTimeout(function () {
        parte2.classList.add('oculto');
        mostrarParte3(); 
      }, 700);
    }, 600);
  }


const contenedorLuciernagas =
document.getElementById("contenedorLuciernagas");

function crearLuciernagas(){

    if(!contenedorLuciernagas) return;

    for(let i=0;i<12;i++){

        const l=document.createElement("span");

        l.className="luciernaga";

        l.style.left=(5+Math.random()*90)+"%";

        l.style.top=(5+Math.random()*90)+"%";

        l.style.animationDuration=

            (8+Math.random()*6)+"s,"+

            (2+Math.random()*2)+"s";

        l.style.animationDelay=

            (Math.random()*4)+"s";

        contenedorLuciernagas.appendChild(l);

    }

}

function iniciarLuciernagas(){

    const intervalo = setInterval(function(){

        crearLuciernaga();

    },450);

    setTimeout(function(){

        clearInterval(intervalo);

    },12000);

}

  /* ------------------------------------------------------------------------
     5. PARTE 3 · INVITACIÓN CON SCROLL
     ------------------------------------------------------------------------ */
  function mostrarParte3() {
    parte3.classList.remove('oculto');
    parte3.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'auto';

    activarRevelacionEnScroll();
    iniciarContadorRegresivo();
    configurarEnlaceWhatsapp();
  }

  // Revela cada sección con una animación suave a medida que entra en pantalla.
  function activarRevelacionEnScroll() {
    const secciones = document.querySelectorAll('#parte3 .seccion');

    if (!('IntersectionObserver' in window)) {
      // Alternativa simple si el navegador no soporta IntersectionObserver.
      secciones.forEach(function (seccion) {
        seccion.classList.add('seccion-visible');
      });
      return;
    }

    const observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('seccion-visible');
        }
      });
    }, { threshold: 0.3 });

    secciones.forEach(function (seccion) {
      observador.observe(seccion);
    });
  }

  /* ------------------------------------------------------------------------
     6. CONTADOR REGRESIVO
     ------------------------------------------------------------------------ */
  function iniciarContadorRegresivo() {
    const elementoDias = document.getElementById('contDias');
    const elementoHoras = document.getElementById('contHoras');
    const elementoMinutos = document.getElementById('contMinutos');
    const fechaObjetivo = new Date(CONFIGURACION.fechaEvento).getTime();

    function actualizarContador() {
      const ahora = new Date().getTime();
      const diferencia = fechaObjetivo - ahora;

      if (diferencia <= 0) {
        elementoDias.textContent = '00';
        elementoHoras.textContent = '00';
        elementoMinutos.textContent = '00';
        return;
      }

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

      elementoDias.textContent = agregarCero(dias);
      elementoHoras.textContent = agregarCero(horas);
      elementoMinutos.textContent = agregarCero(minutos);
    }

    function agregarCero(numero) {
      return numero < 10 ? '0' + numero : String(numero);
    }

    actualizarContador();
    setInterval(actualizarContador, 1000 * 30); // se actualiza cada 30 segundos, suficiente para minutos.
  }

  /* ------------------------------------------------------------------------
     7. ENLACE DE CONFIRMACIÓN POR WHATSAPP
     ------------------------------------------------------------------------ */
  function configurarEnlaceWhatsapp() {
    const mensaje = encodeURIComponent(CONFIGURACION.mensajeWhatsapp);
    enlaceWhatsapp.href = 'https://wa.me/' + CONFIGURACION.numeroWhatsapp + '?text=' + mensaje;
  }

  /* ------------------------------------------------------------------------
     INICIO
     ------------------------------------------------------------------------ */
  iniciarSecuenciaIntroduccion();
});
