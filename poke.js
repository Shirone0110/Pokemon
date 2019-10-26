var pokenamePromise = d3.json("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=200");
var pokeabilityPromise = d3.json("https://pokeapi.co/api/v2/ability/?offset=20&limit=293");

pokenamePromise.then( //get pokemon information
function (pokemons)
{
    console.log("pokemons", pokemons);
    drawTable(pokemons);
},
function (err)
{
    console.log("fail", err);
})

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
    return pokePromise.then(
    function (poke)
    {
        return poke;
    },
    function (err)
    {
        console.log("fail", err);
    })
}

var addCol = function(rows, txt)
{
    rows.append("td")
        .text(txt);
}

var drawTable = function (pokemons)
{  
    d3.selectAll("tbody *").remove();
    
    var rows = d3.select("tbody")
                .selectAll("tr")
                .data(pokemons.results)
                .enter()
                .append("tr");
    
    rows.append("td")
        .text(function (d) 
        {
            return d.name;
        })
    
    pokemons.results.forEach(function(item, index)
    {
        info(item.name).then(function (inf)
            {
                rows.append("td")
                    .text(inf.id);
                console.log(inf.id);
            })
        })
}