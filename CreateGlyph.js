function CreateGlyph(data, gare1 ,gare2) {

	if (gare1 || gare2) {
		function dataPoint(d,stationSelected){
			return [{
						uic : gare1,
						name : d.Nom_de_la_gare,
						score : (+d.Proprete + +d.Securite + +d.Communication_perturbations + +d.Confort_d_attente + +d.Commerces_restauration + 10 - +d.MoyenneDistance * 10 / 16.8 + +d.score_pmr13*10/13 ) / 7,
						axes : [
							{indice : 'Proprete', value : +d.Proprete },
							{indice : 'Securite', value : +d.Securite },
							{indice : 'Communication_perturbations', value : +d.Communication_perturbations },
							{indice : 'Confort_d_attente', value : +d.Confort_d_attente },
							{indice : 'Commerces_restauration', value : +d.Commerces_restauration },
							{indice : 'MoyenneDistance', value : 10 - +d.MoyenneDistance * 10 / 16.8 },
							{indice : 'score_pmr13', value : +d.score_pmr13*10/13}
						]
					}];
		};
		
		function radarChartOptions(colors){
			return {
				w: 180,
				h: 240,
				margin: margin,
				maxValue: 10,
				levels: 10,
				roundStrokes: false,
				color: d3.scaleOrdinal().range(colors),
				format: '.1f',
				legend: {title: "Station's total score:", translateX: -100, translateY: 35},
			};
		};
		
		var margin = { top: 50, right: 80, bottom: 50, left: 80 },
			width = 700,
			height = width,
			dataset = [{}],
			data1 = [{}],
			data2 = [{}];

		if (gare2 !== null && gare1 !== null) { // if both stations are selected
			data.forEach(function(d){
				if (d.Code_UIC == gare1){data1=dataPoint(d,gare1); };
				if (d.Code_UIC == gare2){data2=dataPoint(d,gare2); };
				dataset = data1.concat(data2);
			});
			let svg_radar1 = RadarChart("#radarChart", dataset, radarChartOptions([couleur1,couleur2]));
		};
		
		if (gare2 == null && gare1 !== null) { //if only the first station is selected
			data.forEach(function(d){
				if (d.Code_UIC == gare1){dataset=dataPoint(d,gare1); };
			});
			let svg_radar1 = RadarChart("#radarChart", dataset, radarChartOptions([couleur1]));
		};
		
		if (gare1 == null && gare2 !== null) { //if only the second station is selected
			data.forEach(function(d){
				if (d.Code_UIC == gare2){dataset = dataPoint(d,gare2); };
			});
			let svg_radar1 = RadarChart("#radarChart", dataset, radarChartOptions([couleur2]));
		};
	}
};