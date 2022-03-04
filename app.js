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
        console.log(data);
        
        // x axis (suicides/100k) vs y axis (gdp_capita)
        var margin = {top: 10, right: 30, bottom: 60, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg1 = d3.select("#scatterplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear().domain([0, 30]).range([0, width]);
        var y = d3.scaleLinear().domain([0, 65000]).range([height, 0]);
        
        svg1.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
        svg1.append("g").call(d3.axisLeft(y));

        svg1.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {return x(d.suicides_100k);}).attr("cy", function (d) {return y(d.gdp_capita);}).attr("r", 1.5).style("fill", "rgb(0,0,0)");
        svg1.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", width - 100).attr("y", height + 40).text("Suicides per 100K Individuals");
        svg1.append("text").attr("class", "y label").attr("text-anchor", "end").attr("x", width - 450).attr("y", -70).attr("dy", ".75em").attr("transform", "rotate(-90)").text("GDP per capita");



        // x axis (population) vs y axis (gdp_capita)
        var margin = {top: 10, right: 30, bottom: 75, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg2 = d3.select("#scatterplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear().domain([0, 43000000]).range([0, width]);
        var y = d3.scaleLinear().domain([0, 65000]).range([height, 0]);
        
        svg2.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-30)");;
        svg2.append("g").call(d3.axisLeft(y));

        svg2.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {return x(d.population);}).attr("cy", function (d) {return y(d.gdp_capita);}).attr("r", 1.5).style("fill", "rgb(0,0,0)");
        svg2.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", width - 100).attr("y", height + 60).text("Suicides per 100K Individuals");
        svg2.append("text").attr("class", "y label").attr("text-anchor", "end").attr("x", width - 450).attr("y", -70).attr("dy", ".75em").attr("transform", "rotate(-90)").text("GDP per capita");
    })
}

var grouped_bar = function(filepath){
    var data = d3.csv(filepath, function(i){
        return {"": parseInt(i[""]), country: i.country, year: parseInt(i.year), sex: i.sex, age: i.age, suicide_num: parseInt(i.suicides_no), population: i.population, suicides_100k: parseInt(i.suicides_100k), gdp_yearly: i.gdp_yearly, gdp_capita: i.gdp_capita, gen: i.generation}
    });

    data.then(function(data){
        console.log(data);
        
        var margin = {top: 10, right: 30, bottom: 20, left: 50}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg1 = d3.select("#grouped_bar").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var subgroups = data.columns.slice(2, 4);
        console.log(subgroups);
        var groups = d3.map(data, function(d){return(d.group)}).keys()
        
        var x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2])
        svg1.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).tickSize(0));

        var y = d3.scaleLinear().domain([0, 40]).range([ height, 0 ]);
        svg1.append("g").call(d3.axisLeft(y));

        var xSubgroup = d3.scaleBand().domain(subgroups).range([0, x.bandwidth()]).padding([0.05])

        var color = d3.scaleOrdinal().domain(subgroups).range(['#e41a1c','#377eb8','#4daf4a'])

        svg1.append("g").selectAll("g").data(data).enter().append("g")
            .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { return xSubgroup(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return color(d.key); });
    })    
}