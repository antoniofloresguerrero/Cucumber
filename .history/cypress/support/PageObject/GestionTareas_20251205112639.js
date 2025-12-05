// cypress/support/PageObject/GestionTareas.js

export class Tareas {
    constructor(){
        // Selectores genéricos y la URL
        this.web = "https://todomvc.com/examples/react/dist/";
        this.inputNuevaTarea = '[data-testid="text-input"]';
        this.itemLabel = '[data-testid="todo-item-label"]';
        this.footerNavegacion = '[data-testid="footer-navigation"]';

        // Selectores para filtros (basados en tu estructura)
        this.filtroCompleted = `${this.footerNavegacion} > :nth-child(3) > a`;
        this.filtroAll = `${this.footerNavegacion} > :nth-child(1) > a`;
    };

    /**
     * Navega a la página de ToDoMVC
     */
    visitarPagina(){
        cy.visit(this.web);
    }

    /**
     * Agrega una nueva tarea.
     * @param {string} nombreTarea - El texto de la tarea a agregar.
     */
    agregarTarea(nombreTarea) {
        cy.get(this.inputNuevaTarea).type(`${nombreTarea}{enter}`);
    }

    /**
     * Marca o desmarca una tarea por su nombre.
     * @param {string} nombreTarea - El texto de la tarea a interactuar.
     */
    clicToggleTarea(nombreTarea) {
        // Encontrar el contenedor LI que contiene el texto y buscar su toggle interno
        cy.contains('li', nombreTarea).find('[data-testid="todo-item-toggle"]').click();
    }

    /**
     * Método para el test "Agregar tarea a la lista"
     */
    agregarUnaTareaSimple() {
        this.visitarPagina();
        this.agregarTarea("comprar el pan");
        // Verificar que la etiqueta con el texto es visible
        cy.contains(this.itemLabel, "comprar el pan").should("be.visible");
    }

    /**
     * Método para el test "Marcar tarea completada"
     */
    marcarComoCompletada() {
        this.visitarPagina();
        this.agregarTarea("ir al gimnasio");
        this.clicToggleTarea("ir al gimnasio");

        // Verificar que el LI padre tiene la clase 'completed'
        cy.contains('li', "ir al gimnasio").should("have.class", "completed");
    }

    /**
     * Método para el test "Desmarcar tarea completada"
     */
    desmarcarCompletada() {
        this.visitarPagina();
        const tarea = "ir al gym";
        this.agregarTarea(tarea);

        // Marcar y verificar completada
        this.clicToggleTarea(tarea);
        cy.contains('li', tarea).should("have.class", "completed");

        // Desmarcar y verificar que NO tiene la clase completada
        this.clicToggleTarea(tarea);
        cy.contains('li', tarea).should("not.have.class", "completed");
    }

    /**
     * Método para el test "Editar tarea"
     */
    editarTareaExistente() {
        this.visitarPagina();
        const oldText = "ir al taller";
        const newText = "ir al super";

        this.agregarTarea(oldText);

        // Doble clic en la etiqueta para entrar en modo edición
        cy.contains(this.itemLabel, oldText).dblclick();
        // Usar .focused() para interactuar con el input de edición que aparece y teclear la nueva tarea
        cy.focused().clear().type(`${newText}{enter}`);

        // Verificar que la nueva etiqueta existe y la vieja no
        cy.contains(this.itemLabel, newText).should("exist");
        cy.contains(this.itemLabel, oldText).should("not.exist");
    }

    /**
     * Método para el test "Borrar tarea"
     */
    borrarTarea() {
        this.visitarPagina();
        const tarea = "ir al campo";
        this.agregarTarea(tarea);

        // Usar trigger('mouseover') para hacer visible el botón de borrar, luego clic forzado.
        cy.contains('li', tarea).trigger("mouseover").find(".destroy").click({ force: true });

        // Verificar que la tarea ya no existe en la página
        cy.contains(tarea).should("not.exist");
    }
    /**
     * Método para el test "Filtrar tareas por estado (Active, Completed, All)"
     */
    filtrarTareasPorEstado() {
        this.visitarPagina();
        // Usando los métodos de la clase para agregar tareas
        this.agregarTarea("ir al campo");
        this.agregarTarea("ir a la playa"); // Esta se marcará como completada
        this.agregarTarea("ir a la montaña");

        // Marcar "ir a la playa" como completada
        this.clicToggleTarea("ir a la playa");

        // --- Filtrar por Completed ---
        // Usando los selectores de la clase para hacer clic en el filtro
        cy.get(this.filtroCompleted).click();
        
        // Verificar que solo hay 1 tarea visible y es la correcta
        cy.get(this.itemLabel)
            .should("have.length", 1)
            .and("contain.text", "ir a la playa");

        // --- Filtrar por All ---
        cy.get(this.filtroAll).click();
        
        // Verificar que las 3 tareas son visibles de nuevo
        cy.get(this.itemLabel).should("have.length", 3);
    }
  
}

export const gestiontarea = new Tareas();