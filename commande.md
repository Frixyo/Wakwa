Commande de base pour Haulstein

1. Install dependencies



   ```bash
      E:

      cd repo

      cd Wakwa

      npm install
      npm i
   ```

2. Push des fichiers
   ```bash
      git add *
      git commit -m"description du log"
      git push
   ```

2. Start the app

   ```bash
      npm run start

      faire s pour passer à expo go
   ```

## Reinstaller la BD

   go into assets/db
   delete mydatabase.db
   ```bash
      sqlite3 mydatabase.db < init.sql
   ```
3. Expo go

   CTRL+C pour fermer l'appli

## A FAIRE (idée)

1. joueuPage.tsx

   ```bash
   sur joueurPage
   créer 1 zone de texte qui indique le bouton changer de pion
   créer 1 bouton qui affiche un pop up
   créer 1 image qui affiche le pion choisi
   lorsque le joueur appuie sur url image (choix du pion) une liste défilante s'affiche et permet au joueur de choisir un pion.
   une fois le pion choisi le pop up se ferme et affiche le pion choisi sur l'image à droite.
   ```