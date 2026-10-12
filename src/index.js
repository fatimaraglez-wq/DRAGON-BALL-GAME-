
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Swal from "sweetalert2";
import Acciones from "./Acciones.js";
import { atk_basico, atk_especial, cargar_ki } from './interfaz.js';

// Botones de confirmación
const btn_player1 = document.getElementById("btn_player1");
const btn_player2 = document.getElementById("btn_player2");

// Contenedores de selección
const player1 = document.getElementById("py1");
const player2 = document.getElementById("py2");

const nombre1 = document.getElementById("player1");
const nombre2 = document.getElementById("player2");
const nombres = document.getElementById("nombres");

// Elementos visuales
const username1 = document.getElementById("username1");
const personaje1 = document.getElementById("personaje1");
const img1 = document.getElementById("img1");

const username2 = document.getElementById("username2");
const personaje2 = document.getElementById("personaje2");
const img2 = document.getElementById("img2");

// Mensaje de combate
const mensaje_combate = document.getElementById("mensaje_combate");
const contador = document.getElementById("contador");

// Área de batalla
const batalla = document.getElementById("batalla");

// Barras
const vida1 = document.getElementById("vida1");
const energia1 = document.getElementById("energia1");
const ki1 = document.getElementById("ki1");

const vida2 = document.getElementById("vida2");
const energia2 = document.getElementById("energia2");
const ki2 = document.getElementById("ki2");

// Contadores de semillas
const semillas1 = document.getElementById("semillas1");
const semillas2 = document.getElementById("semillas2");

// Botones de acción del jugador 1
const btn_atk1 = document.getElementById("atq_basico1");
const btn_esp1 = document.getElementById("atq_esp1");
const btn_ki1 = document.getElementById("cargar_ki1");
const btn_semilla1 = document.getElementById("semilla1");

// Botones de acción del jugador 2
const btn_atk2 = document.getElementById("atq_basico2");
const btn_esp2 = document.getElementById("atq_esp2");
const btn_ki2 = document.getElementById("cargar_ki2");
const btn_semilla2 = document.getElementById("semilla2");

// Botón JUGAR DE NUEVO
const btn_jugar_de_nuevo = document.getElementById("jugar_de_nuevo");

// Variables de la partida
let pj1 = "";
let pj2 = "";

let jugador1;
let jugador2;

let turno = 1;
let ronda = 1;
let partida_terminada = false;

// Mostrar mensajes de advertencia
const msj_error = (msj) => {
    Swal.fire({
        icon: "warning",
        title: "¡Atención!",
        text: msj
    });
};

// Actualizar una barra de estado
const actualizar_barra = (barra, valor) => {
    const valorSeguro = Math.max(0, Math.min(100, Number(valor) || 0));

    barra.style.width = `${valorSeguro}%`;
    barra.innerText = `${valorSeguro}%`;
    barra.setAttribute("aria-valuenow", valorSeguro);
};

// Actualizar barras e inventario
const barras = () => {
    if (jugador1) {
        actualizar_barra(vida1, jugador1.getVida());
        actualizar_barra(energia1, jugador1.getEnergia());
        actualizar_barra(ki1, jugador1.getKi());

        semillas1.innerText = jugador1.getSemilla();
    }

    if (jugador2) {
        actualizar_barra(vida2, jugador2.getVida());
        actualizar_barra(energia2, jugador2.getEnergia());
        actualizar_barra(ki2, jugador2.getKi());

        semillas2.innerText = jugador2.getSemilla();
    }
};

// Iniciar combate
const iniciar_juego = () => {
    username1.innerText = nombre1.value;
    personaje1.innerText = pj1;
    img1.src = `./public/img/${pj1}/base.png`;

    username2.innerText = nombre2.value;
    personaje2.innerText = pj2;
    img2.src = `./public/img/${pj2}/base.png`;

    turno = 1;
    ronda = 1;
    partida_terminada = false;

    mensaje_combate.classList.remove("d-none");
    contador.innerText = "3";

    setTimeout(() => {
        contador.innerText = "2";
    }, 1000);

    setTimeout(() => {
        contador.innerText = "1";
    }, 2000);

    setTimeout(() => {
        contador.innerText = "¡YA!";
    }, 3000);

    setTimeout(() => {
        if (partida_terminada) return;

        mensaje_combate.classList.add("d-none");
        batalla.classList.remove("d-none");
        barras();
    }, 4000);
};

// Quitar selección visual
const remover_seleccion = (color, ...elementos) => {
    elementos.forEach((elemento) => {
        elemento.classList.remove("bg-warning");
        elemento.classList.add("bg-" + color);
    });
};

// Comprobar que ambos jugadores estén preparados
const juego_listo = () => {
    if (jugador1 && jugador2) return true;

    msj_error("¡El juego no ha comenzado!");
    return false;
};

// Comprobar si la partida sigue activa
const comprobar_partida = () => {
    if (partida_terminada) {
        return false;
    }

    return true;
};

// Comprobar el turno
const verificar_turno = (jugador) => {
    if (turno !== jugador) {
        msj_error(
            turno === 1
                ? "¡Es el turno del Jugador 1!"
                : "¡Es el turno del Jugador 2!"
        );

        return false;
    }

    return true;
};

// Reglas de las rondas:
// Ronda 1: solamente ataque básico.
// Ronda 2: acciones permitidas según los recursos.
// Ronda 3: solamente ataque básico.
const verificar_accion_ronda = (accion) => {
    if ((ronda === 1 || ronda === 3) && accion !== "basico") {
        msj_error(
            `En la ronda ${ronda} solamente se permite el ataque básico.`
        );

        return false;
    }

    return true;
};

// Cambiar turno y avanzar de ronda
const cambiar_turno = () => {
    if (turno === 1) {
        turno = 2;
    } else {
        turno = 1;
        ronda++;

        // Después de la ronda 3, regresar a la ronda 2
        if (ronda > 3) {
            ronda = 2;
        }
    }
};

// Regresar al menú de selección sin recargar la página
const volver_seleccion = () => {
    batalla.classList.add("d-none");
    mensaje_combate.classList.add("d-none");
    nombres.classList.remove("d-none");

    nombre1.disabled = false;
    nombre2.disabled = false;

    btn_player1.disabled = false;
    btn_player2.disabled = false;

    player1.classList.remove("d-none");
    player2.classList.remove("d-none");

    jugador1 = null;
    jugador2 = null;

    pj1 = "";
    pj2 = "";

    turno = 1;
    ronda = 1;
    partida_terminada = false;

    nombre1.value = "";
    nombre2.value = "";

    remover_seleccion("danger", ...player1.querySelectorAll("img"));
    remover_seleccion("primary", ...player2.querySelectorAll("img"));

    if (btn_jugar_de_nuevo) {
        btn_jugar_de_nuevo.classList.add("d-none");
    }
};

// Comprobar derrota y mostrar al ganador
const verificar_ganador = () => {
    let nombre_perdedor = "";
    let nombre_ganador = "";
    let color_ganador = "#198754";

    if (jugador1.getVida() <= 0) {
        nombre_perdedor = nombre1.value;
        nombre_ganador = nombre2.value;
        color_ganador = "#198754";
    } else if (jugador2.getVida() <= 0) {
        nombre_perdedor = nombre2.value;
        nombre_ganador = nombre1.value;
        color_ganador = "#dc3545";
    } else {
        return false;
    }

    partida_terminada = true;

    // Mostrar el botón para volver a jugar, si existe en el HTML
    if (btn_jugar_de_nuevo) {
        btn_jugar_de_nuevo.classList.remove("d-none");
    }

    Swal.fire({
        icon: "success",
        title: "¡COMBATE TERMINADO!",
        html: `
            <h3>${nombre_perdedor}</h3>
            <h4> Ganador: ${nombre_ganador}</h4>
        `,
        confirmButtonText: "Volver a selección",
        confirmButtonColor: color_ganador,
        allowOutsideClick: false
    }).then(() => {
        volver_seleccion();
    });

    return true;
};

// Validar que los nombres solo contengan letras y números
nombre1.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
});

nombre2.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
});

// Selección de personaje del jugador 1
[...player1.querySelectorAll("img")].forEach((imagen) => {
    imagen.addEventListener("click", (event) => {
        if (jugador1) return;

        remover_seleccion("danger", ...player1.querySelectorAll("img"));

        event.currentTarget.classList.remove("bg-danger");
        event.currentTarget.classList.add("bg-warning");

        pj1 = event.currentTarget.alt;
    });
});

// Selección de personaje del jugador 2
[...player2.querySelectorAll("img")].forEach((imagen) => {
    imagen.addEventListener("click", (event) => {
        if (jugador2) return;

        remover_seleccion("primary", ...player2.querySelectorAll("img"));

        event.currentTarget.classList.remove("bg-primary");
        event.currentTarget.classList.add("bg-warning");

        pj2 = event.currentTarget.alt;
    });
});

// Confirmar jugador 1
btn_player1.addEventListener("click", () => {
    if (nombre1.value.trim() === "") {
        return msj_error("El jugador 1 debe ingresar un nombre de usuario.");
    }

    if (pj1 === "") {
        return msj_error("El jugador 1 debe seleccionar un personaje.");
    }

    if (jugador1) return;

    jugador1 = new Acciones(nombre1.value.trim(), pj1);

    nombre1.disabled = true;
    btn_player1.disabled = true;
    player1.classList.add("d-none");

    if (jugador1 && jugador2) {
        nombres.classList.add("d-none");
        iniciar_juego();
    }
});

// Confirmar jugador 2
btn_player2.addEventListener("click", () => {
    if (nombre2.value.trim() === "") {
        return msj_error("El jugador 2 debe ingresar un nombre de usuario.");
    }

    if (pj2 === "") {
        return msj_error("El jugador 2 debe seleccionar un personaje.");
    }

    if (jugador2) return;

    jugador2 = new Acciones(nombre2.value.trim(), pj2);

    nombre2.disabled = true;
    btn_player2.disabled = true;
    player2.classList.add("d-none");

    if (jugador1 && jugador2) {
        nombres.classList.add("d-none");
        iniciar_juego();
    }
});

// Acción del jugador 1: ataque básico
btn_atk1.addEventListener("click", () => {
    if (!juego_listo() || !comprobar_partida()) return;
    if (!verificar_turno(1)) return;
    if (!verificar_accion_ronda("basico")) return;

    atk_basico(jugador1, jugador2);
    barras();

    if (verificar_ganador()) return;

    cambiar_turno();
});

// Acción del jugador 1: ataque especial
btn_esp1.addEventListener("click", () => {
    if (!juego_listo() || !comprobar_partida()) return;
    if (!verificar_turno(1)) return;
    if (!verificar_accion_ronda("especial")) return;

    if (!atk_especial(jugador1, jugador2)) {
        return msj_error(
            "No tienes suficiente Ki o Energía para el ataque especial."
        );
    }

    barras();

    if (verificar_ganador()) return;

    cambiar_turno();
});

// Acción del jugador 1: cargar Ki
btn_ki1.addEventListener("click", () => {
    if (!juego_listo() || !comprobar_partida()) return;
    if (!verificar_turno(1)) return;
    if (!verificar_accion_ronda("ki")) return;

    cargar_ki(jugador1);
    barras();

    cambiar_turno();
});

// Acción del jugador 1: semilla del ermitaño
btn_semilla1.addEventListener("click", () => {
    if (!juego_listo() || !comprobar_partida()) return;
    if (!verificar_turno(1)) return;
    if (!verificar_accion_ronda("semilla")) return;

    if (jugador1.getSemilla() <= 0) {
        return msj_error("¡No te quedan semillas del ermitaño!");
    }

    if (
        jugador1.getVida() >= 100 &&
        jugador1.getEnergia() >= 100 &&
        jugador1.getKi() >= 100
    ) {
        return msj_error(
            "Solo puedes usar una semilla si alguna barra está por debajo del 100 %."
        );
    }

    jugador1.curacion();
    barras();

    cambiar_turno();
});

// Acción del jugador 2: ataque básico
btn_atk2.addEventListener("click", () => {
    if (!juego_listo() || !comprobar_partida()) return;
    if (!verificar_turno(2)) return;
    if (!verificar_accion_ronda("basico")) return;

    atk_basico(jugador2, jugador1);
    barras();

    if (verificar_ganador()) return;

    cambiar_turno();
});

// Acción del jugador 2: ataque especial
btn_esp2.addEventListener("click", () => {
    if (!juego_listo() || !comprobar_partida()) return;
    if (!verificar_turno(2)) return;
    if (!verificar_accion_ronda("especial")) return;

    if (!atk_especial(jugador2, jugador1)) {
        return msj_error(
            "No tienes suficiente Ki o Energía para el ataque especial."
        );
    }

    barras();

    if (verificar_ganador()) return;

    cambiar_turno();
});

// Acción del jugador 2: cargar Ki
btn_ki2.addEventListener("click", () => {
    if (!juego_listo() || !comprobar_partida()) return;
    if (!verificar_turno(2)) return;
    if (!verificar_accion_ronda("ki")) return;

    cargar_ki(jugador2);
    barras();

    cambiar_turno();
});

// Acción del jugador 2: semilla del ermitaño
btn_semilla2.addEventListener("click", () => {
    if (!juego_listo() || !comprobar_partida()) return;
    if (!verificar_turno(2)) return;
    if (!verificar_accion_ronda("semilla")) return;

    if (jugador2.getSemilla() <= 0) {
        return msj_error("¡No te quedan semillas del ermitaño!");
    }

    if (
        jugador2.getVida() >= 100 &&
        jugador2.getEnergia() >= 100 &&
        jugador2.getKi() >= 100
    ) {
        return msj_error(
            "Solo puedes usar una semilla si alguna barra está por debajo del 100 %."
        );
    }

    jugador2.curacion();
    barras();

    cambiar_turno();
});

// Botón JUGAR DE NUEVO, si existe en el HTML
if (btn_jugar_de_nuevo) {
    btn_jugar_de_nuevo.addEventListener("click", () => {
        volver_seleccion();
    });
}
