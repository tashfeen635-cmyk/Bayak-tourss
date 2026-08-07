export const destinations = [
  {
    id: "hunza",
    name: "Hunza Valley",
    region: "Gilgit-Baltistan",
    description:
      "A breathtaking valley surrounded by snow-capped peaks, ancient forts, and turquoise lakes. Known as the jewel of the Karakoram.",
    price: 65000,
    originalPrice: 85000,
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: ["Adventure", "Family", "Cultural"],
    featured: true,
    availableDates: ["Aug 15", "Sep 1", "Sep 20", "Oct 5"],
    included: [
      "Hotel Accommodation",
      "All Meals",
      "Transport",
      "Guide",
      "Activities",
    ],
    itinerary: [
      { day: 1, title: "Islamabad to Gilgit", description: "Scenic drive or flight to Gilgit, evening explore Gilgit bazaar and suspension bridge over Gilgit River." },
      { day: 2, title: "Gilgit to Karimabad", description: "Drive to Karimabad, visit Baltit Fort and Altit Fort with panoramic views of Rakaposhi and Ultar Sar peaks." },
      { day: 3, title: "Hunza Exploration", description: "Full day exploring Eagle's Nest viewpoint, Attabad Lake, and the stunning Passu Cones along the Karakoram Highway." },
      { day: 4, title: "Excursion Day", description: "Visit Hussaini Suspension Bridge, Borith Lake, and enjoy a traditional Hunza dinner with local music." },
      { day: 5, title: "Return to Islamabad", description: "Morning departure back to Gilgit, optional flight or scenic drive through the Karakoram Highway." },
    ],
  },
  {
    id: "skardu",
    name: "Skardu",
    region: "Gilgit-Baltistan",
    description:
      "Home to the world's highest peaks and deepest lakes. A paradise for mountaineers and nature lovers alike.",
    price: 72000,
    originalPrice: 95000,
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80",
    category: ["Adventure", "Luxury"],
    featured: true,
    availableDates: ["Aug 10", "Aug 25", "Sep 10", "Sep 28"],
    included: [
      "Hotel Accommodation",
      "All Meals",
      "Transport",
      "Guide",
      "Boat Ride",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Skardu", description: "Fly or drive to Skardu, check in to hotel, evening walk along the Indus River." },
      { day: 2, title: "Shangrila & Lower Kachura Lake", description: "Visit the famous Shangrila Resort, boat ride on Lower Kachura Lake, explore Upper Kachura." },
      { day: 3, title: "Shigar Valley", description: "Full day excursion to Shigar Fort, cold desert of Katpana, and Shigar Valley apple orchards." },
      { day: 4, title: "Deosai Plains", description: "Jeep safari to Deosai Plains, witness wildflower meadows, marmots, and the stunning Sheosar Lake." },
      { day: 5, title: "Skardu Sightseeing", description: "Visit Skardu Fort, Manthokha Waterfall, and enjoy a traditional Balti meal." },
      { day: 6, title: "Return Journey", description: "Morning departure back to Islamabad via scenic drive or flight." },
    ],
  },
  {
    id: "fairy-meadows",
    name: "Fairy Meadows",
    region: "Gilgit-Baltistan",
    description:
      "A lush green meadow at the base of Nanga Parbat, the 9th highest mountain in the world. An unforgettable trek.",
    price: 58000,
    originalPrice: 75000,
    duration: "4 Days / 3 Nights",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    category: ["Adventure"],
    featured: false,
    availableDates: ["Jul 20", "Aug 5", "Aug 20", "Sep 5"],
    included: [
      "Camping Stay",
      "Meals",
      "Jeep Transfer",
      "Guide",
      "Trekking Gear",
    ],
    itinerary: [
      { day: 1, title: "Raikot Bridge to Tato", description: "Jeep ride from Raikot Bridge on the Karakoram Highway to Tato village, the starting point of the trek." },
      { day: 2, title: "Trek to Fairy Meadows", description: "Scenic 3-hour trek through pine forests to Fairy Meadows, evening campfire with Nanga Parbat views." },
      { day: 3, title: "Nanga Parbat Base Camp", description: "Trek to Nanga Parbat Base Camp, witness the Rupal Face — one of the world's largest mountain walls." },
      { day: 4, title: "Return Journey", description: "Trek back to Tato and jeep ride to Raikot Bridge, onward journey to Islamabad or Gilgit." },
    ],
  },
  {
    id: "naran-kaghan",
    name: "Naran Kaghan",
    region: "Khyber Pakhtunkhwa",
    description:
      "Valley of lakes and meadows nestled in the Himalayas. Shogran, Siri Paye, and Lake Saiful Muluk await you.",
    price: 45000,
    originalPrice: 60000,
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    category: ["Family", "Honeymoon", "Cultural"],
    featured: true,
    availableDates: ["Jul 15", "Jul 30", "Aug 15", "Sep 1"],
    included: [
      "Hotel Accommodation",
      "Meals",
      "Transport",
      "Guide",
      "Boat Ride",
    ],
    itinerary: [
      { day: 1, title: "Islamabad to Naran", description: "Scenic drive through Balakot and Mansehra, stop at Kiwai Waterfall, arrive in Naran by evening." },
      { day: 2, title: "Lake Saiful Muluk", description: "Full day trip to the magical Lake Saiful Muluk, boat ride surrounded by snow-capped peaks and alpine scenery." },
      { day: 3, title: "Shogran & Siri Paye", description: "Jeep to Shogran, then horse ride to Siri Paye meadows with panoramic views of Makra Peak." },
      { day: 4, title: "Return to Islamabad", description: "Morning departure with stops at Balakot and Abbottabad on the way back." },
    ],
  },
  {
    id: "swat",
    name: "Swat Valley",
    region: "Khyber Pakhtunkhwa",
    description:
      "The Switzerland of the East. Crystal-clear rivers, alpine forests, and Buddhist heritage sites create a magical blend.",
    price: 42000,
    originalPrice: 55000,
    duration: "3 Days / 2 Nights",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    category: ["Family", "Cultural"],
    featured: false,
    availableDates: ["Jul 20", "Aug 5", "Aug 20", "Sep 10"],
    included: [
      "Hotel Accommodation",
      "Meals",
      "Transport",
      "Guide",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Mingora", description: "Drive to Mingora, visit the Swat Museum showcasing Gandhara Buddhist artifacts, evening at Mingora bazaar." },
      { day: 2, title: "Malam Jabba & Kalam", description: "Full day excursion to Malam Jabba ski resort, then to Kalam Valley for stunning river views and waterfall visits." },
      { day: 3, title: "Return Journey", description: "Morning visit to Bahrain and Mahodand Lake, afternoon drive back to Islamabad." },
    ],
  },
  {
    id: "gilgit",
    name: "Gilgit",
    region: "Gilgit-Baltistan",
    description:
      "The gateway to the Karakoram Highway. Ancient silk route history meets stunning mountain landscapes.",
    price: 62000,
    originalPrice: 80000,
    duration: "5 Days / 4 Nights",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    category: ["Adventure", "Cultural"],
    featured: false,
    availableDates: ["Aug 1", "Aug 15", "Sep 1", "Sep 15"],
    included: [
      "Hotel Accommodation",
      "All Meals",
      "Transport",
      "Guide",
      "Karakoram Highway Tour",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Gilgit", description: "Fly or drive to Gilgit, explore the old bazaar, visit Kargah Buddha rock carving, evening at Gilgit River." },
      { day: 2, title: "Naltar Valley", description: "Full day trip to Naltar Valley, visit the famous Naltar Lakes by jeep trek, lunch in the pine forests." },
      { day: 3, title: "Karakoram Highway", description: "Drive along the legendary Karakoram Highway, stop at Rakaposhi viewpoint and Hoper Glacier." },
      { day: 4, title: "Cultural Day", description: "Visit Baltit Fort, Altit Fort, and traditional Balti village for authentic cultural immersion." },
      { day: 5, title: "Departure", description: "Morning free time for shopping at the bazaar, afternoon flight or drive to Islamabad." },
    ],
  },
  {
    id: "neelum-valley",
    name: "Neelum Valley",
    region: "Azad Kashmir",
    description:
      "The blue gem of Kashmir. Lush green hills, cascading waterfalls, and pristine rivers as far as the eye can see.",
    price: 48000,
    originalPrice: 62000,
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
    category: ["Honeymoon", "Family", "Adventure"],
    featured: true,
    availableDates: ["Jul 25", "Aug 10", "Aug 28", "Sep 15"],
    included: [
      "Hotel Accommodation",
      "Meals",
      "Transport",
      "Guide",
      "Sightseeing",
    ],
    itinerary: [
      { day: 1, title: "Muzaffarabad to Keran", description: "Drive to Muzaffarabad, continue to Keran along the Neelum River, check in and evening walk along the riverbank." },
      { day: 2, title: "Keran & Sharda", description: "Full day exploring Keran viewpoint, visit Sharda ancient ruins and Sharda University remnants." },
      { day: 3, title: "Upper Neelum", description: "Drive to Upper Neelum, visit Dhani Waterfall and Ratti Galli Lake viewpoint with stunning valley views." },
      { day: 4, title: "Return Journey", description: "Morning departure to Muzaffarabad, stop at Dhani Waterfall and Pir Chinasi on the way back." },
    ],
  },
  {
    id: "deosai",
    name: "Deosai Plains",
    region: "Gilgit-Baltistan",
    description:
      "The Land of Giants — the second-highest plateau in the world. Wildflowers, marmots, and endless skies.",
    price: 78000,
    originalPrice: 100000,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    category: ["Adventure", "Luxury"],
    featured: false,
    availableDates: ["Aug 5", "Aug 20", "Sep 5"],
    included: [
      "Camping Stay",
      "All Meals",
      "4x4 Transport",
      "Guide",
      "Camping Gear",
    ],
    itinerary: [
      { day: 1, title: "Skardu to Shila", description: "Jeep ride from Skardu to Shila through winding mountain roads, set up camp near the river." },
      { day: 2, title: "Trek to Deosai", description: "Full day trek entering the Deosai National Park, witness the transition from forest to vast alpine plateau." },
      { day: 3, title: "Sheosar Lake", description: "Full day exploration of Sheosar Lake, one of the world's highest lakes, surrounded by wildflower meadows." },
      { day: 4, title: "Deosai Exploration", description: "Visit Bara Pani, Chota Pani, and the Deosai Plateau — spot marmots, golden eagles, and Himalayan brown bears." },
      { day: 5, title: "Return Trek", description: "Trek back through the plateau and forest, camp at Shila for the final night under the stars." },
      { day: 6, title: "Back to Skardu", description: "Jeep ride back to Skardu, visit Shangrila Resort, evening free for shopping." },
    ],
  },
];

export const reels = [
  {
    id: "kalash-reel",
    destination: "Kalash Valley",
    description: "Step into the timeless culture of the Kalash Valley in Chitral.",
    video: "/videos/reel-kalash.mp4",
    poster: "/videos/poster-reel-kalash.jpg",
  },
  {
    id: "naran-reel",
    destination: "Naran Kaghan",
    description: "Lake Saiful Muluk — the lake of fairy tales.",
    video: "/videos/video-4.mp4",
    poster: "/videos/poster-video-4.jpg",
  },
  {
    id: "khunjerab-reel",
    destination: "Khunjerab Pass",
    description: "Where China meets Pakistan at 4,693 meters.",
    video: "/videos/video-7.mp4",
    poster: "/videos/poster-video-7.jpg",
  },
  {
    id: "beyal-camp-reel",
    destination: "Beyal Camp",
    description: "The best view of Nanga Parbat — camp beneath the giants.",
    video: "/videos/reel-beyal-camp.mp4",
    poster: "/videos/poster-reel-beyal-camp.jpg",
  },
  {
    id: "autumn-reel",
    destination: "Autumn in Skardu",
    description: "Dm for your autumn tour of Gilgit-Baltistan.",
    video: "/videos/reel-autumn.mp4",
    poster: "/videos/poster-reel-autumn.jpg",
  },
  {
    id: "fairy-meadows-reel",
    destination: "Fairy Meadows",
    description: "A place you never want to say goodbye to.",
    video: "/videos/reel-fairy-meadows.mp4",
    poster: "/videos/poster-reel-fairy-meadows.jpg",
  },
  {
    id: "passu-cones-reel",
    destination: "Passu Cones",
    description: "Karakoram's crown — the mighty Passu Cones of Hunza.",
    video: "/videos/reel-passu-cones.mp4",
    poster: "/videos/poster-reel-passu-cones.jpg",
  },
  {
    id: "nangma-valley-reel",
    destination: "Nangma Valley",
    description: "Create your own travel story — customized trips to Baltistan.",
    video: "/videos/reel-nangma-valley.mp4",
    poster: "/videos/poster-reel-nangma-valley.jpg",
  },
  {
    id: "skardu-reel-2",
    destination: "Skardu",
    description: "Wait for the end — a reel from the land of high peaks.",
    video: "/videos/reel-skardu-2.mp4",
    poster: "/videos/poster-reel-skardu-2.jpg",
  },
  {
    id: "gilgit-baltistan-reel",
    destination: "Gilgit Baltistan",
    description: "Dm for your tour of Gilgit-Baltistan.",
    video: "/videos/reel-gilgit-baltistan.mp4",
  },
  {
    id: "upper-kachura-reel",
    destination: "Upper Kachura Lake",
    description: "Boating adventure on Upper Kachura Lake.",
    video: "/videos/reel-upper-kachura.mp4",
  },
];

export const teamMembers = [
  {
    name: "Ahmed Khan",
    role: "Founder & CEO",
    bio: "With over 15 years in Pakistan tourism, Ahmed founded Terra Pakistan to share the beauty of Pakistan with the world.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    experience: "15+ Years",
    specialization: "Adventure & Luxury Tours",
    languages: ["English", "Urdu", "Shina"],
  },
  {
    name: "Fatima Ali",
    role: "Head of Operations",
    bio: "A mountaineering enthusiast who has trekked every major route in the Karakoram and Himalayan ranges.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    experience: "10+ Years",
    specialization: "Trekking & Mountaineering",
    languages: ["English", "Urdu", "Balti"],
  },
  {
    name: "Bilal Shah",
    role: "Lead Tour Guide",
    bio: "Born and raised in Hunza, Bilal knows every hidden gem in Pakistan's northern areas like the back of his hand.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    experience: "8+ Years",
    specialization: "Cultural & Heritage Tours",
    languages: ["English", "Urdu", "Burushaski"],
  },
  {
    name: "Sana Malik",
    role: "Client Relations Manager",
    bio: "Sana ensures every traveler's journey is seamless from the first inquiry to the final farewell.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    experience: "6+ Years",
    specialization: "Family & Honeymoon Packages",
    languages: ["English", "Urdu", "Punjabi"],
  },
];

export const testimonials = [
  {
    name: "Sarah Mitchell",
    country: "United Kingdom",
    text: "Terra Pakistan made our trip to Hunza absolutely magical. The guides were incredible, the views were unreal, and every detail was taken care of. Best travel experience of our lives!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
  },
  {
    name: "David Chen",
    country: "Singapore",
    text: "Trekking to Fairy Meadows with Terra Pakistan was a dream come true. Professional, safe, and so much fun. They truly know how to make every moment special.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    name: "Emma Rodriguez",
    country: "Spain",
    text: "The Skardu trip exceeded all expectations. The Shangrila Resort, the boat ride — everything was perfect. Already planning my next trip with Terra Pakistan!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
  },
  {
    name: "James Wilson",
    country: "Australia",
    text: "Pakistan surprised me in the best way possible. Terra Pakistan showed me a side of this country that travel blogs don't show. Truly remarkable.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
  },
  {
    name: "Mia Tanaka",
    country: "Japan",
    text: "The attention to detail was incredible. From the local food experiences to the hidden viewpoints, Terra Pakistan knows Pakistan inside out.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Hunza Valley panorama",
    category: "Mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Lake reflection at sunrise",
    category: "Lakes",
  },
  {
    src: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80",
    alt: "Mountain campsite",
    category: "Adventure",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    alt: "Misty mountain valley",
    category: "Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
    alt: "Northern landscape",
    category: "Mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    alt: "Turquoise river",
    category: "Lakes",
  },
];

export const stats = [
  { label: "Tours Completed", value: 44 },
  { label: "Happy Travelers", value: 438 },
  { label: "Destinations", value: 11 },
  { label: "Years Experience", value: 5 },
];

export const whyChooseUs = [
  { label: "Professional Guides", description: "Certified, experienced, and passionate about Pakistan's beauty." },
  { label: "Affordable Packages", description: "Premium experiences at prices that don't break the bank." },
  { label: "Custom Tours", description: "Every trip tailored to your interests, pace, and group size." },
  { label: "24/7 Support", description: "Round-the-clock assistance before, during, and after your trip." },
  { label: "Luxury Transport", description: "Comfortable 4x4s, air-conditioned coaches, and private transfers." },
  { label: "Secure Booking", description: "Safe payments and transparent pricing." },
];
