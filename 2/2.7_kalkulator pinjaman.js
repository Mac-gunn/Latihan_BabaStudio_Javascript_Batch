document.getElementById('form-pinjaman').addEventListener('submit', kalkulatorPinjaman);

function kalkulatorPinjaman(e){
    const Amount        = document.getElementById('Amount');
    const Interest      = document.getElementById('Interest');
    const Years         = document.getElementById('Years');
    const payment       = document.getElementById('payment');
    const totalPayment  = document.getElementById('total_payment');
    const totalInterest = document.getElementById('total_interest');

    const pinjaman      = parseFloat(Amount.value);
    const bunga         = parseFloat(Interest.value) /100 /12;
    const hitungJumlah = parseFloat(Years.value) * 12 ;

    const x             = Math.pow(1+bunga, hitungJumlah);

    const bayarBulan    = (pinjaman * x * bunga)/(x-1);

    if(isFinite(bayarBulan)){
        payment.value         = bayarBulan.toFixed(2);
        totalPayment.value    = (bayarBulan*hitungJumlah).toFixed(2);
        totalInterest.value   = ((bayarBulan * hitungJumlah)-pinjaman).toFixed(2);
    }else{
        showError('mohon isi data dengan benar');
    }

    e.preventDefault();

}