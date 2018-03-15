/*import { PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-framework';
import { AuthService } from './auth-service';

@inject(AuthService)*/
export class App {
	constructor(AuthService) {
		this.message = 'Epsilon-School';
        /*this.auth = AuthService;
        this.authenticated = this.auth.isAuthenticated();
        this.auth.authNotifier.on('authChange', authState => {
          this.authenticated = authState.authenticated;
        });*/
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
