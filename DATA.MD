# Traitement de données : 

## Sources des données : 

Nous utilisons plusieurs datasets publiés par la SNCF (open data) sur le lien suivant : https://data.sncf.com/explore/

Les fichiers que nous utilisons sont présents dans le dossier <a href="https://github.com/OumaimaFassi/SNCF_viz/tree/master/Dataset"> Datasets </a>

Ces fichiers seront traités pour construire une base de données contenant les gares TGV qui nous intéressent avec toutes les informations dont nous avons besoin pour notre projet.

1- Fréquentation en gare : https://data.sncf.com/explore/dataset/frequentation-gares/?sort=nom_gare

2- Services d'attente en gare : https://data.sncf.com/explore/dataset/gares-pianos/?sort=gare

3- Répartition des motifs de déplacements des voyageurs et non voyageurs : https://data.sncf.com/explore/dataset/repartition-des-motifs-de-deplacements-des-voyageurs-et-non-voyageurs-enquetes-e/

4- Répartition des clients par âge : https://data.sncf.com/explore/dataset/enquetes-gares-connexions-repartition-repartition-par-classe-dage/table/?sort=gare_enquetee

5- Répartition des modes d'accès à la gare : https://data.sncf.com/explore/dataset/repartition-de-lutilisation-des-moyens-dacces-ou-de-diffusion-a-la-gare-enquetes/?sort=annee

6- Gares équipées du wifi : https://data.sncf.com/explore/dataset/gares-equipees-du-wifi/?sort=nom_de_la_gare

7- Contrôles de propreté en gare : https://data.sncf.com/explore/dataset/proprete-en-gare/?sort=mois 

8- Répartition des distances d’accès à la gare : https://data.sncf.com/explore/dataset/repartition-des-distances-dacces-a-la-gare-enquetes-en-gare/

9- Accompagnement de personnes à mobilité réduite dans les gares : https://data.sncf.com/explore/dataset/accompagnement-pmr-gares/?sort=datemensuel

10- Baromètre satisfaction client en gare : https://data.sncf.com/explore/dataset/barometre-client/

11- Référentiel des gares de voyageurs : https://ressources.data.sncf.com/explore/dataset/referentiel-gares-voyageurs/table/?sort=intitule_gare&q=frequent

## Analyse des données :

1- Fréquentation en gare : 

	- Nombre de voyageurs en 2016
	
	- Evolution de fréquentation entre 2015 et 2016
	
	- Sélection des 50 gares TGV les plus fréquentées
	
2- Services d'attente en gare :

	- Nombres de {Piano; Power Station; Baby-Foot; Distributeurs d'Histoires Courtes} disponibles en gare. 
	
3- Répartition des motifs de déplacements des voyageurs et non voyageurs :
	
	- Il faudra regrouper les pourcentages par gare (motif, %)

4- Répartition des clients par âge : 

	- Regrouper par gare (tranche d'âge, %)

	- Il y a un pourcentage pour les classes d'âge non communiquées (inconnues)

5- Répartition des modes d'accès à la gare :
	
	- Regrouper par gare (moyen, 1/0)
	
	- Moyens : Bus/Car/Navette - Métro / RER - Marche - Taxi - Tramway - vélo - voiture conducteur - voiture passager - autres voitures (ne garder que les 3 moyens les plus utilisés ?)

6- Gares équipées du wifi :
	
	- Rien à modifier (sauf peut être changer les oui/non en 0/1)

7- Contrôles de propreté en gare : 

	- Garder UIC + taux de conformité (score : quel format/valeur ?)

8- Répartition des distances d’accès à la gare :

	- Il faudra donner un score à chaque gare (score de la distance avec le % maximal)

9- Accompagnement de personnes à mobilité réduite dans les gares :

	- Scoring

10- Satisfaction des clients

	- Pour chaque gare, scores sur 10 de la satisfaction client sur les critères suivants : Communication lors de perturbations, Propreté, Sécurité, Confort d'attente en gare, Commerces & restauration


11- Référentiel des gares de voyageurs :

	- Extraire la longitude, la latitude, le nom de la gare et de sa région / ville

## Traitement des données : 

### TRIFACTA Wrangler :

Nous utilisons dans un premier temps le logiciel TRIFACTA Wrangler pour nettoyer nos données séparément pour ensuite les croiser grâce au *CODE UIC* des gares présent dans toutes les bases de données utilisées.
