/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Calendar, 
  Users, 
  Compass, 
  ArrowRight, 
  Phone, 
  Mail, 
  Instagram, 
  Star, 
  ChevronRight, 
  Check, 
  Car, 
  Compass as CompassIcon, 
  Map as MapIcon, 
  Info, 
  X,
  Palmtree,
  Sparkles,
  Search,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Award,
  ChevronDown,
  HelpCircle,
  Clock,
  Menu
} from 'lucide-react';

import { JourneyOfCeylonLogo } from './components/Logo';

// Static destinations list for high-fidelity Ceylon search autocomplete
interface Destination {
  name: string;
  region: string;
  description: string;
  coordinates: { x: number; y: number };
}

const SRI_LANKA_DESTINATIONS: Destination[] = [
  { name: 'Ahangama', region: 'Southern Province', description: 'Premium surf retreats & stilt fishing', coordinates: { x: 205, y: 582 } },
  { name: 'Ahungalla', region: 'Southern Province', description: 'Pristine golden beach nesting sea turtles', coordinates: { x: 155, y: 535 } },
  { name: 'Aluthgama', region: 'Western Province', description: 'Bentota river safari & woodcrafts', coordinates: { x: 148, y: 515 } },
  { name: 'Ambalangoda', region: 'Southern Province', description: 'Traditional vibrant demon mask workshops', coordinates: { x: 158, y: 545 } },
  { name: 'Ambuluwawa', region: 'Central Province', description: 'Spire temple tower overlooking green mountains', coordinates: { x: 238, y: 400 } },
  { name: 'Anuradhapura', region: 'North Central', description: 'Ancient sacred ruins & giant stupas', coordinates: { x: 210, y: 190 } },
  { name: 'Arugam Bay', region: 'Eastern Province', description: 'World-famous point break surf sanctuary', coordinates: { x: 340, y: 480 } },
  { name: 'Batticaloa Airport (BTC)', region: 'Eastern Province', description: 'East coast domestic and regional gateway', coordinates: { x: 330, y: 420 } },
  { name: 'Beruwala', region: 'Western Province', description: 'Historic mosque & lighthouse bay', coordinates: { x: 146, y: 510 } },
  { name: 'Colombo', region: 'Western Province', description: 'Historic center, markets & high-end shopping', coordinates: { x: 135, y: 480 } },
  { name: 'Colombo Airport (CMB)', region: 'Western Province', description: 'Primary gateway (Katunayake, 35 km N of Colombo). See departures/arrivals portal.', coordinates: { x: 130, y: 440 } },
  { name: 'Dambulla', region: 'Central Province', description: 'Golden cave Buddhist ancient murals', coordinates: { x: 235, y: 295 } },
  { name: 'Dickwella', region: 'Southern Province', description: 'Vibrant local beach, next to Hiriketiya', coordinates: { x: 238, y: 580 } },
  { name: 'Ella', region: 'Uva Province', description: 'Nine Arch Bridge & mountain gap', coordinates: { x: 285, y: 470 } },
  { name: 'Galle', region: 'Southern Province', description: 'Colonial Dutch fort & ramparts', coordinates: { x: 175, y: 575 } },
  { name: 'Habarana', region: 'North Central', description: 'Eco-tourism hub near Minneriya & Sigiriya', coordinates: { x: 248, y: 250 } },
  { name: 'Hambantota', region: 'Southern Province', description: 'Industrial deepwater harbor & salt flats', coordinates: { x: 285, y: 560 } },
  { name: 'Hatton', region: 'Central Highlands', description: 'Serpentine lakes & mountain tea factories', coordinates: { x: 235, y: 445 } },
  { name: 'Hikkaduwa', region: 'Southern Province', description: 'Coral reefs & seaside surf surfing', coordinates: { x: 160, y: 550 } },
  { name: 'Hiriketiya', region: 'Southern Province', description: 'Horseshoe surf bay & tropical palms', coordinates: { x: 240, y: 580 } },
  { name: 'Horton Plains', region: 'Central Highlands', description: 'World\'s End sheer high-altitude drop', coordinates: { x: 260, y: 460 } },
  { name: 'Jaffna Airport (JAF)', region: 'Northern Province', description: 'Palaly gateway to the northern peninsula', coordinates: { x: 190, y: 50 } },
  { name: 'Kalpitiya', region: 'North Western', description: 'Top-tier marine windsurfing & dolphin pods', coordinates: { x: 110, y: 240 } },
  { name: 'Kalutara', region: 'Western Province', description: 'Massive hollow Buddhist hemispherical stupa', coordinates: { x: 142, y: 500 } },
  { name: 'Kandy', region: 'Central Province', description: 'Temple of Sacred Tooth & gardens', coordinates: { x: 240, y: 380 } },
  { name: 'Kataragama', region: 'Uva Province', description: 'Multi-religious sacred forest shrine', coordinates: { x: 305, y: 530 } },
  { name: 'Kitulgala', region: 'Sabaragamuwa', description: 'White water rapids & canyoning adventures', coordinates: { x: 210, y: 450 } },
  { name: 'Matale', region: 'Central Province', description: 'Aromatic cinnamon, cardamom & cocoa estates', coordinates: { x: 242, y: 350 } },
  { name: 'Mattala Airport (HRI)', region: 'Southern Province', description: 'Southern international gateway near Hambantota District', coordinates: { x: 290, y: 550 } },
  { name: 'Midigama', region: 'Southern Province', description: 'Relaxed bohemian surf breaks', coordinates: { x: 210, y: 580 } },
  { name: 'Minneriya', region: 'North Central', description: 'Elephant gathering lakeside reserve', coordinates: { x: 255, y: 240 } },
  { name: 'Mirissa', region: 'Southern Province', description: 'Whale watching, secret beach & sunset surf', coordinates: { x: 200, y: 582 } },
  { name: 'Mount Lavinia', region: 'Western Province', description: 'Colonial beachfront sunset dining', coordinates: { x: 137, y: 485 } },
  { name: 'Negombo', region: 'Western Province', description: 'Sandy beach & lagoons near airport', coordinates: { x: 132, y: 410 } },
  { name: 'Nilaveli', region: 'Eastern Province', description: 'Pristine white sands & Pigeon Island reef', coordinates: { x: 305, y: 145 } },
  { name: 'Nuwara Eliya', region: 'Central Highlands', description: 'Little England, rolling tea hills', coordinates: { x: 255, y: 440 } },
  { name: 'Pasikudah', region: 'Eastern Province', description: 'Shallow calm turquoise swimming bay', coordinates: { x: 335, y: 290 } },
  { name: 'Pinnawala', region: 'Sabaragamuwa', description: 'Riverside elephant nursing reserve', coordinates: { x: 215, y: 385 } },
  { name: 'Polonnaruwa', region: 'North Central', description: 'Unesco mediaeval ruins & royal palaces', coordinates: { x: 270, y: 220 } },
  { name: 'Ratmalana Airport (RML)', region: 'Western Province', description: 'Colombo domestic & regional flight hub', coordinates: { x: 138, y: 495 } },
  { name: 'Sigiriya', region: 'Central Province', description: 'Unesco World Heritage Lion Rock', coordinates: { x: 245, y: 270 } },
  { name: 'Sinharaja', region: 'Sabaragamuwa', description: 'Virgin primary tropical rainforest reserve', coordinates: { x: 210, y: 525 } },
  { name: 'Talalla', region: 'Southern Province', description: 'Unspoiled wind-sheltered calm bay', coordinates: { x: 230, y: 582 } },
  { name: 'Tangalle', region: 'Southern Province', description: 'Lush coconut estates & private coves', coordinates: { x: 265, y: 570 } },
  { name: 'Trincomalee', region: 'Eastern Province', description: 'Pristine ocean bays & whale watching', coordinates: { x: 300, y: 170 } },
  { name: 'Udawalawe', region: 'Sabaragamuwa', description: 'Elephant playground & reservoir', coordinates: { x: 260, y: 510 } },
  { name: 'Unawatuna', region: 'Southern Province', description: 'Sandy crescent bay & beach lounges', coordinates: { x: 180, y: 580 } },
  { name: 'Wadduwa', region: 'Western Province', description: 'Coconut plantations & herbal ayurvedic retreats', coordinates: { x: 139, y: 492 } },
  { name: 'Weligama', region: 'Southern Province', description: 'Turquoise bay & stilt fishermen', coordinates: { x: 215, y: 585 } },
  { name: 'Wilpattu', region: 'North Western', description: 'Leopards & wildlife safari lakes', coordinates: { x: 150, y: 220 } },
  { name: 'Yala', region: 'Southern Province', description: 'High density leopards & forest safari', coordinates: { x: 320, y: 535 } }
];

// Express Taxi service structures & rates matching pickuptaxisrilanka.com
interface TaxiVehicle {
  type: string;
  subType: string;
  colomboPrice: string;
  airportPrice: string;
  idealFor: string;
  image: string;
}

interface TaxiRoute {
  id: string;
  title: string;
  toName: string;
  fromName: string;
  distance: string;
  duration: string;
  expressway: string;
  vehicles: TaxiVehicle[];
}

const TAXI_ROUTES: TaxiRoute[] = [
  {
    id: 'colombo-to-mirissa',
    title: 'Galle / Mirissa Beach Express',
    toName: 'Mirissa Beach',
    fromName: 'Colombo City / CMB Airport',
    distance: '150 km',
    duration: '2.5 Hours',
    expressway: 'Direct via E01 Southern Expressway (Toll Included)',
    vehicles: [
      { type: 'Mini Car', subType: 'Suzuki Wagon R / Primo', colomboPrice: 'Rs 16,000 ($55)', airportPrice: 'Rs 18,500 ($62)', idealFor: '2-3 Passengers, Light Luggage', image: '🚗' },
      { type: 'Sedan / Eco Car', subType: 'Toyota Axio / Allion', colomboPrice: 'Rs 18,500 ($62)', airportPrice: 'Rs 20,500 ($68)', idealFor: '3-4 Passengers, Standard Bags', image: '🚘' },
      { type: 'Mini Van (Dual AC)', subType: 'Toyota Every / KDH', colomboPrice: 'Rs 22,000 ($73)', airportPrice: 'Rs 24,000 ($80)', idealFor: '4-6 Passengers, Surfboards & Bags', image: '🚐' },
      { type: 'Luxury High-Roof Van', subType: 'Toyota KDH Luxury High-Roof', colomboPrice: 'Rs 25,000 ($83)', airportPrice: 'Rs 27,000 ($90)', idealFor: '7-10 Passengers, Surf kits & heavy bags', image: '🚐' },
      { type: 'Luxury SUV', subType: 'Toyota Prado / Land Cruiser', colomboPrice: 'Rs 32,000 ($107)', airportPrice: 'Rs 35,000 ($117)', idealFor: '3-4 Passengers, spacious and comfortable', image: '🚙' }
    ]
  },
  {
    id: 'colombo-to-hiriketiya',
    title: 'Hiriketiya Horseshoe Surf Corridor',
    toName: 'Hiriketiya Beach',
    fromName: 'Colombo City / CMB Airport',
    distance: '195 km',
    duration: '3 Hours',
    expressway: 'Direct via Southern Expressway Exit 3 (Toll Included)',
    vehicles: [
      { type: 'Mini Car', subType: 'Suzuki Wagon R / Primo', colomboPrice: 'Rs 19,500 ($65)', airportPrice: 'Rs 22,000 ($73)', idealFor: '2-3 Passengers, Light Luggage', image: '🚗' },
      { type: 'Sedan / Eco Car', subType: 'Toyota Axio / Allion', colomboPrice: 'Rs 22,000 ($73)', airportPrice: 'Rs 24,500 ($82)', idealFor: '3-4 Passengers, Standard Bags', image: '🚘' },
      { type: 'Mini Van (Dual AC)', subType: 'Toyota Every / KDH', colomboPrice: 'Rs 26,000 ($87)', airportPrice: 'Rs 28,500 ($95)', idealFor: '4-6 Passengers, Surfboard Racks & Bags', image: '🚐' },
      { type: 'Luxury High-Roof Van', subType: 'Toyota KDH Luxury High-Roof', colomboPrice: 'Rs 29,500 ($98)', airportPrice: 'Rs 32,000 ($107)', idealFor: '7-10 Passengers, Group gear & Surfboards', image: '🚐' },
      { type: 'Luxury SUV', subType: 'Toyota Prado / Land Cruiser', colomboPrice: 'Rs 37,000 ($123)', airportPrice: 'Rs 40,000 ($133)', idealFor: '3-4 Passengers, spacious and comfortable', image: '🚙' }
    ]
  },
  {
    id: 'colombo-to-weligama',
    title: 'Weligama Stilt Fishing & Surf Route',
    toName: 'Weligama Beach',
    fromName: 'Colombo City / CMB Airport',
    distance: '142 km',
    duration: '2 Hours 15 Mins',
    expressway: 'Direct via E01 Southern Expressway Weligama Exit (Toll Included)',
    vehicles: [
      { type: 'Mini Car', subType: 'Suzuki Wagon R / Primo', colomboPrice: 'Rs 15,500 ($52)', airportPrice: 'Rs 18,000 ($60)', idealFor: '2-3 Passengers, Lightweight Suitcase', image: '🚗' },
      { type: 'Sedan / Eco Car', subType: 'Toyota Axio / Allion', colomboPrice: 'Rs 18,000 ($60)', airportPrice: 'Rs 20,000 ($67)', idealFor: '3-4 Passengers, standard Bags', image: '🚘' },
      { type: 'Mini Van (Dual AC)', subType: 'Toyota Every / KDH', colomboPrice: 'Rs 21,500 ($72)', airportPrice: 'Rs 23,500 ($78)', idealFor: '4-6 Passengers, perfect surfboards setup', image: '🚐' },
      { type: 'Luxury High-Roof Van', subType: 'Toyota KDH Luxury High-Roof', colomboPrice: 'Rs 24,500 ($82)', airportPrice: 'Rs 26,500 ($88)', idealFor: '7-10 Passengers, Surf groups & bags', image: '🚐' },
      { type: 'Luxury SUV', subType: 'Toyota Prado / Land Cruiser', colomboPrice: 'Rs 31,500 ($105)', airportPrice: 'Rs 34,500 ($115)', idealFor: '3-4 Passengers, spacious and comfortable', image: '🚙' }
    ]
  },
  {
    id: 'colombo-to-galle',
    title: 'Galle Fort Portuguese & Dutch Highway',
    toName: 'Galle Fort',
    fromName: 'Colombo City / CMB Airport',
    distance: '125 km',
    duration: '2 Hours',
    expressway: 'Direct via Southern Expressway Galle Exit (Toll Included)',
    vehicles: [
      { type: 'Mini Car', subType: 'Suzuki Wagon R / Primo', colomboPrice: 'Rs 14,000 ($47)', airportPrice: 'Rs 16,500 ($55)', idealFor: '2-3 Passengers, Couple day tour', image: '🚗' },
      { type: 'Sedan / Eco Car', subType: 'Toyota Axio / Allion', colomboPrice: 'Rs 16,500 ($55)', airportPrice: 'Rs 18,500 ($62)', idealFor: '3-4 Passengers, standard luggage load', image: '🚘' },
      { type: 'Mini Van (Dual AC)', subType: 'Toyota Every / KDH', colomboPrice: 'Rs 19,500 ($65)', airportPrice: 'Rs 21,500 ($72)', idealFor: '4-6 Passengers, multi-room comfort', image: '🚐' },
      { type: 'Luxury High-Roof Van', subType: 'Toyota KDH Luxury High-Roof', colomboPrice: 'Rs 22,500 ($75)', airportPrice: 'Rs 24,500 ($82)', idealFor: '7-10 Passengers, family tours', image: '🚐' },
      { type: 'Luxury SUV', subType: 'Toyota Prado / Land Cruiser', colomboPrice: 'Rs 29,000 ($97)', airportPrice: 'Rs 32,000 ($107)', idealFor: '3-4 Passengers, spacious and comfortable', image: '🚙' }
    ]
  },
  {
    id: 'colombo-to-sigiriya',
    title: 'Sigiriya Cultural Sky Citadel Tour',
    toName: 'Sigiriya Rock Fortress',
    fromName: 'Colombo City / CMB Airport',
    distance: '175 km',
    duration: '4 Hours',
    expressway: 'Scenic intercity route via Dambulla (All highway tolls included)',
    vehicles: [
      { type: 'Mini Car', subType: 'Suzuki Wagon R / Primo', colomboPrice: 'Rs 18,500 ($62)', airportPrice: 'Rs 21,000 ($70)', idealFor: '2-3 Passengers, light traveling', image: '🚗' },
      { type: 'Sedan / Eco Car', subType: 'Toyota Axio / Allion', colomboPrice: 'Rs 21,000 ($70)', airportPrice: 'Rs 23,500 ($78)', idealFor: '3-4 Passengers, standard suitcases', image: '🚘' },
      { type: 'Mini Van (Dual AC)', subType: 'Toyota Every / KDH', colomboPrice: 'Rs 25,000 ($83)', airportPrice: 'Rs 27,500 ($92)', idealFor: '4-6 Passengers, deep country sightseeing', image: '🚐' },
      { type: 'Luxury High-Roof Van', subType: 'Toyota KDH Luxury High-Roof', colomboPrice: 'Rs 28,500 ($95)', airportPrice: 'Rs 31,000 ($103)', idealFor: '7-10 Passengers, large group tours', image: '🚐' },
      { type: 'Luxury SUV', subType: 'Toyota Prado / Land Cruiser', colomboPrice: 'Rs 36,000 ($120)', airportPrice: 'Rs 39,000 ($130)', idealFor: '3-4 Passengers, spacious and comfortable', image: '🚙' }
    ]
  },
  {
    id: 'colombo-to-ella',
    title: 'Ella Scenic Mountain Cloud Gateway',
    toName: 'Ella Gateway',
    fromName: 'Colombo City / CMB Airport',
    distance: '225 km',
    duration: '5.5 Hours',
    expressway: 'Southern Expressway + scenic Ella mountain gap drive (Toll Included)',
    vehicles: [
      { type: 'Mini Car', subType: 'Suzuki Wagon R / Primo', colomboPrice: 'Rs 23,000 ($77)', airportPrice: 'Rs 25,500 ($85)', idealFor: '2-3 Passengers, light mountain gear', image: '🚗' },
      { type: 'Sedan / Eco Car', subType: 'Toyota Axio / Allion', colomboPrice: 'Rs 26,000 ($87)', airportPrice: 'Rs 28,500 ($95)', idealFor: '3-4 Passengers, luxury climate control', image: '🚘' },
      { type: 'Mini Van (Dual AC)', subType: 'Toyota Every / KDH', colomboPrice: 'Rs 31,000 ($103)', airportPrice: 'Rs 33,500 ($112)', idealFor: '4-6 Passengers, alpine cargo luggage', image: '🚐' },
      { type: 'Luxury High-Roof Van', subType: 'Toyota KDH Luxury High-Roof', colomboPrice: 'Rs 35,000 ($117)', airportPrice: 'Rs 37,500 ($125)', idealFor: '7-10 Passengers, active group trackers', image: '🚐' },
      { type: 'Luxury SUV', subType: 'Toyota Prado / Land Cruiser', colomboPrice: 'Rs 44,000 ($147)', airportPrice: 'Rs 47,000 ($157)', idealFor: '3-4 Passengers, spacious and comfortable', image: '🚙' }
    ]
  },
  {
    id: 'ella-to-arugam-bay',
    title: 'Ella to Arugam Bay Surf Pioneer',
    toName: 'Arugam Bay Surf Coast',
    fromName: 'Ella Scenic Highlands',
    distance: '134 km',
    duration: '3 Hours',
    expressway: 'Direct scenic overland road via Lahugala Elephant Forest (Toll Included)',
    vehicles: [
      { type: 'Mini Car', subType: 'Suzuki Wagon R / Primo', colomboPrice: 'Rs 15,000 ($45)', airportPrice: 'Rs 15,000 ($45)', idealFor: '2-3 Passengers, Light Luggage', image: '🚗' },
      { type: 'Sedan / Eco Car', subType: 'Toyota Axio / Allion', colomboPrice: 'Rs 17,500 ($52)', airportPrice: 'Rs 17,500 ($52)', idealFor: '3-4 Passengers, Standard Bags', image: '🚘' },
      { type: 'Mini Van (Dual AC)', subType: 'Toyota Every / KDH', colomboPrice: 'Rs 21,500 ($64)', airportPrice: 'Rs 21,500 ($64)', idealFor: '4-6 Passengers, Surfboards & Bags', image: '🚐' },
      { type: 'Luxury High-Roof Van', subType: 'Toyota KDH Luxury High-Roof', colomboPrice: 'Rs 24,500 ($73)', airportPrice: 'Rs 24,500 ($73)', idealFor: '7-10 Passengers, Surf kits & heavy bags', image: '🚐' },
      { type: 'Luxury SUV', subType: 'Toyota Prado / Land Cruiser', colomboPrice: 'Rs 29,500 ($87)', airportPrice: 'Rs 29,500 ($87)', idealFor: '3-4 Passengers, spacious and comfortable', image: '🚙' }
    ]
  }
];

// Highlighted cities details for exploration cards
interface CityDetail {
  name: string;
  image: string;
  brief: string;
  stay: string;
  thingsToDo: string[];
  signatureExperience: string;
}

const CITIES_DATA: CityDetail[] = [
  {
    name: "Ella",
    image: "/WhatsApp Image 2026-06-02 at 04.09.18.jpeg",
    brief: "The mystic mountain village surrounded by lush tea-country peaks, rushing waterfalls, and the spectacular 19th-century Nine Arch Viaduct railway bridge.",
    stay: "2 Nights Recommended",
    thingsToDo: [
      "Hike Little Adam's Peak at sunrise",
      "Stroll the architectural masterwork of Demodara Nine Arch Bridge",
      "Rejuvenate under the spray of organic Ravana Waterfalls",
      "Take a private ceylon cookery masterclass with a village chef"
    ],
    signatureExperience: "A private mountain sunset chalet stay with fully-pane glass walls looking directly out over the dramatic southern plains Ella Gap."
  },
  {
    name: "Dambulla",
    image: "/WhatsApp Image 2026-06-02 at 04.09.34.jpeg",
    brief: "The beautiful centerpiece of the Cultural Triangle, home to the largest stone cave temple in South Asia.",
    stay: "1 Night Recommended",
    thingsToDo: [
      "Ascend to the Sacred Golden cave temples",
      "Gaze at the 15-meter colossal reclining hand-carved stone Buddha",
      "Visit the vibrant local organic vegetable auction hub",
      "Tour the ancient Ibbankatuwa megalithic burial grounds"
    ],
    signatureExperience: "Sunset kayak ride in the tranquil Kandalama Lake, silhouetting the iconic Geoffrey Bawa-designed architectural marvel, Heritance Kandalama."
  },
  {
    name: "Sigiriya",
    image: "/WhatsApp Image 2026-06-02 at 04.09.45.jpeg",
    brief: "A theatrical 200-meter sheer ancient stone column housing King Kassapa's legendary imperial sky-palace, guarded by colossal lion paws.",
    stay: "2 Nights Recommended",
    thingsToDo: [
      "Scale the Lion Fortress through historic step-paths at dawn",
      "Marvel at the highly preserved 5th-century fresco paintings of maidens",
      "Explore the symmetrical symmetrical Royal Water Gardens list",
      "Hike the neighbouring Pidurangala Rock for breathtaking epic vistas of Sigiriya"
    ],
    signatureExperience: "Private Champagne toast in a hot-air balloon floating silently over the canopy of the Sigiriya forest Reserve at first light."
  },
  {
    name: "Nuwara Eliya",
    image: "/WhatsApp Image 2026-06-02 at 04.09.46 (1).jpeg",
    brief: "A cool-climate mountain city nicknamed 'Little England', famous for its green tea gardens, old stone houses, and beautiful golf courses.",
    stay: "2 Nights Recommended",
    thingsToDo: [
      "Pluck premium leaves on a private organic single-estate tea tour",
      "Stroll the serene banks and floral pathways of Lake Gregory",
      "Dine in authentic 19th-century colonial luxury at the Hill Club",
      "Witness colonial architecture at the pink brick Post Office"
    ],
    signatureExperience: "Premium custom tea-cupping masterclass led by a legendary Master Teamaker inside a heritage 1904 factory tasting room."
  },
  {
    name: "Kandy",
    image: "/WhatsApp Image 2026-06-02 at 04.09.46 (2).jpeg",
    brief: "The royal mountain capital, hosting the revered gold-canopied Shrine of the Tooth Relic, draped around a tranquil, mist-shrouded ornamental center lake.",
    stay: "1 Night Recommended",
    thingsToDo: [
      "Witness ancient, sacred evening drum puja ceremonies at the temple",
      "Wander through the botanical oasis of Royal Gardens in Peradeniya",
      "Drive to the spectacular towering Bahirawakanda hilltop Buddha",
      "Watch the intense traditional Kandyan acrobatic fire dancers"
    ],
    signatureExperience: "Exclusively escorted private walk with the senior curator of the Royal Botanical Gardens, exploring century-old orchid collection glasshouses."
  },
  {
    name: "Weligama",
    image: "/surfing-in-weligama-scaled.jpg",
    brief: "The golden curving sandy bay of the south, where world-class beginner surf waves meet deep-sea marine migration and heritage stilt fishermen.",
    stay: "2 Nights Recommended",
    thingsToDo: [
      "Take a professional surf lesson on Weligama's soft sand bars",
      "Photograph the timeless stilt fishermen casting nets at sunset",
      "Savor freshly caught ocean lobsters cooked directly over coconut husks",
      "Swim and dive around the beautiful coral reefs in the south"
    ],
    signatureExperience: "Dawn catamaran marine expedition to safely observe the majestic Blue Whales off the coast of Mirissa with a marine conservationist guide."
  }
];

const REVIEWS_DATA = [
  {
    name: "Alice Dyke",
    location: "10 reviews • 3 months ago",
    stars: 5,
    text: "We did two different journeys travelling a long distance. Ishara is lovely, speaks great English, and the car is clean, comfortable and very good seatbelts. Really recommend.",
    avatar: "AD"
  },
  {
    name: "Amalie Vagen",
    location: "1 review • 3 months ago",
    stars: 5,
    text: "Everything went perfect on our trip from Mirissa to Ella. Very kind and good driver. I would very much recommend.",
    avatar: "AV"
  },
  {
    name: "Jessica Ho",
    location: "1 review • 5 months ago",
    stars: 5,
    text: "A safe and excellent driver who knew the area very well. He shared wonderful recommendations and even arranged excursions for us, which made our trip much easier.. Definitely recommend him!",
    avatar: "JH"
  },
  {
    name: "Nikolaus Wendl",
    location: "Local Guide • 24 reviews • 3 months ago",
    stars: 5,
    text: "Great driver! On time - clean car - will book him again when I am coming back :)",
    avatar: "NW"
  }
];

interface GalleryPhoto {
  id: number;
  title: string;
  category: 'wildlife' | 'beaches' | 'heritage';
  image: string;
  location: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    title: "Nine Arch Railway Bridge",
    category: 'heritage',
    image: "/WhatsApp Image 2026-06-02 at 04.09.46 (4).jpeg",
    location: "Ella Village"
  },
  {
    id: 2,
    title: "Misty Caves of Dambulla",
    category: 'heritage',
    image: "/WhatsApp Image 2026-06-02 at 04.09.46 (6).jpeg",
    location: "Dambulla"
  },
  {
    id: 3,
    title: "Ancient Kandy Kingdom Viewpoint",
    category: 'heritage',
    image: "/WhatsApp Image 2026-06-02 at 04.09.46 (7).jpeg",
    location: "Kandy"
  },
  {
    id: 4,
    title: "Lush Tea Gardens",
    category: 'heritage',
    image: "/WhatsApp Image 2026-06-02 at 04.09.46 (8).jpeg",
    location: "Nuwara Eliya Hills"
  },
  {
    id: 5,
    title: "Imperial Sigiriya Fortress",
    category: 'heritage',
    image: "/WhatsApp Image 2026-06-02 at 04.09.46 (9).jpeg",
    location: "Sigiriya"
  },
  {
    id: 6,
    title: "Heritage Tour",
    category: 'heritage',
    image: "/WhatsApp Image 2026-06-02 at 04.09.46 (10).jpeg",
    location: "Sri Lanka"
  },
  {
    id: 7,
    title: "Cultural Landmark",
    category: 'heritage',
    image: "/WhatsApp Image 2026-06-02 at 04.09.46 (12).jpeg",
    location: "Sri Lanka"
  },
  {
    id: 8,
    title: "Historic Site",
    category: 'heritage',
    image: "/WhatsApp Image 2026-06-02 at 04.09.46.jpeg",
    location: "Sri Lanka"
  }
];

export default function App() {
  // Navigation active focus
  const [activeTab, setActiveTab] = useState('home');

  // Interactive plan states
  const [fromText, setFromText] = useState('Colombo Airport (CMB)');
  const [toText, setToText] = useState('Weligama');
  const [stops, setStops] = useState<string[]>([]);
  const [days, setDays] = useState(3);
  const [guests, setGuests] = useState(2);
  const [interests, setInterests] = useState<string[]>(['beaches', 'culture']);
  const [tripType, setTripType] = useState('round-trip');
  const [safariLocation, setSafariLocation] = useState('Yala National Park');
  const [arrivalTime, setArrivalTime] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [pickupDate, setPickupDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [dropoffDate, setDropoffDate] = useState<string>(() => {
    const future = new Date();
    future.setDate(future.getDate() + 7);
    return future.toISOString().split('T')[0];
  });

  // UI state managers
  const [activeSuggestionField, setActiveSuggestionField] = useState<'from' | 'to' | number | null>(null);
  const [suggestionQuery, setSuggestionQuery] = useState('');
  const [wizardStep, setWizardStep] = useState<'form' | 'contact' | 'success'>('form');
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<'all' | 'wildlife' | 'beaches' | 'heritage'>('all');
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<any | null>(null);

  // Contact form submission state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedCityDetail, setSelectedCityDetail] = useState<CityDetail | null>(null);
  const [directMessageSuccess, setDirectMessageSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  // Horizontal reviews slider position indicator
  const [reviewIndex, setReviewIndex] = useState(0);

  // Interactive SEO Travel Guide active question index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Enforce 1 day duration for single-day tours, safari, and airport transfer
  useEffect(() => {
    if (tripType === 'day-trip' || tripType === 'safari' || tripType === 'airport-transfer') {
      setDays(1);
    }
  }, [tripType]);

  // Synchronize trip days based on pick up and drop off dates for Round Trip
  useEffect(() => {
    if (tripType === 'round-trip') {
      const d1 = new Date(pickupDate);
      const d2 = new Date(dropoffDate);
      if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
        const diffTime = d2.getTime() - d1.getTime();
        let calculatedDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        if (calculatedDays < 1) calculatedDays = 1;
        setDays(calculatedDays);
      }
    }
  }, [pickupDate, dropoffDate, tripType]);

  // Google Maps and Auto-suggest states
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [autocompleteService, setAutocompleteService] = useState<any>(null);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<any[]>(SRI_LANKA_DESTINATIONS.slice(0, 5));
  const [selectedTaxiRouteId, setSelectedTaxiRouteId] = useState('colombo-to-mirissa');

  // Interactive Custom Transfer Form States
  const [transferType, setTransferType] = useState<'airport' | 'intercity'>('airport');
  const [airportTransferDirection, setAirportTransferDirection] = useState<'from-airport' | 'to-airport'>('from-airport');
  const [selectedAirportCode, setSelectedAirportCode] = useState('Colombo Airport (CMB)');
  const [selectedCityName, setSelectedCityName] = useState('Kandy');
  const [selectedIntercityOrigin, setSelectedIntercityOrigin] = useState('Colombo');
  const [selectedIntercityDest, setSelectedIntercityDest] = useState('Galle');

  useEffect(() => {
    const MAPS_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
    if (!MAPS_KEY) {
      console.log('No Google Maps API Key found, operating in high-fidelity offline lookup mode.');
      return;
    }

    if ((window as any).google && (window as any).google.maps) {
      setGoogleMapsLoaded(true);
      try {
        setAutocompleteService(new (window as any).google.maps.places.AutocompleteService());
      } catch (e) {
        console.error('Error instantiating autocomplete service:', e);
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-places-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGoogleMapsLoaded(true);
      try {
        if ((window as any).google && (window as any).google.maps) {
          setAutocompleteService(new (window as any).google.maps.places.AutocompleteService());
        }
      } catch (e) {
        console.error('Error instantiating loaded autocomplete service:', e);
      }
    };
    script.onerror = (e) => {
      console.error('Google Maps places script load failed, falling back to static offline database.', e);
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!suggestionQuery) {
      setDynamicSuggestions(SRI_LANKA_DESTINATIONS.slice(0, 15));
      return;
    }

    if (autocompleteService) {
      autocompleteService.getPlacePredictions({
        input: suggestionQuery,
        componentRestrictions: { country: 'lk' }
      }, (predictions: any, status: any) => {
        if (status === 'OK' && predictions) {
          const formatted = predictions.map((p: any) => ({
            name: p.description,
            region: p.structured_formatting?.secondary_text || 'Sri Lanka',
            description: 'Google Maps Match • tap to choose',
            coordinates: { x: 200, y: 350 }
          }));
          setDynamicSuggestions(formatted);
        } else {
          // fallback to static filter list
          const localFiltered = SRI_LANKA_DESTINATIONS.filter(item => 
            item.name.toLowerCase().includes(suggestionQuery.toLowerCase()) || 
            item.region.toLowerCase().includes(suggestionQuery.toLowerCase())
          );
          setDynamicSuggestions(localFiltered);
        }
      });
    } else {
      // Offline fallback filtration
      const localFiltered = SRI_LANKA_DESTINATIONS.filter(item => 
        item.name.toLowerCase().includes(suggestionQuery.toLowerCase()) || 
        item.region.toLowerCase().includes(suggestionQuery.toLowerCase())
      );
      setDynamicSuggestions(localFiltered);
    }
  }, [suggestionQuery, autocompleteService]);



  // Auto scroll reviews ticker
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, []);

  const handleInterestToggle = (id: string) => {
    if (interests.includes(id)) {
      setInterests(interests.filter(item => item !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleAddStop = () => {
    setStops([...stops, '']);
  };

  const handleRemoveStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleUpdateStopValue = (index: number, val: string) => {
    const updated = [...stops];
    updated[index] = val;
    setStops(updated);
    setSuggestionQuery(val);
    setActiveSuggestionField(index);
  };

  // Safe smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(id);
    }
  };

  // Custom filter helper for autocomplete suggestions
  const getFilteredSuggestions = (queryStr: string) => {
    return dynamicSuggestions;
  };

  const handleSubmitInitialPlan = (e: FormEvent) => {
    e.preventDefault();
    setWizardStep('contact');
  };

  const finalizeTripBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;
    setWizardStep('success');
  };

  const getWhatsAppLink = () => {
    const baseText = `Hi! My name is ${clientName}. I just generated a ${days}-day plan from ${fromText} to ${toText}.`;
    let timeInfo = '';
    if (tripType === 'airport-transfer') {
      timeInfo = ` Arrival Date: ${pickupDate}.`;
      if (arrivalTime) {
        timeInfo += ` Arrival time is ${arrivalTime}${flightNumber ? ` (Flight ${flightNumber})` : ''}.`;
      }
    } else if (tripType === 'round-trip') {
      timeInfo = ` Dates: ${pickupDate} to ${dropoffDate}. Pick Up Time: ${pickupTime || 'N/A'}, Drop Off Time: ${dropoffTime || 'N/A'}.`;
    } else if (tripType === 'day-trip' || tripType === 'safari') {
      timeInfo = ` Traveling Date: ${pickupDate}. Pick Up Time: ${pickupTime || 'N/A'}, Drop Off Time: ${dropoffTime || 'N/A'}.`;
    } else {
      timeInfo = ` Traveling Date: ${pickupDate}. Pick Up Time: ${pickupTime || 'N/A'}, Drop Off Time: ${dropoffTime || 'N/A'}.`;
    }
    return `https://wa.me/94713800084?text=${encodeURIComponent(baseText + timeInfo + " Let's discuss!")}`;
  };



  const isAirportSelected = 
    fromText.toLowerCase().includes('airport') || 
    toText.toLowerCase().includes('airport') || 
    stops.some(s => s.toLowerCase().includes('airport'));

  // Live Pricing Estimation based on real geographic coordinates of Sri Lanka and modern vehicle tiers
  const computePriceAndInfo = () => {
    let startName = "";
    let endName = "";

    if (transferType === 'airport') {
      if (airportTransferDirection === 'from-airport') {
        startName = selectedAirportCode;
        endName = selectedCityName;
      } else {
        startName = selectedCityName;
        endName = selectedAirportCode;
      }
    } else {
      startName = selectedIntercityOrigin;
      endName = selectedIntercityDest;
    }

    const startLoc = SRI_LANKA_DESTINATIONS.find(d => d.name === startName);
    const endLoc = SRI_LANKA_DESTINATIONS.find(d => d.name === endName);

    // Preset distances between major cities for 100% accuracy matching pickuptaxisrilanka.com and real highways
    const getPresetDistance = (from: string, to: string): number | null => {
      const f = from.toLowerCase();
      const t = to.toLowerCase();

      const routes: { [key: string]: number } = {
        // Colombo Airport (CMB) presets
        'colombo airport (cmb)|galle': 150,
        'colombo airport (cmb)|mirissa': 180,
        'colombo airport (cmb)|weligama': 175,
        'colombo airport (cmb)|hiriketiya': 210,
        'colombo airport (cmb)|sigiriya': 160,
        'colombo airport (cmb)|ella': 225,
        'colombo airport (cmb)|kandy': 105,
        'colombo airport (cmb)|nuwara eliya': 165,
        'colombo airport (cmb)|colombo': 35,
        'colombo airport (cmb)|negombo': 15,
        'colombo airport (cmb)|hikkaduwa': 140,
        'colombo airport (cmb)|unawatuna': 155,
        'colombo airport (cmb)|tangalle': 212,
        'colombo airport (cmb)|yala': 260,
        'colombo airport (cmb)|arugam bay': 335,
        'colombo airport (cmb)|trincomalee': 240,
        'colombo airport (cmb)|pasikudah': 265,
        'colombo airport (cmb)|dambulla': 148,
        'colombo airport (cmb)|anuradhapura': 170,
        'colombo airport (cmb)|polonnaruwa': 195,
        'colombo airport (cmb)|udawalawe': 185,

        // Colombo City presets
        'colombo|galle': 125,
        'colombo|mirissa': 150,
        'colombo|weligama': 142,
        'colombo|hiriketiya': 195,
        'colombo|sigiriya': 175,
        'colombo|ella': 225,
        'colombo|kandy': 115,
        'colombo|nuwara eliya': 160,
        'colombo|hikkaduwa': 100,
        'colombo|unawatuna': 120,
        'colombo|tangalle': 190,
        'colombo|yala': 240,
        'colombo|negombo': 38,
        'colombo|arugam bay': 320,
        'colombo|trincomalee': 260,
        'colombo|pasikudah': 290,
        'colombo|dambulla': 160,
        'colombo|anuradhapura': 200,
        'colombo|polonnaruwa': 220,
        'colombo|udawalawe': 165,

        // Ella presets
        'ella|arugam bay': 134,
        'ella|galle': 190,
        'ella|mirissa': 180,
        'ella|weligama': 185,
        'ella|hiriketiya': 135,
        'ella|tangalle': 140,
        'ella|kandy': 115,
        'ella|nuwara eliya': 55,
        'ella|sigiriya': 175,
        'ella|yala': 100,
        'ella|udawalawe': 95,
        'ella|dambulla': 160,
        'ella|pasikudah': 185,

        // Kandy presets
        'kandy|nuwara eliya': 75,
        'kandy|sigiriya': 75,
        'kandy|dambulla': 72,
        'kandy|galle': 220,
        'kandy|mirissa': 230,
        'kandy|arugam bay': 210,
        'kandy|trincomalee': 135,
        'kandy|yala': 180,
        'kandy|negombo': 115,

        // Nuwara Eliya presets
        'nuwara eliya|sigiriya': 148,
        'nuwara eliya|galle': 235,
        'nuwara eliya|mirissa': 240,
        'nuwara eliya|arugam bay': 180,
        'nuwara eliya|yala': 140,

        // Galle presets
        'galle|mirissa': 35,
        'galle|weligama': 30,
        'galle|hiriketiya': 70,
        'galle|tangalle': 80,
        'galle|yala': 150,
        'galle|arugam bay': 240,
        'galle|trincomalee': 360,
        'galle|sigiriya': 270,
        'galle|dambulla': 250,
        'galle|unawatuna': 6,
        'galle|hikkaduwa': 20,

        // Other key presets
        'sigiriya|dambulla': 18,
        'sigiriya|trincomalee': 100,
        'sigiriya|arugam bay': 220,
        'yala|arugam bay': 135,
      };

      const key1 = `${f}|${t}`;
      const key2 = `${t}|${f}`;

      if (routes[key1] !== undefined) return routes[key1];
      if (routes[key2] !== undefined) return routes[key2];

      return null;
    };

    let distanceKm = 10;
    const presetDist = getPresetDistance(startName, endName);
    if (presetDist !== null) {
      distanceKm = presetDist;
    } else if (startLoc && endLoc) {
      const dx = startLoc.coordinates.x - endLoc.coordinates.x;
      // Normalizing the geographic vertical scale stretching of the map by 0.65
      const dy = (startLoc.coordinates.y - endLoc.coordinates.y) * 0.65;
      const rawDist = Math.sqrt(dx * dx + dy * dy);
      
      // Dynamic winding road multiplier based on topography
      const isMountainRegion = (region: string) => 
        region === 'Central Province' || 
        region === 'Central Highlands' || 
        region === 'Uva Province' || 
        region === 'Sabaragamuwa';

      const bothMountainous = isMountainRegion(startLoc.region) && isMountainRegion(endLoc.region);
      const eitherMountainous = isMountainRegion(startLoc.region) || isMountainRegion(endLoc.region);

      let multiplier = 1.35;
      if (bothMountainous) {
        multiplier = 1.6; // Heavy hill country curves
      } else if (eitherMountainous) {
        multiplier = 1.45; // Accessing mountain passes
      }

      distanceKm = Math.max(15, Math.round(rawDist * multiplier));
    }

    if (startName === endName) {
      distanceKm = 0;
    }

    const rates = [
      {
        type: 'Small Car',
        subType: 'Suzuki Wagon R / Alto / Primo',
        ratePerKm: 95,
        minFare: 6000,
        ideal: 'Solo or Couples (2-3 Passengers, Light Luggage)'
      },
      {
        type: 'Sedan Car',
        subType: 'Toyota Axio / Allion / Prius',
        ratePerKm: 110,
        minFare: 7500,
        ideal: 'Comfortable for up to 3-4 passengers, standard luggage'
      },
      {
        type: 'Mini Van',
        subType: 'Toyota Every / Nomad / Dual AC',
        ratePerKm: 130,
        minFare: 9500,
        ideal: 'Great for surfboards & groups up to 4-6 passengers'
      },
      {
        type: 'KDH Flat Roof Van',
        subType: 'Toyota KDH Flat Roof Standard',
        ratePerKm: 150,
        minFare: 11500,
        ideal: 'Perfect for surf groups & families (up to 6-8 people)'
      },
      {
        type: 'KDH High Roof Van',
        subType: 'Toyota KDH Luxury High-Roof',
        ratePerKm: 180,
        minFare: 13500,
        ideal: 'Ideal for premium/large families with heavy luggage (up to 10 guests)'
      }
    ];

    // Airport highway entry & services surcharge factor
    const isAirport = startName.toLowerCase().includes('airport') || endName.toLowerCase().includes('airport');

    // Southern Province expressway toll allocation
    const isSouthern = (startLoc?.region === 'Southern Province' || endLoc?.region === 'Southern Province');

    return {
      startName,
      endName,
      distanceKm,
      vehicles: rates.map(r => {
        let baseSurcharge = 1000;
        if (isAirport) {
          baseSurcharge = 2500; // Includes Katunayake Expressway tolls & extra city linkage
        }
        if (isSouthern) {
          baseSurcharge += 1500; // Adds Southern Expressway tolls
        }

        const calculated = baseSurcharge + (distanceKm * r.ratePerKm);
        const priceLkr = distanceKm === 0 ? 0 : Math.round(Math.max(r.minFare, calculated) / 500) * 500;
        const priceUsd = distanceKm === 0 ? "0.00" : (priceLkr / 337.75).toFixed(2);
        return {
          type: r.type,
          subType: r.subType,
          priceLkr,
          priceUsd,
          ideal: r.ideal
        };
      })
    };
  };

  const transferData = computePriceAndInfo();

  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans overflow-x-hidden selection:bg-[#477637] selection:text-white">
      
      {/* Premium Floating Header Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-emerald-100/80 transition-all duration-300 shadow-xs">
        <div id="navigation_bar" className="max-w-full mx-auto pl-0 pr-2 sm:pr-4 lg:pr-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Elegant Display Logo (On the left) */}
          <div 
            onClick={() => scrollToId('home')} 
            className="flex items-center cursor-pointer select-none group h-full py-1.5 sm:py-2 shrink-0 pr-12 lg:pr-24"
            id="app_logo"
          >
            <img src="/logo-king.png" alt="Journey of Ceylon" className="h-[120%] lg:h-[150%] w-auto object-contain origin-left overflow-visible" />
          </div>

          {/* Nav Links */}
          <nav className="hidden xl:flex items-center gap-2 lg:gap-4 xl:gap-6 text-[10px] md:text-xs lg:text-sm font-semibold tracking-wide overflow-x-auto no-scrollbar">
            <button 
              id="nav-link-home"
              onClick={() => scrollToId('home')} 
              className={`hover:text-[#477637] transition-colors p-2 relative ${activeTab === 'home' ? 'text-[#477637]' : 'text-slate-600'}`}
            >
              Home
              {activeTab === 'home' && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#477637] rounded-full" />}
            </button>
            <button 
              id="nav-link-plan"
              onClick={() => scrollToId('plan-trip')} 
              className={`hover:text-[#477637] transition-colors p-2 relative ${activeTab === 'plan-trip' ? 'text-[#477637]' : 'text-slate-600'}`}
            >
              Plan Custom Trip
              {activeTab === 'plan-trip' && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#477637] rounded-full" />}
            </button>
            <button 
              id="nav-link-taxi"
              onClick={() => scrollToId('taxi-service')} 
              className={`hover:text-[#477637] transition-colors p-2 relative ${activeTab === 'taxi-service' ? 'text-[#477637]' : 'text-slate-600'}`}
            >
              Express Taxi
              {activeTab === 'taxi-service' && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#477637] rounded-full" />}
            </button>
            <button 
              id="nav-link-explore"
              onClick={() => scrollToId('explore-cities')} 
              className={`hover:text-[#477637] transition-colors p-2 relative ${activeTab === 'explore-cities' ? 'text-[#477637]' : 'text-slate-600'}`}
            >
              Explore Cities
              {activeTab === 'explore-cities' && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#477637] rounded-full" />}
            </button>
            <button 
              id="nav-link-why"
              onClick={() => scrollToId('why-joc')} 
              className={`hover:text-[#477637] transition-colors p-2 relative ${activeTab === 'why-joc' ? 'text-[#477637]' : 'text-slate-600'}`}
            >
              Why JOC?
              {activeTab === 'why-joc' && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#477637] rounded-full" />}
            </button>
            <button 
              id="nav-link-seo-guide"
              onClick={() => scrollToId('seo-guide')} 
              className={`hover:text-[#477637] transition-colors p-2 relative ${activeTab === 'seo-guide' ? 'text-[#477637]' : 'text-slate-600'}`}
            >
              Travel Advisor
              {activeTab === 'seo-guide' && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#477637] rounded-full" />}
            </button>
            <button 
              id="nav-link-reviews"
              onClick={() => scrollToId('reviews')} 
              className={`hover:text-[#477637] transition-colors p-2 relative ${activeTab === 'reviews' ? 'text-[#477637]' : 'text-slate-600'}`}
            >
              Guest Reviews
              {activeTab === 'reviews' && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#477637] rounded-full" />}
            </button>
          </nav>

          {/* Quick Action Button & Mobile Menu Toggle (On the right) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 mr-1 sm:mr-4">
            <a 
              id="header_whatsapp_direct"
              href="https://wa.me/94713800084?text=Hello%20Journey%20of%20Ceylon!%20I%20would%20like%20to%20enquire%20about%20a%20luxury%20private%20custom%20trip%20across%20Sri%20Lanka."
              target="_blank"
              rel="noreferrer"
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border border-[#477637] text-[#477637] hover:bg-[#477637] hover:text-white transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Enquire Now</span>
            </a>
            <button 
              className="xl:hidden p-1 sm:p-2 text-slate-700 hover:text-[#477637] hover:bg-slate-50 border border-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#477637]/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          className={`xl:hidden absolute top-full left-0 w-full bg-white border-b border-emerald-100/80 shadow-lg transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col gap-1.5">
            {[
              { id: 'home', label: 'Home' },
              { id: 'plan-trip', label: 'Plan Custom Trip' },
              { id: 'taxi-service', label: 'Express Taxi' },
              { id: 'explore-cities', label: 'Explore Cities' },
              { id: 'why-joc', label: 'Why JOC?' },
              { id: 'seo-guide', label: 'Travel Advisor' },
              { id: 'reviews', label: 'Guest Reviews' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToId(item.id);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-semibold rounded-xl text-left transition-colors ${
                  activeTab === item.id 
                    ? 'text-[#477637] bg-[#477637]/10' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero / Intro Section */}
      <section 
        id="home" 
        className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 bg-[#f0f6f2] px-4 md:px-8 border-b border-emerald-100"
      >
        {/* Artistic background glowing patterns */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#477637]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/10 w-80 h-80 bg-[#477637]/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          className="max-w-5xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#477637]/10 border border-[#477637]/20 mb-8 select-none">
            <Sparkles className="w-4 h-4 text-[#477637]" />
            <span className="text-xs uppercase tracking-widest text-[#477637] font-semibold font-mono">Comfortable Private Tours</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1b2d18] mb-8 leading-[1.12]">
            Comfortable, Stress-Free Travel <br className="hidden sm:inline" />
            <span className="text-[#1b2d18]">Across Sri Lanka</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-10 font-normal">
            Say goodbye to crowded group tours. Journey of Ceylon plans custom private trips just for you. Ride in comfortable air-conditioned cars with a friendly English-speaking driver, and enjoy easy travel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            {/* CTA Book WhatsApp */}
            <a 
              id="cta_whatsapp_hero"
              href="https://wa.me/94713800084?text=Hi%20Journey%20of%20Ceylon!%20I'm%20planning%20a%20journey%20to%20Sri%20Lanka%21%20I'd%20love%20to%20book%20a%20highly%20comfortable%2C%20stress-free%20private%20tour."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#477637] hover:bg-[#325227] text-white rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-emerald-950/10 flex items-center justify-center gap-3 select-none"
            >
              <Phone className="w-4 h-4" />
              <span>Book with WhatsApp</span>
            </a>

            {/* CTA Plan My Trip */}
            <button 
              id="cta_plan_my_trip_scroll"
              onClick={() => scrollToId('plan-trip')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-emerald-50 text-[#477637] border border-[#477637]/40 hover:border-[#477637] rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 select-none"
            >
              <span>Plan my Trip</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </motion.div>
      </section>

      {/* Signature Travel Moments Section towards the top */}
      <section className="bg-white py-12 border-b border-emerald-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 tracking-tight">
              Our Journey Moments
            </h2>
            <p className="text-slate-400 text-[10px] uppercase font-mono tracking-widest mt-2">
              Signature experiences with our professional luxury chauffeur service
            </p>
          </div>
          
          {/* Grid of 5 premium whatsapp photos, perfectly proportioned, with click magnification */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {[
              {
                id: 1,
                image: "/WhatsApp Image 2026-06-02 at 04,09,45 (1)-1.jpeg",
                category: 'heritage'
              },
              {
                id: 2,
                image: "/WhatsApp Image 2026-06-02 at 04,09,45 (2)-1.jpeg",
                category: 'natural'
              },
              {
                id: 3,
                image: "/WhatsApp Image 2026-06-02 at 04.09.34 (1).jpeg",
                category: 'heritage'
              }
            ].map((img, idx) => (
              <motion.div
                key={img.id}
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.3 }}
                className={`overflow-hidden rounded-2xl border border-slate-200/50 shadow-xs cursor-pointer`}
                onClick={() => setSelectedGalleryPhoto(img as any)}
              >
                <div className="h-44 sm:h-52 relative bg-slate-50">
                  <img
                    src={img.image}
                    alt="Ceylon Travel Showcase"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-transparent hover:bg-black/10 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Express Taxi Services Section - Sourcing Ceylon Premium Transfers */}
      <section 
        id="taxi-service" 
        className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-emerald-100 bg-slate-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#477637] uppercase font-mono bg-[#477637]/10 px-3 py-1 rounded-full">
              Airport and intercity transfers
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 mt-4 leading-tight font-sans">
              Private Transfers
            </h2>
            <p className="text-slate-600 mt-4 text-sm sm:text-base font-medium">
              Calculate fixed prices for any city in Sri Lanka instantly. We provide clean, comfortable cars with 24/7 customer support, and highway tolls are always included.
            </p>
          </div>

          {/* Unified single-box container for planning and estimation */}
          <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-emerald-100/80 shadow-xl p-6 sm:p-8 lg:p-10 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Interactive Selector Panel (Left - 5 Cols) */}
              <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#477637]" />
                  <span>Plan your journey</span>
                </h3>

                {/* Transfer Type Tab Switcher */}
                <div className="flex bg-slate-100 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setTransferType('airport')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                      transferType === 'airport'
                        ? 'bg-white text-slate-800 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Airport Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransferType('intercity')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                      transferType === 'intercity'
                        ? 'bg-white text-slate-800 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Intercity Transfer
                  </button>
                </div>

                {/* Conditional Form Fields */}
                {transferType === 'airport' ? (
                  <div className="space-y-5">
                    {/* Direction Switcher */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Direction</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setAirportTransferDirection('from-airport')}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                            airportTransferDirection === 'from-airport'
                              ? 'bg-emerald-50 border-[#477637] text-[#477637]'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          From Airport to City
                        </button>
                        <button
                          type="button"
                          onClick={() => setAirportTransferDirection('to-airport')}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                            airportTransferDirection === 'to-airport'
                              ? 'bg-emerald-50 border-[#477637] text-[#477637]'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          From City to Airport
                        </button>
                      </div>
                    </div>

                    {/* Airport Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Airport</label>
                      <div className="relative">
                        <select
                          value={selectedAirportCode}
                          onChange={(e) => setSelectedAirportCode(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#477637] appearance-none cursor-pointer"
                        >
                          {SRI_LANKA_DESTINATIONS.filter(d => d.name.toLowerCase().includes('airport')).map((d) => (
                            <option key={d.name} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Sri lankan city dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        {airportTransferDirection === 'from-airport' ? 'Destination City' : 'Origin City'}
                      </label>
                      <div className="relative">
                        <select
                          value={selectedCityName}
                          onChange={(e) => setSelectedCityName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#477637] appearance-none cursor-pointer"
                        >
                          {SRI_LANKA_DESTINATIONS.filter(d => !d.name.toLowerCase().includes('airport')).map((d) => (
                            <option key={d.name} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Intercity Origin */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Origin City</label>
                      <div className="relative">
                        <select
                          value={selectedIntercityOrigin}
                          onChange={(e) => setSelectedIntercityOrigin(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#477637] appearance-none cursor-pointer"
                        >
                          {SRI_LANKA_DESTINATIONS.map((d) => (
                            <option key={d.name} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Intercity Destination */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Destination City</label>
                      <div className="relative">
                        <select
                          value={selectedIntercityDest}
                          onChange={(e) => setSelectedIntercityDest(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#477637] appearance-none cursor-pointer"
                        >
                          {SRI_LANKA_DESTINATIONS.map((d) => (
                            <option key={d.name} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Unified Date of Journey Picker for Private Transfers */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#477637]" />
                    <span>Date of Journey *</span>
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => {
                      setPickupDate(e.target.value);
                      setDropoffDate(e.target.value);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#477637]"
                    required
                  />
                </div>
              </div>

              {/* Price Table / Estimation Display (Right - 7 Cols) */}
              <div className="lg:col-span-12 xl:col-span-7 space-y-6 xl:border-l xl:border-slate-100 xl:pl-10">
                
                {/* Route info overview banner */}
                <div className="bg-gradient-to-r from-[#477637] to-emerald-800 rounded-2xl p-6 text-white shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-200 font-bold bg-white/10 px-2.5 py-1 rounded">Estimated Route Outline</span>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-150 font-bold bg-white/15 px-2.5 py-1 rounded flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Date: {pickupDate}</span>
                        </span>
                      </div>
                      <h4 className="text-sm font-bold mt-2 font-mono flex items-center gap-1.5">
                        <span className="text-emerald-300">{transferData.startName.split(' ')[0]}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-white">{transferData.endName.split(' ')[0]}</span>
                      </h4>
                    </div>
                    <div className="flex gap-6 text-center">
                      <div>
                        <div className="text-[9px] uppercase font-mono tracking-wider text-emerald-200">Distance</div>
                        <div className="text-xl font-extrabold font-mono text-white mt-0.5">{transferData.distanceKm} km</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase font-mono tracking-wider text-emerald-200">Est. Time</div>
                        <div className="text-xl font-extrabold font-mono text-white mt-0.5">
                          {transferData.distanceKm === 0 ? '0' : `${Math.round(transferData.distanceKm / 50 * 10) / 10} h`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimate results block */}
                {transferData.distanceKm === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-500">
                    <p className="text-sm font-semibold">Please select different starting and ending cities to display custom rates.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {transferData.vehicles.map((v, idx) => {
                      // Compose custom WhatsApp text for direct inquiry matching pickuptaxisrilanka standards
                      const wpText = `Hello Journey of Ceylon, I'd like to book a private transfer.\n\nType: ${transferType === 'airport' ? 'Airport Transfer' : 'Intercity Transfer'}\nDate: ${pickupDate}\nFrom: ${transferData.startName}\nTo: ${transferData.endName}\nVehicle: ${v.type} (${v.subType})\nDistance: ${transferData.distanceKm} km\nFares quoted: Rs ${v.priceLkr.toLocaleString()} ($${v.priceUsd})`;
                      const wpLink = `https://api.whatsapp.com/send?phone=94770477637&text=${encodeURIComponent(wpText)}`;

                      return (
                        <motion.div 
                          key={idx}
                          className="bg-white hover:bg-emerald-50/10 rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-emerald-50 text-slate-600 transition-colors">
                              <Car className="w-5 h-5 text-[#477637]" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-800 font-sans group-hover:text-[#477637] transition-colors">{v.type}</h4>
                              <p className="text-slate-400 text-xs font-semibold mt-0.5 font-mono">{v.subType}</p>
                              <p className="text-slate-500 text-xs mt-2 font-medium flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                <span>{v.ideal}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                            <div className="text-left sm:text-right">
                              <div className="text-[10px] uppercase tracking-widest font-mono font-bold text-slate-400">Fixed Rate Estimate</div>
                              <div className="text-lg font-bold text-slate-800 font-mono mt-0.5">
                                Rs {v.priceLkr.toLocaleString()}{' '}
                                <span className="text-[#477637] text-sm font-bold font-mono">(${v.priceUsd})</span>
                              </div>
                            </div>
                            <a
                              href={wpLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2.5 px-4 py-2 bg-slate-100 hover:bg-[#477637] text-slate-800 hover:text-white rounded-lg font-bold text-xs tracking-wider uppercase transition-all duration-300 pointer-events-auto"
                            >
                              Inquire Now
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Plan My Trip Section - WITH LUSH HIGH QUALITY LOOPING VIDEO BACKGROUND & CUSTOM WIZARD */}
      <section 
        id="plan-trip" 
        className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-emerald-100 bg-white min-h-[95vh] flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic HTML5 Video Stream representing Ceylon nature */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-35 scale-105"
            src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-waterfall-in-a-lush-forest-42416-large.mp4"
            onError={(e) => {
              // fallback video link in case of network/cors constraints
              const target = e.target as HTMLVideoElement;
              target.src = "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-hitting-sandy-beach-43187-large.mp4";
            }}
          />
          {/* Natural ivory paper lightness overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
        </div>

        <motion.div 
          className="max-w-4xl mx-auto w-full relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1b2d18] mb-4">
              Plan My Custom Trip
            </h2>
            <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Design your personalized Ceylon route in real-time. Choose your waypoints, add stops, select your interests, and handoff to our travel experts to craft.
            </p>
          </div>

          {/* Interactive Multi-Step Travel Planner Box */}
          <div className="bg-white/95 border border-emerald-100/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-green-950/5 backdrop-blur-md text-slate-800">
            
            {wizardStep === 'form' && (
              <form onSubmit={handleSubmitInitialPlan} className="space-y-8" id="travel_planner_form">
                
                {/* 1. Trip Type selection cards */}
                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono font-bold text-[#477637] mb-3">
                    Select Adventure Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'round-trip', label: 'Round trip', desc: 'Overland loop' },
                      { id: 'day-trip', label: 'Single Trip', desc: 'Single-day tour' },
                      { id: 'safari', label: 'National Safari', desc: 'Wildlife parks' },
                      { id: 'airport-transfer', label: 'Airport Direct', desc: 'Chauffeur greet' }
                    ].map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => setTripType(type.id)}
                        className={`cursor-pointer p-4 rounded-xl border text-left transition-all duration-300 select-none ${
                          tripType === type.id 
                            ? 'bg-[#477637]/10 border-[#477637] shadow-md shadow-emerald-900/5' 
                            : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Car className={`w-5 h-5 mb-2 ${tripType === type.id ? 'text-[#477637]' : 'text-slate-500'}`} />
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">{type.label}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{type.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1.1 Conditional Option Safari Locations */}
                {tripType === 'safari' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-emerald-100 animate-fadeIn">
                    <label className="block text-xs uppercase tracking-wider font-mono font-bold text-[#477637] mb-2">
                      Choose Safari Location in Sri Lanka
                    </label>
                    <select 
                      id="safari_location_select"
                      value={safariLocation}
                      onChange={(e) => setSafariLocation(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-700 outline-none focus:border-[#477637]"
                    >
                      <option value="Yala National Park">Yala National Park (Leopards & Wild Cats)</option>
                      <option value="Wilpattu National Park">Wilpattu National Park (Lakes & Solitude)</option>
                      <option value="Udawalawe Reserve">Udawalawe Reserve (Wild Asian Elephants)</option>
                      <option value="Minneriya Forest">Minneriya Sanctuary (Ancient Tank Gathering)</option>
                    </select>
                  </div>
                )}

                {/* 2. Route Waypoints: From - Waypoints - To */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs uppercase tracking-widest font-mono font-bold text-[#477637]">
                      Destination Waypoints
                    </label>
                    <span className="text-[10px] bg-[#477637]/10 text-[#477637] px-2 py-0.5 rounded border border-[#477637]/20 font-mono">
                      Google Autocomplete Integrated
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* From Input */}
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MapPin className="h-4 w-4 text-[#477637]" />
                      </div>
                      <input 
                        type="text"
                        placeholder="From Location (e.g. Bandaranaike Airport)"
                        value={fromText}
                        onChange={(e) => {
                          setFromText(e.target.value);
                          setSuggestionQuery(e.target.value);
                          setActiveSuggestionField('from');
                        }}
                        onFocus={() => {
                          setSuggestionQuery(fromText);
                          setActiveSuggestionField('from');
                        }}
                        className="block w-full rounded-xl bg-slate-50 border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#477637] transition-colors"
                      />
                      
                      {/* From Autocomplete Droplist */}
                      {activeSuggestionField === 'from' && (
                        <div className="absolute left-0 right-0 mt-1 max-h-52 overflow-y-auto rounded-xl bg-white border border-[#477637]/30 z-30 shadow-2xl p-1 animate-fadeIn">
                          <p className="text-[10px] text-[#477637] font-mono px-3 py-1 bg-[#477637]/5 rounded mb-1">Select suggestion</p>
                          {getFilteredSuggestions(suggestionQuery).map((dest, idx) => (
                            <div 
                              key={idx}
                              onClick={() => {
                                setFromText(dest.name);
                                setActiveSuggestionField(null);
                              }}
                              className="px-3 py-2 text-xs hover:bg-[#477637]/10 text-left rounded-lg cursor-pointer transition-colors"
                            >
                              <div className="font-bold text-slate-800">{dest.name}</div>
                              <div className="text-slate-500 text-[10px]">{dest.description} • {dest.region}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* To Input */}
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                      </div>
                      <input 
                        type="text"
                        placeholder="To Location (e.g. Weligama Beach)"
                        value={toText}
                        onChange={(e) => {
                          setToText(e.target.value);
                          setSuggestionQuery(e.target.value);
                          setActiveSuggestionField('to');
                        }}
                        onFocus={() => {
                          setSuggestionQuery(toText);
                          setActiveSuggestionField('to');
                        }}
                        className="block w-full rounded-xl bg-slate-50 border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#477637] transition-colors"
                      />

                      {/* To Autocomplete Droplist */}
                      {activeSuggestionField === 'to' && (
                        <div className="absolute left-0 right-0 mt-1 max-h-52 overflow-y-auto rounded-xl bg-white border border-[#477637]/30 z-30 shadow-2xl p-1 animate-fadeIn">
                          <p className="text-[10px] text-[#477637] font-mono px-3 py-1 bg-[#477637]/5 rounded mb-1">Select suggestion</p>
                          {getFilteredSuggestions(suggestionQuery).map((dest, idx) => (
                            <div 
                              key={idx}
                              onClick={() => {
                                setToText(dest.name);
                                setActiveSuggestionField(null);
                              }}
                              className="px-3 py-2 text-xs hover:bg-[#477637]/10 text-left rounded-lg cursor-pointer transition-colors"
                            >
                              <div className="font-bold text-slate-800">{dest.name}</div>
                              <div className="text-slate-500 text-[10px]">{dest.description} • {dest.region}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add stops section (Google Map like) */}
                  {stops.map((stop, index) => (
                    <div key={index} className="flex gap-2 items-center animate-slideDown">
                      <div className="relative flex-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-xs uppercase font-mono text-[#477637] font-bold">W{index+1}</span>
                        </div>
                        <input 
                           type="text"
                           placeholder={`Add stop location...`}
                           value={stop}
                           onChange={(e) => handleUpdateStopValue(index, e.target.value)}
                           onFocus={() => {
                             setSuggestionQuery(stop);
                             setActiveSuggestionField(index);
                           }}
                           className="block w-full rounded-xl bg-slate-50 border border-slate-200 py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#477637] transition-all"
                        />

                        {/* Stop Dropdown Autocomplete */}
                        {activeSuggestionField === index && (
                          <div className="absolute left-0 right-0 mt-1 max-h-52 overflow-y-auto rounded-xl bg-white border border-[#477637]/30 z-30 shadow-2xl p-1 animate-fadeIn">
                            <p className="text-[10px] text-[#477637] font-mono px-3 py-1 bg-[#477637]/5 rounded mb-1">Select waypoint</p>
                            {getFilteredSuggestions(suggestionQuery).map((dest, idx) => (
                              <div 
                                key={idx}
                                onClick={() => {
                                  handleUpdateStopValue(index, dest.name);
                                  setActiveSuggestionField(null);
                                }}
                                className="px-3 py-2 text-xs hover:bg-[#477637]/10 text-left rounded-lg cursor-pointer transition-colors"
                              >
                                <div className="font-bold text-slate-800">{dest.name}</div>
                                <div className="text-slate-500 text-[10px]">{dest.description} • {dest.region}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <button 
                        type="button"
                        onClick={() => handleRemoveStop(index)}
                        className="p-3 bg-red-50 hover:bg-red-100/80 text-red-600 rounded-xl transition-all border border-red-200"
                        title="Delete stop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button 
                    type="button" 
                    onClick={handleAddStop}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#477637] hover:text-[#325227] transition-all py-1 select-none"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Stop Waypoint (like Google feature)</span>
                  </button>
                </div>

                {/* Time Selection Fields */}
                {tripType === 'airport-transfer' ? (
                  isAirportSelected && (
                    <div className="p-5 rounded-2xl bg-[#477637]/5 border border-[#477637]/15 text-slate-700 text-xs sm:text-sm animate-fadeIn space-y-4">
                      <div className="font-semibold text-[#477637] flex items-center gap-1.5 border-b border-[#477637]/10 pb-2">
                        <Clock className="w-4 h-4 text-[#477637]" />
                        <span className="font-mono uppercase tracking-wider text-xs font-bold">Inbound Flight & Arrival Schedule</span>
                      </div>
                      {/* Arrival Date, Time & Flight Info Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase font-mono font-bold text-[#477637] mb-1.5 flex items-center gap-1 font-semibold">
                            <Calendar className="w-3.5 h-3.5" />
                            Date of Arrival *
                          </label>
                          <input 
                            type="date" 
                            value={pickupDate}
                            onChange={(e) => {
                              setPickupDate(e.target.value);
                              setDropoffDate(e.target.value);
                            }}
                            className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-[#477637]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase font-mono font-bold text-[#477637] mb-1.5 font-semibold">
                            Time of Arrival *
                          </label>
                          <input 
                            type="time" 
                            value={arrivalTime}
                            onChange={(e) => setArrivalTime(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-[#477637]"
                            required={isAirportSelected}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase font-mono font-bold text-[#477637] mb-1.5 font-semibold">
                            Flight Number / Carrier (Optional)
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. UL 504 / QR 668"
                            value={flightNumber}
                            onChange={(e) => setFlightNumber(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-[#477637]"
                          />
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="p-5 rounded-2xl bg-[#477637]/5 border border-[#477637]/15 space-y-4 animate-fadeIn">
                    <div className="font-semibold text-[#477637] flex items-center gap-1.5 border-b border-[#477637]/10 pb-2">
                      <Clock className="w-4 h-4 text-[#477637]" />
                      <span className="font-mono uppercase tracking-wider text-xs font-bold">Scheduled Pick Up & Drop Off Details</span>
                    </div>
 
                    {/* Date inputs (only shown when it is a Round Trip) */}
                    {tripType === 'round-trip' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#477637]/10">
                        <div>
                          <label className="block text-[11px] uppercase font-mono font-bold text-[#477637] mb-1.5 flex items-center gap-1 font-semibold">
                            <Calendar className="w-3.5 h-3.5" />
                            Date of Pick Up *
                          </label>
                          <input 
                            type="date" 
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-[#477637]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase font-mono font-bold text-[#477637] mb-1.5 flex items-center gap-1 font-semibold">
                            <Calendar className="w-3.5 h-3.5" />
                            Date of Drop Off *
                          </label>
                          <input 
                            type="date" 
                            value={dropoffDate}
                            onChange={(e) => setDropoffDate(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-[#477637]"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Date inputs (only shown when it is a Single Trip or National Safari) */}
                    {(tripType === 'day-trip' || tripType === 'safari') && (
                      <div className="grid grid-cols-1 gap-4 pb-4 border-b border-[#477637]/10">
                        <div>
                          <label className="block text-[11px] uppercase font-mono font-bold text-[#477637] mb-1.5 flex items-center gap-1 font-semibold">
                            <Calendar className="w-3.5 h-3.5" />
                            Date of Travel *
                          </label>
                          <input 
                            type="date" 
                            value={pickupDate}
                            onChange={(e) => {
                              setPickupDate(e.target.value);
                              setDropoffDate(e.target.value);
                            }}
                            className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-[#477637]"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase font-mono font-bold text-[#477637] mb-1.5 font-semibold">
                          Time of Pick Up *
                        </label>
                        <input 
                          type="time" 
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-[#477637]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-mono font-bold text-[#477637] mb-1.5 font-semibold">
                          Time of Drop Off *
                        </label>
                        <input 
                          type="time" 
                          value={dropoffTime}
                          onChange={(e) => setDropoffTime(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-xs font-semibold focus:ring-1 focus:ring-[#477637]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Duration & Guests Slider */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Trip Duration Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs uppercase tracking-widest font-mono font-bold text-[#477637] flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#477637]" />
                        Trip Days
                      </label>
                      <span className="text-base font-bold text-[#477637] bg-[#477637]/10 px-2.5 py-0.5 rounded border border-[#477637]/20">
                        {tripType === 'day-trip' || tripType === 'safari' || tripType === 'airport-transfer' ? '1 Day Fixed' : `${days} Days Selection`}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="21" 
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      disabled={tripType === 'day-trip' || tripType === 'safari' || tripType === 'airport-transfer'}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#477637] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
                      <span>1 Day</span>
                      <span>7 Days</span>
                      <span>14 Days</span>
                      <span>21 Days</span>
                    </div>
                  </div>

                  {/* Guests Incrementer */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-mono font-bold text-[#477637] mb-3 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#477637]" />
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-2 rounded-xl max-w-[200px]">
                      <button 
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-10 h-10 rounded-lg hover:bg-slate-200/50 active:bg-slate-200 flex items-center justify-center font-bold text-[#477637] transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-slate-800 text-base font-mono">
                        {guests} {guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                      <button 
                        type="button"
                        onClick={() => setGuests(guests + 1)}
                        className="w-10 h-10 rounded-lg hover:bg-slate-200/50 active:bg-slate-200 flex items-center justify-center font-bold text-[#477637] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>

                {/* Bottom Trigger Action Submit */}
                <div className="text-center pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 bg-[#477637] hover:bg-[#325227] text-white font-bold rounded-xl text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-emerald-900/10 cursor-pointer"
                  >
                    Show My Travel Plan
                  </button>
                </div>

              </form>
            )}

            {/* Step 2: Personal Contact Input Information */}
            {wizardStep === 'contact' && (
              <form onSubmit={finalizeTripBooking} className="space-y-6" id="personal_info_form">
                <div className="text-center mb-6">
                  <span className="text-[10px] font-mono uppercase bg-[#477637]/10 text-[#477637] px-2 py-1 rounded inline-block mb-2 font-semibold">Final Step</span>
                  <h3 className="font-serif text-2xl text-slate-800 font-bold">Secure Your Private Consultation</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                    Your custom path is locked! Please supply your contact data to let our master Ceylon planners formulate the exact quote pricing.
                  </p>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label className="block text-xs uppercase font-mono font-bold text-[#477637] mb-2">Full Guest Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Thomas Vance"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-sm focus:ring-1 focus:ring-[#477637]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono font-bold text-[#477637] mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. thomas@brand.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-sm focus:ring-1 focus:ring-[#477637]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono font-bold text-[#477637] mb-2">WhatsApp or Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +44 7700 900077"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-sm focus:ring-1 focus:ring-[#477637]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
                  <button 
                    type="button"
                    onClick={() => setWizardStep('form')}
                    className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Back to Form
                  </button>
                  <button 
                    type="submit"
                    className="w-full sm:flex-1 px-8 py-3 bg-[#477637] hover:bg-[#325227] text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shadow-emerald-800/10"
                  >
                    Lock Plan & Handshake Agent
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Transformed Success Landing Screen */}
            {wizardStep === 'success' && (
              <div className="text-center py-6 animate-fadeIn" id="planner_success_screen">
                <div className="w-16 h-16 rounded-full bg-[#477637]/10 border border-[#477637] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#477637]" />
                </div>
                
                <h3 className="font-serif text-3xl font-bold text-slate-800 mb-2">Trip Planning Orchestrated!</h3>
                <p className="text-[#477637] font-mono text-xs uppercase tracking-widest mb-6">Journey of Ceylon is on it</p>

                <div className="bg-slate-50 border border-emerald-100 rounded-2xl p-6 text-left max-w-lg mx-auto space-y-4 mb-8">
                  <h4 className="text-xs uppercase text-[#477637] font-mono font-bold tracking-wider">Requested Itinerary Resume</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-500 block">Lead Guest:</span>
                      <strong className="text-slate-800 text-sm font-semibold">{clientName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Contact Point:</span>
                      <strong className="text-slate-800 text-sm font-semibold">{clientPhone}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Duration & Style:</span>
                      <strong className="text-slate-800 text-sm font-semibold">
                        {days} {days === 1 ? 'Day' : 'Days'} ({
                          tripType === 'round-trip' ? 'Round trip' : 
                          tripType === 'day-trip' ? 'Single Trip' : 
                          tripType === 'safari' ? 'National Safari' : 'Airport Direct'
                        })
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Party Size:</span>
                      <strong className="text-slate-800 text-sm font-semibold">{guests} Adults (Private)</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-xs">
                    <span className="text-slate-500 block mb-1">Route Path Grid:</span>
                    <strong className="text-slate-800 leading-relaxed font-semibold">
                      {fromText} ➔ {stops.filter(s => s !== '').join(' ➔ ') || 'Direct Out'} ➔ {toText}
                    </strong>
                  </div>

                  {tripType === 'airport-transfer' ? (
                    <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 grid grid-cols-2 gap-2 animate-fadeIn">
                      <div>
                        <span className="text-slate-500 block mb-1">Date of Arrival:</span>
                        <strong className="text-slate-800 text-sm font-semibold">{pickupDate}</strong>
                      </div>
                      {arrivalTime && (
                        <div>
                          <span className="text-slate-500 block mb-1">Inbound Arrival Time:</span>
                          <strong className="text-slate-800 text-sm font-semibold">
                            {arrivalTime} {flightNumber ? `(Flight ${flightNumber})` : ''}
                          </strong>
                        </div>
                      )}
                    </div>
                  ) : (
                    (pickupTime || dropoffTime) && (
                      <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 grid grid-cols-2 gap-2 animate-fadeIn">
                        <div>
                          <span className="text-slate-500 block mb-1">Departure Pick Up:</span>
                          <strong className="text-slate-800 text-sm font-semibold">{pickupTime || 'Not set'}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-1">Return Drop Off:</span>
                          <strong className="text-slate-800 text-sm font-semibold">{dropoffTime || 'Not set'}</strong>
                        </div>
                      </div>
                    )
                  )}

                  {tripType === 'round-trip' && (
                    <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 grid grid-cols-2 gap-2 animate-fadeIn">
                      <div>
                        <span className="text-slate-500 block mb-1">Date of Pick Up:</span>
                        <strong className="text-slate-800 text-sm font-semibold">{pickupDate}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-1">Date of Drop Off:</span>
                        <strong className="text-slate-800 text-sm font-semibold">{dropoffDate}</strong>
                      </div>
                    </div>
                  )}

                  {(tripType === 'day-trip' || tripType === 'safari') && (
                    <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 animate-fadeIn">
                      <span className="text-slate-500 block mb-1">Date of Travel:</span>
                      <strong className="text-slate-800 text-sm font-semibold">{pickupDate}</strong>
                    </div>
                  )}

                  {tripType === 'safari' && (
                    <div className="bg-[#477637]/5 border border-emerald-100 p-2.5 rounded-lg text-xs mt-2 text-slate-700 font-semibold">
                      🦁 Includes dedicated luxury 4x4 game safari vehicle booking in <strong>{safariLocation}</strong>.
                    </div>
                  )}
                </div>

                <p className="text-slate-600 text-sm max-w-md mx-auto mb-8 font-medium">
                  We have mapped this metadata onto our real-time road logistics engine. One of our dedicated Sri Lankan Destination leads will secure your first draft quote via WhatsApp or Email within 15 minutes.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
                  <a 
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 px-6 py-3.5 bg-[#477637] hover:bg-[#325227] text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant Chat</span>
                  </a>
                  <button 
                    onClick={() => {
                      setWizardStep('form');
                      setClientName('');
                      setClientEmail('');
                      setClientPhone('');
                      setArrivalTime('');
                      setFlightNumber('');
                      setPickupTime('');
                      setDropoffTime('');
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 rounded-xl font-bold text-xs uppercase tracking-widest transition-all text-center cursor-pointer"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            )}

          </div>

        </motion.div>
      </section>

      {/* Explore Cities - PHOTO MONTAGE WITH DETAILED SIDEBAR POPUPS */}
      <section 
        id="explore-cities" 
        className="py-24 px-4 sm:px-6 lg:px-8 border-b border-emerald-100 bg-white relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-50/20 via-transparent to-transparent pointer-events-none" />

        <motion.div 
          className="max-w-7xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-[#477637] font-bold">Unearth the Mystic</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1b2d18] mt-1 mb-4">
              Explore Legendary Cities
            </h2>
            <p className="text-slate-700 max-w-xl mx-auto text-sm sm:text-base font-medium">
              A private chauffeur unlocks authentic Sri Lanka. Click any city to display handpicked highlights, signature villas, and things to see.
            </p>
          </div>

          {/* Mosaic montage of touring photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES_DATA.map((city, idx) => (
              <div 
                key={city.name}
                onClick={() => setSelectedCityDetail(city)}
                className="group relative h-[380px] rounded-2xl overflow-hidden border border-slate-100 hover:border-[#477637] transition-all duration-500 cursor-pointer shadow-md hover:shadow-xl hover:shadow-green-950/5 flex flex-col justify-end p-6"
                id={`city-montage-${city.name.toLowerCase()}`}
              >
                {/* Background photo montage */}
                <img 
                  src={city.image} 
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient shadows */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10" />

                <div className="relative z-20">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-[10px] font-mono uppercase bg-[#477637] text-white font-bold px-2.5 py-0.5 rounded-full">
                      {city.stay}
                    </span>
                    <TrendingUp className="w-4 h-4 text-[#477637] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">{city.name}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed mb-4 line-clamp-2">
                    {city.brief}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#477637]">
                    <span className="text-emerald-400 group-hover:text-emerald-300">Enter Expedition Guide</span>
                    <ChevronRight className="w-4 h-4 text-[#477637] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </motion.div>

        {/* Cinematic Slide-Open Detailed City Overlay */}
        {selectedCityDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" id="city-detail-modal">
            <div className="bg-white border border-emerald-100 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-slate-800">
              
              {/* Photo header */}
              <div className="relative h-56 sm:h-72">
                <img 
                  src={selectedCityDetail.image} 
                  alt={selectedCityDetail.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                
                {/* Close modal button */}
                <button 
                  onClick={() => setSelectedCityDetail(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all border border-white/10 select-none cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Info titles */}
                <div className="absolute bottom-4 left-6 z-10">
                  <span className="text-[10px] uppercase font-mono bg-[#477637] text-white px-2.5 py-0.5 rounded-full font-bold">
                    {selectedCityDetail.stay}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-slate-900 mt-2">{selectedCityDetail.name} Guide</h3>
                </div>
              </div>

              {/* Detail sheets items */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
                <div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedCityDetail.brief}
                  </p>
                </div>

                {/* Highlights curated list */}
                <div>
                  <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#477637] block mb-3">
                    Must-Do Local Itinerary Items
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCityDetail.thingsToDo.map((thing, i) => (
                      <div key={i} className="flex gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <Check className="w-4 h-4 text-[#477637] shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 font-medium">{thing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signature luxury custom note */}
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <span className="text-xs font-mono font-bold text-[#477637] flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#477637]" />
                    Journey of Ceylon Signature Stay
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                    {selectedCityDetail.signatureExperience}
                  </p>
                </div>
              </div>

              {/* Lower booking action bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                <span className="text-xs text-slate-500 font-medium">Want custom stops added here?</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setToText(selectedCityDetail.name);
                      setSelectedCityDetail(null);
                      scrollToId('plan-trip');
                    }}
                    className="px-4 py-2 bg-transparent hover:bg-slate-100 text-xs text-slate-700 border border-slate-300 rounded-lg font-bold transition-all cursor-pointer"
                  >
                    Set as Destination
                  </button>
                  <a 
                    href={`https://wa.me/94713800084?text=Hi%21%20I%20am%20interested%20in%20custom%2520private%2520travel%2520plans%2520to%2520explore%2520the%2520city%252520of%2520${encodeURIComponent(selectedCityDetail.name)}%20with%20Journey%20of%20Ceylon.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#477637] hover:bg-[#325227] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
                  >
                    Plan on WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </section>


      {/* Dynamic Filterable Photo Gallery Section */}
      <section 
        id="photo-gallery" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-emerald-100/40 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#477637] uppercase font-mono bg-[#477637]/10 px-3 py-1 rounded-full">
              Visual Highlights
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 mt-4 leading-tight font-sans">
              Sri Lanka Photo Gallery
            </h2>
            <p className="text-slate-600 mt-4 text-base font-medium font-sans">
              Look at our beautiful photo gallery. Click on any picture to learn more about the destinations in Sri Lanka.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: 'all', label: 'Highlights' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveGalleryCategory(category.id as any)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 select-none cursor-pointer ${
                    activeGalleryCategory === category.id
                      ? 'bg-[#477637] text-white shadow-md shadow-[#477637]/20 scale-103'
                      : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-[#477637] border border-slate-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {GALLERY_PHOTOS.filter(photo => activeGalleryCategory === 'all' || photo.category === activeGalleryCategory).map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedGalleryPhoto(photo)}
                className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden cursor-pointer shadow-xs hover:shadow-lg hover:border-emerald-100 transition-all duration-400"
              >
                {/* Image Container with Hover zoom */}
                <div className="h-64 sm:h-72 overflow-hidden relative bg-slate-100">
                  <img
                    src={photo.image}
                    alt="Gallery highlight"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-[10px] uppercase font-bold tracking-widest bg-[#477637]/90 px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-xs select-none">
                      <CompassIcon className="w-3.5 h-3.5 animate-spin-slow" />
                      View Image
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highly Interactive Photogallery Modal Magnifier */}
        {selectedGalleryPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-100 max-w-2xl w-full relative z-10"
            >
              {/* Image window */}
              <div className="h-96 sm:h-[480px] relative bg-slate-100">
                <img
                  src={selectedGalleryPhoto.image}
                  alt="Ceylon beauty expanded"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedGalleryPhoto(null)}
                  className="absolute top-4 right-4 bg-white/95 hover:bg-white text-slate-800 p-2.5 rounded-full shadow-lg hover:scale-105 transition-all select-none"
                  title="Close magnifier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </section>


      {/* Why should you plan your trip with JOC? Section */}
      <section 
        id="why-joc" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#f0f6f2] border-b border-emerald-100/40 relative overflow-hidden text-slate-800"
      >
        {/* Subtle decorative background plant leaves or curves */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-50/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-100/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          className="max-w-4xl mx-auto relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <div className="flex justify-center mb-6">
            <span className="p-3 bg-[#477637]/10 text-[#477637] rounded-full inline-flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </span>
          </div>

          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#477637] font-bold block mb-3">
            Synonymous with Sri Lankan Hospitality
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1b2d18] tracking-tight mb-8">
            Why should you plan your trip with JOC?
          </h2>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-100/70 shadow-lg relative max-w-3xl mx-auto">
            {/* Elegant double quote marks overlay */}
            <span className="absolute top-4 left-6 text-emerald-100 font-serif text-[110px] leading-none pointer-events-none select-none">“</span>
            
            <p className="font-serif text-base sm:text-2xl text-slate-800 leading-relaxed italic relative z-10 font-medium">
              We will make every effort to see that you are comfortable, relaxed &amp; at home with us. You will experience a warm &amp; friendly service, which is truly Sri Lankan &amp; synonymous with JOC.
            </p>

            <span className="absolute bottom-4 right-8 text-emerald-100 font-serif text-[110px] leading-none pointer-events-none select-none">”</span>
          </div>

          {/* Golden/Emerald three pillar bullets */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            <div className="p-5 bg-white border border-slate-100 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Check className="w-4.5 h-4.5 text-[#477637]" />
              </div>
              <div>
                <h4 className="text-[#1b2d18] font-bold text-sm tracking-tight mb-1">Comfortable</h4>
                <p className="text-xs text-slate-600 font-medium">Comfortable and seamless travel across Sri Lanka.</p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-100 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Check className="w-4.5 h-4.5 text-[#477637]" />
              </div>
              <div>
                <h4 className="text-[#1b2d18] font-bold text-sm tracking-tight mb-1">Relaxed</h4>
                <p className="text-xs text-slate-600 font-medium">Leisure itineraries that flow sequentially without rushed schedules.</p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-100 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Check className="w-4.5 h-4.5 text-[#477637]" />
              </div>
              <div>
                <h4 className="text-[#1b2d18] font-bold text-sm tracking-tight mb-1">At Home With JOC</h4>
                <p className="text-xs text-slate-600 font-medium">Friendly local drivers who guide you safely and share local stories.</p>
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* Google SEO Sri Lanka Travel & FAQ Guide (SEO Hub) */}
      <section 
        id="seo-guide" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-emerald-100/60 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-50/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-100/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#477637] font-bold block mb-3">
              Sri Lanka Route &amp; Travel Guide
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1b2d18] tracking-tight mb-4">
              Sri Lanka Travel Advice &amp; Tips
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium">
              Useful travel tips and route information to help you plan your travel across Sri Lanka.
            </p>
          </div>

          {/* Interactive Question / Accordion Stack */}
          <div className="space-y-4 max-w-3xl mx-auto" id="seo_faq_accordion">
            
            {/* FAQ Item 1: Sigiriya Climb */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white">
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-slate-800 hover:bg-[#477637]/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#477637]/10 flex items-center justify-center text-[#477637] shrink-0 font-bold text-xs">
                    01
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[#1b2d18]">
                    What is the best time to visit Sigiriya Rock Fortress in Sri Lanka?
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#477637] transition-transform duration-300 ${openFaqIndex === 0 ? 'rotate-180' : ''}`} />
              </button>
              
              {openFaqIndex === 0 && (
                <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-50 text-xs sm:text-sm leading-relaxed text-slate-600 space-y-4">
                  <p className="font-medium">
                    The best time to visit <strong className="text-slate-800 font-bold">Sigiriya Lion Rock</strong> is from <strong className="text-[#477637] font-bold">January to April</strong> when the weather is dry and sunny.
                  </p>
                  <p>
                    <strong className="text-slate-800 font-bold">Travel Advice:</strong> We recommend starting your climb at <strong className="text-slate-800 font-bold">7:00 AM</strong> when the gates open, to avoid the hot midday sun. Another good time is <strong className="text-slate-800 font-bold">3:30 PM</strong> to see a beautiful sunset from the top.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 items-center">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-mono">Ready to experience this?</span>
                    <button 
                      onClick={() => {
                        setFromText('Colombo Airport (CMB)');
                        setToText('Sigiriya');
                        setWizardStep('form');
                        scrollToId('plan-trip');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#477637] hover:bg-[#325227] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ml-auto"
                    >
                      <span>Plan Colombo to Sigiriya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Item 2: Ella Mountain Route */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white">
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-slate-800 hover:bg-[#477637]/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#477637]/10 flex items-center justify-center text-[#477637] shrink-0 font-bold text-xs">
                    02
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[#1b2d18]">
                    How to travel to Ella or Hill Country highlands from Colombo comfortably?
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#477637] transition-transform duration-300 ${openFaqIndex === 1 ? 'rotate-180' : ''}`} />
              </button>
              
              {openFaqIndex === 1 && (
                <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-50 text-xs sm:text-sm leading-relaxed text-slate-600 space-y-4">
                  <p className="font-medium">
                    Ella is a beautiful mountain town. Going there by local train can take up to 10 hours and can be very tiring. Driving a car yourself is also difficult because the roads are very curvy, steep, and can be foggy.
                  </p>
                  <p>
                    <strong className="text-slate-800 font-bold">Our Chauffeur Method:</strong> Booking a private transfer with <strong className="text-[#477637] font-bold">Journey of Ceylon (JOC)</strong> is much faster and takes only 5.5 hours. You can relax in a comfortable car and stop at beautiful forests and waterfalls along the way.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 items-center">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-mono">Plot your mountain trail</span>
                    <button 
                      onClick={() => {
                        setFromText('Colombo');
                        setToText('Ella');
                        setWizardStep('form');
                        scrollToId('plan-trip');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#477637] hover:bg-[#325227] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ml-auto"
                    >
                      <span>Plan Colombo to Ella</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Item 3: Elephant Gathering */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white">
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-slate-800 hover:bg-[#477637]/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#477637]/10 flex items-center justify-center text-[#477637] shrink-0 font-bold text-xs">
                    03
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[#1b2d18]">
                    When can I observe the famous Wild Elephant Gathering in Minneriya?
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#477637] transition-transform duration-300 ${openFaqIndex === 2 ? 'rotate-180' : ''}`} />
              </button>
              
              {openFaqIndex === 2 && (
                <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-50 text-xs sm:text-sm leading-relaxed text-slate-600 space-y-4">
                  <p className="font-medium">
                    The world-renowned <strong className="text-slate-800 font-bold">Elephant Gathering in Minneriya National Park</strong> is active during the dry season from <strong className="text-[#477637] font-bold">August to October</strong>. Up to 300-400 wild Asian elephants gather around the ancient lakeside to feed and hydrate.
                  </p>
                  <p>
                    <strong className="text-slate-800 font-bold">Safari Trips:</strong> We can plan a full-day safari for you. Your driver will handle the park tickets and arrange a private open-top 4x4 jeep.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 items-center">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-mono">Visualize Elephant Safari Trail:</span>
                    <button 
                      onClick={() => {
                        setFromText('Colombo');
                        setToText('Minneriya');
                        setWizardStep('form');
                        scrollToId('plan-trip');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#477637] hover:bg-[#325227] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ml-auto"
                    >
                      <span>Plan Colombo to Minneriya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Item 4: Weligama Beach Coast */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white">
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-slate-800 hover:bg-[#477637]/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#477637]/10 flex items-center justify-center text-[#477637] shrink-0 font-bold text-xs">
                    04
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[#1b2d18]">
                    How do I travel to Weligama Surf Beach &amp; Galle Fort from CMB Airport?
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#477637] transition-transform duration-300 ${openFaqIndex === 3 ? 'rotate-180' : ''}`} />
              </button>
              
              {openFaqIndex === 3 && (
                <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-50 text-xs sm:text-sm leading-relaxed text-slate-600 space-y-4">
                  <p className="font-medium">
                    The Southern Province coastal strip (featuring Weligama, Mirissa, and Galle Fort) is positioned roughly 160 km south of Bandaranaike International Airport (CMB).
                  </p>
                  <p>
                    <strong className="text-slate-800 font-bold">Express Advantage:</strong> Utilizing our luxury chauffeur, we place you directly on the <strong className="text-[#477637] font-bold">E01 Southern Expressway</strong>. This completely bypasses the hectic metropolitan city of Colombo. The entire voyage takes precisely <strong className="text-slate-800 font-bold">2.5 hours</strong> of relaxing travel, letting you transition immediately to beach lounge comfort.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 items-center">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-mono">Explore beach coastal coordinates:</span>
                    <button 
                      onClick={() => {
                        setFromText('Colombo Airport (CMB)');
                        setToText('Weligama');
                        setWizardStep('form');
                        scrollToId('plan-trip');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#477637] hover:bg-[#325227] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm ml-auto"
                    >
                      <span>Plan CMB to Weligama</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Item 5: Private Chauffeur vs Public */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs bg-white">
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-slate-800 hover:bg-[#477637]/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#477637]/10 flex items-center justify-center text-[#477637] shrink-0 font-bold text-xs">
                    05
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[#1b2d18]">
                    Why choose a private JOC chauffeur instead of driving yourself?
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#477637] transition-transform duration-300 ${openFaqIndex === 4 ? 'rotate-180' : ''}`} />
              </button>
              
              {openFaqIndex === 4 && (
                <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-50 text-xs sm:text-sm leading-relaxed text-slate-600 space-y-4">
                  <p className="font-medium">
                    Driving on Sri Lankan roads can be difficult due to busy traffic and local rules. 
                  </p>
                  <p>
                    <strong className="text-slate-800 font-bold">The JOC Standard:</strong> With JOC, you can travel with peace of mind. Our local drivers are very safe, drive clean air-conditioned cars with free Wi-Fi, and help you learn about the local culture.
                  </p>
                  <div className="pt-2 text-right">
                    <button 
                      onClick={() => scrollToId('plan-trip')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#477637] to-[#3a622c] hover:opacity-95 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      <span>Plan Custom Itinerary Online</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Guest Reviews Section - BOLD, STANDOUT GOOGLE AND TRIPADVISOR ACCREDITATION + TICKER SLIDER */}
      <section 
        id="reviews" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f0f6f2] border-b border-emerald-100/60"
      >
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          {/* Main header block */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-[#477637] font-bold">Verified Hospitality</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1b2d18] mt-1 mb-4">
              Exceptional Guest Experiences
            </h2>
            <p className="text-slate-700 max-w-xl mx-auto text-sm sm:text-base font-medium">
              Journey of Ceylon is certified, reviewed, and recommended across the global web for secure, luxury custom private transport.
            </p>
          </div>

          {/* Bold Accreditations Badges - Highly Standout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            
            {/* Google Reviews Badge */}
            <div className="p-8 rounded-3xl bg-white border border-emerald-100/85 text-center shadow-md relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#477637]/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
                  <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
                  <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
                  <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
                  <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
                </div>
                <h3 className="text-slate-900 text-3xl font-bold font-serif tracking-tight mb-2">Google Verified</h3>
                <p className="text-[#477637] text-4xl font-bold font-mono tracking-wider mb-2">5.0 / 5.0</p>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  100% genuine feedback parsed from over 480 executive travelers representing extreme safety and chauffeur mastery.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-500 font-mono font-semibold">
                GOOGLE INCORPORATED ACCREDITED RATING
              </div>
            </div>

            {/* TripAdvisor Badge */}
            <div className="p-8 rounded-3xl bg-white border border-[#477637]/15 text-center shadow-md relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#477637]/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="w-8 h-8 fill-[#477637] text-[#477637]" />
                  <Star className="w-8 h-8 fill-[#477637] text-[#477637]" />
                  <Star className="w-8 h-8 fill-[#477637] text-[#477637]" />
                  <Star className="w-8 h-8 fill-[#477637] text-[#477637]" />
                  <Star className="w-8 h-8 fill-[#477637] text-[#477637]" />
                </div>
                <h3 className="text-slate-900 text-3xl font-bold font-serif tracking-tight mb-2">TripAdvisor</h3>
                <p className="text-[#477637] text-4xl font-bold font-mono tracking-wider mb-2">5.0 / 5.0</p>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  Ranked perfect overland travel experience planner in Colombo & Weligama. Eco-certified partner.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-500 font-mono font-semibold">
                TRAVELERS CHOICE GLOBAL AWARD WINNER
              </div>
            </div>

          </div>

          {/* "Write A Review" Call to Action */}
          <div className="max-w-2xl mx-auto text-center mb-20 p-8 rounded-3xl bg-white border border-[#477637]/10 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#477637]/5 rounded-full blur-xl pointer-events-none" />
            <h3 className="text-[#1b2d18] text-xl font-bold font-serif mb-2">Have you traveled with JOC?</h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mb-6 font-medium">
              We want to help you have the best trip. Share your amazing Sri Lanka tour with other travelers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://www.google.com/search?sca_esv=9e8e05e171c8f2c1&sxsrf=ANbL-n5NiNnLiGNcjIdd7MkmHb7BwmsaNA:1780654298835&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQ_B8GgUHM85Qc-M00q8LtqaGNwlVs3vDaCS87KEV9_YK6eda-OZwgilfiaeTTUWsPGl5Nuv9bqPafUvwssT-aw8hvVmKtRQcOijF75Ixi1Xw1WBQA%3D%3D&q=Journey+of+ceylon+Reviews&sa=X&ved=2ahUKEwjCtcyX7u-UAxV3amwGHZVyD34Q0bkNegQINRAF&biw=1528&bih=698&dpr=1.25#lrd=0x89e1c62eb89006c5:0xf6821a39e77c5e7a,3,,,," 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto px-6 py-3 bg-white text-slate-700 hover:text-[#477637] border border-slate-200 hover:border-[#477637]/35 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 select-none cursor-pointer"
              >
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                Write A Google Review
              </a>
              <a 
                href="https://www.tripadvisor.com/UserReviewEdit-g1102395-d32881789-Journey_Of_Ceylon-Tissamaharama_Southern_Province.html" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto px-6 py-3 bg-[#477637] hover:bg-[#325227] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 select-none cursor-pointer"
              >
                <Award className="w-4 h-4 text-white" />
                Write A TripAdvisor Review
              </a>
            </div>
          </div>

          {/* Sliding Reviews Carousel */}
          <div className="max-w-3xl mx-auto relative px-4" id="reviews_ticker_carousel">
            
            {/* Slide screen outer */}
            <div className="overflow-hidden min-h-[220px] relative">
              {REVIEWS_DATA.map((rev, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center text-center ${
                    reviewIndex === index ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-base sm:text-lg lg:text-xl text-slate-800 leading-relaxed italic max-w-2xl text-center mb-6 font-serif font-medium">
                    "{rev.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#477637] text-white rounded-full flex items-center justify-center font-bold font-serif text-sm">
                      {rev.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="text-slate-800 font-bold text-sm sm:text-base">{rev.name}</h4>
                      <span className="text-slate-600 text-xs font-semibold">{rev.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Index Dot controls */}
            <div className="flex items-center justify-center gap-2.5 mt-8 relative z-20">
              {REVIEWS_DATA.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    reviewIndex === i ? 'w-8 bg-[#477637]' : 'w-2 bg-slate-300 hover:bg-[#477637]/50'
                  }`}
                  title={`Go to review ${i+1}`}
                />
              ))}
            </div>

          </div>

        </motion.div>
      </section>

      {/* Contact Us Page/Section */}
      <section 
        id="contact-us" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-emerald-100"
      >
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Direct Links & Messaging */}
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#477637] font-bold font-semibold">Get In Touch</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1b2d18] mt-1 mb-6">
                Let’s Map Your Journey
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed mb-8 font-medium">
                Ready for your Sri Lanka trip? Message us on WhatsApp or fill out the form below. We will answer you right away.
              </p>

              {/* Direct Touch Channels */}
              <div className="space-y-4">
                
                {/* Channel WhatsApp */}
                <a 
                  id="contact_item_whatsapp"
                  href="https://wa.me/94713800084?text=Hello%20Journey%20of%20Ceylon!%20I%20am%20interested%20in%20planning%20a%20private%20custom%20trip%20with%20you."
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#477637]/40 flex items-center gap-4 transition-all hover:bg-slate-50/80"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#477637]/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#477637]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-mono uppercase block -mb-0.5 font-semibold">Instant WhatsApp Call/Chat</span>
                    <strong className="text-slate-800 text-base hover:text-[#477637] transition-colors">+94 (71) 380-0084</strong>
                  </div>
                </a>

                {/* Channel Email */}
                <a 
                  id="contact_item_email"
                  href="mailto:hello@journeyofceylon.com?subject=Custom%20Tour%20Inquiry"
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#477637]/40 flex items-center gap-4 transition-all hover:bg-slate-50/80"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#477637]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-mono uppercase block -mb-0.5 font-semibold">Email Dispatch Direct</span>
                    <strong className="text-slate-800 text-base hover:text-[#477637] transition-colors">hello@journeyofceylon.com</strong>
                  </div>
                </a>

                {/* Channel Instagram */}
                <a 
                  id="contact_item_instagram"
                  href="https://instagram.com/journeyofceylon"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#477637]/40 flex items-center gap-4 transition-all hover:bg-slate-50/80"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#477637]/10 flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-[#477637]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-mono uppercase block -mb-0.5 font-semibold">Instagram Stories</span>
                    <strong className="text-slate-800 text-base hover:text-[#477637] transition-colors">@journeyofceylon</strong>
                  </div>
                </a>

              </div>

            </div>

            {/* Right Column: Custom Message Form */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm relative">
              
              {directMessageSuccess ? (
                <div className="text-center py-12 animate-fadeIn" id="direct_message_success_feedback">
                  <div className="w-16 h-16 rounded-full bg-[#477637]/10 border border-[#477637] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#477637]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">Enquiry Registered</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed mb-6 font-medium">
                    Thank you! We have received your message. Our team will contact you on WhatsApp or Email very soon.
                  </p>
                  <button 
                    onClick={() => setDirectMessageSuccess(false)}
                    className="px-6 py-2.5 bg-[#477637] hover:bg-[#325227] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-xl font-bold text-slate-800 mb-6 font-semibold">Leave a Dedicated Message</h3>
                  
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setDirectMessageSuccess(true);
                    }} 
                    className="space-y-4"
                    id="direct_messenger_form"
                  >
                    <div>
                      <label className="block text-xs uppercase font-mono font-bold text-[#477637] mb-2 font-semibold">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Thomas Vance"
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-sm focus:ring-1 focus:ring-[#477637]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono font-bold text-[#477637] mb-2 font-semibold font-bold">Your Email</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. thomas@brand.com"
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-sm focus:ring-1 focus:ring-[#477637]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono font-bold text-[#477637] mb-2 font-semibold font-semi">Message or Custom Requirements</label>
                      <textarea 
                        rows={4}
                        required
                        placeholder="Describe guest numbers, desired dates, or specific experiences you wish to add..."
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-[#477637] outline-none text-slate-800 text-sm focus:ring-1 focus:ring-[#477637]"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full px-6 py-3 bg-[#477637] hover:bg-[#325227] text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shadow-emerald-800/10 cursor-pointer"
                    >
                      Send Enquiry Form
                    </button>
                  </form>
                </>
              )}

            </div>

          </div>

        </motion.div>
      </section>

      {/* Premium Footer with Fast Links */}
      <footer className="bg-[#0a180c] text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-[#477637]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 border-b border-emerald-950/20 pb-12">
          
          {/* Footer Logo & info */}
          <div className="max-w-sm text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4 select-none">
              <img src="/logo-king.png" alt="Journey of Ceylon" className="h-20 md:h-28 lg:h-36 w-auto object-contain bg-white/10 rounded-xl p-2" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Private travel team based in Colombo, Sri Lanka. We operate clean, comfortable vehicles with friendly, expert driver-guides.
            </p>
          </div>

          {/* Quick linkages lists */}
          <div className="flex flex-wrap gap-12 text-center md:text-left justify-center">
            
            <div>
              <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><button onClick={() => scrollToId('plan-trip')} className="hover:text-white transition-colors cursor-pointer">Plan My Tour</button></li>
                <li><button onClick={() => scrollToId('explore-cities')} className="hover:text-white transition-colors cursor-pointer">Explore Destinations</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-4">Credentials</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><button onClick={() => scrollToId('reviews')} className="hover:text-white transition-colors cursor-pointer">Google Verified Reviews</button></li>
                <li><button onClick={() => scrollToId('reviews')} className="hover:text-white transition-colors cursor-pointer">TripAdvisor Accreditations</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest mb-0.5 font-bold">Get In Touch</h4>
              <ul className="space-y-2 text-xs text-slate-500 font-semibold">
                <li>
                  <a href="https://wa.me/94713800084?text=Hello%20Journey%20of%20Ceylon!%20I%20would%20like%20to%20enquire%20about%20a%20luxury%20private%20custom%20trip%20across%20Sri%20Lanka." target="_blank" rel="noreferrer" className="hover:text-white transition-colors block">
                    <span className="text-slate-300 block">WhatsApp Chat 24/7</span>+94 (71) 380-0084
                  </a>
                </li>
                <li><span className="text-slate-300 block">Digital Dispatch</span>hello@journeyofceylon.com</li>
              </ul>
            </div>

          </div>

        </div>

        {/* Footer legalities signature */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono font-semibold">
          <p>© 2026 Journey of Ceylon Private Tour Operators. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>SLTDA Licenced Reg: TSP/0942</span>
            <span>•</span>
            <span>Sustainable Tourism Certified</span>
          </div>
        </div>

      </footer>

    </div>
  );
}
