$(document).ready(()=>{
    $('.sidenav').sidenav();
    
    $('.popular-mer .card').click((e)=>{
        let merchantId = e.currentTarget.getAttribute('value');
        console.log(e.currentTarget);
        this.location.href = '/merchant?merchantId='+merchantId;
    });
});