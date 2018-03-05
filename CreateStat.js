function CreateStat(data, gare1, gare2) {
	statG.selectAll("*").remove();
	
	if (gare1 == null && gare2 == null) {
		d3.select("#start").attr("style","display: block; height: 100%; width: 100%;");
		d3.select("#stat").attr("style","display: none");
		d3.select("#radarChart").attr("style","display: none");
	}
	
	else {
		divertissements1 = [{uic: gare1}], //json avec les divertissements en gare1
		divertissements2 = [{uic: gare2}], //json avec les divertissements en gare2
		acces1 = [{uic: gare1}], //json avec les moyens d'acces en gare1
		acces2 = [{uic: gare2}], //json avec les moyens d'acces en gare2
		motif1 = [{uic: gare1}], //json avec les motif d'arrivé en gare1
		motif2 = [{uic: gare2}]; //json avec les motif d'arrivé en gare2
	  
		//parcours des données
		data.forEach(function(d){
			if(d.Code_UIC == gare1){pushInfo(d,divertissements1,acces1,motif1); };  
			if(d.Code_UIC == gare2){pushInfo(d,divertissements2,acces2,motif2); };
		}); // fin forEach

		if (gare1 == null && gare2 != null){
			divertissements1 = divertissements2
			acces1 = acces2
			motif1 = motif2;
		}
		else if(gare1 != null && gare2 == null){
			divertissements2 = divertissements1
			acces2 = acces1
			motif2 = motif1;
		};
		
		refreshText(data,gare1,gare2)
		refreshDiv(divertissements1,divertissements2)
		refreshAcces(acces1,acces2)
		d3.selectAll("rect")
			.attr("width",w_rect)
			.attr("height",h_rect)
		//refreshMotif(motif1,motif2);
		if(gare1==null){d3.selectAll("rect").style("fill",couleur2);}
		else if(gare2==null){d3.selectAll("rect").style("fill",couleur1);}  ;       
	};
};

// Définition des fonctions
function pushInfo(d,divertissements,acces,motif){
	divertissements.push({
		wifi: d.Wifi,
		baby_foot: d.Baby_Foot,
		powerstation: d.Power_Station,
		piano: d.Piano,
		histoires: d.Distr_Histoires_Courtes
	});
	
	acces.push({
		voiture: +d.deux_roues_motorisees + +d.Autres_voitures_location_autopartage + +d.Voiture_Conducteur + +d.Voiture_passager,
        taxis: +d.Taxis,
    	bus: +d.Bus_Car_Navette,
        metro: +d.Metro_RER,
        tram: +d.Tramway,
    	marche: +d.Marche,
    	velo: +d.Velo
	});

	motif.push({
		divers: +d.Demarches_administratives_medicales_ou_achat,
		commute: +d.Deplacement_domicile_travail_habituel,
		etudes: +d.Deplacement_domicile_etude_y_compris_stage,
		occasionnel: +d.Deplacement_professionnel_occasionnel,
		loisirs: +d.Loisirs_vacances_visite_d_un_proche_ou_ami
	});
};

function refreshText(data,gare1,gare2){
	//titre
	statG.append("text")
		.attr("class","titre")
		.attr("id","caracteristiques")
		.attr("y", 0)
		.attr("x", 0)
		.text("Caractéristiques");
	
	// emplacement du texte 'nom des gares'
	statG.append("text")
		.attr("id","nom")
		.text("Nom")
		.attr("y", +d3.select("#caracteristiques").attr("y")+30)
		.attr("x", 0)
		.attr("text-anchor","start");
	
	// emplacement du text 'nombre de voyageurs'
	statG.append("text")
		.attr("id","Nombredevoyageurs")
		.text("Voyageurs en 2016")
		.attr("y", +d3.select("#nom").attr("y")+30)
		.attr("x", 0)
		.attr("text-anchor","start")
	
	// emplacement du text 'variation par rapport à 2015'
	statG.append("text")
		.attr("id","Variation")
		.text("Variation par rapport à 2015")
		.attr("y", +d3.select("#Nombredevoyageurs").attr("y")+30)
		.attr("x", 0)
		.attr("text-anchor","start")
		
	// emplacement du text 'Divertissement'
	statG.append("text")
		.attr("id","Divertissements")
		.text("Divertissements")
		.attr("y", +d3.select("#Variation").attr("y")+40)
		.attr("x", 0)
		.attr("text-anchor","start")
		
	// emplacement du text "Moyens d'acces"
	statG.append("text")
		.text("Moyens d'accès")
		.attr("y", +d3.select("#Divertissements").attr("y")+45)
		.attr("x", 0)
		.attr("text-anchor","start")
	
	/*
		// emplacement du text "Motif du déplacement"
		statG.append("text")
			.text("Motif du déplacement")
			.attr("y", 190)
			.attr("x", 150)
			.attr("text-anchor","start")
	*/

	if (gare1 != null) {
		// emplacement du nom de la gare 1
		statG.append("text")
			.attr("id","nom1")
			.attr("y", +d3.select("#nom").attr("y"))
			.attr("x", +d3.select("#nom").attr("x")+275)
			.attr("text-anchor","end")
			
		statG.append("text")
			.attr("id","valeur_voyageurs")
			.attr("y", +d3.select("#Nombredevoyageurs").attr("y"))
			.attr("x", +d3.select("#Nombredevoyageurs").attr("x")+275)
			.attr("text-anchor","end")
		
		statG.append("text")
			.attr("id","valeur_variation")
			.attr("y", +d3.select("#Variation").attr("y"))
			.attr("x", +d3.select("#Variation").attr("x")+275)
			.style("text-anchor","end")
			
		// emplacement du rang pour la gare 1
		statG.append("text")
			.attr("id","valeur_rang")
			.attr("y", +d3.select("#Nombredevoyageurs").attr("y"))
			.attr("x", function(){return d3.select("#valeur_voyageurs").attr("x")})
			.style("text-anchor","start")
		
		// emplacement du rang de variation pour la gare 1
		statG.append("text")
			.attr("id","valeur_rangvar")
			.attr("y", +d3.select("#Variation").attr("y"))
			.attr("x", function(){return d3.select("#valeur_variation").attr("x")})
			.style("text-anchor","start")
	};
	
	if (gare2 != null) {
		// emplacement du nom de la gare 2
		statG.append("text")
			.attr("id","nom2")
			.attr("y", +d3.select("#nom").attr("y"))
			.attr("x", +d3.select("#nom").attr("x")+300)
			.attr("text-anchor","start")
			
		statG.append("text")
			.attr("id","valeur_voyageurs2")
			.attr("y", +d3.select("#Nombredevoyageurs").attr("y"))
			.attr("x", +d3.select("#Nombredevoyageurs").attr("x")+300)
			.attr("text-anchor","start")
		
		statG.append("text")
			.attr("id","valeur_variation2")
			.attr("y", +d3.select("#Variation").attr("y"))
			.attr("x", +d3.select("#Variation").attr("x")+300)
			.style("text-anchor","start")
			
		// emplacement du rang pour la gare 2
		statG.append("text")
			.attr("id","valeur_rang2")
			.attr("y", +d3.select("#Nombredevoyageurs").attr("y"))
			.attr("x",function(){return +d3.select("#valeur_voyageurs2").attr("x")})
			.style("text-anchor","end")
			
		// emplacement du rang de variation pour la gare 2
		statG.append("text")
			.attr("id","valeur_rangvar2")
			.attr("y", +d3.select("#Variation").attr("y"))
			.attr("x",function(){return +d3.select("#valeur_variation2").attr("x")})
			.style("text-anchor","end")
	};
	
	data.forEach(function(d){
	if(d.Code_UIC == gare1){
		d3.select("#valeur_rang")
			.text("("+ d.RangNbVoy +"e)")
			.attr("fill",couleur1);
      
		d3.select("#valeur_rangvar")
			.text("("+ d.RangVariations +"e)")
			.attr("fill",couleur1);
		
		d3.select("#valeur_voyageurs")
			.text(d3.format(".3s")(d.voyageurs_2016))
			.attr("fill",couleur1);
  
		d3.select("#valeur_variation")
			.text(d3.format(".0%")(d.Variations))
			.attr("fill",couleur1);
	  
		d3.select("#nom1")
			.text(d.Nom_de_la_gare)
			.attr("fill",couleur1);

	}; // fin if
	
	if(d.Code_UIC == gare2){
		d3.select("#valeur_rang2")
			.text("("+(d.RangNbVoy)+"e)")
			.attr("fill",couleur2)
      
      d3.select("#valeur_rangvar2")
			.text("("+(d.RangVariations)+"e)")
			.attr("fill",couleur2)
		
		d3.select("#valeur_voyageurs2")
			.text(d3.format(".3s")(d.voyageurs_2016))
			.attr("fill",couleur2)
  
		d3.select("#valeur_variation2")
			.text(d3.format(".0%")(d.Variations))
			.attr("fill",couleur2)
	  
		d3.select("#nom2")
			.text(d.Nom_de_la_gare)
			.attr("fill",couleur2)
  
	  ;}// fin else if
  ;}) // fin forEach
;} // fin refresh


function refreshWifi(div1,div2,i){
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_wifi",function(){if(div1[i][1]=='true'){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_wifi2",function(){if(div2[i][1]=='true'){return couleur2}else{return couleur3}})
  
    var svg_wifi = statG.append("svg")
    
	svg_wifi
		.attr("preserveAspectRatio","xMidYMid meet") 
        .attr("viewBox","0 0 550 550")
		.attr("width",h_rect)
        .attr("height",h_rect)
		
	svg_wifi.append("path")
		.attr("id","path_wifi")
		.attr("d","M0,146.93c2.44-6.87,7.4-11.36,13.32-15.39C68,94.27,127.92,70,193.55,60.83c112-15.68,214.64,8.85,308,72.69A29,29,0,0,1,512,146.93v9c-3.81,9-9.67,15.3-20.35,15.28-4.91,0-9-2-12.87-4.72-41-28.73-85.82-49.46-134.72-60.22Q177,69.54,34.84,165.37c-4.16,2.81-8.22,5.57-13.52,5.8C10.17,171.67,4,165.34,0,155.93v-9Z")
	
	svg_wifi.append("path")
		.attr("id","path_wifi")
		.attr("d","M422.62,249.08c-4.29.19-8.32-1.53-12.11-4.18-36.07-25.25-75.92-41.14-119.59-46.63q-93.66-11.77-174.76,37.07c-5.13,3.09-10,6.52-15,9.8-10.2,6.68-22.21,4.66-28.6-4.82s-4-21.09,5.88-28C117.56,184.87,160.66,167,208,159.86c79.81-12,153.39,4.53,220.69,49.05a74.62,74.62,0,0,1,7.3,5.23,19.67,19.67,0,0,1,5.62,22.23C438.69,244.07,431.42,249,422.62,249.08Z")
	
	svg_wifi.append("path")
		.attr("id","path_wifi")
		.attr("d","M353.72,327a19.38,19.38,0,0,1-11.64-3.81c-29.65-20.36-62.49-28.94-98.27-26.26a145.19,145.19,0,0,0-72.55,25.41c-6.16,4.23-12.59,6.1-19.76,3.52-7.75-2.79-12.28-8.56-13.24-16.64s2.33-14.31,8.86-18.88a178.83,178.83,0,0,1,65.23-28.79c54.58-11.77,105.41-2.86,152,28.45,8.2,5.51,11.31,14.2,8.6,23A20,20,0,0,1,353.72,327Z")
	
	svg_wifi.append("path")
		.attr("id","path_wifi")
		.attr("d","M256.44,355.87A49.92,49.92,0,0,1,306,406.06c-0.08,27.33-22.74,49.8-50.13,49.7a50.15,50.15,0,0,1-49.77-50.55C206.23,377.84,228.79,355.75,256.44,355.87Z")
  
	svg_wifi.attr("transform","translate("+ d3.select("#valeur_wifi").attr("x") +","+d3.select("#valeur_wifi").attr("y")+")")
}    

function refreshBaby(div1,div2,i){ 
  
  	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_babyfoot",function(){if(div1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_babyfoot2",function(){if(div2[i][1]>0){return couleur2}else{return couleur3}})
    
    var svg_babyfoot = statG.append("svg")
	
	svg_babyfoot
		.attr("preserveAspectRatio","xMidYMid meet") 
        .attr("viewBox","0 0 100 100")
        .attr("width",h_rect)
        .attr("height",h_rect)
    
	svg_babyfoot.append("path")
		.attr("id","path_babyfoot")
		.attr("d","M32,31a8.5,8.5,0,1,0-8.5-8.5A8.50951,8.50951,0,0,0,32,31Zm0-15a6.5,6.5,0,1,1-6.5,6.5A6.50753,6.50753,0,0,1,32,16Z")
    
    svg_babyfoot.append("path")
		.attr("id","path_babyfoot")
		.attr("d","M68,31a8.5,8.5,0,1,0-8.5-8.5A8.50951,8.50951,0,0,0,68,31Zm0-15a6.5,6.5,0,1,1-6.5,6.5A6.50753,6.50753,0,0,1,68,16Z")
    
    svg_babyfoot.append("path")
		.attr("id","path_babyfoot")
		.attr("d","M95,43H79.65576l.34033-3.91357a.99935.99935,0,0,0-.25293-.75538l-4.5-5a1.00175,1.00175,0,0,0-.96826-.30566L68,34.47363l-6.2749-1.44824a1.0014,1.0014,0,0,0-.96826.30566l-4.5,5a.99935.99935,0,0,0-.25293.75538L56.34424,43H43.65576l.34033-3.91357a.99935.99935,0,0,0-.25293-.75538l-4.5-5a1.00244,1.00244,0,0,0-.96826-.30566L32,34.47363l-6.2749-1.44824a1.00072,1.00072,0,0,0-.96826.30566l-4.5,5a.99935.99935,0,0,0-.25293.75538L20.34424,43H5a1,1,0,0,0-1,1v6.5a1,1,0,0,0,1,1H21.65265l1.95282,1.541,1.644,21.13671-2.71728,2.74366a.99882.99882,0,0,0-.28955.70361V85a1,1,0,0,0,1,1H40.75732a1,1,0,0,0,1-1V77.625a.99882.99882,0,0,0-.28955-.70361l-2.71728-2.74366,1.644-21.13671L42.34735,51.5h15.3053l1.95282,1.541,1.644,21.13671-2.71728,2.74366a.99882.99882,0,0,0-.28955.70361V85a1,1,0,0,0,1,1H76.75732l.00428-.00085a8.49959,8.49959,0,1,0-1.62085-16.84253L76.39453,53.041,78.34735,51.5H95a1,1,0,0,0,1-1V44A1,1,0,0,0,95,43ZM6,49.5V45H20.51813l.39129,4.5Zm35.041.48291-2.229,1.75928a1.00111,1.00111,0,0,0-.37744.70752L36.7207,74.479a.99955.99955,0,0,0,.28662.78125l2.75,2.77637V84H24.24268V78.03662l2.75-2.77637a.99955.99955,0,0,0,.28662-.78125L25.56543,52.44971a1.00111,1.00111,0,0,0-.37744-.70752l-2.229-1.75928-.00836-.09613-.51507-5.97272c-.00074-.0083-.00562-.01495-.00653-.02319l-.39533-4.54468,3.81543-4.23926,5.92578,1.36768a1.00111,1.00111,0,0,0,.4502,0l5.92578-1.36768,3.81543,4.23926ZM43.09082,49.5l.3916-4.5H56.51813l.39129,4.5ZM76.74463,71a6.5,6.5,0,1,1-6.5,6.5A6.50753,6.50753,0,0,1,76.74463,71ZM77.041,49.98291l-2.229,1.75928a1.00111,1.00111,0,0,0-.37744.70752l-1.35333,17.392A8.48072,8.48072,0,0,0,71.27863,84h-11.036V78.03662l2.75-2.77637a.99955.99955,0,0,0,.28662-.78125L61.56543,52.44971a1.00111,1.00111,0,0,0-.37744-.70752l-2.229-1.75928-.00836-.09613-.51507-5.97272c-.00074-.0083-.00562-.01495-.00653-.02319l-.39533-4.54468,3.81543-4.23926,5.92578,1.36768a1.00111,1.00111,0,0,0,.4502,0l5.92578-1.36768,3.81543,4.23926ZM94,49.5H79.09131l.39453-4.5H94Z")
    
    svg_babyfoot.attr("transform","translate("+ d3.select("#valeur_babyfoot").attr("x") +","+d3.select("#valeur_babyfoot").attr("y")+")")
    
	d3.selectAll("#path_babyfoot")
		.attr("stroke","black")
    	.attr("stroke-width","2")
}

function refreshPower(div1,div2,i){
 
  	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_powerstation",function(){if(div1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_powerstation2",function(){if(div2[i][1]>0){return couleur2}else{return couleur3}})
    
    var svg_power = statG.append("svg")
	
	svg_power.attr("preserveAspectRatio","xMidYMid meet") 
        .attr("viewBox","-6 10 80 80")
        .attr("width",h_rect)
		.attr("height",h_rect)
        
    svg_power.append("path")
		.attr("id","path_power")    
		.attr("d","M80.6,54.5c0,1.7-1.4,3.2-3.2,3.2h-9.2c-4.4,0-7.9,3.5-7.9,7.9v0.1c0,8-6.7,14.5-14.7,14.2C38,79.6,32,73,32,65.3v-6.7  c-7.2-1.5-12.6-7.8-12.6-15.5v-8c0-1.1,0.9-2.1,2.1-2.1h3.9v-10c0-1.7,1.5-3.1,3.2-2.9c1.5,0.1,2.7,1.5,2.7,3.1v9.9h7.8v-10  c0-1.7,1.5-3.1,3.3-2.9c1.5,0.1,2.7,1.5,2.7,3.1v9.9h3.9c1.1,0,2,0.9,2,2v8c0,7.6-5.4,14-12.6,15.5v7c0,4.7,4.1,8.4,8.9,7.8  c4-0.5,6.9-4.1,6.9-8.1c0-7.7,6.3-14,14.1-14h9.3C79.2,51.3,80.6,52.8,80.6,54.5z")
    
    svg_power.attr("transform","translate("+ d3.select("#valeur_powerstation").attr("x") +","+d3.select("#valeur_powerstation").attr("y")+")")
}

function refreshPiano(div1,div2,i){
  
  	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_piano",function(){if(div1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_piano2",function(){if(div2[i][1]>0){return couleur2}else{return couleur3}})
    
    var svg_piano = statG.append("svg")
    
	svg_piano.attr("preserveAspectRatio","xMidYMid meet") 
        .attr("viewBox","0 0 100 100")
        .attr("width",h_rect)
        .attr("height",h_rect)
    
	svg_piano.append("path")
		.attr("id","path_piano")
		.attr("d","M86.839,28.146H11.431c-0.568,0-1.028,0.46-1.028,1.028v41.145c0,0.568,0.46,1.028,1.028,1.028h75.408  c0.568,0,1.028-0.46,1.028-1.028V29.174C87.867,28.606,87.406,28.146,86.839,28.146z M20.637,67.78c0,0.839-0.68,1.519-1.519,1.519  h-5.596c-0.839,0-1.519-0.68-1.519-1.519V39.481c0-0.839,0.68-1.519,1.519-1.519h4.728c-0.108,0.209-0.175,0.443-0.175,0.694v18.228  c0,0.839,0.68,1.519,1.519,1.519h1.043V67.78z M30.013,67.78c0,0.839-0.68,1.519-1.519,1.519h-5.596  c-0.839,0-1.519-0.68-1.519-1.519v-9.376h1.036c0.839,0,1.519-0.68,1.519-1.519V38.656c0-0.252-0.067-0.485-0.175-0.694h3.805  c-0.108,0.209-0.175,0.443-0.175,0.694v18.228c0,0.839,0.68,1.519,1.519,1.519h1.106V67.78z M39.388,67.78  c0,0.839-0.68,1.519-1.519,1.519h-5.596c-0.839,0-1.519-0.68-1.519-1.519v-9.376h0.973c0.839,0,1.519-0.68,1.519-1.519V38.656  c0-0.252-0.067-0.485-0.175-0.694h4.798c0.839,0,1.519,0.68,1.519,1.519V67.78z M48.764,67.78c0,0.839-0.68,1.519-1.519,1.519  h-5.596c-0.839,0-1.519-0.68-1.519-1.519V39.481c0-0.839,0.68-1.519,1.519-1.519h4.742c-0.108,0.209-0.175,0.443-0.175,0.694v18.228  c0,0.839,0.68,1.519,1.519,1.519h1.029V67.78z M58.139,67.78c0,0.839-0.68,1.519-1.519,1.519h-5.596  c-0.839,0-1.519-0.68-1.519-1.519v-9.376h1.05c0.839,0,1.519-0.68,1.519-1.519V38.656c0-0.252-0.067-0.485-0.175-0.694h3.856  c-0.108,0.209-0.175,0.443-0.175,0.694v18.228c0,0.839,0.68,1.519,1.519,1.519h1.041V67.78z M67.515,67.78  c0,0.839-0.68,1.519-1.519,1.519H60.4c-0.839,0-1.519-0.68-1.519-1.519v-9.376h1.039c0.839,0,1.519-0.68,1.519-1.519V38.656  c0-0.252-0.067-0.485-0.175-0.694h3.889c-0.108,0.209-0.175,0.443-0.175,0.694v18.228c0,0.839,0.68,1.519,1.519,1.519h1.019V67.78z   M76.89,67.78c0,0.839-0.68,1.519-1.519,1.519h-5.596c-0.839,0-1.519-0.68-1.519-1.519v-9.376h1.06c0.839,0,1.519-0.68,1.519-1.519  V38.656c0-0.252-0.067-0.485-0.175-0.694h4.711c0.839,0,1.519,0.68,1.519,1.519V67.78z M86.266,67.78  c0,0.839-0.68,1.519-1.519,1.519h-5.596c-0.839,0-1.519-0.68-1.519-1.519V39.481c0-0.839,0.68-1.519,1.519-1.519h5.596  c0.839,0,1.519,0.68,1.519,1.519V67.78z")

    svg_piano.attr("transform","translate("+ d3.select("#valeur_piano").attr("x") +","+d3.select("#valeur_piano").attr("y")+")")
}

function refreshBook(div1,div2,i){
	
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_histoire",function(){if(div1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_histoire",function(){if(div2[i][1]>0){return couleur2}else{return couleur3}})
    
    var svg_book = statG.append("svg")
    
	svg_book
		.attr("preserveAspectRatio","xMidYMid meet") 
        .attr("viewBox","0 0 100 100")
        .attr("width",h_rect)
		.attr("height",h_rect)
    
	svg_book.append("path")
		.attr("id","path_book")
		.attr("d","M 7.6875 15 A 3.0003 3.0003 0 0 0 5 18 L 5 76 A 3.0003 3.0003 0 0 0 8 79 L 39 79 C 43.349431 79 45.826032 80.37085 47.3125 83.34375 A 3.0003 3.0003 0 0 0 52.6875 83.34375 C 54.173968 80.37085 56.650569 79 61 79 L 92 79 A 3.0003 3.0003 0 0 0 95 76 L 95 18 A 3.0003 3.0003 0 0 0 92 15 L 61 15 C 56.682807 15 52.632819 17.03124 50 20.15625 C 47.367181 17.03124 43.317193 15 39 15 L 8 15 A 3.0003 3.0003 0 0 0 7.6875 15 z M 11 21 L 39 21 C 42.934608 21 47 24.81488 47 28 L 47 74.9375 C 44.656312 73.666773 41.924501 73 39 73 L 11 73 L 11 21 z M 61 21 L 89 21 L 89 73 L 61 73 C 58.075499 73 55.343688 73.666773 53 74.9375 L 53 28 C 53 24.81488 57.065392 21 61 21 z M 17.6875 26 A 3.0040663 3.0040663 0 1 0 18 32 L 38 32 A 3.0003 3.0003 0 1 0 38 26 L 18 26 A 3.0003 3.0003 0 0 0 17.6875 26 z M 61.6875 26 A 3.0040663 3.0040663 0 1 0 62 32 L 82 32 A 3.0003 3.0003 0 1 0 82 26 L 62 26 A 3.0003 3.0003 0 0 0 61.6875 26 z M 17.6875 35 A 3.0040663 3.0040663 0 1 0 18 41 L 40 41 A 3.0003 3.0003 0 1 0 40 35 L 18 35 A 3.0003 3.0003 0 0 0 17.6875 35 z M 59.6875 35 A 3.0040663 3.0040663 0 1 0 60 41 L 82 41 A 3.0003 3.0003 0 1 0 82 35 L 60 35 A 3.0003 3.0003 0 0 0 59.6875 35 z M 17.6875 44 A 3.0040663 3.0040663 0 1 0 18 50 L 40 50 A 3.0003 3.0003 0 1 0 40 44 L 18 44 A 3.0003 3.0003 0 0 0 17.6875 44 z M 59.6875 44 A 3.0040663 3.0040663 0 1 0 60 50 L 82 50 A 3.0003 3.0003 0 1 0 82 44 L 60 44 A 3.0003 3.0003 0 0 0 59.6875 44 z M 17.6875 53 A 3.0040663 3.0040663 0 1 0 18 59 L 40 59 A 3.0003 3.0003 0 1 0 40 53 L 18 53 A 3.0003 3.0003 0 0 0 17.6875 53 z M 59.6875 53 A 3.0040663 3.0040663 0 1 0 60 59 L 82 59 A 3.0003 3.0003 0 1 0 82 53 L 60 53 A 3.0003 3.0003 0 0 0 59.6875 53 z M 17.6875 62 A 3.0040663 3.0040663 0 1 0 18 68 L 40 68 A 3.0003 3.0003 0 1 0 40 62 L 18 62 A 3.0003 3.0003 0 0 0 17.6875 62 z M 59.6875 62 A 3.0040663 3.0040663 0 1 0 60 68 L 82 68 A 3.0003 3.0003 0 1 0 82 62 L 60 62 A 3.0003 3.0003 0 0 0 59.6875 62 z")
    
    svg_book.attr("transform"," translate("+ d3.select("#valeur_histoire").attr("x") +","+d3.select("#valeur_histoire").attr("y")+")")
}
    
function refreshVoiture(acc1,acc2,i){
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_acces,"valeur_voiture",function(){if(acc1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_acces,"valeur_voiture2",function(){if(acc2[i][1]>0){return couleur2}else{return couleur3}})    
    
	var svg_voiture = statG.append("svg")
	
	svg_voiture
		.attr("preserveAspectRatio","xMidYMid meet") 
        .attr("viewBox","0 0 170 170")
        .attr("width",h_rect)
		.attr("height",h_rect)
        
	svg_voiture.append("path")
        .attr("id","path_voiture")
  		.attr("d","M143.5,56.6l-4.1-1.7l-4.9-18c-2.1-7.8-9.3-13.2-17.4-13.2l-74.2,0h0c-8.1,0-15.2,5.5-17.4,13.2l-4.9,18l-4.1,1.7    C9.5,59.4,5,66.1,5,73.6l0,27.5c0,4.7,2.5,9,6.5,11.4v12.8c0,2.9,1.1,5.7,3.2,7.8c2.1,2.1,4.8,3.2,7.8,3.2h3.2c6,0,11-4.9,11-11    v-12h7.1c0.2,0,0.3,0,0.5,0c0.1,0,0.3,0,0.5,0l78.9,0l0,12c0,6,4.9,11,11,11h3.2c1.5,0,2.9-0.3,4.2-0.8c1.3-0.5,2.5-1.3,3.6-2.4    c2.1-2.1,3.2-4.8,3.2-7.8v-12.8c4-2.4,6.4-6.7,6.4-11.4l0-27.4C155,66.1,150.5,59.4,143.5,56.6z M28.5,90.8c-2.6,0-5.1-1-7-2.9    c-1.8-1.9-2.9-4.4-2.9-7c0-5.5,4.4-10,9.8-10c5.4,0,9.8,4.5,9.8,10S33.9,90.8,28.5,90.8z M106,96.2c-0.9,1.5-2.2,2.8-3.7,3.6    c-1.5,0.9-3.3,1.3-5,1.3H62.5c-3.6,0-6.9-1.9-8.8-4.9c-1.9-3.2-2-7.1-0.2-10.3c1.8-3.3,5.2-5.2,8.9-5.2c0,0,0,0,0,0h34.7    c3.8,0,7.1,2,8.9,5.2C108,89.1,107.9,93,106,96.2z M70.3,39.3c-0.6-0.9-1.9-1.1-2.8-0.5L45.7,54.4h-11L39,40.9    C40,38,42.6,36,45.7,36h68.5c3,0,5.7,2,6.7,4.8l4.4,13.5h-39l17.3-12.3c0.9-0.7,1.1-1.9,0.5-2.8c-0.6-0.9-1.9-1.1-2.8-0.5    L79.4,54.4l-26.8,0l17.3-12.3C70.7,41.4,70.9,40.2,70.3,39.3z M121.7,80.8c0-5.5,4.4-10,9.8-10c5.4,0,9.8,4.5,9.8,10    s-4.4,10-9.8,10C126.1,90.8,121.7,86.3,121.7,80.8z")
  		.style("fill","black")
  	
	svg_voiture.attr("transform","translate("+ d3.select("#valeur_voiture").attr("x") +","+d3.select("#valeur_voiture").attr("y")+")")
}

function refreshTaxis(acc1,acc2,i){
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_acces,"valeur_taxis",function(){if(acc1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_acces,"valeur_taxis2",function(){if(acc2[i][1]>0){return couleur2}else{return couleur3}})
    
    var svg_taxis = statG.append("svg")
	
	svg_taxis
		.attr("preserveAspectRatio","xMidYMid meet")
		.attr("viewBox","0 0 450 450")
		.attr("width",h_rect)
		.attr("height",h_rect)
		
	svg_taxis.append("path")
        .attr("id","path_taxis")
  		.attr("d","M419.864,272.842l-38.357-138.505c-2.89-10.438-12.39-17.664-23.219-17.664H62.726c-10.831,0-20.331,7.227-23.221,17.664    L0.874,273.829c-2.009,7.254-0.513,15.029,4.044,21.02c4.557,5.99,11.651,9.507,19.176,9.507h372.823c0.006,0,0.011,0,0.017,0    c13.306,0,24.094-10.788,24.094-24.095C421.028,277.673,420.62,275.179,419.864,272.842z M133.832,184.964v59.92    c0,3.038-2.463,5.5-5.5,5.5h-5.898c-3.037,0-5.5-2.462-5.5-5.5v-59.92H99.07c-3.038,0-5.5-2.462-5.5-5.5v-3.32    c0-3.038,2.462-5.5,5.5-5.5h52.573c3.037,0,5.5,2.462,5.5,5.5v3.32c0,3.038-2.463,5.5-5.5,5.5H133.832z M226.91,247.967    c-1.021,1.512-2.729,2.417-4.555,2.417h-6.472c-2.276,0-4.317-1.402-5.134-3.527l-5.52-14.359h-30.78l-5.184,14.265    c-0.79,2.174-2.855,3.622-5.169,3.622h-6.049c-1.816,0-3.515-0.896-4.54-2.396c-1.025-1.498-1.244-3.408-0.585-5.1l26.773-68.74    c0.824-2.113,2.858-3.504,5.125-3.504h10.009c2.248,0,4.271,1.368,5.106,3.456l27.523,68.74    C228.139,244.534,227.933,246.454,226.91,247.967z M298.903,247.482c-0.958,1.786-2.819,2.901-4.848,2.901h-7.115    c-1.874,0-3.619-0.954-4.63-2.532l-15.561-24.274l-15.614,24.281c-1.012,1.574-2.754,2.525-4.625,2.525h-7.087    c-2.021,0-3.878-1.107-4.84-2.885c-0.96-1.777-0.868-3.938,0.237-5.629l21.664-33.076l-19.209-29.66    c-1.097-1.691-1.179-3.847-0.216-5.617c0.962-1.771,2.815-2.873,4.832-2.873h6.615c1.896,0,3.66,0.978,4.666,2.587l13.895,22.259    l13.584-22.216c0.999-1.634,2.777-2.631,4.691-2.631h6.479c2.012,0,3.86,1.097,4.825,2.86c0.964,1.764,0.892,3.913-0.192,5.605    l-19.388,30.271l21.567,32.459C299.759,243.528,299.861,245.696,298.903,247.482z M327.46,244.884c0,3.038-2.463,5.5-5.5,5.5    h-5.899c-3.037,0-5.5-2.462-5.5-5.5v-68.74c0-3.038,2.463-5.5,5.5-5.5h5.899c3.037,0,5.5,2.462,5.5,5.5V244.884z")
  		.style("fill","black")
  	
	svg_taxis.attr("transform","translate("+ d3.select("#valeur_taxis").attr("x") +","+d3.select("#valeur_taxis").attr("y")+")")
}

function refreshBus(acc1,acc2,i){
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_acces,"valeur_bus",function(){if(acc1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_acces,"valeur_bus2",function(){if(acc2[i][1]>0){return couleur2}else{return couleur3}})
		
    var svg_bus = statG.append("svg")
	svg_bus.attr("preserveAspectRatio","xMidYMid meet") 
		.attr("viewBox","20 0 450 450")
		.attr("width",h_rect)
		.attr("height",h_rect)
        
	svg_bus.append("path")
		.attr("id","path_bus")
		.attr("d","M 129.27804,338.45161 C 126.69532,337.531 122.67537,334.96481 120.34481,332.74894 C 100.2604,313.65296 117.70112,280.53965 144.46203,286.95949 C 155.62149,289.63661 164.8738,301.52866 164.8738,313.19487 C 164.8738,319.94706 161.25054,327.79447 155.82306,332.79735 C 148.06919,339.94462 138.92874,341.8916 129.27804,338.45161 z M 146.7906,322.14862 C 149.62093,319.3183 150.33267,317.54629 150.33267,313.33005 C 150.33267,310.42796 149.53645,306.91677 148.56329,305.52738 C 144.25935,299.38265 133.76736,298.90036 128.41183,304.60105 C 126.12886,307.03118 125.49157,309.03334 125.49157,313.77563 C 125.49157,318.9197 126.00835,320.28624 128.89149,322.76621 C 133.98403,327.14664 142.07165,326.86758 146.7906,322.14862 z M 334.13715,338.47621 C 323.43325,334.65872 316.41928,324.42129 316.3705,312.54446 C 316.33729,304.45544 318.75186,299.26016 325.38708,293.14403 C 342.28037,277.57234 369.60815,289.82268 369.60815,312.96721 C 369.60815,331.38005 351.2527,344.58039 334.13715,338.47621 z M 351.39175,321.9622 C 359.38568,313.96826 354.31365,300.24372 343.36547,300.24372 C 331.0767,300.24372 325.40114,314.80208 334.65448,322.58825 C 340.01014,327.09473 346.50204,326.8519 351.39175,321.9622 z M 49.436815,321.75247 C 45.491935,318.75686 44.909485,313.64658 44.909485,282.0306 L 44.909485,250.64586 L 48.377025,246.66548 L 51.844565,242.68509 L 53.259015,211.17931 C 55.426365,162.90316 55.306015,163.60821 61.840555,160.90836 C 63.934705,160.04313 122.39644,159.74445 246.66765,159.9641 L 428.43177,160.28536 L 434.49057,163.07389 C 442.156,166.60187 447.75858,171.95418 451.86636,179.67353 L 455.09051,185.73233 L 455.09051,242.50886 L 455.09051,299.28539 L 416.31416,311.26946 C 394.98717,317.8607 377.18055,323.25661 376.7439,323.26035 C 376.30725,323.26411 376.23786,320.09254 376.58969,316.21244 C 378.45911,295.59609 362.92304,278.43203 342.39268,278.43203 C 333.884,278.43203 326.03799,281.90924 319.26576,288.68147 C 311.39833,296.54891 308.49529,304.44677 309.3871,315.55686 L 310.00601,323.26717 L 239.78177,323.26717 L 169.55752,323.26717 L 170.47468,320.54071 C 172.21368,315.37115 171.25975,304.54857 168.55861,298.80214 C 158.68054,277.78745 132.63033,272.4453 115.09798,287.83891 C 107.91442,294.14616 104.89164,301.67731 104.89164,313.26769 L 104.89164,323.26225 L 78.161575,323.26471 C 58.645915,323.26651 50.893135,322.85836 49.436815,321.75247 z M 94.671345,302.62461 C 96.935655,301.41279 97.015205,299.50862 97.015205,246.52009 C 97.015205,205.47456 96.649235,191.30399 95.561085,190.21585 C 94.664695,189.31946 90.265745,188.76174 84.091995,188.76174 C 75.333575,188.76174 73.915075,189.06433 72.786315,191.17343 C 71.913595,192.80412 71.605475,211.06598 71.834865,247.56515 C 72.126545,293.97691 72.428945,301.70618 73.991745,302.69354 C 76.443455,304.24248 91.743595,304.19149 94.671345,302.62461 z M 186.19474,234.68142 C 188.25961,232.39979 188.50313,230.11209 188.50313,212.99695 C 188.50313,195.88182 188.25961,193.59412 186.19474,191.31248 C 183.95748,188.84032 182.88681,188.76174 151.44318,188.76174 C 124.10654,188.76174 118.71162,189.05011 117.16788,190.59385 C 114.48333,193.2784 113.58306,201.74613 114.25293,218.01114 C 115.10952,238.80969 112.04891,237.23217 151.54443,237.23217 C 182.88512,237.23217 183.95782,237.1532 186.19474,234.68142 z M 269.76244,235.51303 C 271.93049,233.92848 272.11463,232.18829 272.11463,213.28366 C 272.11463,197.68172 271.71663,192.2934 270.45156,190.76758 C 268.97936,188.99197 265.05018,188.76174 236.21931,188.76174 C 205.26582,188.76174 203.52991,188.88196 201.22662,191.18526 C 199.00791,193.40397 198.8031,195.22446 198.8031,212.72733 C 198.8031,228.06991 199.17565,232.37778 200.68945,234.53902 C 202.55882,237.20792 202.86766,237.23217 234.99302,237.23217 C 261.06961,237.23217 267.87034,236.89591 269.76244,235.51303 z M 352.31568,234.59742 C 355.02436,232.05274 355.12024,231.28872 355.12024,212.24856 C 355.12024,193.25022 355.02246,192.46595 352.42709,190.64809 C 350.15867,189.05923 344.80775,188.76174 318.49779,188.76174 C 278.8402,188.76174 282.10522,186.55905 282.63528,212.95569 C 282.97335,229.79152 283.30286,232.44967 285.32886,234.68513 C 287.55966,237.14655 288.67715,237.23217 318.57419,237.23217 C 348.67011,237.23217 349.58736,237.16054 352.31568,234.59742 z M 438.05715,234.53902 C 440.91849,230.45387 440.74457,203.05729 437.82104,197.34683 C 433.76709,189.42836 430.76458,188.76174 399.15342,188.76174 L 371.04903,188.76174 L 368.53756,191.95456 C 366.25181,194.86041 366.02609,196.77131 366.02609,213.21545 C 366.02609,230.78316 366.10845,231.36589 369.00041,234.25784 L 371.97473,237.23217 L 404.07276,237.23217 C 435.86828,237.23217 436.18856,237.20678 438.05715,234.53902 z ")
		.style("fill","black")
	
	svg_bus.attr("transform","translate("+ d3.select("#valeur_bus").attr("x") +","+d3.select("#valeur_bus").attr("y") +")")
}

function refreshMetro(acc1,acc2,i){
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_acces,"valeur_metro",function(){if(acc1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_acces,"valeur_metro2",function(){if(acc2[i][1]>0){return couleur2}else{return couleur3}})
          
    var svg_metro = statG.append("svg")
	
	svg_metro
		.attr("preserveAspectRatio","xMidYMid meet")
		.attr("viewBox","-5 0 165 165")
		.attr("width",h_rect)
		.attr("height",h_rect)
		
	svg_metro.append("path")
		.attr("id","path_metro")
		.attr("d","M160,80.405C160,36,122.802-0.002,80.202-0.002C36.003-0.002,0,36,0,80.405    C0,124.404,36.003,160,80.202,160C124.401,160,160,124.604,160,80.405z M149,80.405c0,37.6-30.994,68.998-68.799,68.998    c-38.002,0-69.203-31.001-69.203-68.998c0-38.21,31.201-69.802,69.203-69.802C118.006,10.604,149,42.404,149,80.405z     M119.802,115.804V46c0-4.001-2.197-8.201-8.797-8.201c-5,0-7.002,2.199-9.204,6.601L80.202,89.403h-0.205l-21.79-45.004    c-2.205-4.401-4.208-6.601-9.207-6.601c-6.602,0-8.799,4.2-8.799,8.201v69.804c0,3.799,3.002,6.002,6.601,6.002    c3.206,0,6.798-2.203,6.798-6.002V63.803h0.203l19.801,40.398c1.397,2.799,3.197,4.399,6.395,4.399    c3.204,0,5.002-1.601,6.401-4.399l19.808-40.398h0.198v52.001c0,3.799,3.595,6.002,6.801,6.002    C116.799,121.806,119.802,119.603,119.802,115.804z")
		.style("fill","black")

	svg_metro.attr("transform","translate("+ d3.select("#valeur_metro").attr("x") +","+d3.select("#valeur_metro").attr("y")+")")
}
     
function refreshTram(acc1,acc2,i){
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_acces,"valeur_tram",function(){if(acc1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_acces,"valeur_tram2",function(){if(acc2[i][1]>0){return couleur2}else{return couleur3}})
          
    var svg_tram = statG.append("svg")
	
	svg_tram
		.attr("preserveAspectRatio","xMidYMid meet")
		.attr("viewBox","0 0 165 165")
		.attr("width",h_rect)
		.attr("height",h_rect)
	
	svg_tram.append("path")
		.attr("id","path_tram")
		.attr("d","M160,80.205C160,35.801,124.204,0,79.803,0C35.602,0,0,35.801,0,80.205C0,124.406,35.602,160,79.803,160    C124.204,160,160,124.406,160,80.205z M148.199,80.205c0,37.592-30.596,67.996-68.396,67.996c-37.602,0-68-30.404-68-67.996    c0-37.803,30.398-68.404,68-68.404C117.603,11.801,148.199,42.402,148.199,80.205z M117.406,48.404    c0-3.201-2.003-6.201-5.604-6.201H48.403c-3.599,0-5.604,3-5.604,6.201c0,2.799,2.005,6.199,5.604,6.199h24.401v65.6    c0,3.596,3.804,5.6,7.195,5.6c3.8,0,7.407-2.004,7.407-5.6v-65.6h24.396C115.402,54.604,117.406,51.203,117.406,48.404z")
		.style("fill","black")
	svg_tram.attr("transform","translate("+ d3.select("#valeur_tram").attr("x") +","+d3.select("#valeur_tram").attr("y")+")")
}
    
function refreshMarche(acc1,acc2,i){
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_acces,"valeur_marche",function(){if(acc1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_acces,"valeur_marche2",function(){if(acc2[i][1]>0){return couleur2}else{return couleur3}})
          
    var svg_marche = statG.append("svg")
    
	svg_marche.attr("preserveAspectRatio","xMidYMid meet")
		.attr("viewBox","50 50 400 400")
		.attr("width",h_rect)
		.attr("height",h_rect)
	
	svg_marche.append("path")
		.attr("id","path_marche")
		.attr("d","M369.037,249.123l-54.716-17.144l-18.743-42.912c1.192-7.353-0.185-14.676-3.545-20.942l3.961-7.554  c0.145,0.001,0.285,0.021,0.431,0.021c22.523,0,40.782-18.259,40.782-40.783c0-22.523-18.259-40.782-40.782-40.782  s-40.783,18.259-40.783,40.782c0,9.709,3.407,18.615,9.071,25.619l-2.775,5.296c-6.555,0.207-24.46,6.794-27.421,8.407  l-55.25,30.093c-3.631,1.472-6.785,4.033-8.96,7.413c-1.39,2.092-2.354,4.428-2.847,6.871l-17.922,60.796  c-3.006,10.197,2.824,20.901,13.022,23.908c10.197,3.006,20.901-2.824,23.908-13.021l16.17-54.856l16.622-9.053l-15.984,49.557  c-2.281,7.072-2.021,14.338,0.215,20.865l-69.476,112.596c-6.819,11.115-3.336,25.654,7.779,32.475  c11.115,6.818,25.654,3.336,32.475-7.779L241.782,309.6l29.741,34.539l5.361,64.375c1.082,12.995,12.495,22.653,25.49,21.57  c12.996-1.082,22.653-12.494,21.571-25.49l-5.799-69.621c-0.332-3.998-1.649-7.676-3.683-10.826  c-0.949-2.703-2.388-5.285-4.371-7.588l-40.155-46.633l8.046-24.948l4.247,9.722c1.182,2.706,2.925,4.986,5.014,6.801  c2.137,2.16,4.812,3.85,7.912,4.821l62.369,19.541c10.145,3.179,20.946-2.469,24.125-12.614  C384.83,263.104,379.183,252.301,369.037,249.123z")
		.style("fill","black")
	
	svg_marche.attr("transform","translate("+ d3.select("#valeur_marche").attr("x") +","+d3.select("#valeur_marche").attr("y")+")")
}

function refreshVelo(acc1,acc2,i){
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_acces,"valeur_velo",function(){if(acc1[i][1]>0){return couleur1}else{return couleur3}})
    
    creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_acces,"valeur_velo2",function(){if(acc2[i][1]>0){return couleur2}else{return couleur3}})
          
    var svg_velo = statG.append("svg")
    
	svg_velo
		.attr("preserveAspectRatio","xMidYMid meet") 
		.attr("viewBox","5 0 90 90")
		.attr("width",h_rect)
		.attr("height",h_rect)
    
	svg_velo.append("path")
		.attr("id","path_velo")
		.attr("d","M76.182,39.364c-2.085,0-4.148,0.352-6.141,1.046l-6.252-12.5h7.483c1.354,0,2.455,1.101,2.455,2.455  s-1.102,2.455-2.455,2.455s-2.454,1.101-2.454,2.455s1.101,2.454,2.454,2.454c4.061,0,7.364-3.303,7.364-7.363S75.333,23,71.272,23  H59.818c-0.855,0-1.637,0.435-2.087,1.164c-0.452,0.729-0.492,1.623-0.109,2.389l1.498,2.993H38.426l-0.818-1.636h4.21  c1.354,0,2.455-1.101,2.455-2.455S43.172,23,41.818,23H30.364c-1.354,0-2.455,1.101-2.455,2.455s1.101,2.455,2.455,2.455h1.755  L34.165,32l-4.205,8.41c-1.994-0.694-4.056-1.046-6.141-1.046C13.441,39.364,5,47.805,5,58.182C5,68.559,13.441,77,23.818,77  c9.383,0,17.433-7.129,18.648-16.363h0.616c1.033,2.92,3.793,4.908,6.917,4.908c4.061,0,7.363-3.303,7.363-7.363  c0-1.891-0.749-3.709-2.077-5.084l7.805-15.608l2.562,5.125c-5.203,3.521-8.289,9.287-8.289,15.568  C57.363,68.559,65.806,77,76.182,77S95,68.559,95,58.182C95,47.805,86.558,39.364,76.182,39.364z M76.182,72.091  c-7.669,0-13.909-6.239-13.909-13.909c0-4.408,2.076-8.505,5.598-11.134l4.654,9.308c-0.285,0.566-0.434,1.189-0.434,1.826  c0,2.256,1.835,4.092,4.091,4.092c2.257,0,4.091-1.836,4.091-4.092c0-1.982-1.437-3.658-3.351-4.01l-4.66-9.32  c1.288-0.385,2.604-0.579,3.92-0.579c7.669,0,13.909,6.239,13.909,13.909S83.851,72.091,76.182,72.091z M50,60.637  c-0.178,0-0.367-0.027-0.732-0.127c-0.162-0.052-0.311-0.115-0.523-0.232c-0.75-0.451-1.199-1.234-1.199-2.096  c0-1.354,1.102-2.455,2.455-2.455c1.045,0,1.974,0.674,2.354,1.805c0.068,0.254,0.102,0.461,0.102,0.65  C52.455,59.535,51.354,60.637,50,60.637z M50,50.818c-0.299,0-0.603,0.02-0.908,0.059l-8.211-16.422H59.12l-8.212,16.422  C50.604,50.838,50.299,50.818,50,50.818z M23.818,44.273c1.316,0,2.631,0.194,3.92,0.579l-4.66,9.32  c-1.914,0.352-3.351,2.027-3.351,4.01c0,2.256,1.835,4.092,4.091,4.092c1.277,0,2.485-0.617,3.254-1.637h10.432  c-1.17,6.591-6.901,11.454-13.686,11.454c-7.67,0-13.909-6.239-13.909-13.909S16.148,44.273,23.818,44.273z M37.504,55.727H27.79  l4.339-8.679C34.973,49.17,36.885,52.259,37.504,55.727z M36.909,37.489l7.805,15.608c-0.728,0.756-1.282,1.648-1.631,2.629h-0.616  c-0.698-5.283-3.679-10.096-8.121-13.112L36.909,37.489z")
		.style("fill","black")
	
	svg_velo.attr("transform","translate("+ d3.select("#valeur_velo").attr("x") +","+d3.select("#valeur_velo").attr("y")+")")
}

/*
function refreshMotif(mot1,mot2){
	var max_y = 150
  
	var y_motif = d3.scaleLinear()
		.range([max_y,0])
  
	var x_motif = d3.scaleBand()
		.domain(['Divers','Travail quoti.','Etudes','Travail Occasionnel','Loisirs'])
		.range([0, +d3.select("svg").attr("width")/2.5])
    
  var xAxis_motif = d3.axisBottom()
		.scale(x_motif)
  
  var histo_motif = svg.append("g")
  .attr("transform","translate("+25+","+220+")")
  
  var axe_histo_motif = svg.append("g")
  	.attr("transform","translate("+25+","+(220+max_y)+")")
  	.attr('class','x axis')
  	.call(xAxis_motif)

	var max_motif = d3.max([mot1[1].divers,mot1[1].commute,mot1[1].etudes,mot1[1].loisirs,mot1[1].occasionnel,mot2[1].divers,mot2[1].commute,mot2[1].etudes,mot2[1].loisirs,mot2[1].occasionnel])
  y_motif.domain([0,max_motif])
  
  var yAxis_motif = d3.axisLeft()
		.scale(y_motif);
  
  var axey_histo_motif = svg.append("g")
  	.attr("transform","translate("+25+","+220+")")
  	.attr('class','y axis')
  	.call(yAxis_motif)
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 20+x_motif('Divers')})
  					 .attr("y",function(){return y_motif(mot1[1].divers)})
  					 .attr("height",function(){return max_y-y_motif(mot1[1].divers)})
  					 .attr("width",20)
  					 .style("fill",couleur1)
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 20+x_motif('Travail quoti.')})
  					 .attr("y",function(){return y_motif(mot1[1].commute)})
  					 .attr("height",function(){return max_y-y_motif(mot1[1].commute)})
  					 .attr("width",20)
  					 .style("fill",couleur1)
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 20+x_motif('Etudes')})
  					 .attr("y",function(){return y_motif(mot1[1].etudes)})
  					 .attr("height",function(){return max_y-y_motif(mot1[1].etudes)})
  					 .attr("width",20)
  					 .style("fill",couleur1)
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 20+x_motif('Travail Occasionnel')})
  					 .attr("y",function(){return y_motif(mot1[1].occasionnel)})
  					 .attr("height",function(){return max_y-y_motif(mot1[1].occasionnel)})
  					 .attr("width",20)
  					 .style("fill",couleur1)
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 20+x_motif('Loisirs')})
  					 .attr("y",function(){return y_motif(mot1[1].loisirs)})
  					 .attr("height",function(){return max_y-y_motif(mot1[1].loisirs)})
  					 .attr("width",20)
  					 .style("fill",couleur1)
  
  
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 40+x_motif('Divers')})
  					 .attr("y",function(){return y_motif(mot2[1].divers)})
  					 .attr("height",function(){return max_y-y_motif(mot2[1].divers)})
  					 .attr("width",20)
  					 .style("fill",couleur2)
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 40+x_motif('Travail quoti.')})
  					 .attr("y",function(){return y_motif(mot2[1].commute)})
  					 .attr("height",function(){return max_y-y_motif(mot2[1].commute)})
  					 .attr("width",20)
  					 .style("fill",couleur2)
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 40+x_motif('Etudes')})
  					 .attr("y",function(){return y_motif(mot2[1].etudes)})
  					 .attr("height",function(){return max_y-y_motif(mot2[1].etudes)})
  					 .attr("width",20)
  					 .style("fill",couleur2)
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 40+x_motif('Travail Occasionnel')})
  					 .attr("y",function(){return y_motif(mot2[1].occasionnel)})
  					 .attr("height",function(){return max_y-y_motif(mot2[1].occasionnel)})
  					 .attr("width",20)
  					 .style("fill",couleur2)
  
  histo_motif.append("rect")
  					 .attr("x",function(){return 40+x_motif('Loisirs')})
  					 .attr("y",function(){return y_motif(mot2[1].loisirs)})
  					 .attr("height",function(){return max_y-y_motif(mot2[1].loisirs)})
  					 .attr("width",20)
  					 .style("fill",couleur2)
}
*/

function refreshDiv(div1,div2,gare1,gare2){
	
	var new_div = []
	new_div.push(["wifi",div1[1].wifi,div2[1].wifi])
	new_div.push(["baby_foot",div1[1].baby_foot,div2[1].baby_foot])
	new_div.push(["powerstation",div1[1].powerstation,div2[1].powerstation])
	new_div.push(["piano",div1[1].piano,div2[1].piano])
	new_div.push(["histoires",div1[1].histoires,div2[1].histoires])
	
	var new_div1 = [],
		new_div2 = [];
  
	for(var n=0;n<new_div.length;n++){
    
		if(new_div[n][1]=="true" || new_div[n][2]=="true"){
			new_div1.push([new_div[n][0],new_div[n][1]])
			new_div2.push([new_div[n][0],new_div[n][2]])
		};
    
		if(new_div[n][1]>0 || new_div[n][2]>0){
			new_div1.push([new_div[n][0],new_div[n][1]])
			new_div2.push([new_div[n][0],new_div[n][2]])
		};
	};
  
 	var i = new_div1.length;
  
	for(var indice=0;indice<i;indice++){ // debut for
    
		if(new_div1[indice][0]=='wifi'){refreshWifi(new_div1,new_div2,indice)}
		if(new_div1[indice][0]=='baby_foot'){refreshBaby(new_div1,new_div2,indice)}
		if(new_div1[indice][0]=='powerstation'){refreshPower(new_div1,new_div2,indice)}
		if(new_div1[indice][0]=='piano'){refreshPiano(new_div1,new_div2,indice)}
    	if(new_div1[indice][0]=='histoires'){refreshBook(new_div1,new_div2,indice)}
		
	}// fin for
};  // fin refreshDiv
    
function refreshAcces(acc1,acc2){

	var new_acc = []
		new_acc.push(["voiture",acc1[1].voiture,acc2[1].voiture])
		new_acc.push(["taxis",acc1[1].taxis,acc2[1].taxis])
		new_acc.push(["bus",acc1[1].bus,acc2[1].bus])
		new_acc.push(["metro",acc1[1].metro,acc2[1].metro])
		new_acc.push(["tram",acc1[1].tram,acc2[1].tram])
		new_acc.push(["marche",acc1[1].marche,acc2[1].marche])
		new_acc.push(["velo",acc1[1].velo,acc2[1].velo])
   
	var new_acc1 = [],
		new_acc2 = [];
  
	for(var n=0;n<new_acc.length;n++){
		if(new_acc[n][1]>0 || new_acc[n][2]>0){
			new_acc1.push([new_acc[n][0],new_acc[n][1]])
			new_acc2.push([new_acc[n][0],new_acc[n][2]])
		}
	};
  
	var i = new_acc1.length;
  
	for(var indice=0;indice<i;indice++){ // debut for
		//console.log(new_acc1)
		if(new_acc1[indice][0]=='voiture'){refreshVoiture(new_acc1,new_acc2,indice)}
		if(new_acc1[indice][0]=='taxis'){refreshTaxis(new_acc1,new_acc2,indice)}
		if(new_acc1[indice][0]=='bus'){refreshBus(new_acc1,new_acc2,indice)}
		if(new_acc1[indice][0]=='metro'){refreshMetro(new_acc1,new_acc2,indice)}
		if(new_acc1[indice][0]=='tram'){refreshTram(new_acc1,new_acc2,indice)}
		if(new_acc1[indice][0]=='marche'){refreshMarche(new_acc1,new_acc2,indice)}
		if(new_acc1[indice][0]=='velo'){refreshVelo(new_acc1,new_acc2,indice)}
 
	};// fin for
	
	//---------------------------------------------------------
	// TRAITEMENT INFOS MANQUANTES #modif
	//---------------------------------------------------------
	var sum1 = 0,
		sum2 = 0;
	
	for(var n=0;n<new_acc1.length;n++){
		sum1+=new_acc1[n][1]
		sum2+=new_acc2[n][1]
    };
	
	if(sum1==0 || sum2==0){
		var g_infos = statG.append("g"),
			chiffre = "";
			
		if (sum1==0){
			chiffre = "1"
		}
		else {
			chiffre = "2"
		}
		g_infos.append("text")
			.text("Des informations sont manquantes sur la "+ chiffre +"e gare.")
			.attr("class","debutphrase")
			.attr("x",0)
			.attr("y",y_acces+60)
			.style("text-anchor","start")
    };
   
;}
    
function creationRects(x,y,id,couleur){
	statG.append("rect")
		.attr("x",x)
		.attr("y",y)
		.attr("id",id)
		.style("fill",couleur);
};                 

function UnOuDeux(sum1,sum2){
	if (sum1==0){return "1"}else {return "2"}}    