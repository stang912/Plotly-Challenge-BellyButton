//function for bar, bubble, gauge plot
function getPlot(id) {
    d3.json("samples.json").then((data)=> {
        console.log(data)
  
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(wfreq)
        
        // filter by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples);
  
        // getting top 10 
        var sampleValues = samples.sample_values.slice(0, 10).reverse();
  
        // top 10 otu ids 
        var OTU_ten = (samples.otu_ids.slice(0, 10)).reverse();

        var OTU_id = OTU_ten.map(d => "OTU " + d)

        // top 10 labels 
        var labels = samples.otu_labels.slice(0, 10);
  
        // bar plot
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'dark blue'},
            type:"bar",
            orientation: "h",
        };
  
        var data = [trace];
  
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        Plotly.newPlot("bar", data, layout);
      
        // bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        var layout1 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        var data1 = [trace1];
  
        Plotly.newPlot("bubble", data1, layout1); 
  
        // guage chart
        // var data3 = [
        //   {
        //       domain: { x: [0, 1], y: [0, 1] },
        //       value: parseFloat(wfreq),
        //       title: { text: "\<b>\Bellybutton Washing Frequency\</b>\ \<br>\ Scrubs Per Week"},
        //       type: "indicator",
        //       mode: "gauge+number",
              
        //       gauge: { 
        //           axis: { range: [0, 9] },
        //           bar: { color: "white", thickness: .1 },
        //           steps: [
        //                 { range: [0, 1], color: "FFFFE0" },
        //                 { range: [1, 2], color: "#FAFAD2" },
        //                 { range: [2, 3], color: "#EEE8AA" },
        //                 { range: [3, 4], color: "#D4E57F" },
        //                 { range: [4, 5], color: "#BAE590" },
        //                 { range: [5, 6], color: "#9DC179" },
        //                 { range: [6, 7], color: "#7DCA87" },
        //                 { range: [7, 8], color: "6EBA78" },
        //                 { range: [8, 9], color: "#49A556" }
        //             ],
                    
        //         }
                
        //     }];
        
        // var layout3 = { 
        //     width: 700, 
        //     height: 600, 
        //     margin: { t: 20, b: 40, l:100, r:100 } 
        // };
        
        // Plotly.newPlot("gauge", data3, layout3);

      });
}  

//function for getting info
function getInfo(id) {
    d3.json("samples.json").then((data)=> {
        
        var metadata = data.metadata;
        console.log(metadata)

        // filter by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel
        var demoInfo = d3.select("#sample-metadata");
        
        demoInfo.html("");

        // grab info and append
        Object.entries(result).forEach((key) => {   
                demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });

        

    });
}

// function for change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// function for initial data rendering
function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();