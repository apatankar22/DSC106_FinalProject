function finalproject(){
    var filepath = "gdp_mod.csv";
    scatter(filepath);
    grouped_bar(filepath);
}


var scatter = function(filepath){
    var data = d3.csv(filepath, function(i){
        return {"": parseInt(i[""]), country: i.country, year: parseInt(i.year), sex: i.sex, age: i.age, suicide_num: parseInt(i.suicides_no), population: i.population, suicides_100k: parseInt(i.suicides_100k), gdp_yearly: i.gdp_yearly, gdp_capita: i.gdp_capita, gen: i.generation}
        //return {Longitude: parseFloat(i.longitude), Latitude: parseFloat(i.latitude), Median_House_Age: parseFloat(i.housing_median_age), Total_Rooms: parseFloat(i.total_rooms), Total_Bedrooms: parseFloat(i.total_bedrooms), Population: parseFloat(i.population), Households: parseFloat(i.households), Median_Income: parseFloat(i.median_income), Median_House_Value: parseFloat(i.median_house_value), Ocean_Proximity: i.ocean_proximity};
    });

    data.then(function(data){
        //console.log(data);
        
        // x axis (suicides/100k) vs y axis (gdp_capita)
        var margin = {top: 10, right: 30, bottom: 60, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg1 = d3.select("#scatterplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear().domain([0, 30]).range([0, width]);
        var y = d3.scaleLinear().domain([0, 65000]).range([height, 0]);
        
        svg1.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
        svg1.append("g").call(d3.axisLeft(y));

        svg1.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {return x(d.suicides_100k);}).attr("cy", function (d) {return y(d.gdp_capita);}).attr("r", 1.5).style("fill", "rgb(0,0,0)");
        svg1.append("text").attr("class", "x_label").attr("text-anchor", "end").attr("x", width - 100).attr("y", height + 40).text("Suicides per 100K Individuals");
        svg1.append("text").attr("class", "y_label").attr("text-anchor", "end").attr("x", width - 450).attr("y", -70).attr("dy", ".75em").attr("transform", "rotate(-90)").text("GDP per capita");

        x = d3.scaleLinear().domain([0, 30])
        svg1.select("x_label").transition().duration(1000)
            .attr("opacity", "1")
            .text("Suicides per 100K Individuals")
            .call(d3.axisBottom(x));

        svg1.selectAll("circle").transition().delay(function(d,i){return(i*3)}).duration(1000)
            .attr("cx", function (d) { return x(d.suicides_100k);})
            .attr("cy", function (d) { return y(d.gdp_capita); })

        
        // x axis (population) vs y axis (gdp_capita)
        var margin = {top: 10, right: 30, bottom: 75, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg2 = d3.select("#scatterplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear().domain([0, 43000000]).range([0, width]);
        var y = d3.scaleLinear().domain([0, 65000]).range([height, 0]);
        
        svg2.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-30)");;
        svg2.append("g").call(d3.axisLeft(y));

        svg2.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {return x(d.population);}).attr("cy", function (d) {return y(d.gdp_capita);}).attr("r", 1.5).style("fill", "rgb(0,0,0)");
        svg2.append("text").attr("class", "x_label").attr("text-anchor", "end").attr("x", width - 100).attr("y", height + 60).text("Population");
        svg2.append("text").attr("class", "y_label").attr("text-anchor", "end").attr("x", width - 450).attr("y", -70).attr("dy", ".75em").attr("transform", "rotate(-90)").text("GDP per capita");
        

        x = d3.scaleLinear().domain([0, 43000000])
        svg2.select("x_label").transition().duration(1000)
            .attr("opacity", "1")
            .text("Population")
            .call(d3.axisBottom(x));

        svg2.selectAll("circle").transition().delay(function(d,i){return(i*3)}).duration(1000)
            .attr("cx", function (d) { return x(d.population);})
            .attr("cy", function (d) { return y(d.gdp_capita); })
    })
}

var grouped_bar = function(filepath){
    /*var data = d3.csv(filepath, function(i){
        return {"": parseInt(i[""]), country: i.country, year: parseInt(i.year), sex: i.sex, age: i.age, suicide_num: parseInt(i.suicides_no), population: i.population, suicides_100k: parseInt(i.suicides_100k), gdp_yearly: i.gdp_yearly, gdp_capita: i.gdp_capita, gen: i.generation}
    });

    data.then(function(data){
        console.log(data);
        
        var margin = {top: 10, right: 30, bottom: 20, left: 50}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg1 = d3.select("#grouped_bar").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        countries = d3.group(data, i => i.country); 
        console.log(countries);
        console.log(countries.get("Canada"));

        //rolled = d3.rollup(data, v => d3.sum(v, d => d.suicide_num), d => d.country);
        rolled = d3.rollup(data, v => v.length, d => d.year);
        console.log(rolled);
    })*/
}