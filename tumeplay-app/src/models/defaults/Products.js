const products = {
  boxs: [
    {
      key: 0,
      id: 0,
      title: 'Découvre ton corps',
      description:
        "Tu te poses des questions sur le sexe, ton corps et celui des autres ? Cette boîte essaie d'y répondre avec du contenu ludique et te propose des préservatifs pour les appréhender sans prise de tête.",
      products: [
        {
          title: 'Préservatifs internes ( ou "féminins" ) en nitrile',
          shortTitle: 'Préservatifs féminins',
          qty: 3,
        },
        {
          title: 'Préservatifs Durex Classic Jeans',
          shortTitle: 'Préservatifs Durex Classic Jeans',
          qty: 3,
        },
        {
          title: 'Préservatifs Manix King Size ( préservatifs grande taille )',
          shortTitle: 'Préservatifs Manix King Size',
          qty: 3,
        },
        {
          title: "Des dosettes de lubrifiant à base d'eau",
          shortTitle: "Lubrifiant à base d'eau",
          qty: false,
        },
        {
          title: 'Miroir',
          shortTitle: 'Miroir',
          qty: 1,
        },
      ],
      price: 500,
      picture: require('../../assets/pictures/landing/discover.png'),
    },
    {
      key: 1,
      id: 1,
      title: 'Les premières fois',
      description:
        'Tu découvres ta sexualité et tu aimerais en apprendre plus ? Avec cette boîte, retrouve des témoignages de jeunes qui teparlent de leur première fois ainsi que des préservatifs et lubrifiants pour te lancer sans prise de tête !',
      products: [
        {
          title: 'Préservatifs internes ( ou "féminins" ) en nitrile',
          shortTitle: 'Préservatifs féminins',
          qty: 3,
        },
        {
          title: 'Préservatifs Durex Pleasure Me ( texture perlée stimulante )',
          shortTitle: 'Préservatifs Durex Pleasure Me',
          qty: 3,
        },
        {
          title: 'Préservatifs Manix Skyn ( ultra-fins )',
          shortTitle: 'Préservatifs Manix Skyn',
          qty: 2,
        },
        {
          title: "Des dosettes de lubrifiant à base d'eau",
          shortTitle: "Lubrifiant à base d'eau",
          qty: false,
        },
      ],
      price: 500,
      picture: require('../../assets/pictures/landing/first-time-2.png'),
    },
    {
      key: 2,
      id: 2,
      title: 'Expérimente ta sexualité',
      description:
        "Tu es à l'aise avec ta sexualité et tu recherches comment développer ton plaisir ? Cette boîte t'accompagne dans la connaissance de toi avec un bon panaché de préservatifs et de gels à essayer !",
      products: [
        {
          title: 'Préservatifs internes ( ou "féminins" ) en nitrile',
          shortTitle: 'Préservatifs féminins',
          qty: 3,
        },
        {
          title: 'Préservatifs Manix Skyn ( ultra-fins )',
          shortTitle: 'Préservatifs Manix Skyn',
          qty: 2,
        },
        {
          title: 'Boite de carrés de latex',
          shortTitle: 'Boite de carrés de latex',
          qty: 1,
        },
        {
          title: 'Des dosettes de lubrifiant aromatisé',
          shortTitle: 'Lubrifiant aromatisé',
          qty: false,
        },
      ],
      price: 500,
      picture: require('../../assets/pictures/landing/discover-sexuality.png'),
    },
    {
      key: 3,
      id: 3,
      title: 'Expérimente ta sexualité',
      description:
        "Tu te connais bien, tu sais ce que tu aimes et tu veux accéder à notre catalogue pour ne commander que les produits qui t'intéressent ? Cette boite est faite pour et surtout par toi !",
      products: [],
      price: 500,
      picture: require('../../assets/pictures/landing/sos.png'),
    },
  ],
  products: [
    {
      id: 1,
      title: 'Préservatifs internes ( ou "féminins" ) en nitrile',
      shortTitle: 'Préservatifs féminins',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      qty: 3,
      picture: require('../../assets/pictures/landing/discover-sexuality.png'),
    },
    {
      id: 2,
      title: 'Préservatifs Manix Skyn ( ultra-fins )',
      shortTitle: 'Préservatifs Manix Skyn',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      qty: 2,
      picture: require('../../assets/pictures/landing/discover-sexuality.png'),
    },
    {
      id: 3,
      title: 'Boite de carrés de latex',
      shortTitle: 'Boite de carrés de latex',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      qty: 1,
      picture: require('../../assets/pictures/landing/discover-sexuality.png'),
    },
    {
      id: 4,
      title: 'Des dosettes de lubrifiant aromatisé',
      shortTitle: 'Lubrifiant aromatisé',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      qty: false,
      picture: require('../../assets/pictures/landing/discover-sexuality.png'),
    },
    {
      id: 5,
      title: 'Préservatifs Durex Pleasure Me ( texture perlée stimulante )',
      shortTitle: 'Préservatifs Durex Pleasure Me',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      qty: 3,
      picture: require('../../assets/pictures/landing/discover-sexuality.png'),
    },
    {
      id: 6,
      title: 'Préservatifs Manix Skyn ( ultra-fins )',
      shortTitle: 'Préservatifs Manix Skyn',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      qty: 2,
      picture: require('../../assets/pictures/landing/discover-sexuality.png'),
    },
    {
      id: 7,
      title: "Des dosettes de lubrifiant à base d'eau",
      shortTitle: "Lubrifiant à base d'eau",
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      qty: false,
      picture: require('../../assets/pictures/landing/discover-sexuality.png'),
    },
  ],
};

export default products;
