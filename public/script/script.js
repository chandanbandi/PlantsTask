$(function(){
    
    /************* renderSection()- This function renders the whole details section on clicking a row from the list of plants ************/
    function renderSection(plant){
        var section = `<div class="card-body">
                        <h5 class="card-title">`+plant.common_name+`</h5>
                        <p class="card-text"><em>Latin Name: </em><span class="badge badge-primary">`+plant.latin_name+`</span></p>
                        <p class="card-text"><em>Family Name: </em><span class="badge badge-primary">`+plant.family_name+`</span></p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Color: `+plant.flower_color+`</li>
                        <li class="list-group-item">Location: `+plant.appropriate_location+`</li>
                        <li class="list-group-item">Associated Wildlife: `+plant.associated_wildlife+`</li>
                        <li class="list-group-item">Climate Appropriate Plants: `+plant.climate_appropriate_plants+`</li>
                        <li class="list-group-item">Bloom Time: `+plant.bloom_time+`</li>
                        <li class="list-group-item">Habitat: `+plant.habitat+`</li>
                        <li class="list-group-item">Size At Maturity: `+plant.size_at_maturity+`</li>
                        <li class="list-group-item">Suitable Site Conditions: `+plant.suitable_site_conditions+`</li>
                        <li class="list-group-item">Water Needs: `+plant.water_needs+`</li>
                    </ul>`;
        return section;
    }
    
    /************* This ajax call is triggered on dom load *************/
    $.ajax({
        url: "https://data.sfgov.org/resource/vmnk-skih.json",
        type: 'GET',
        dataType: 'json',
        success: function(plants) {
            
            var tbody = $("#PlantTable tbody");
            $.each(plants, function(i,plant){
                tbody.append("<tr><td>"+plant.common_name+"</td><td>"+plant.bloom_time+"</td><td>"+plant.size_at_maturity+"</td><td>"+plant.water_needs+"</td><td>"+plant.plant_type+"</td></tr>");
                
            });
            
            //Initilaized the plantlist as a datatable
            var table = $('#PlantTable').DataTable( {
                select: true,
                responsive: true
            });
            
            //This callback function is triggered after selecting datatable's cell
            table.on( 'select', function ( e, dt, type, indexes ) {
                var section = "";
                var selectedRow = table.rows( indexes ).data().toArray()[0][0];
                $.each(plants, function(i,plant){
                    if(plant.common_name == selectedRow){
                        section = renderSection(plant);
                        $("#details").html(section);
                    }
                });
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");

            });
        }
    });
    
    /************* This function is triggered on clicking "Filter" button and need to be accessed after selecting the options *************/
    $("#filter").on("click", function(e){
        var finalQuery = "";
        $("#details").html("");
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        
        //Fetching the BloomTime checbox selections and creating a query string
        var Bloomtime = "";
        for(var i=1; i<=4; i++){
            if($("#bloom"+i).is(":checked") ){
                if (Bloomtime!="") {
                    Bloomtime +=" or ";
                }
                Bloomtime +="bloom_time like '%25"+ $("#bloom"+i).val()+ "%25'";
            }
        }
        
        if(Bloomtime != ""){
            finalQuery += "(" + Bloomtime + ")";  
        }
        else{
            finalQuery = "";  
        }
        
        //Fetching the SizeAtMaturity checbox selections and creating a query string
        var SizeAtMaturity = "";
        for(var j=1; j<=5; j++){
            if($("#size"+j).is(":checked") ){
                    if (SizeAtMaturity!="") {
                        SizeAtMaturity +=" or ";
                    }
                    SizeAtMaturity += "size_at_maturity like '"+ $("#size"+j).val()+ "'";
                }
        }
        
        if((SizeAtMaturity != "") && (finalQuery != "")){
          finalQuery += " and (" + SizeAtMaturity +")";  
        }
        else if(SizeAtMaturity != ""){
            finalQuery += "(" + SizeAtMaturity +")";  
        }
        
        //Fetching the WateringNeeds checbox selections and creating a query string
         var WateringNeeds = "";
        for(var k=1; k<=3; k++){
            if($("#watering"+k).is(":checked") ){
                    if (WateringNeeds!="") {
                        WateringNeeds +=" or ";
                    }
                    WateringNeeds += "water_needs like '"+ $("#watering"+k).val()+ "'";
                }
        }
        
        if((WateringNeeds != "") && (finalQuery != "")){
          finalQuery += " and (" + WateringNeeds +")";  
        }
        else if(WateringNeeds != ""){
            finalQuery += "(" + WateringNeeds +")";  
        }
        
        //Fetching the PlantType checbox selections and creating a query string
         var PlantType = "";
         for(var l=1; l<=10; l++){
            if($("#type"+l).is(":checked") ){
                    if (PlantType!="") {
                        PlantType +=" or ";
                    }
                    PlantType += "plant_type like '"+ $("#type"+l).val()+ "'";
                }
        }
        
        if((PlantType != "") && (finalQuery != "")){
            finalQuery += " and (" + PlantType +")";  
        }
        else if(PlantType != ""){
            finalQuery += "(" + PlantType +")";  
        }
   
        $.ajax({
            url: "https://data.sfgov.org/resource/vmnk-skih.json?$where="+finalQuery,
            type: 'GET',
            dataType: 'json', // added data type
            success: function(resp) {
                $("#PlantGrid").hide();
                $("#FilterGrid").html(`<table id="FilterTable" class="table">
                <thead>
                    <tr>
                        <td>Common Name</td>
                        <td>Bloom Time</td>
                        <td>Size At Maturity</td>
                        <td>Water Needs</td>
                        <td>Plant Type</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>`);
            var tbody = $("#FilterTable tbody");
                
            $.each(resp, function(i,plant){
                tbody.append("<tr><td>"+plant.common_name+"</td><td>"+plant.bloom_time+"</td><td>"+plant.size_at_maturity+"</td><td>"+plant.water_needs+"</td><td>"+plant.plant_type+"</td></tr>");
            });
                
            
                
            var filtertable = $('#FilterTable').DataTable({
                select: true,
                responsive: true
                
            }); 
                
            filtertable.on( 'select', function ( e, dt, type, indexes ) {

                var section = "";
                var selectedRow = filtertable.rows( indexes ).data().toArray()[0][0];

                $.each(resp, function(i,plant){
                    if(plant.common_name == selectedRow){
                        section = renderSection(plant);
                        $("#details").html(section);
                    }
                });
                
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");
            });
                
            }
        });
        
    });
 
     /************* This function is triggered on clicking "Clear" button and it clears the filter selection *************/
    $("#clear").on("click", function(){
        $("html, body").animate({ scrollTop: $(document).height() }, "slow", function(){
            window.location.reload(); 
        });
        
    });
});