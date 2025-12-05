// cypress/e2e/todo.cy.js (o el nombre de tu archivo de specs)

/// <reference types="cypress" />

// Importamos la instancia de la clase Tareas
import { gestiontarea } from "../support/PageObject/GestionTareas";

describe('Test ToDo con estructura de POM solicitada', () => {

    it("1. Agregar tarea a la lista", () => {
        gestiontarea.agregarUnaTareaSimple();
    });

    it("2. Marcar tarea completada", () => {
        gestiontarea.marcarComoCompletada();
    });

    it("3. Desmarcar tarea completada", () => {
        gestiontarea.desmarcarCompletada();
    });

    it("4. Editar tarea", () => {
        gestiontarea.editarTareaExistente();
    });

    it("5. Borrar tarea", () => {
        gestiontarea.borrarTarea();
    });
    it("6. Filtrar tares", () => {
        gestiontarea.filtrarTareasPorEstado();
    });
});