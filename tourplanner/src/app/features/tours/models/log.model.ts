export interface Log{
    id: number //Wir haben uns noch nicht geeinigt wie wir die ID anlegen wollen number/string/UUID?
    
    createdAt: Date, /*Enthält in Typescript auch time*/
    comment: string,
    difficulty: number,
    total_distance: number,
    total_time: number /*man erhält die Zeit wohl in Sekunden von der API*/
    rating: number 

}