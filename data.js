const products = [
    {
        "id": 1,
        "name": "Acer Aspire 1 A115-32-C3AK Ordinateur Portable 15,6'' Full HD, PC Portable (Intel Celeron N4500, RAM 4 Go, 128 Go eMMC, Intel UHD Graphics, Windows 11 ) - Clavier AZERTY (Français), Laptop Gris",
        "category": "Ordinateurs portables",
        "price": 209,
        "oldPrice": 299.00,
        "ratingText": "4,3 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/81PoGjMMHWL._AC_UL320_.jpg",
        "link": "https://amzn.to/49STPrS",
        "description": "Acer Aspire 1 A115-32-C3AK Ordinateur Portable 15,6'' Full HD, PC Portable (Intel Celeron N4500, RAM 4 Go, 128 Go eMMC, Intel UHD Graphics, Windows 11 ) - Clavier AZERTY (Français), Laptop Gris - Produit disponible dans la section Ordinateurs portables."
    },
    {
        "id": 2,
        "name": "Apple MacBook Air 13 Pouces Ordinateur Portable avec Puce M4 : Conçu pour Apple Intelligence, Écran Liquid Retina de 13,6 Pouces, Mémoire unifiée de 16 Go, Stockage SSD de 256 Go, Touch ID ; Minuit",
        "category": "Ordinateurs portables",
        "price": 949,
        "oldPrice": 1099.0,
        "ratingText": "4,7 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/71sQdN4lfYL._AC_UL320_.jpg",
        "link": "https://amzn.to/4qeH5jX",
        "description": "Apple MacBook Air 13 Pouces Ordinateur Portable avec Puce M4 : Conçu pour Apple Intelligence, Écran Liquid Retina de 13,6 Pouces, Mémoire unifiée de 16 Go, Stockage SSD de 256 Go, Touch ID ; Minuit - Produit disponible dans la section Ordinateurs portables."
    },
    {
        "id": 102,
        "name": "Tablette Enfants 10 Pouces Kids Tablette HD Écran IPS 1280 * 800 Tablettes Tactiles Pour Enfants Android 14 Octa-Core 8GB+64GB Extensible Jusqu’à 1TB Contrôle Parental 5MP+8MP WiFi 6 BT 5.3 (Violet)",
        "category": "Tablettes tactiles",
        "price": 69.99,
        "oldPrice": 71.99,
        "ratingText": "4,2 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/61Y9SCtwbkL._AC_UL320_.jpg",
        "link": "https://amzn.to/4rkwpRR",
        "description": "Tablette Enfants 10 Pouces Kids Tablette HD Écran IPS 1280 * 800 Tablettes Tactiles Pour Enfants Android 14 Octa-Core 8GB+64GB Extensible Jusqu’à 1TB Contrôle Parental 5MP+8MP WiFi 6 BT 5.3 (Violet) - Produit disponible dans la section Tablettes tactiles."
    },
    {
        "id": 103,
        "name": "XIAOMI Redmi Pad SE 4Go/128Go Wi-FI Gris (Graphite Gray)",
        "category": "Tablettes tactiles",
        "price": 149.90, // Correction : virgule remplacée par un point
        "oldPrice": 0,
        "ratingText": "4,5 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/51T16GctLzL._AC_UL320_.jpg",
        "link": "https://amzn.to/3OeR2AC",
        "description": "XIAOMI Redmi Pad SE 4Go/128Go Wi-FI Gris (Graphite Gray) - Produit disponible dans la section Tablettes tactiles."
    },
    {
        "id": 105,
        "name": "Samsung Galaxy Tab S10 FE, Tablette Android WIFI 10.9\" 256 Go, S Pen inclus, Certification IP68, Gris Anthracite, Chargeur Secteur Rapide 25W Inclus, Version FR",
        "category": "Tablettes tactiles",
        "price": 483.5,
        "oldPrice": 679.0,
        "ratingText": "3,9 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/61YWBpV5zeL._AC_UL320_.jpg",
        "link": "https://amzn.to/46civZY",
        "description": "Samsung Galaxy Tab S10 FE, Tablette Android WIFI 10.9\" 256 Go, S Pen inclus, Certification IP68, Gris Anthracite, Chargeur Secteur Rapide 25W Inclus, Version FR - Produit disponible dans la section Tablettes tactiles."
    },
    {
        "id": 198,
        "name": "Greed® MK5 Power - Gaming PC - Intel Core i9 12900KF + Nvidia Geforce RTX 5070Ti 16GB - Ordinateur RGB avec 4K & Raytracing - 5,2 GHZ - 32 Go DDR5 RAM - 1TB SSD - WLAN + Win 11 Pro",
        "category": "Ordinateurs de bureau & Ecrans",
        "price": 2349.9,
        "oldPrice": 2819.88,
        "ratingText": "4,4 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/71fbWC43uHL._AC_UL320_.jpg",
        "link": "https://amzn.to/45FFVqs",
        "description": "Greed® MK5 Power - Gaming PC - Intel Core i9 12900KF + Nvidia Geforce RTX 5070Ti 16GB - Ordinateur RGB avec 4K & Raytracing - 5,2 GHZ - 32 Go DDR5 RAM - 1TB SSD - WLAN + Win 11 Pro - Produit disponible dans la section Ordinateurs de bureau & Ecrans."
    },
    {
        "id": 199,
        "name": "Ordinateur de Bureau Windows 11 24h2 (Pro), Intel i5, 8 Go RAM, 240 Go SSD, Wi-FI, Moniteur LCD 22 Pouces, Clavier et Souris, Open Office 2024, Reconditionné, Compatible",
        "category": "Ordinateurs de bureau & Ecrans",
        "price": 192.00,
        "oldPrice": 232.00,
        "ratingText": "4,0 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/41B3BimWyHL._AC_UL320_.jpg",
        "link": "https://amzn.to/4tapNr1",
        "description": "Ordinateur de Bureau Windows 11 24h2 (Pro), Intel i5, 8 Go RAM, 240 Go SSD, Wi-FI, Moniteur LCD 22 Pouces, Clavier et Souris, Open Office 2024, Reconditionné, Compatible - Produit disponible dans la section Ordinateurs de bureau & Ecrans."
    },
    {
        "id": 303,
        "name": "Sacs Sous Vide Vetement Aspirateur XXL(130x100cm) - Extra Large Housse de Rangement Sous Vide pour Vêtements, Couettes, Literie, Oreillers - Gagnez 80% d'Espace de Rangement",
        "category": "Stockage",
        "price": 25.99,
        "oldPrice": 31.19,
        "ratingText": "4,2 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/616j9X887wL._AC_UL320_.jpg",
        "link": "https://amzn.to/4k8k0hy",
        "description": "Sacs Sous Vide Vetement Aspirateur XXL(130x100cm) - Extra Large Housse de Rangement Sous Vide pour Vêtements, Couettes, Literie, Oreillers - Gagnez 80% d'Espace de Rangement - Produit disponible dans la section Stockage."
    },
    {
        "id": 304,
        "name": "KingSpec 1To 2.5\" SATA SSD, 3D NAND Flash Disque Dur SSD Interne, Vitesse de Lecture jusqu'à 550 Mo/Sec - pour Ordinateur de Bureau/Portable/Tout-en-Un",
        "category": "Stockage",
        "price": 142.99,
        "oldPrice": 0,
        "ratingText": "4,6 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/617eri7XTRL._AC_UL320_.jpg",
        "link": "https://amzn.to/4aodKPn",
        "description": "KingSpec 1To 2.5\" SATA SSD, 3D NAND Flash Disque Dur SSD Interne, Vitesse de Lecture jusqu'à 550 Mo/Sec - pour Ordinateur de Bureau/Portable/Tout-en-Un - Produit disponible dans la section Stockage."
    },
    {
        "id": 385,
        "name": "Réseaux et télécoms - 4ème édition",
        "category": "Réseaux",
        "price": 37.99,
        "oldPrice": 48.50,
        "ratingText": "4,5 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/81fdz+-GqGL._AC_UL320_.jpg",
        "link": "https://amzn.to/3NSumWQ",
        "description": "Réseaux et télécoms - 4ème édition - Produit disponible dans la section Réseaux."
    },
    {
        "id": 386,
        "name": "Les Réseaux pour les Nuls - 15e édition",
        "category": "Réseaux",
        "price": 25.95,
        "oldPrice": 31.00,
        "ratingText": "4,4 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/61nRl8Ad9BL._AC_UL320_.jpg",
        "link": "https://amzn.to/4rv3pHn",
        "description": "Les Réseaux pour les Nuls - 15e édition - Produit disponible dans la section Réseaux."
    },
    {
        "id": 387,
        "name": "L'Art de capter l'attention sur les réseaux sociaux",
        "category": "Réseaux",
        "price": 22,
        "oldPrice": 26.00,
        "ratingText": "4,5 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/610eSZM2XhL._AC_UL320_.jpg",
        "link": "https://amzn.to/4a1ULsI",
        "description": "L'Art de capter l'attention sur les réseaux sociaux - Produit disponible dans la section Réseaux."
    },
    {
        "id": 483,
        "name": "MSI MAG Forge 321R Airflow Boîtier PC Moyen Tour - ATX, Compatible avec Les GPU RTX 40, Ventilateurs ARGB, filtres à poussière magnétiques, Verre trempé, Hub de contrôle ARGB, USB Type-C 3.2 Gen 2x2",
        "category": "Composants pc",
        "price": 76.99,
        "oldPrice": 89.99,
        "ratingText": "4,7 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/719vOY+xxjL._AC_UL320_.jpg",
        "link": "https://amzn.to/4acmpDt",
        "description": "MSI MAG Forge 321R Airflow Boîtier PC Moyen Tour - ATX, Compatible avec Les GPU RTX 40, Ventilateurs ARGB, filtres à poussière magnétiques, Verre trempé, Hub de contrôle ARGB, USB Type-C 3.2 Gen 2x2 - Produit disponible dans la section Composants pc."
    },
    {
        "id": 484,
        "name": "MUSETEX Boitier PC ATX, 3 Ventilateurs Non-LED préinstallés, Support RAD 360MM, Verre trempé 270° Full View Boitier Pc Gamer with Type-C, Boîtier d'ordinateur Mid Tower ATX, Noir, Y6",
        "category": "Composants pc",
        "price": 75.99,
        "oldPrice": 79.99,
        "ratingText": "4,6 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/81Jm7SYdf3L._AC_UL320_.jpg",
        "link": "https://amzn.to/3NRcU51",
        "description": "MUSETEX Boitier PC ATX, 3 Ventilateurs Non-LED préinstallés, Support RAD 360MM, Verre trempé 270° Full View Boitier Pc Gamer with Type-C, Boîtier d'ordinateur Mid Tower ATX, Noir, Y6 - Produit disponible dans la section Composants pc."
    },
    {
        "id": 587,
        "name": "LAPLINK PCmover Professional 11 - Logiciel de Migration, Pour Fichiers, Dossiers & Programmes, Câble Ethernet Haute Vitesse 1 Gbps, Automatique, 1x Utilisation",
        "category": "Logiciels",
        "price": 51.98,
        "oldPrice": 0, // Correction : ajout de la valeur 0 car elle était vide
        "ratingText": "3,7 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/71Cvg8bBumL._AC_UL320_.jpg",
        "link": "https://amzn.to/4tcBg9t",
        "description": "LAPLINK PCmover Professional 11 - Logiciel de Migration, Pour Fichiers, Dossiers & Programmes, Câble Ethernet Haute Vitesse 1 Gbps, Automatique, 1x Utilisation - Produit disponible dans la section Logiciels."
    },
    {
        "id": 1235,
        "name": "ZimaBlade 7700 Pack de Stockage Serveur monocarte X86(avec RAM et Adaptateur Type-C),Serveur Personnel piratable avec PCIe x4, Serveur multimédia Gigabit Ethernet 4K et Stockage en réseau",
        "category": "Serveurs",
        "price": 210.99,
        "oldPrice": 253.19,
        "ratingText": "4,2 sur 5 étoiles",
        "image": "https://m.media-amazon.com/images/I/713hLwQElBL._AC_UL320_.jpg",
        "link": "https://amzn.to/4qbPmFo",
        "description": "ZimaBlade 7700 Pack de Stockage Serveur monocarte X86(avec RAM et Adaptateur Type-C),Serveur Personnel piratable avec PCIe x4, Serveur multimédia Gigabit Ethernet 4K et Stockage en réseau - Produit disponible dans la section Serveurs."
    }
];
