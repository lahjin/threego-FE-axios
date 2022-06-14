
let lat, lng;

export const setLocation = (l, n) =>{
    lat = l;
    lng = n;
    console.log(lat , + " " + lng)
}

export const getLocation = () =>{
    return {lat, lng};
}