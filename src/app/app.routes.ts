import { ImagefullComponent } from './components/imagefull/imagefull.component';
import { Component } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ImagelistComponent } from './imagelist/imagelist.component';
import { BannerComponent } from './components/banner/banner.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';

export const routes: Routes = [
    {
        path: '', component: ImagelistComponent, title: 'ImageArk'
    },
    {
        path: 'home', component: ImagelistComponent, title:'ImageArk'
    },
    {
        path: 'Image/:id', component: ImagefullComponent, title: 'ImageArk'

    },
    {
        path: 'Result', component: SearchresultComponent, title: 'ImageArk Search result'
    }
];
