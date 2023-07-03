// class CustomErros {


//     constructor(){
//         this.alid = {};  // ici le constructor permet de lancer les fonction ou les intruction misent a ce niveau lors de l estanciation 

//     }
//     recordErros(erros){
//         this.alid =erros; // this fait reference a chque estanciation en bas ;le recordErros(erros) permet a this.alid d avoir la valeur erros (parametre)
//     }

//     getErrors(){
//         // console.log(this.erros); // permet de recuperer la valeur de l objet ou de l element 
//         return this.alid;
//     }
// }

// const boum = new CustomErros(); // ici c est l estanciation 
// const patBoum = new CustomErros(); // ici c est l estanciation 
// console.log(boum);
// console.log(patBoum);
// boum.recordErros( )

// // const errors = {
// //     error : "invalidField"
// // , message : 'Le champ n est pas valide '}

document.addEventListener('DOMContentLoaded',function () {

    
    
    class Request {
        constructor() {
            this.input = input;
        }
        
        
        getInputs(){
            let request = new Request();
            console.log(this.input); 
        }
    }
    
})