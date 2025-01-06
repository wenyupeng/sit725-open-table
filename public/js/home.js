$(document).ready(()=>{
    $('.popular-res .card').click((e)=>{
        let restaurantId = e.currentTarget.getAttribute('value');
        console.log(e.currentTarget);
        this.location.href = '/restaurant?restaurantId='+restaurantId;
    });
});