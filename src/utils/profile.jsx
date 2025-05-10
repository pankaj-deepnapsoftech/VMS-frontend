// let name ="Dinki Kaur";
export function getInitials(fullName){
    return fullName.split(" ").filter(Boolean).map((item)=>item[0].toUpperCase()).join('')
}