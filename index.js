const fs = require("fs");

const writeFile = (path, products) =>
    fs.promises.writeFile(path, JSON.stringify({products}));

const readFile = async(path) => {
    const asyncGetProducts = await fs.promises.readFile(path);
    const parseResult = JSON.parse(asyncGetProducts);
    return parseResult;
}

class ProductManager{
    constructor(path) {
        this.product = [];
        this.path = path;
    }

    initialize = async() => {
        const existFile = fs.existsSync(this.path);
        if(existFile){
            console.log("Archivo Existente");
            const {products} = await readFile(this.path);
            this.products = products;
        }else{
            await writeFile(this.path, this.products);
        }
    }

    getProducts = async() => {
        const fileData = await readFile(this.path);
        return fileData;
    }

    addProduct = async({title, description, price, thumbnail, code, stock}) => {
        const existCode = this.products.find((product) => product.code === code);
        if(existCode){
            console.log("Codigo Existente");
        }else{
            const id = this.product.length + 1;
            this.products.push({
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            })
            await writeFile(this.path, this.products);
            console.log("El producto se creó correctamente");
        }
    };

    getProductById = (id) => {
		const existCode = this.products.find(
			(product) => product.id === id
		);
		if(existCode) {
			return existCode;
		}else {
			console.log("ERROR");
			return null;
		}
	};


    updateProduct = async(id, newProduct) => {
        const existCodeIndex = this.products.findIndex(
			(product) => product.id === id
		);
        if(existCodeIndex != -1){
            const id = this.products[existCodeIndex].id;
            this.products[existCodeIndex] = {
                id,
                ...newProduct,
            };
            await writeFile(this.path, this.products);
            console.log("Se actualizo correctamente");
        }else{
            console.log("No existe producto con ese ID");
        }
    };

    deleteProduct = async(id) => {
        const existCodeIndex = this.products.findIndex(
			(product) => product.id === id
		);
        if(existCodeIndex != -1){
            const newProduct = this.products.filter(product => product.id !== id);
            await writeFile(this.path, newProduct);
            console.log("El producto se eliminó correctamente");
        }else{
            console.log("No existe producto con ese ID")
        }
    };
}

async function main() {
    const productManager = new ProductManager("./data.json");
    await productManager.initialize();
    let products = await productManager.getProducts();
    console.log(products);

    const newProduct = {
        title: "Nombre de Producto",
        description: "Descripción de Producto",
        price: "666",
        thumbnail: "no picture",
        code: "code1312",
        stock: "13",
    };

    await productManager.addProduct(newProduct);

    // const productUpdate = {
    //     title: "Nombre de Producto Actualizado",
    //     description: "Descripción de Producto Actualizada",
    //     price: "69",
    //     thumbnail: "no picture",
    //     code: "code6669",
    //     stock: "13",
    // };

    //await productManager.updateProduct(1, productUpdate);
    // await productManager.deleteProduct(1);
    // products.getProductById(1);
    products = await productManager.getProducts();
    // console.log(ProductManager.getProductById(1))
    console.log(products);
}

main();