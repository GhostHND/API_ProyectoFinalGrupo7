import { getConnection as getMongoDBConn } from '@models/mongodb/MongoDBConn';
import { ProductoDao as ProductosMongoDbDao } from '@models/mongodb/ProductoDao';
export interface IProducto {
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: number;
  stock: number;
  date: Date;
}
export class Producto {
  private dao: ProductosMongoDbDao;
  public constructor() {
    const getConnection = getMongoDBConn;
    const ProductosDao = ProductosMongoDbDao;
    getConnection()
      .then((conn) => {
        this.dao = new ProductosDao(conn);
      })
      .catch((ex) => console.error(ex));
  }
  // Consultas
  public getAllProductos() {
    return this.dao.getProductos();
  }
  public getAllProductosFromUser(id: string) {
    return this.dao.getProductosByUser(id);
  }
  public getProductoPaged(page: number, items: number) {
    return this.dao.getProductosPaged(page, items);
  }
  public getProductoByUserPaged(userId: string, page: number, items: number) {
    return this.dao.getProductosByUserPaged(userId, page, items);
  }
  public getProductoByIndex(index: string) {
    return this.dao.getProductosById(index);
  }

  public getCountProducto(userId: string) {
    return this.dao.getCountProductos(userId);
  }

  public getTypeSumarry(userId: string) {
    return this.dao.getTypeSumarry(userId);
  }

  public addProducto(producto: IProducto, userId: string) {
    const { imagen,precio, nombre, date, stock, descripcion } = producto;
    return this.dao.insertNewProducto(
      {
        nombre,
        descripcion,
        precio,
        imagen,
        stock: Number(stock),
        date: new Date(date),
      }, 
      userId,
    );
  }
  public updateProducto(index: number | string, producto: IProducto) {
    return (this.dao as ProductosMongoDbDao).updateProducto({
      ...producto,
      _id: index,
    });
  }
  public deleteProducto(index: string) {
    return this.dao.deleteProducto({ _id: index });
  }
}
