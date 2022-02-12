class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }
    getFullName(){
        return (`Mi nombre es: ${this.nombre} ${this.apellido}`)
    }
    addMascota(nombre){
        this.mascotas.push(nombre)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre, autor){
        let libro = {
            nombre: nombre,
            autor: autor
        }
        this.libros.push(libro)
    }
    getBookNames(){
        let nombres = []
        for (let i= 0; i < this.libros.length; i++) {nombres.push(this.libros[i].nombre)}        
        return nombres
    }
}
const nico = new Usuario('Nicolás', 'Raffagnini')
nico.addMascota('perro')
nico.addMascota('gato')
nico.addBook('El señor de las moscas', 'William Golding')
nico.addBook('Fundacion', 'Isaac Asimov')
console.log(nico.countMascotas()) //devuelve la cantidad de mascotas
console.log(nico.getBookNames()) //devuelve los nombre de los libros
console.log(nico.getFullName()) //devuelve el nombre completo
