
class Personaje {
    // Atributos privados
    #vida = 100;
    #nombre;
    #ki = 100;
    #energia = 100;
    #semilla = 2;
    #personaje = "";

    // Constructor
    constructor(nombre, tipoPersonaje = "") {
        this.#nombre = nombre;
        this.#personaje = tipoPersonaje;

        this.mostrarEstadisticas();
    }

    // Mostrar estadísticas en la consola
    mostrarEstadisticas() {
        console.log(`
            Nombre: ${this.#nombre},
            Personaje: ${this.#personaje},
            Ki: ${this.#ki},
            Vida: ${this.#vida},
            Energía: ${this.#energia},
            Semillas: ${this.#semilla}
        `);
    }

    // Obtener nombre
    getNombre() {
        return this.#nombre;
    }

    // Obtener personaje seleccionado
    getPersonaje() {
        return this.#personaje;
    }

    // Obtener vida
    getVida() {
        return this.#vida;
    }

    // Obtener Ki
    getKi() {
        return this.#ki;
    }

    // Obtener energía
    getEnergia() {
        return this.#energia;
    }

    // Obtener semillas
    getSemilla() {
        return this.#semilla;
    }

    // Modificar vida: mínimo 0, máximo 100
    setVida(vida) {
        this.#vida = Math.max(0, Math.min(100, Number(vida) || 0));
    }

    // Modificar Ki: mínimo 0, máximo 100
    setKi(ki) {
        this.#ki = Math.max(0, Math.min(100, Number(ki) || 0));
    }

    // Modificar energía: mínimo 0, máximo 100
    setEnergia(energia) {
        this.#energia = Math.max(
            0,
            Math.min(100, Number(energia) || 0)
        );
    }

    // Modificar semillas: mínimo 0, máximo 2
    setSemilla(semilla) {
        this.#semilla = Math.max(
            0,
            Math.min(2, Math.floor(Number(semilla) || 0))
        );
    }
}

// Exportar clase base
export default Personaje;
