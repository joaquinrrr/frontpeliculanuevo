import { CinemaRooms } from "./CinemaRooms";
import { Movies } from "./Movies";

export class MovieCinema {
    id: number = 0
    startinghour: Date = new Date(Date.now());
    endinghour: Date = new Date(Date.now());
    cinemarooms_id: CinemaRooms = new CinemaRooms()
    movies_id: Movies = new Movies()
}