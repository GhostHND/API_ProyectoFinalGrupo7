export interface IProducto {
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: number;
  stock: number;
  date: Date;
  _id?: unknown;
  userId?: unknown;
};
