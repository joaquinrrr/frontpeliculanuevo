import { Routes } from '@angular/router';
import { Firsthome } from './components/home/firsthome/firsthome';
import { Login } from './components/home/login/login';
import { Secondhome } from './components/home/secondhome/secondhome';
import { segGuard } from './guard/seguridad.guard';
import { Cinemas } from './components/admin-control/cinemas/cinemas';
import { Crearcinemas } from './components/admin-control/cinemas/crearcinemas/crearcinemas';
import { Cinemarooms } from './components/admin-control/cinemarooms/cinemarooms';
import { Crearcinemarooms } from './components/admin-control/cinemarooms/crearcinemarooms/crearcinemarooms';
import { Cities } from './components/admin-control/cities/cities';
import { Crearcities } from './components/admin-control/cities/crearcities/crearcities';
import { Funciones } from './components/client-control/funciones/funciones';
import { Crearfunciones } from './components/client-control/funciones/crearfunciones/crearfunciones';
import { Moviecinema } from './components/admin-control/moviecinema/moviecinema';
import { Crearmoviecinema } from './components/admin-control/moviecinema/crearmoviecinema/crearmoviecinema';
import { Movies } from './components/admin-control/movies/movies';
import { Crearmovies } from './components/admin-control/movies/crearmovies/crearmovies';
import { Review } from './components/client-control/review/review';
import { Crearreviews } from './components/client-control/review/crearreviews/crearreviews';
import { Roles } from './components/admin-control/roles/roles';
import { Crearroles } from './components/admin-control/roles/crearroles/crearroles';
import { Rooms } from './components/admin-control/rooms/rooms';
import { Crearrooms } from './components/admin-control/rooms/crearrooms/crearrooms';
import { Creartickets } from './components/client-control/tickets/creartickets/creartickets';
import { Tickets } from './components/client-control/tickets/tickets';
import { Typepayments } from './components/admin-control/typepayments/typepayments';
import { Creartypepayments } from './components/admin-control/typepayments/creartypepayments/creartypepayments';
import { Users } from './components/admin-control/users/users';
import { Crearusers } from './components/admin-control/users/crearusers/crearusers';

export const routes: Routes = [
    {
        path: 'landinghome',component:Firsthome
    },
    {
        path: '',
        redirectTo: 'landinghome',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login,
    
    },
    {
        path: 'home',component:Secondhome,
        canActivate: [segGuard]
    },
    {
        path: 'cinema',
        component: Cinemas,
        children: [
            { path: 'registercinema', component: Crearcinemas },
            { path: 'ediciones/:id', component: Crearcinemas }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'cinemarooms',
        component: Cinemarooms,
        children: [
            { path: 'registrarcinemarooms', component: Crearcinemarooms },
            { path: 'ediciones/:id', component: Crearcinemarooms }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'cities',
        component: Cities,
        children: [
            { path: 'registrarctiy', component: Crearcities },
            { path: 'ediciones/:id', component: Crearcities }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'funcionescine',
        component: Funciones,
        children: [
            { path: 'registrarfuncionescine', component: Crearfunciones },
            { path: 'ediciones/:id', component: Crearfunciones }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'moviecinema',
        component: Moviecinema,
        children: [
            { path: 'registarmoviecinema', component: Crearmoviecinema },
            { path: 'ediciones/:id', component: Crearmoviecinema }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'movies',
        component: Movies,
        children: [
            { path: 'registrarmovie', component: Crearmovies },
            { path: 'ediciones/:id', component: Crearmovies }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'reviews',
        component: Review,
        children: [
            { path: 'registrarreview', component: Crearreviews },
            { path: 'ediciones/:id', component: Crearreviews }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'roles',
        component: Roles,
        children: [
            { path: 'registraroles', component: Crearroles },
            { path: 'ediciones/:id', component: Crearroles }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'rooms',
        component: Rooms,
        children: [
            { path: 'registrarooms', component: Crearrooms },
            { path: 'ediciones/:id', component: Crearrooms }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'tickets',
        component: Tickets ,
        children: [
            { path: 'registrartickets', component: Creartickets },
            { path: 'ediciones/:id', component: Creartickets }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'typepayment',
        component: Typepayments,
        children: [
            { path: 'registrartype', component: Creartypepayments },
            { path: 'ediciones/:id', component: Creartypepayments }
        ],
        canActivate: [segGuard]
    },
    {
        path: 'usersss',
        component: Users,
        children: [
            { path: 'registrarusers', component: Crearusers },
            { path: 'ediciones/:id', component: Crearusers }
        ],
        canActivate: [segGuard]
    },
];
