import {Tour} from '../models/tour.model'

export const exampleTour: Tour = {
    id: 1,
    name: "Vienna City Tour",
    description: "Schöne Tour durch Wien",
    estimated_time: 7200,
    popularity: 5,
    isChildfriendly: true,
    tourType: "Mixed",
    
    routes: [
        { id: 1, from: "Stephansplatz", to: "Prater", distance: 200, transportMode: "Bike" },
        { id: 2, from: "Prater", to: "Donaukanal", distance: 150, transportMode: "Run" },
        { id: 3, from: "Donaukanal", to: "idk", distance: 200, transportMode:"Walk"}
    ],
    
    logs: [
    {
        id: 1,
        createdAt: new Date(),
        comment: "Tolle Tour!",
        difficulty: 3,
        total_distance: 12,
        total_time: 3600,
        rating: 5
    }
  ]
};