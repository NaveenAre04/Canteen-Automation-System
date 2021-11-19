$(document).ready(function(){   
    $("#persons").click(function(){
      $('#personsButton').click();
    });
    $("#addresses").click(function(){
      $('#addressButton').click();
    });
    $("#orders").click(function(){
      $('#ordersButton').click();
    });
    $(".personsdelete").click(function(){
      $.post("persons_delete.php",
      {
        person_id: $(this).attr('id')
      },
      function(data, status){     
        //alert(data);
        location.reload();
      }
      )
    });
    $(".addressdelete").click(function(){
      $.post("address_delete.php",
      {
        address_id: $(this).attr('id')
      },
      function(data, status){     
        //alert(data);
        location.reload();
      }
      )
    });
    $(".ordersdelete").click(function(){
      $.post("orders_delete.php",
      {
        order_id: $(this).attr('id')
      },
      function(data, status){     
        //alert(data);
        location.reload();
      }
      )
    });
    $(".personUpdateCl").click(function(){
      $('#personUpdate').click();
      //console.log($(this).attr('id').split("-")[2]);
      $('#ppersonid').val($(this).attr('id').split("-")[1]);
      $('#pfirstname').val($(this).attr('id').split("-")[2]);
      $('#plastname').val($(this).attr('id').split("-")[3]);
      $('#pgender').val($(this).attr('id').split("-")[4]);
      $('#page').val($(this).attr('id').split("-")[5]);
    });
    
    $(".addressUpdateCi").click(function(){
      $('#addressUpdate').click();
      //console.log($(this).attr('id').split("-")[2]);
      $('#paddressid').val($(this).attr('id').split("-")[1]);
      $('#paddress').val($(this).attr('id').split("-")[2]);
      $('#papersonid').val($(this).attr('id').split("-")[3]);
    });
    
    $(".orderUpdateCi").click(function(){
      $('#orderUpdate').click();
      //console.log($(this).attr('id').split("-")[2]);
      $('#porderid').val($(this).attr('id').split("-")[1]);
      $('#pordernumber').val($(this).attr('id').split("-")[2]);
      $('#popersonid').val($(this).attr('id').split("-")[3]);
      $('#poaddressid').val($(this).attr('id').split("-")[4]);
    });
    $("#mySearch").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myData tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    $("#mySearch1").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myData1 tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    $("#mySearch2").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myData2 tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });