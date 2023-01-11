import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

//--------- Redux Toolkit ---------------
// import usersReducer from "./user/user.reducer";

//--------------- Redux ------------------
export const rootReducer = combineReducers({
	user: userReducer,
	categories: categoriesReducer,
	cart: cartReducer,
});

//---------- Redux Toolkit ----------------
// export const rootReducers = combineReducers({
// 	users: usersReducer,
// 	categories: categoriesReducer,
// 	cart: cartReducer,
// });
