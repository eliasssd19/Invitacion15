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
    numeroWhatsapp: '51946948867',

    // Mensaje predefinido que se enviará al confirmar asistencia.
    mensajeWhatsapp: 'Hola, Confirmo mi asistencia a los XV de Anyi Milenka. \u{1F49A} \u{2728}',

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

    // Mostrar inmediatamente la Parte 3
    parte3.classList.remove('oculto');

    parte3.setAttribute(
        'aria-hidden',
        'false'
    );

    document.body.style.overflow =
    'hidden';


    // Mostrar inmediatamente la bienvenida
    const bienvenida =
        document.getElementById(
            'seccionBienvenida'
        );

    if (bienvenida) {

        bienvenida.classList.add(
            'seccion-visible'
        );

    }


    // Funciones que ya tenías
    

    configurarEnlaceWhatsapp();
    iniciarScrollNarrativo();

}

  // Revela cada sección con una animación suave a medida que entra en pantalla.
  function activarRevelacionEnScroll() {

    const secciones =
        document.querySelectorAll(
            '#parte3 .seccion'
        );


    if (!('IntersectionObserver' in window)) {

        secciones.forEach(function(seccion) {

            seccion.classList.add(
                'seccion-visible'
            );

        });

        return;
    }


    const observador =
        new IntersectionObserver(
            function(entradas) {

                entradas.forEach(
                    function(entrada) {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target
                                .classList.add(
                                    'seccion-visible'
                                );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    secciones.forEach(
        function(seccion) {

            /*
             * La bienvenida ya se muestra
             * inmediatamente después del baile.
             */

            if (
                seccion.id ===
                'seccionBienvenida'
            ) {

                seccion.classList.add(
                    'seccion-visible'
                );

                return;

            }

            observador.observe(
                seccion
            );

        }
    );

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
/* ============================================================
   PRIMER SCROLL · PAPEL FECHA
   ============================================================ */
function iniciarScrollNarrativo() {
document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const escena =
        document.getElementById(
            'escenaNarrativa'
        );
    const bienvenida =
        document.getElementById(
            'seccionBienvenida'
        );

    const papel =
        document.getElementById(
            'papelFecha'
        );

    const papelHora =
        document.getElementById(
            'papelHora'
        );

    const direccionFinal =
        document.getElementById(
            'direccionFinal'
        );


    if (
        !escena ||
        !bienvenida ||
        !papel ||
        !papelHora ||
        !direccionFinal
    ) {

        return;

    }


    /* ========================================================
       ESTADO DE LA ANIMACIÓN
       ======================================================== */

    let paso = 0;
const padrinos =
    document.getElementById(
        'seccionPadrinos'
    );
    
    let animando = false;

    let inicioY = 0;

    let inicioX = 0;


    /*
     * Cantidad mínima de movimiento
     * necesario para considerar que
     * el usuario hizo scroll.
     */

    const sensibilidad = 45;


    /* ========================================================
       ANIMAR
       ======================================================== */

    function irAlPaso(nuevoPaso) {

        if (animando) {
            return;
        }


        /*
         * Evitamos salir de:

         * 0 = bienvenida
         * 1 = fecha
         * 2 = hora
         * 3 = dirección
         */

        nuevoPaso =
            Math.max(
                0,
                Math.min(
                    3,
                    nuevoPaso
                )
            );


        if (
    nuevoPaso === paso
) {

    return;

}


const pasoInicial =
    paso;


pasoAnteriorValor =
    pasoInicial;


paso =
    nuevoPaso;


animando =
    true;


        /* ====================================================
           DURACIÓN
           ==================================================== */

        const duracion =
            850;


        /* ====================================================
           PROGRESO
           ==================================================== */

        const inicioPaso =
    pasoInicial;


        const diferencia =
            paso -
            inicioPaso;


        const tiempoInicio =
            performance.now();


        function animar(tiempo) {

            const transcurrido =
                tiempo -
                tiempoInicio;


            let progreso =
                transcurrido /
                duracion;


            progreso =
                Math.min(
                    1,
                    progreso
                );


            /*
             * Suavizado elegante.
             */

            const suave =
                1 -
                Math.pow(
                    1 - progreso,
                    3
                );


            actualizarVisual(
                inicioPaso +
                (
                    diferencia *
                    suave
                )
            );


            if (
                progreso < 1
            ) {

                requestAnimationFrame(
                    animar
                );

            } else {

                actualizarVisual(
                    paso
                );


                animando =
                    false;

            }

        }


        requestAnimationFrame(
            animar
        );

    }


    /*
     * Guarda el paso anterior.
     */

    let pasoAnteriorValor = 0;


    function pasoAnterior() {

        return pasoAnteriorValor;

    }


    /* ========================================================
       ACTUALIZACIÓN VISUAL
       ======================================================== */

    function actualizarVisual(progreso) {


        /* ====================================================
           BIENVENIDA
           ==================================================== */

        let opacidadBienvenida;


        if (
            progreso <= 1
        ) {

            opacidadBienvenida =
                1 -
                (
                    progreso *
                    0.25
                );

        } else {

            opacidadBienvenida =
                0.75 -
                (
                    (progreso - 1) *
                    0.45
                );

        }


        bienvenida.style.opacity =
            Math.max(
                0.22,
                opacidadBienvenida
            );


        /* ====================================================
           FECHA
           ==================================================== */

        const fecha =
            Math.max(
                0,
                Math.min(
                    1,
                    progreso
                )
            );


        const posicionFecha =
            -120 +
            (
                fecha *
                120
            ) -8;


        papel.style.left =
            posicionFecha +
            '%';


        papel.style.opacity =
            Math.min(
                1,
                fecha * 3
            );


        /* ====================================================
           HORA
           ==================================================== */

        const hora =
            Math.max(
                0,
                Math.min(
                    1,
                    progreso - 1
                )
            );


        const posicionHora =
            -120 +
            (
                hora *
                110
            );


        papelHora.style.right =
            posicionHora +
            '%';


        papelHora.style.opacity =
            Math.min(
                1,
                hora * 3
            );


        /* ====================================================
           DIRECCIÓN
           ==================================================== */

        const direccion =
            Math.max(
                0,
                Math.min(
                    1,
                    progreso - 2
                )
            );


        const posicionDireccion =
            100 -
            (
                direccion *
                100
            );


        direccionFinal.style.transform =
    'translateX(17%) translateY(' +
    posicionDireccion +
    '%) rotate(-7deg)';


        direccionFinal.style.opacity =
            Math.min(
                1,
                direccion * 3
            );

    }


    /* ========================================================
       TOUCHSTART
       ======================================================== */

    escena.addEventListener(
    'touchstart',
    function(evento) {

        const toque =
            evento.touches[0];

        inicioY =
            toque.clientY;

        inicioX =
            toque.clientX;

    },
    {
        passive: false
    }
);

/* ========================================================
   TOUCHMOVE · BLOQUEAR SCROLL NATIVO
   ======================================================== */

escena.addEventListener(
    'touchmove',
    function(evento) {

        evento.preventDefault();

    },
    {
        passive: false
    }
);
    /* ========================================================
       TOUCHEND
       ======================================================== */

    escena.addEventListener(
        'touchend',
        function(evento) {

            const toque =
                evento.changedTouches[0];


            const finalY =
                toque.clientY;


            const finalX =
                toque.clientX;


            const movimientoY =
                inicioY -
                finalY;


            const movimientoX =
                inicioX -
                finalX;


            /*
             * Solo nos interesa un gesto
             * predominantemente vertical.
             */

            if (
                Math.abs(movimientoY) <
                sensibilidad
            ) {

                return;

            }


            if (
                Math.abs(movimientoY) <
                Math.abs(movimientoX)
            ) {

                return;

            }


            /*
             * GESTO HACIA ARRIBA
             */

            if (
    movimientoY > 0
) {

    /*
     * Todavía quedan trozos por mostrar.
     */

    if (paso < 3) {

        pasoAnteriorValor =
            paso;

        irAlPaso(
            paso + 1
        );

        return;

    }


    /*
     * ====================================================
     * CUARTO GESTO
     *
     * Los tres trozos ya están completos.
     * Ahora sí pasamos a Padrinos.
     * ====================================================
     */
if (paso === 3) {

    /*
     * Terminó la escena narrativa.
     * Desde aquí vuelve el scroll normal.
     */

    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    if (padrinos) {

        padrinos.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    }

}

}


            /*
             * GESTO HACIA ABAJO
             */

            else {

    if (paso > 0) {

        pasoAnteriorValor =
            paso;

        irAlPaso(
            paso - 1
        );

        return;

    }

}

        },
        {
            passive: true
        }
    );


    /* ========================================================
       ESTADO INICIAL
       ======================================================== */

    actualizarVisual(
        0
    );

}

