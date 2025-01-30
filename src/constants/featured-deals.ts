import { IFeaturedDeal } from '../types/models/home.model.ts';

export const FEATURED_DEALS: IFeaturedDeal[] = [
  {
    hotelId: 101,
    originalRoomPrice: 200,
    discount: 20,
    finalPrice: 160,
    cityName: 'Paris',
    hotelName: 'Eiffel Grande',
    hotelStarRating: 5,
    title: 'Luxurious Stay near Eiffel Tower',
    description:
      'Enjoy a luxurious stay in the heart of Paris, just steps away from the iconic Eiffel Tower.',
    roomPhotoUrl:
      'https://media.istockphoto.com/id/1060147940/photo/modern-bedroom-interior-with-blank-wall-for-copy-space.jpg?s=612x612&w=0&k=20&c=l1aJiQrFnbGQfExzuZRuCF91BwWkkxLJklX1q2JS7Nk=',
  },
  {
    hotelId: 102,
    originalRoomPrice: 150,
    discount: 10,
    finalPrice: 135,
    cityName: 'New York',
    hotelName: 'Skyline Suites',
    hotelStarRating: 4,
    title: 'Modern Rooms with Skyline Views',
    description: 'Stay in modern rooms with breathtaking views of the New York skyline.',
    roomPhotoUrl:
      'https://media.istockphoto.com/id/939846606/photo/perfect-bedroom.jpg?s=612x612&w=0&k=20&c=fYRIbEC2LY9g01JWIsMUmfPho5oWk3Mcdnm_YkI6jZo=',
  },
  {
    hotelId: 103,
    originalRoomPrice: 300,
    discount: 25,
    finalPrice: 225,
    cityName: 'Dubai',
    hotelName: 'Desert Pearl Hotel',
    hotelStarRating: 5,
    title: 'Luxury Oasis in the Desert',
    description: "Experience unparalleled luxury in Dubai's most prestigious hotel.",
    roomPhotoUrl:
      'https://media.istockphoto.com/id/1051324642/photo/modern-bedroom-interior-with-blank-wall-for-copy-space.jpg?s=612x612&w=0&k=20&c=lQDxM7WNJwzH5bPHvIA5o8t_buL9NFFZxZXc_rqzBMs=',
  },
  {
    hotelId: 104,
    originalRoomPrice: 120,
    discount: 15,
    finalPrice: 102,
    cityName: 'Tokyo',
    hotelName: 'Sakura Inn',
    hotelStarRating: 3,
    title: 'Cozy Stay in Tokyo',
    description: 'Enjoy a cozy and affordable stay in the vibrant streets of Tokyo.',
    roomPhotoUrl:
      'https://media.istockphoto.com/id/939846660/photo/luxury-and-cozy-small-living-room-for-young-and-wild-people.jpg?s=612x612&w=0&k=20&c=4ATcgT18MlGBDbudeyM8k-roPZH94WhTqzL-VgJTGqA=',
  },
  {
    hotelId: 105,
    originalRoomPrice: 250,
    discount: 20,
    finalPrice: 200,
    cityName: 'Rome',
    hotelName: 'Colosseum View Hotel',
    hotelStarRating: 4,
    title: 'Elegant Rooms with Colosseum Views',
    description: 'Stay in elegant rooms offering stunning views of the historic Colosseum.',
    roomPhotoUrl:
      'https://media.istockphoto.com/id/1136242581/photo/comfortable-budget-hotel-bedroom.jpg?s=612x612&w=0&k=20&c=odawepJat0w6UsJAEzFFmwte68aOKLZ5eGLIiuSkdug=',
  },
  {
    hotelId: 106,
    originalRoomPrice: 180,
    discount: 10,
    finalPrice: 162,
    cityName: 'Sydney',
    hotelName: 'Harbor Breeze',
    hotelStarRating: 4,
    title: 'Charming Stay near Sydney Harbor',
    description:
      "Enjoy a charming and comfortable stay with easy access to Sydney's iconic harbor.",
    roomPhotoUrl:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&w=1200&h=800&fit=crop',
  },
];
