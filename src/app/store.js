import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import collectReducer from '../features/collect/collectSlice'
import userReducer from '../features/user/userSlice'
import messageReducer from '../features/message/messageSlice'
import collectPointReducer from '../features/collectPoint/collectPointSlice'
import wasteReducer from '../features/waste/wasteSlice'
import plasticTypeReducer from '../features/plasticType/plasticTypeSlice'
import certificatReducer from '../features/certificat/certificatSlice'
import orderReducer from '../features/order/orderSlice'
import productCategoryReducer from '../features/productCategory/productCategorySlice'
import productReducer from '../features/product/productSlice'
import serviceReducer from '../features/initiation/inititationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collect: collectReducer,
    user: userReducer,
    message: messageReducer,
    collectPoint: collectPointReducer,
    waste: wasteReducer,
    certificat: certificatReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    order: orderReducer,
    service: serviceReducer,
    plasticType: plasticTypeReducer,
  },
})
