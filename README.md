# SNCF_viz

Notre projet consiste à créer un outil permettant aux voyageurs de consulter les propriétés des grandes gares TGV de France et de les comparer entre elles, notamment la propreté de la gare, la satisfaction des voyageurs, les divertissements en gare, l'accompagnement des personnes à mobilité réduite, les moyens d'accès à la gare, etc...

# Intro

Welcome to our project’s page. Our visualization project is a navigation tool of France’s 127 most frequented train stations. It is destined to the passengers looking for the train station meeting their needs, especially in case they were spending a long time there. 

Using our interactive visualization will not only allow you to see the most important characteristics of each train station, but also to compare their performance on different levels, such as the quality of divertisment, the accessibility, the number and the variation of the travelers who pass by the station…

We have joined 9 <a href = “lien du site”>datasets</a> provided by the French railways company SNCF on their <a href = “https://data.sncf.com/”>Open Data website</a> in order to make it easier for you to evaluate and compare the quality of service of different train stations in France. Even though some of the necessary Data to build our visualization was missing, we have managed to make sure that it won’t affect the information we give you and therefore we’ll notify you in case of missing data.

We invite you to read the following parts to discover the utility of our tool !

# General layout of the page
The page is divided in two parts. The left one, named “Station(s) selection”, contains a map of France, along with interactive legends, filters, and two ways to select stations to compare. The right part of the page, named “Features”, contains detailed information on the selected map(s). When no station is selected, the second part just filled with message giving an incentive to select one or two stations.

![accueil][index]

## Map part
Each station is represented by a circle on the map. Each circle’s radius depends on the number of travellers that used the station in 2016 (a big circle means a big number), while its color depends on the variation of this number between 2016 and 2015 (a green circle stands for a positive variation). Because two stations can be geographically close to each other, we have made sure that their circles do not collide, thus they can be a bit far away from their exact location.

## Legend
The legend, at the right of the map, describes which circle radius corresponds to which interval of numbers of travellers, and which color corresponds to which interval of variations. Both the radius’s and the color’s intervals are made out of quantiles, i.e. each interval stands for the same number of stations corresponding.
![légende][legend1]
![légende][legend2]

 ## Filters
The checkboxes that you can click under the map are used as filters. For instance, if you check the “Piano(s)” checkbox, then all the stations that do not have at least one piano will disappear.

![checkbox filter][filter]

## Tooltip
When you hover a circle, a tooltip appears aside, showing the name of the station, and the department and region where it is located.

![mouseover tooltip][tooltip]

## Station selection
To select a station, you can either click on its circle representation on the map, or find it by scrolling through one of the two dropdowns, at the bottom-left of the page. When a station is selected, the corresponding circle on the map is momentarily highlighted. Also, a red cross appears next to the dropdown, allowing you to easily deselect the station.

![1ere selection][1selection]

# Station’s features

After selecting the first train station, its information appears to the right-hand side of the window. There are reminded its name, the number of travelers who used the station in 2016 and its fluctuation compared to the preceding year.

Below this text- and if available- you can find a list of entertainments existing in the station. Knowing if Wi-Fi is available or if you’ll get the chance to play table-football could come in handy if a long delay awaits you. Other than these two features, you can check if power stations, pianos or even distributors of short stories are at your disposal  in the selected station. 

On top of that, one might want to know how to get there ? *Can I go on foot or should I book a taxis ?* That’s why we have added another set of data regarding the means used by travelers to get to the station you’ve selected. Whether they go by car, taxis, bus, subway (a.k.a underground), tramway, bike or on foot ; it is now displayed on your screen.
Now mind you, a blank space doesn’t mean there are no way to get there, but rather that the dataset used to create this webpage was incomplete.

For both lists, either there is a blue square as background to an icon -in which case the station features such entertainment or people came here using a specific mean- or there are no square - which either means that data is missing or the property doesn’t check.
Additionally, if any data are missing for either station, a message will appear to warn you.

![InfoManquantes][info_manquantes]

Other useful information are displayed at the bottom of the webpage regarding people’s motives for using this station. A bar chart provides you with percentages of people who came here as daily commuters, for business travel, for studies, for recreational purpose or other reasons. 


# Station’s radarchart

Another representation of the station’s quality of service  is visualized in a Radar Chart in the bottom of the page. This representation shows the score of the selected station on these levels : : the cleanliness of the station, the security provided in the station, the communication on disruptions, the waiting comfort in this station, the quality of the shops, the distance of access, and finally the assistance for the disabled people.  
These features are graded as a score of 1 to 10, the lower the score, the less qualified the concerned station is on this level. You can hover the features circle to see the value of the score. If a score is missing, it will be represented as equal to zero but you can see on the tooltip whether it’s an actual zero or a missing value.
Adding to this, a global score of the station is shown beside the radar chart.  This score is the average of the radar chart’s scores.

![radarChart][radar_info_manquantes]

# Second selection 

Once the first station has been selected and you’ve had a look at all its properties, you can select a second station using of two ways : either you click on another station on the map ; or you can search for a specific one in the second  dropdown menu.

If two train stations are chosen and none of them is ‘none’, then the information about the second station will appear to the side of the first one’s information. 
To compare the data regarding these two stations, every square will now divide into two rectangles to each represent a station. Left rectangles are bound to the first station’s data and rectangles on the right are bound to the second station’s data.

You could face 3 situations : 
*A rectangle can be filled with its station color (i.e. blue for the first one and orange for the second one) meaning that the station include a feature ; 
*A rectangle can be filled with grey meaning that the station is not equipped with a specific mean of entertainment of that people don’t use a particular way to get to the station ; 
*An icon (e.g power station) could be ‘missing’ and as previously mentioned this would mean that data are missing or that neither station has the feature.

The bar chart will also update itself to add all the info available about the second station’s users.

The radar chart will also display another representation of the second station’s scores on the existing representation. We can easily distinguish the two representation for their colors are different and their opacity is low. The station you put your mouse on will have a stronger opacity. This tool will allow you to compare the performance of the stations on the different characteristics concerned, indeed, the radar chart makes it easier for you to see which station has a higher score on a certain level. To make it even easier for you, you can check the global score of the stations beside the radar chart to see a global comparison of the two stations. 

![2eme selection][2selection]

## Changing selection  

Now that you’re all set with two train stations selected and that you know what kind of information you can expect to find, all that is left is to toy around with the tools we provided. 

You can choose to compare the first station you selected with any other station consecutively just by clicking any other circle on the map ; this will change the *second station selected* field to the one you just clicked. Another way to change this selection is to use the dropdown menu and look for a specific train station.

Reset buttons can also be used to set any of the two fields to *none*. If you elect to reset the first field then your next click on any circle of the map will add your selection to the **first station selected**

[index]:https://github.com/OumaimaFassi/SNCF_viz/blob/master/img/Index.png
[legend1]:https://github.com/OumaimaFassi/SNCF_viz/blob/master/img/legend1.png
[legend2]:https://github.com/OumaimaFassi/SNCF_viz/blob/master/img/legend2.png
[tooltip]:https://github.com/OumaimaFassi/SNCF_viz/blob/master/img/tooltip1.png
[filter]:https://github.com/OumaimaFassi/SNCF_viz/blob/master/img/filter1.png
[1selection]:https://github.com/OumaimaFassi/SNCF_viz/blob/master/img/1selection.png
[info_manquantes]:https://github.com/OumaimaFassi/SNCF_viz/blob/master/img/info_manquantes1.png
[radar_info_manquantes]:https://github.com/OumaimaFassi/SNCF_viz/blob/master/img/radar_info_manquantes.png
[2selection]:https://github.com/OumaimaFassi/SNCF_viz/blob/master/img/2selections.png
