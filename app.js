function finalproject(){
    var filepath = "gdp_mod.csv";
    scatter(filepath);
    bar(filepath);
    stacked1(filepath);
    stacked2(filepath);
    stream(filepath);
    boxplot(filepath);
}

var scatter = function(filepath){
    var data = d3.csv(filepath, function(i){return {"": parseInt(i[""]), country: i.country, year: parseInt(i.year), sex: i.sex, age: i.age, suicide_num: parseInt(i.suicides_no), population: i.population, suicides_100k: parseInt(i.suicides_100k), gdp_yearly: i.gdp_yearly, gdp_capita: i.gdp_capita, gen: i.generation}});

    data.then(function(data){
        //Graph 1
        // x axis (suicides/100k) vs y axis (gdp_capita)
        var margin = {top: 50, right: 30, bottom: 60, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg1 = d3.select("#scatterplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear().domain([0, 0]).range([0, width]);
        var y = d3.scaleLinear().domain([0, 65000]).range([height, 0]);

        svg1.append("g").call(d3.axisLeft(y));
        svg1.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {return x(d.suicides_100k);}).attr("cy", function (d) {return y(d.gdp_capita);}).attr("r", 2.0).style("fill", "rgb(104, 179, 163)");
        svg1.append("text").attr("class", "xlabel").attr("text-anchor", "end").attr("x", width - 80).attr("y", height + 40).text("Suicides per 100K Individuals");
        svg1.append("text").attr("class", "ylabel").attr("text-anchor", "end").attr("x", width - 450).attr("y", -70).attr("dy", ".75em").attr("transform", "rotate(-90)").text("GDP per capita");

        x.domain([0, 30])
        svg1.append("g").attr("class", "xlabel").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
        svg1.select("xlabel").transition().duration(1000)
            .attr("opacity", "1")
            .text("Suicides per 100K Individuals")
            .call(d3.axisBottom(x));

        svg1.selectAll("circle").transition().delay(function(d,i){return(i*3)}).duration(1000)
            .attr("cx", function (d) { return x(d.suicides_100k);})
            .attr("cy", function (d) { return y(d.gdp_capita); })

        svg1.append("text").attr("x", (width/2 - 25)).attr("y", 0 - (margin.top/2)).attr("text-anchor", "middle").style("font-size", "16px").style("text-decoration", "underline").text("Suicide Rates (#/100K individuals) vs GDP per Capita from 1985-2016");


        //Graph 2
        // x axis (suicide_num) vs y axis (gdp_capita)
        var margin = {top: 50, right: 30, bottom: 60, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg2 = d3.select("#scatterplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear().domain([0, 0]).range([0, width]);
        var y = d3.scaleLinear().domain([0, 65000]).range([height, 0]);
        
        svg2.append("g").call(d3.axisLeft(y));
        svg2.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {return x(d.suicide_num);}).attr("cy", function (d) {return y(d.gdp_capita);}).attr("r", 2.0).style("fill", "rgb(104, 179, 163)");
        svg2.append("text").attr("class", "x_label").attr("text-anchor", "end").attr("x", width - 110).attr("y", height + 50).text("Number of Suicides");
        svg2.append("text").attr("class", "y_label").attr("text-anchor", "end").attr("x", width - 450).attr("y", -70).attr("dy", ".75em").attr("transform", "rotate(-90)").text("GDP per capita");
        
        x.domain([0, 12000]);
        svg2.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-30)");
        svg2.select("x_label").transition().duration(1000)
            .attr("opacity", "1")
            .text("Number of Suicides")
            .call(d3.axisBottom(x));

        svg2.selectAll("circle").transition().delay(function(d,i){return(i*3)}).duration(1000)
            .attr("cx", function (d) {return x(d.suicide_num);})
            .attr("cy", function (d) {return y(d.gdp_capita);})
            
        svg2.append("text").attr("x", (width/2 - 25)).attr("y", 0 - (margin.top/2)).attr("text-anchor", "middle").style("font-size", "16px").style("text-decoration", "underline").text("Number of Suicides vs GDP per Capita from 1985-2016");


        //Graph 3
        // x axis (population) vs y axis (gdp_capita)
        var margin = {top: 50, right: 30, bottom: 60, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg3 = d3.select("#scatterplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear().domain([0, 0]).range([0, width]);
        var y = d3.scaleLinear().domain([0, 65000]).range([height, 0]);
        
        svg3.append("g").call(d3.axisLeft(y));
        svg3.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {return x(d.population);}).attr("cy", function (d) {return y(d.gdp_capita);}).attr("r", 2.0).style("fill", "rgb(104, 179, 163)");
        svg3.append("text").attr("class", "x_label").attr("text-anchor", "end").attr("x", width - 130).attr("y", height + 55).text("Population");
        svg3.append("text").attr("class", "y_label").attr("text-anchor", "end").attr("x", width - 450).attr("y", -70).attr("dy", ".75em").attr("transform", "rotate(-90)").text("GDP per capita");
        
        x.domain([0, 45000000]);
        svg3.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-30)");
        svg3.select("x_label").transition().duration(1000)
            .attr("opacity", "1")
            .text("Population")
            .call(d3.axisBottom(x));

        svg3.selectAll("circle").transition().delay(function(d,i){return(i*3)}).duration(1000)
            .attr("cx", function (d) { return x(d.population); })
            .attr("cy", function (d) { return y(d.gdp_capita); })
            
        svg3.append("text").attr("x", (width/2 - 25)).attr("y", 0 - (margin.top/2)).attr("text-anchor", "middle").style("font-size", "16px").style("text-decoration", "underline").text("Population vs GDP per Capita from 1985-2016");
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
        
        var x = d3.scaleBand().range([0, width]).domain(total.map(function(i){return i.country;})).padding(0.2);
        var y = d3.scaleLinear().domain([0, 1100000]).range([height, 0]);

        //svg1.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end").attr("fill", "black");
        svg1.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").style("text-anchor", "end").attr("fill", "black").style("font-size", "18px");
        svg1.append("g").call(d3.axisLeft(y));

        const tooltip = d3.select("#bar")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px");

        const mouseover1 = function(event, d) {
            tooltip.style("opacity", 1)
        }

        const mousemove1 = function(event, d) {
            tooltip.html(`The number of suicides is : ${d.suicides_no}`)
                    .style("left", (event.x)/2 + "px") 
                    .style("top", (event.y)/2 + "px")
                    //.style("left", (d3.mouse(this)[0] + 70) + "px") 
                    //.style("top", (d3.mouse(this)[1]) + "px")
                    //.style("left", d3.select(this).attr("cx") + "px") 
                    //.style("top", d3.select(this).attr("cy") + "px")
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
        svg1.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", width - 300).attr("y", height + 70).text("Countries").style("font-size", "28px");
        svg1.append("text").attr("class", "y label").attr("text-anchor", "end").attr("x", -125).attr("y", -80).attr("dy", ".75em").attr("transform", "rotate(-90)").text("Number of Suicide from 1985-2016").style("font-size", "28px");
    })
}

var stacked1 = function(filepath){
    var data = d3.csv(filepath, function(i){return {"": parseInt(i[""]), country: i.country, year: parseInt(i.year), sex: i.sex, age: i.age, suicide_num: parseInt(i.suicides_no), population: i.population, suicides_100k: parseInt(i.suicides_100k), gdp_yearly: i.gdp_yearly, gdp_capita: i.gdp_capita, gen: i.generation}});

    data.then(function(data){
        data = data.filter(i => i.year <= 2013);
        var temp = d3.rollups(data, i => d3.sum(i, j => j.suicide_num), j => j.year, k => k.country).sort();
        console.log(temp);

        var med_freq = d3.rollups(data, i => d3.sum(i, j => j.suicide_num), d => d.year).sort();
        console.log(med_freq);

        var mapper = temp.map(i => [['year', i[0]], i[1][0], i[1][1], i[1][2]]).map(j => Object.fromEntries(j));
        console.log(mapper);

        var arr = d3.stack().keys(['Canada', 'Mexico', 'United States']);
        var series = arr(mapper);

        var margin = {top: 50, left: 100, right: 50, bottom: 100}, width = 1000, height = 800;
        var q4 = d3.select("#stacked1").append("svg").attr("width", width).attr("height", height).attr("id", "svg_box")
        
        var x_scale = d3.scaleBand().domain(d3.range(temp.length)).range([margin.left, width - margin.right - margin.left]).padding(0.05);
        var y_scale = d3.scaleLinear().domain([0, d3.max(med_freq.map(i => i[1]))]).range([height - margin.bottom, margin.bottom]); 
        
        q4.append("g").attr("transform", "translate(0, " + (height - margin.bottom) + ")").call(d3.axisBottom(x_scale).tickFormat(i => temp.sort()[i][0]));
        q4.append("g").attr("transform", "translate(" + margin.left + ", 0)").call(d3.axisLeft(y_scale));

        var filler_col = ["rgb(104, 179, 163)", "rgb(135, 175, 230)", "rgb(230, 130, 130)"];
        var groups = q4.selectAll(".gbars").data(series).enter().append("g").attr("class", "gbars").attr("fill", function(i, j){return filler_col[j];})
        var rects = groups.selectAll("rect").data(function(i){return i;}).enter().append("rect").attr("x", function(i, j){return x_scale(j);})
                                                                                                .attr("y", function (d){return y_scale(d[1]);})
                                                                                                .attr("width", function(i){return x_scale.bandwidth();})
                                                                                                .attr("height", function(i){return y_scale(i[0])-y_scale(i[1]);})

        q4.append("circle").attr("cx", 120).attr("cy", 110).attr("r", 6).style("fill", "rgb(104, 179, 163)")
        q4.append("circle").attr("cx", 120).attr("cy", 130).attr("r", 6).style("fill", "rgb(135, 175, 230)")
        q4.append("circle").attr("cx", 120).attr("cy", 150).attr("r", 6).style("fill", "rgb(230, 130, 130)")
        q4.append("text").attr("x", 140).attr("y", 110).text("Canada").style("font-size", "15px").attr("alignment-baseline", "middle")
        q4.append("text").attr("x", 140).attr("y", 130).text("Mexico").style("font-size", "15px").attr("alignment-baseline", "middle")
        q4.append("text").attr("x", 140).attr("y", 150).text("United States").style("font-size", "15px").attr("alignment-baseline", "middle")
        q4.append("text").attr("x", (width/2)).attr("y", 0 - (margin.top/2)).attr("text-anchor", "middle").style("font-size", "28px").style("text-decoration", "underline").text("Suicide Numbers in Canada, Mexico, and USA in 1985-2016");
        q4.append("text").attr("x", -450).attr("y", 35).attr("transform", "rotate(-90)").text("Number of Suicides").style("font-size", "28px");
        q4.append("text").attr("x", 450).attr("y", 750).text("Years").style("font-size", "28px");
    })
}

var stacked2 = function(filepath){
    var data = d3.csv(filepath, function(i){return {"": parseInt(i[""]), country: i.country, year: parseInt(i.year), sex: i.sex, age: i.age, suicide_num: parseInt(i.suicides_no), population: i.population, suicides_100k: parseInt(i.suicides_100k), gdp_yearly: i.gdp_yearly, gdp_capita: i.gdp_capita, gen: i.generation}});

    data.then(function(data){
        data = data.filter(i => i.year <= 2013);
        var temp = d3.rollups(data, i => d3.sum(i, j => j.suicide_num), j => j.year, k => k.age).sort();
        console.log(temp);

        var med_freq = d3.rollups(data, i => d3.sum(i, j => j.suicide_num), d => d.year).sort();
        console.log(med_freq);

        var mapper = temp.map(i => [['year', i[0]], i[1][0], i[1][1], i[1][2], i[1][3], i[1][4], i[1][5]]).map(j => Object.fromEntries(j)).sort();
        console.log(mapper);

        var arr = d3.stack().keys(["75+ years", "55-74 years", "35-54 years", "25-34 years", "15-24 years", "5-14 years"]);
        var series = arr(mapper);

        var margin = {top: 50, left: 100, right: 50, bottom: 100}, width = 1000, height = 800;
        var q4 = d3.select("#stacked2").append("svg").attr("width", width).attr("height", height).attr("id", "svg_box")
        
        var x_scale = d3.scaleBand().domain(d3.range(temp.length)).range([margin.left, width - margin.right - margin.left]).padding(0.05);
        var y_scale = d3.scaleLinear().domain([0, d3.max(med_freq.map(i => i[1]))]).range([height - margin.bottom, margin.bottom]); 
        
        q4.append("g").attr("transform", "translate(0, " + (height - margin.bottom) + ")").call(d3.axisBottom(x_scale).tickFormat(i => temp.sort()[i][0]));
        q4.append("g").attr("transform", "translate(" + margin.left + ", 0)").call(d3.axisLeft(y_scale));


        var filler_col = ["rgb(250, 180, 90)", "rgb(135, 175, 230)", "rgb(230, 130, 130)", "rgb(250, 215, 115)", "rgb(200, 115, 250)", "rgb(104, 179, 163)"];
        var groups = q4.selectAll(".gbars").data(series).enter().append("g").attr("class", "gbars").attr("fill", function(i, j){return filler_col[j];})
        var rects = groups.selectAll("rect").data(function(i){return i;}).enter().append("rect").attr("x", function(i, j){return x_scale(j);})
                                                                                                .attr("y", function (d){return y_scale(d[1]);})
                                                                                                .attr("width", function(i){return x_scale.bandwidth();})
                                                                                                .attr("height", function(i){return y_scale(i[0])-y_scale(i[1]);})

        q4.append("circle").attr("cx", 120).attr("cy", 210).attr("r", 6).style("fill", "rgb(250, 180, 90)")
        q4.append("circle").attr("cx", 120).attr("cy", 190).attr("r", 6).style("fill", "rgb(135, 175, 230)")
        q4.append("circle").attr("cx", 120).attr("cy", 170).attr("r", 6).style("fill", "rgb(230, 130, 130)")
        q4.append("circle").attr("cx", 120).attr("cy", 150).attr("r", 6).style("fill", "rgb(250, 215, 115)")
        q4.append("circle").attr("cx", 120).attr("cy", 130).attr("r", 6).style("fill", "rgb(200, 115, 250)")
        q4.append("circle").attr("cx", 120).attr("cy", 110).attr("r", 6).style("fill", "rgb(104, 179, 163)")
        q4.append("text").attr("x", 140).attr("y", 210).text("75+ Years Old").style("font-size", "15px").attr("alignment-baseline", "middle")
        q4.append("text").attr("x", 140).attr("y", 190).text("55-74 Years Old").style("font-size", "15px").attr("alignment-baseline", "middle")
        q4.append("text").attr("x", 140).attr("y", 170).text("34-54 Years Old").style("font-size", "15px").attr("alignment-baseline", "middle")
        q4.append("text").attr("x", 140).attr("y", 150).text("25-34 Years Old").style("font-size", "15px").attr("alignment-baseline", "middle")
        q4.append("text").attr("x", 140).attr("y", 130).text("15-24 Years Old").style("font-size", "15px").attr("alignment-baseline", "middle")
        q4.append("text").attr("x", 140).attr("y", 110).text("5-14 Years Old").style("font-size", "15px").attr("alignment-baseline", "middle")
        q4.append("text").attr("x", -450).attr("y", 35).attr("transform", "rotate(-90)").text("Number of Suicides").style("font-size", "28px");
        q4.append("text").attr("x", 450).attr("y", 750).text("Years").style("font-size", "28px");
    })
}

var stream = function(filepath){}

var boxplot = function(filepath){
    /*var data = d3.csv(filepath, function(i){
        return {"": parseInt(i[""]), country: i.country, year: parseInt(i.year), sex: i.sex, age: i.age, suicide_num: parseInt(i.suicides_no), population: i.population, suicides_100k: parseInt(i.suicides_100k), gdp_yearly: i.gdp_yearly, gdp_capita: i.gdp_capita, gen: i.generation}
    });*/
    
    /*data.then(function(data){
        var margin = {top: 10, right: 30, bottom: 75, left: 80}, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        var svg1 = d3.select("#boxplot").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var sumstat = d3.rollup(data, function(d) {
            

            q1 = d3.quantile(d.map(function(g) { return g.suicides_100k;}).sort(d3.ascending),.25)
            median = d3.quantile(d.map(function(g) { return g.suicides_100k;}).sort(d3.ascending),.5)
            q3 = d3.quantile(d.map(function(g) { return g.suicides_100k;}).sort(d3.ascending),.75)
            interQuantileRange = q3 - q1
            min = q1 - 1.5 * interQuantileRange
            max = q3 + 1.5 * interQuantileRange
            return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
        
        })                                                                

        //var sumstat = ({q1: q1, med: med, q3: q3, iqr: iqr, min: min, max: max})
        console.log(sumstat);        
    });*/

    /*data.then(function(data){
        const countries = data.map(d => d.country);
        const years = range(1985, 2016);
        const deathrate = data.map(d => d.suicides_no);        
        var sg = {}

        console.log(countries);

        var mexico = {}; //year: deaths
        var usa = {}
        var canada = {};
        var j = 0;
        for (var i in years){
            for(var j in countries){
                if(j in sg){
                    if(j == "Mexico")
                        mexico[i].push()
                }
                else{

                }
            }
            console.log("hello");
        }
    })*/
}