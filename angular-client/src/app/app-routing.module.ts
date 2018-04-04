import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { ShowHomeworksComponent } from './show-homeworks/show-homeworks.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AddHomeworksComponent } from './add-homeworks/add-homeworks.component';

const routes: Routes = [
	{ path: '', component: ShowHomeworksComponent },
	{ path: 'homeworks', component: ShowHomeworksComponent },
	{ path: 'addhomeworks', component: AddHomeworksComponent },
	{ path: 'createsubject', component: CreateSubjectComponent },
	{ path: 'addsubject', component: AddSubjectComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule { }

