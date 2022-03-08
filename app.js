function finalproject(){
    var filepath = "gdp_mod.csv";
    scatter(filepath);
    bar(filepath);
    //boxplot(filepath);
}

var scatter = function(filepath){
    var data = d3.csv(filepath, function(i){
        return {"": parseInt(i[""]), country: i.country, year: parseInt(i.year), sex: i.sex, age: i.age, suicide_num: parseInt(i.suicides_no), population: i.population, suicides_100k: parseInt(i.suicides_100k), gdp_yearly: i.gdp_yearly, gdp_capita: i.gdp_capita, gen: i.generation}
        //return {Longitude: parseFloat(i.longitude), Latitude: parseFloat(i.latitude), Median_House_Age: parseFloat(i.housing_median_age), Total_Rooms: parseFloat(i.total_rooms), Total_Bedrooms: parseFloat(i.total_bedrooms), Population: parseFloat(i.population), Households: parseFloat(i.households), Median_Income: parseFloat(i.median_income), Median_House_Value: parseFloat(i.median_house_value), Ocean_Proximity: i.ocean_proximity};
    });

    data.then(function(data){
        // x axis (suicides/100k) vs y axis (gdp_capita)
        var margin = {top: 10, right: 30, bottom: 60, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg1 = d3.select("#scatterplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear().domain([0, 30]).range([0, width]);
        var y = d3.scaleLinear().domain([0, 65000]).range([height, 0]);
        
        svg1.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
        svg1.append("g").call(d3.axisLeft(y));


        svg1.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {return x(d.suicides_100k);}).attr("cy", function (d) {return y(d.gdp_capita);}).attr("r", 2.0).style("fill", "rgb(104, 179, 163)");
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

        svg2.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {return x(d.population);}).attr("cy", function (d) {return y(d.gdp_capita);}).attr("r", 2.0).style("fill", "rgb(104, 179, 163)");
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

var bar = function(filepath){
    const sol = d3.csv(filepath, d3.autoType);
    var margin = {top: 50, right: 50, bottom: 90, left: 80}, width = 800 - margin.left - margin.right, height = 800 - margin.top - margin.bottom;

    var svg1 = d3.select("#bar").append("svg").attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("style", "background-color: lightblue")
    
    sol.then(function(data){
        const countries = data.map(d => d.country);
        const deathrate = data.map(d => d.suicides_no);        
        var sg = {}

        for(var i = 0; i < countries.length; i++){
            var c = countries[i];
            var d = deathrate[i];

            if(!sg[c])
                sg[c] = [d];

            else
                sg[c].push(d);
        }

        var total = [];
        for(i in Object.keys(sg))
            total.push({"country": Object.keys(sg)[i], "suicides_no": d3.sum(sg[Object.keys(sg)[i]])})
        
        console.log(total)

        var x = d3.scaleBand().range([0, width]).domain(total.map(function(i){return i.country;})).padding(0.2);
        svg1.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end").attr("fill", "black");

        var y = d3.scaleLinear().domain([0, 1100000]).range([height, 0]);
        svg1.append("g").call(d3.axisLeft(y));


        const tooltip = d3.select("#bar")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")

        const mouseover1 = function(event, d) {
            tooltip.style("opacity", 1)
        }

        const mousemove1 = function(event, d) {
            tooltip.html(`The number of suicides is : ${d.suicides_no}`)
                    .style("left", (event.x)/2 + "px") 
                    .style("top", (event.y)/2 + "px")
        }

        const mouseleave1 = function(event,d) {
            tooltip.transition().duration(200).style("opacity", 0)
        }


        svg1.selectAll("mybar").data(total).enter().append("rect").attr("x", function(i){return x(i.country);}).attr("y", function(i){return y(i.suicides_no);}).attr("width", x.bandwidth()).attr("height", function(i){return height - y(i.suicides_no);}).attr("fill", "rgb(104, 179, 163)")
                                .on("mouseover.col", function(event, d){d3.select(this).attr("fill", "orange")})
                                .on("mouseout", function(event, d){d3.select(this).transition().duration(500).attr("fill", "rgb(104, 179, 163)")})
                                .on("mouseover.num", mouseover1)
                                .on("mousemove", mousemove1)
                                .on("mouseleave", mouseleave1)

        
        svg1.append("text").attr("x", (width/2)).attr("y", 0 - (margin.top/2)).attr("text-anchor", "middle").style("font-size", "28px").style("text-decoration", "underline").text("Suicide Numbers in Canada, Mexico, and USA in 1985-2016");
        svg1.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", width - 300).attr("y", height + 70).text("Countries");
        svg1.append("text").attr("class", "y label").attr("text-anchor", "end").attr("x", -300).attr("y", -80).attr("dy", ".75em").attr("transform", "rotate(-90)").text("Number of Suicide from 1985-2016");
    })
}

var boxplot = function(filepath){
    var data = d3.csv(filepath, function(i){
        return {"": parseInt(i[""]), country: i.country, year: parseInt(i.year), sex: i.sex, age: i.age, suicide_num: parseInt(i.suicides_no), population: i.population, suicides_100k: parseInt(i.suicides_100k), gdp_yearly: i.gdp_yearly, gdp_capita: i.gdp_capita, gen: i.generation}
    });
    
    data.then(function(data){
        var margin = {top: 10, right: 30, bottom: 75, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg1 = d3.select("#boxplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        /*var sumstat = d3.nest().key(function(d) { return d.year;}).rollup(function(d) {
                                                                    q1 = d3.quantile(d.map(function(g) { return g.suicides_100k;}).sort(d3.ascending),.25)
                                                                    median = d3.quantile(d.map(function(g) { return g.suicides_100k;}).sort(d3.ascending),.5)
                                                                    q3 = d3.quantile(d.map(function(g) { return g.suicides_100k;}).sort(d3.ascending),.75)
                                                                    interQuantileRange = q3 - q1
                                                                    min = q1 - 1.5 * interQuantileRange
                                                                    max = q3 + 1.5 * interQuantileRange
                                                                    return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})}).entries(data)*/
                                                                    

        var testing = d3.rollup(data, i => d3.sum(i, j => j.suicides_100k), k => k.year);
        console.log(testing);

        temp = Array.from(testing);
        console.log(temp);

        var q1 = d3.quantile(Object.values(testing).sort(d3.ascending), 0.25);
        var med = d3.quantile(Object.values(testing).sort(d3.ascending), 0.5);
        var q3 = d3.quantile(Object.values(testing).sort(d3.ascending), 0.75);
        var iqr = q3 - q1;
        var min = q1 - 1.5 * iqr;
        var max = q3 + 1.5 * iqr;

        //var sumstat = ({q1: q1, med: med, q3: q3, iqr: iqr, min: min, max: max})
        //console.log(sumstat);
    });
}