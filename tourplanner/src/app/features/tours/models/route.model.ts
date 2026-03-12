type TransportMode = "Bike" | "Walk" | "Run"

export interface Route{
    id: number, //Wir haben uns noch nicht geeinigt wie wir die ID anlegen wollen number/string/UUID?
    
    from: string,
    to: string,
    distance: number,
    transportMode: TransportMode
}