//jQuery wrupper
//ou $();
jQuery(function () {
    //actions
    var onlyNumbers = function (e) {
        //console.log(e.target.value); o e na função só é necessario se eu utilizar esta chamada para 
        //a chamada abaixo não é necessario
        var v = this.value.replace(/\D/g, "");
        this.value = v.replace(/^(\d{5})(\d)/, "$1-$2");

    }
    var validateEntry = function () {
        //debugger;
        var cep = this.value;
        if (cep.length === 9) {
            getAddress(cep);
            $(this).removeClass("error");

        } else {
            $(this).addClass("error").focus();
        }
    }


    var getAddress = function (cep) {
        console.log(cep);
        $.ajax({
            url:`https://viacep.com.br/ws/${cep}/json/`,
            dataType:"json",
            error: getAddressError,
            success: getAddressSuccess

        });
    }
    var getAddressError= function(){debugger};

    var getAddressSuccess=function(address){
        console.log(address);
        
        var{logradouro,bairro,localidade,uf} = address;//detructuring object es6
        $("#logradouro",).val(logradouro);
        $("#bairro").val(bairro);
        $("#localidade") .val(localidade);
        $("#uf").val(uf);
    };

    //events
    $("#cep").on("input", onlyNumbers)
        .on("focusout", validateEntry);


});

