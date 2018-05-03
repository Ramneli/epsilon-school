import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { ShowHomeworksComponent } from './show-homeworks/show-homeworks.component';
import { HomeComponent } from './home/home.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AddHomeworksComponent } from './add-homeworks/add-homeworks.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EapCalculatorComponent } from './eap-calculator/eap-calculator.component';
import { SettingsComponent } from './settings/settings.component';

import { AuthGuardService } from './auth-guard/auth-guard.service';
import { EditHomeworkComponent } from './edit-homework/edit-homework.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'homeworks', component: ShowHomeworksComponent, canActivate: [AuthGuardService],
		children: [
			{ path: '', component: TasksComponent },
			{ path: 'notifications', component: NotificationsComponent},
			{ path: 'eapcalculator', component: EapCalculatorComponent},
			{ path: 'settings', component: SettingsComponent}
		] },
	{ path: 'addhomeworks', component: AddHomeworksComponent, canActivate: [AuthGuardService] },
	{ path: 'createsubject', component: CreateSubjectComponent, canActivate: [AuthGuardService] },
	{ path: 'addsubject', component: AddSubjectComponent, canActivate: [AuthGuardService] },
	{ path: 'edithomework', component: EditHomeworkComponent, canActivate: [AuthGuardService]},
	{ path: '**', component: HomeComponent}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule { }
