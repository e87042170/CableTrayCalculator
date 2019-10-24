var odArr=[];
$(document).ready(function(){
	var cable_data="cable_data.json";
	var res;
	$('#sel1 option').prop('selected',false);
	$('#sel1 option:first').prop('selected',true);
	$.getJSON(cable_data, function(result){
		res=result;
		getCableSpec(res.XLPE);		
	});

	$('#sel1').change(function(){
		//alert(this.value);		
		switch(this.value){
			case "XLPE":
				getCableSpec(res.XLPE);
				break;
			case "FPVC":
			    getCableSpec(res.FPVC);
				break;
			case "CV-S":
				getCableSpec(res.CVS);
				break;
			case "PVC":
				getCableSpec(res.PVC);
				break;
			case "IPVV":
				getCableSpec(res.IPVV);
				break;
			case "ITVV":
				getCableSpec(res.ITVV);
				breal;
			case "CVVS":
				getCableSpec(res.CVVS);
				break;
			case "":
				$("#sel2").html('');
		}
	});

	var listCount=0;
	$("#addCable").click(function(){
		listCount++;
		var cType=$('#sel1').val();
		var cSpec=$('#sel2').val();
		var cOD=odArr[$('#sel2 :selected').index()];
		var str='<tr>'+
		        '<td>'+listCount+'</td>'+
		        '<td><input type="text" class="form-control" value="'+cType+'"></td>'+
		        '<td><input type="text" class="form-control" value="'+cSpec+'"></td>'+
		        '<td><input type="text" class="form-control" value="'+cOD+'"></td>'+
		        '<td><input type="text" class="form-control" value="0"></td>'+
		        '<td><button class="btn btn-default btn-outline-danger"> <i class="fa fa-close"></i> Delete</button></td>'+
		        '</tr>';
		$('#tbl1 tbody').append(str);
	});
	$("#calculate").click(function(){
		var hh=100-20;
		var cableArea=0,tray150=150*hh,tray300=300*hh,tray600=600*hh;
	    $('#tbl1 tbody tr').each(function(){
	    	var od=$(this).find('input:eq(2)').val();
	    	var qty=$(this).find('input:eq(3)').val();
	    	cableArea=cableArea+(Math.PI*Math.pow(od/2,2)*qty);
	    	//console.log(od);
	  	});
	  	if(cableArea==0){
	  		alert('請檢查電纜清單數量');
	  		return false;
	  	}
	  	var ur150=Math.round(cableArea/tray150*100),ur300=Math.round(cableArea/tray300*100),ur600=Math.round(cableArea/tray600*100);
	  	ur150<=65&&ur150>60?$('.progress-bar:eq(0)').addClass('bg-warning'):$('.progress-bar:eq(0)').removeClass('bg-warning');
	  	ur300<=70&&ur300>60?$('.progress-bar:eq(1)').addClass('bg-warning'):$('.progress-bar:eq(1)').removeClass('bg-warning');
	  	ur600<=75&&ur600>60?$('.progress-bar:eq(2)').addClass('bg-warning'):$('.progress-bar:eq(2)').removeClass('bg-warning');

	  	ur150>65?$('.progress-bar:eq(0)').addClass('bg-danger'):$('.progress-bar:eq(0)').removeClass('bg-danger');
	  	ur300>70?$('.progress-bar:eq(1)').addClass('bg-danger'):$('.progress-bar:eq(1)').removeClass('bg-danger');
	  	ur600>75?$('.progress-bar:eq(2)').addClass('bg-danger'):$('.progress-bar:eq(2)').removeClass('bg-danger');
	  	$('.progress-bar:eq(0)').width(ur150+'%').text(ur150+'%');
	  	$('.progress-bar:eq(1)').width(ur300+'%').text(ur300+'%');
	  	$('.progress-bar:eq(2)').width(ur600+'%').text(ur600+'%');
	});

	$('body').on('click',"#tbl1 button",function(){
		$(this).parents('tr').remove();
	});
		
});

function getCableSpec(cableData){
	$("#sel2").html('');
	var str='';
	odArr=[];
    $.each(cableData, function(i, data){
    	str=str+'<option>'+data.rating+' '+data.core+'-'+data.size+'</option>';	
    	odArr.push(data.od);			        
    });
    $("#sel2").append(str);
}
