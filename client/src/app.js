export class App {
	constructor() {
		this.message = 'Epsilon-School';
	}

    configureRouter(config, router) {
        this.router = router;
        config.title = 'Aurelia Config Title';
        config.map([
            { route: ['', 'home'],       name: 'home',       moduleId: 'home/index', nav: true, title: 'Home'},
            { route: 'homework',        name: 'homework',      moduleId: 'homework/homework', nav: true, title: 'Ülesanded'},
            { route: 'addnewsubject',        name: 'addnewsubject',      moduleId: 'addnewsubject/addnewsubject', nav: true, title: 'Lisa Aine Tunniplaani'},
            { route: 'addtask',        name: 'addtask',      moduleId: 'addtask/addtask', nav: true, title: 'Lisa Ülesanne'}

        ]);
      }
}
