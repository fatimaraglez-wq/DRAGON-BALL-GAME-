
import Swal from "sweetalert2";

const atributosPersonaje = {
    GOKU: {
        atk_basico: "¡Kame hame ha!",
        atk_especial: "¡Genkidama!",
        fondo: "rgba(7, 196, 238, 0.7)",
        dialogo_basico: "¡Vamos, todavía puedo dar más!",
        dialogo_especial: "¡Esta energía va por todos!"
    },
    VEGETA: {
        atk_basico: "¡Cañón de Destello!",
        atk_especial: "¡Final Flash!",
        fondo: "rgba(0, 0, 255, 0.7)",
        dialogo_basico: "¡Conoce el poder de un príncipe saiyajin!",
        dialogo_especial: "¡Desaparece ante mi poder!"
    },
    PICCOLO: {
        atk_basico: "¡Makankosappo!",
        atk_especial: "¡Cañón Explosivo de Demonio!",
        fondo: "rgba(0, 128, 0, 0.7)",
        dialogo_basico: "¡No bajaré la guardia!",
        dialogo_especial: "¡Este ataque decidirá la batalla!"
    },
    GOHAN: {
        atk_basico: "¡Masenko!",
        atk_especial: "¡Kamehameha Padre e Hijo!",
        fondo: "rgba(255, 165, 0, 0.7)",
        dialogo_basico: "¡Tengo que proteger a mis seres queridos!",
        dialogo_especial: "¡Este es todo mi poder!"
    },
    VEGITTO: {
        atk_basico: "¡Espada de Espíritu Final!",
        atk_especial: "¡Kamehameha Final Flash!",
        fondo: "rgba(255, 215, 0, 0.7)",
        dialogo_basico: "¡No eres rival para mí!",
        dialogo_especial: "¡La fusión definitiva ataca!"
    },
    TRUNKS: {
        atk_basico: "¡Ataque Ardiente!",
        atk_especial: "¡Espada Ráfaga de Ira!",
        fondo: "rgba(128, 0, 128, 0.7)",
        dialogo_basico: "¡No permitiré que destruyas mi futuro!",
        dialogo_especial: "¡Esta espada terminará contigo!"
    },
    CELL: {
        atk_basico: "¡Kamehameha Solar!",
        atk_especial: "¡Autodestrucción Celular!",
        fondo: "rgba(46, 139, 87, 0.7)",
        dialogo_basico: "¡Contempla mi perfección!",
        dialogo_especial: "¡Nadie puede detenerme!"
    },
    GOGETA: {
        atk_basico: "¡Explosión Big Bang!",
        atk_especial: "¡Kamehameha Estelar!",
        fondo: "rgba(255, 69, 0, 0.7)",
        dialogo_basico: "¡Esto terminará rápido!",
        dialogo_especial: "¡Aquí termina tu combate!"
    }
};

const datosDe = (jugador) => {
    const personaje = jugador?.getPersonaje?.() || "GOKU";
    const key = personaje.toUpperCase();

    return atributosPersonaje[key] || {
        atk_basico: "¡Ataque básico!",
        atk_especial: "¡Ataque especial!",
        fondo: "rgba(0, 0, 0, 0.7)",
        dialogo_basico: "¡El combate continúa!",
        dialogo_especial: "¡Ataque definitivo!"
    };
};

const mostrar_ataque = (texto, imagen, fondo, dialogo) => {
    Swal.fire({
        title: texto,
        text: dialogo,
        imageUrl: imagen,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: "Ataque del personaje",
        position: "center",
        width: 600,
        color: "#ffffff",
        background: "#171717",
        backdrop: fondo,
        showConfirmButton: false,
        timer: 1800,
        customClass: {
            popup: "alerta-combate",
            title: "titulo-ataque",
            htmlContainer: "dialogo-ataque"
        }
    });
};

const atk_basico = (j1, j2) => {
    j1.atkBasico(j2);

    const datos = datosDe(j1);
    const personaje = j1.getPersonaje();

    mostrar_ataque(
        datos.atk_basico,
        `./public/img/${personaje}/basico.png`,
        datos.fondo,
        datos.dialogo_basico
    );

    return true;
};

const atk_especial = (j1, j2) => {
    // No muestra el ataque si no hay suficiente Ki o Energía.
    if (!j1.atkEspecial(j2)) {
        return false;
    }

    const datos = datosDe(j1);
    const personaje = j1.getPersonaje();

    mostrar_ataque(
        datos.atk_especial,
        `./public/img/${personaje}/especial.png`,
        datos.fondo,
        datos.dialogo_especial
    );

    return true;
};

const cargar_ki = (j1) => {
    j1.cargaEnergia();

    Swal.fire({
        icon: "success",
        title: "¡Cargando Ki!",
        text: `${j1.getNombre()} recuperó Ki y Energía.`,
        timer: 1200,
        showConfirmButton: false
    });
};

export { atk_basico, atk_especial, cargar_ki };
