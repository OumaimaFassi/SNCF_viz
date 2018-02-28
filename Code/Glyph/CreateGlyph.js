function CreateGlyph(data, firstStationSelected ,secondStationSelected ) {
      var gare1 =  firstStationSelected
 		  var gare2 = secondStationSelected
      //"271007"
      var dataset = [{}]
      
      var data1 = [{}]
      
      var data2 = [{}]
      
      
     // if the secondStationSelected exists
      
        if (gare2 !== null && gare1 !== null) {
          
          
           data.forEach(function(d){
             
             if (d.Code_UIC == gare1){
               var json = [
                 {uic : gare1, 
                  name : d.Nom_de_la_gare, 
                  axes : [
                  {indice : 'Proprete', value : +d.Proprete },
                  {indice : 'Securite', value : +d.Securite },
                  {indice : 'Communication_perturbations', value : +d.Communication_perturbations },
                  {indice : 'Confort_d_attente', value : +d.Confort_d_attente },
                  {indice : 'Commerces_restauration', value : +d.Commerces_restauration },
                  {indice : 'MoyenneDistance', value : 10 - +d.MoyenneDistance * 10 / 16.8 },
                  {indice : 'score_pmr13', value : +d.score_pmr13*10/13
                  },
                  ]
                 }]
              data1 = json
             }
             
          
           
           if (d.Code_UIC == gare2){ 
               var json = [
                 {uic : gare2, 
                  name : d.Nom_de_la_gare, 
                  axes : [
                  {indice : 'Proprete', value : +d.Proprete },
                  {indice : 'Securite', value : +d.Securite },
                  {indice : 'Communication_perturbations', value : +d.Communication_perturbations },
                  {indice : 'Confort_d_attente', value : +d.Confort_d_attente },
                  {indice : 'Commerces_restauration', value : +d.Commerces_restauration },
                  {indice : 'MoyenneDistance', value : 10 - +d.MoyenneDistance * 10 / 16.8 },
                  {indice : 'score_pmr13', value : +d.score_pmr13*10/13
                  },
                  ]
                 }]
              data2 = json
             }
          
         dataset = data1.concat(data2)
         
         
         })
         
           var radarChartOptions1 = {
			  w: 290,
			  h: 350,
			  margin: margin,
			  maxValue: 10,
			  levels: 10,
			  roundStrokes: false,
			  color: d3.scaleOrdinal().range(["Blue","DarkOrange"]),
				format: '.0f',
				legend: { title: 'Gare', translateX: 100, translateY: 40 },
				
			};

			// Draw the chart, get a reference the created svg element :
			let svg_radar1 = RadarChart(".radarChart", dataset, radarChartOptions1);
         
        }
        
        //if we only select one station
        
         if (gare2 == null && gare1 !== null) {
        
           data.forEach(function(d){
             
             if (d.Code_UIC == gare1){
               var json = [
                 {uic : gare1, 
                  name : d.Nom_de_la_gare, 
                  axes : [
                  {indice : 'Proprete', value : +d.Proprete },
                  {indice : 'Securite', value : +d.Securite },
                  {indice : 'Communication_perturbations', value : +d.Communication_perturbations },
                  {indice : 'Confort_d_attente', value : +d.Confort_d_attente },
                  {indice : 'Commerces_restauration', value : +d.Commerces_restauration },
                  {indice : 'MoyenneDistance', value : 10 - +d.MoyenneDistance * 10 / 16.8 },
                  {indice : 'score_pmr13', value : +d.score_pmr13*10/13
                  },
                  ]
                 }]
              dataset = json 
             }
             
             var radarChartOptions1 = {
			  w: 290,
			  h: 350,
			  margin: margin,
			  maxValue: 10,
			  levels: 10,
			  roundStrokes: false,
			  color: d3.scaleOrdinal().range(["Blue"]),
				format: '.0f',
				legend: { title: 'Gare', translateX: 100, translateY: 40 },
				
			};

			// Draw the chart, get a reference the created svg element :
			let svg_radar1 = RadarChart(".radarChart", dataset, radarChartOptions1);
             
             
           
         })}
        
      
      if (gare1 == null && gare2 !== null) {
        
           data.forEach(function(d){
             
             if (d.Code_UIC == gare2){
               var json = [
                 {uic : gare2, 
                  name : d.Nom_de_la_gare, 
                  axes : [
                  {indice : 'Proprete', value : +d.Proprete },
                  {indice : 'Securite', value : +d.Securite },
                  {indice : 'Communication_perturbations', value : +d.Communication_perturbations },
                  {indice : 'Confort_d_attente', value : +d.Confort_d_attente },
                  {indice : 'Commerces_restauration', value : +d.Commerces_restauration },
                  {indice : 'MoyenneDistance', value : 10 - +d.MoyenneDistance * 10 / 16.8 },
                  {indice : 'score_pmr13', value : +d.score_pmr13*10/13
                  },
                  ]
                 }]
              dataset = json
             }
           var radarChartOptions1 = {
			  w: 290,
			  h: 350,
			  margin: margin,
			  maxValue: 10,
			  levels: 10,
			  roundStrokes: false,
			  color: d3.scaleOrdinal().range(["DarkOrange"]),
				format: '.0f',
				legend: { title: 'Gare', translateX: 100, translateY: 40 },
				
			};

			// Draw the chart, get a reference the created svg element :
			let svg_radar1 = RadarChart(".radarChart", dataset, radarChartOptions1);
         })}
      //------------- END of JSON construction -------------------//
             
      			
        
      
			
        
      }