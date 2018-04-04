import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { ShowHomeworksComponent } from './show-homeworks/show-homeworks.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AddHomeworksComponent } from './add-homeworks/add-homeworks.component';

import { AuthGuardService } from './auth-guard/auth-guard.service';

const routes: Routes = [
	{ path: '', component: ShowHomeworksComponent },
	{ path: 'homeworks', component: ShowHomeworksComponent },
	{ path: 'addhomeworks', component: AddHomeworksComponent, canActivate: [AuthGuardService] },
	{ path: 'createsubject', component: CreateSubjectComponent, canActivate: [AuthGuardService] },
	{ path: 'addsubject', component: AddSubjectComponent, canActivate: [AuthGuardService] }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule { }
