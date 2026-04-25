export interface Log{
    id: number | null  //muss auf Null setzbar sein, damit im BackendMapper erkannt wird, wenn es sich um einen neuen Logeintrag handelt der angelegt werden muss und nicht um einen bestehenden der geupdatet werden soll
    createdAt: Date, /*Enthält in Typescript auch time*/
    comment: string,
    difficulty: number,
    total_distance: number,
    total_time: number /*man erhält die Zeit wohl in Sekunden von der API*/
    rating: number 
}