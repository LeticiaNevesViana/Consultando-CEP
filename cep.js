
$(function () {

    var onlyNumbers = function (e) {

        var v = this.value.replace(/\D/g, "");
        this.value = v.replace(/^(\d{5})(\d)/, "$1-$2");

    }
    var validateEntry = function () {

        var cep = this.value;
        if (cep.length === 9) {
            getAddress(cep);
            $(this).removeClass("error");

        } else {
            $(this).addClass("error").focus();
        }
    }
    var getAddress = function (cep) {
        
        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            dataType: "json",
            error: getAddressError,
            success: getAddressSuccess

        });
    }
    var getAddressError = function () { debugger };

    var getAddressSuccess = function (address) {
        
        var { logradouro, bairro, localidade, uf } = address;
        $("#logradouro").val(logradouro);
        $("#bairro").val(bairro);
        $("#localidade").val(localidade);
        $("#uf").val(uf);
    };
    
    $("#cep").on("input", onlyNumbers)
        .on("focusout", validateEntry);
});

