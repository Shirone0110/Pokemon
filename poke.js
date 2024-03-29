var pokenamePromise = d3.json("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=300");
var pokeabilityPromise = d3.json("https://pokeapi.co/api/v2/ability/?offset=0&limit=50");

d3.select("#name").attr("clickcount", 0);
d3.select("#id").attr("clickcount", 0);
d3.select("#exp").attr("clickcount", 0);
d3.select("#height").attr("clickcount", 0);
d3.select("#weight").attr("clickcount", 0);

var header = ["#name", "#id", "#exp", "#height", "#weight"];

var alter = 0;

pokenamePromise.then( //get pokemon information
function (pokemons)
{
    console.log("pokemons", pokemons);
    d3.select("#small").style.visibility = "visible";
    //drawTable(pokemons);
    var promises = pokemons.results.map(function(d)
    {
        return info(d.name);
    })
    Promise.all(promises).then(function (poke)
    {
        poke.sort(function(a, b)
        {
            return a.id - b.id;
        })
        drawTable(poke);
        d3.select("#header").text("Pokedex");
        makeHeader(poke);
        
    }, function (err)
    {
        console.log("fail", err);
    })
},
function (err)
{
    console.log("fail", err);
})

var makeHeader = function(pokemons)
{
    sortCol(pokemons, "#name", function(d) {return d.name;});
    sortCol(pokemons, "#id", function(d) {return d.id;});
    sortCol(pokemons, "#exp", function(d) {return d.base_experience;});
    sortCol(pokemons, "#height", function(d) {return d.height;});
    sortCol(pokemons, "#weight", function(d) {return d.weight;});
}

var sortCol = function(pokemons, col, accessor)
{
    Row(pokemons, pokemons);
    var Original = [];
    
    pokemons.forEach(function(item, index)
    {
        Original[index] = item;  
    })
    
    d3.select(col)
        .on("click", function()
        {
            var x = parseInt(d3.select(col).attr("clickcount"), 10);
            d3.select(col).attr("clickcount", (x + 1) % 2);
            header.forEach(function(item, index)
            {
                if (item != col) d3.select(item).attr("clickcount", -1);
                var cc = d3.select(item).attr("clickcount");
                var cell = d3.select(item);
                cell.selectAll("img").remove();
                if (cc == 0)
                {
                    cell.append("img")
                    .attr("src", "asc.png");
                }
                else if (cc == 1)
                {
                    cell.append("img")
                        .attr("src", "desc.png");
                }
            })
            if (col == "#name")
            {
                console.log("debug");
                pokemons.sort(function(a, b)
                {
                    var cc = d3.select(col).attr("clickcount");
                    if (cc == 1)
                    {
                        if (accessor(a) < accessor(b)) return 1;
                        else if (accessor(a) > accessor(b)) return -1;
                        else return 0;
                    }
                    else
                    {
                        if (accessor(a) < accessor(b)) return -1;
                        else if (accessor(a) > accessor(b)) return 1;
                        else return 0;
                    }
                })
            }
            else 
            {
                pokemons.sort(function(a, b)
                {
                    var cc = d3.select(col).attr("clickcount");
                    if (cc == 1) return (accessor(b) - accessor(a));
                    else return (accessor(a) - accessor(b));
                })
            }
            drawTable(pokemons);
            Row(pokemons, Original);
        })
}

pokeabilityPromise.then( //this is for future use
function (abilities)
{
    console.log("abilities", abilities);
    //poke_ability(abilities);
},
function (err)
{
    console.log("fail", err);
})

var info = function(pokemon) //get full info of pokemon from its name
{
    var pokePromise = d3.json("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    return pokePromise
}

var addCol = function(rows, txt, chk) //add column
{
    cell = rows.append("td");
        
    if (chk == 1)
        cell.attr("class", "pokename");
    cell.text(txt);
}

var Row = function(pokemons, original)
{
    d3.selectAll("td")
        .on("click", function(d)
    {
        console.log(original[d.id - 1]);
        sessionStorage.setItem("poke", JSON.stringify(original[d.id - 1]));
        let url = new URL("https://shirone0110.github.io/Pokemon/pokeinfo.html");
        window.open(url, "_self");
        //d3.selectAll("body *").remove();
        //show(pokemons, original, d.id);
    })
}

var drawTable = function (poke)
{  
    d3.selectAll("tbody *").remove();
    
    var rows = d3.select("tbody")
                .selectAll("tr")
                .data(poke)
                .enter()
                .append("tr");
    
    addCol(rows, function(d){return d.name;}, 1);
    addCol(rows, function(d)
    {
        if (d.id < 10) return '00'+ d.id; 
        else if (d.id < 100) return '0' + d.id; 
        else return d.id;
    }, 0);
    addCol(rows, function(d){return d.base_experience;}, 0);
    addCol(rows, function(d){return d.height / 10;}, 0);
    addCol(rows, function(d){return d.weight / 10;}, 0);
}
