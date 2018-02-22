export class App {
	constructor() {
		this.message = 'Epsilon-School';
	}

    configureRouter(config, router) {
        this.router = router;
        config.title = 'Aurelia Config Title';
        config.map([
            { route: ['', 'home'],       name: 'home',       moduleId: 'home/index', nav: true, title: 'Home'},
            { route: 'tablememe',        name: 'tablememe',      moduleId: 'tablememe/tablememe', nav: true, title: 'Table'},
            { route: 'createnewsubject', name: 'createnewsubject', moduleId: 'createnewsubject/createNewSubject', nav: true, title: 'Loo Uus Aine'},
            { route: 'homework',        name: 'homework',      moduleId: 'homework/homework', nav: true, title: 'Lisa Kodune Ülesanne'},
            { route: 'addnewsubject',        name: 'addnewsubject',      moduleId: 'addnewsubject/addnewsubject', nav: true, title: 'Lisa Aine Tunniplaani'},
            { route: 'notification',        name: 'notification',      moduleId: 'notification/notification', nav: true, title: 'Teavitus'}

        ]);
      }
}
