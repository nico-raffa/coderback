import { faker } from '@faker-js/faker'

export const showTest = async (req, res) => {
  function generateFakeProds(){
    const products = []
    let cant = 5
    for (let i = 0; i < cant; i++) {
      let product = {}
      
        product.name= faker.commerce.productName(),
        product.price= faker.commerce.price(),
        product.description= faker.commerce.productAdjective(),
        product.thumbnail= faker.image.imageUrl(),
        product.codebar= faker.datatype.number(100)
        products.push(product)
    }
    return products
}
const fakeProds = generateFakeProds()
    
    res.render('fakeprods',{
      fakeProds
    })
  }