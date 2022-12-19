class ProductManager{
    constructor () {
        this.product = [];
    }
    
    addProduct(title, description, price, thumbnail, code, stock){
      
        if (title && description && price && thumbnail && code && stock){
               const ExistCode = this.product.map(product => product.code).includes(code) 
                if (ExistCode){
                    console.log("Codigo Existente")
                } else{
                    this.product.push({
                        id:this.product.length,
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                    })
                }
        }else {
            console.log ("Faltan Valores")
        }
    }

    getProducts(){
        console.log(this.product)
    }

    getProductById(id){
        const ProductId = this.product.map(ProductId => ProductId.id).includes(id)
        if (!ProductId){
            console.log("ERROR")
        }
    }
}

const product = new ProductManager()
product.addProduct("Nombre de Producto", "Descripción de Producto",666, "no picture","code1312",13)
product.getProducts()
product.addProduct("Nombre de Producto", "Descripción de Producto",69, "no picture","code6669",13)
product.getProducts()
product.getProductById(13)
