import { Product } from "../models/Product";


export enum ShopActionType {
  ADD = 'add',
  REMOVE = 'remove',
  UPDATE = 'update',
  UPDATE_PRODUCT = "updateProduct"
}
  
  export type ShopAction = {
    type: ShopActionType;
    payload: any;
  };
  
  export const add = (product: Product): ShopAction => ({
    type: ShopActionType.ADD,
    payload: product,
  });
  
  export const remove = (product: Product): ShopAction => ({
    type: ShopActionType.REMOVE,
    payload: product,
  });

  export const update = (total: number): ShopAction => ({
    type: ShopActionType.UPDATE,
    payload: total,
  });

  export const updateProduct = (product: Product): ShopAction => ({
    type: ShopActionType.UPDATE_PRODUCT,
    payload: product,
  });