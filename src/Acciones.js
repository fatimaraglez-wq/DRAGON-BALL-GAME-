
import Personaje from "./Personaje.js";

class Acciones extends Personaje {

    constructor(nombre, personaje) {
        super(nombre, personaje);
    }

    // Ataque básico: consume energía y Ki, y quita vida al oponente.
    atkBasico(oponente) {
        this.setEnergia(Math.max(0, this.getEnergia() - 5));
        this.setKi(Math.max(0, this.getKi() - 10));

        if (oponente) {
            oponente.setVida(Math.max(0, oponente.getVida() - 10));
        }

        this.mostrarEstadisticas();
    }

    // Ataque especial: requiere Ki y energía suficientes.
    atkEspecial(oponente) {
        const COSTO_ENERGIA = 15;
        const COSTO_KI = 20;

        if (
            this.getKi() < COSTO_KI ||
            this.getEnergia() < COSTO_ENERGIA
        ) {
            return false;
        }

        this.setEnergia(this.getEnergia() - COSTO_ENERGIA);
        this.setKi(this.getKi() - COSTO_KI);

        if (oponente) {
            oponente.setVida(Math.max(0, oponente.getVida() - 25));
        }

        this.mostrarEstadisticas();
        return true;
    }

    // Recupera vida, Ki y energía utilizando una semilla.
    curacion() {
        if (this.getSemilla() <= 0) {
            return false;
        }

        this.setEnergia(100);
        this.setKi(100);
        this.setVida(100);
        this.setSemilla(this.getSemilla() - 1);

        this.mostrarEstadisticas();
        return true;
    }

    // Recarga energía y Ki sin superar 100.
    cargaEnergia() {
        this.setEnergia(Math.min(100, this.getEnergia() + 15));
        this.setKi(Math.min(100, this.getKi() + 10));

        this.mostrarEstadisticas();
    }

    // Método reservado para implementar defensa.
    defensa() {
        // Pendiente de implementar.
    }
}

export default Acciones;
