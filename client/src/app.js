export class App {
	constructor() {
		this.message = 'Epsilon-School';
	}

    configureRouter(config, router) {
        this.router = router;
        config.title = 'Aurelia Config Title';
        config.map([
            { route: ['', 'homework'],        name: 'homework',      moduleId: 'homework/homework', nav: true, title: 'Ülesanded'},
            { route: 'addtask',        name: 'addtask',      moduleId: 'addtask/addtask', nav: true, title: 'Lisa ülesanne'},
            { route: 'addnewsubject',        name: 'addnewsubject',      moduleId: 'addnewsubject/addnewsubject', nav: true, title: 'Lisa aine tunniplaani'},
            { route: 'createnewsubject',       name: 'createnewsubject',       moduleId: 'createnewsubject/createnewsubject', nav: true, title: 'Loo aine'}

        ]);
      }
}
