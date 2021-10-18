API Requirements
-------------------
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. I built the API that will support this application for its backend.

These are the descriptions that describe what endpoints the API needs to supply, as well as data shapes, schema the frontend and backend have agreed meet the requirements of the application.

API Endpoints
----------------------------
**Products:** <br>

GET	/products	Index	<br>
GET	/products/:id	Show<br>
POST	/products	Create [token required] <br>
PUT	/products/:id	Update [token required]	<br>
DELETE	/products/:id	Remove [token required]	<br>
<Br>
  <Br>
**Users:**
    <br>
POST-	/verify/users	Index [token required]	<br>
POST-	/verify/users/:id	Show [token required]	<br>
POST-	/users	Create <br>
PUT-	/users/:id	Update [verify token user ID required] <br>
DELETE-	/users/:id	Deletes [verify token user ID required]<br>
POST-	/users/authenticate	Authenticate	<br>
    <br>
**Orders:**
<br>
GET-	/orders	Index <br>
GET-	/orders/:id	Show <br>
POST-	/orders	Create	<br>
PUT-	/orders/:id	Update <br>
DELETE-	/orders/:id	Deletes	<br>
POST-	/orders/:id/products	Add product <br>
<br>
    
Data Shapes and Schema
--------------------------
**Products** <br>
(id SERIAL PRIMARY KEY, title VARCHAR(100), description VARCHAR(250), price NUMERIC(5,2));<br>
    
 **Orders**   
(id SERIAL PRIMARY KEY, order_status VARCHAR(100), user_id bigint REFERENCES users(id) ON DELETE CASCADE); <br>
    
**Users** <br>
(id SERIAL PRIMARY KEY, username VARCHAR(100), password VARCHAR(100)); <br>
    
**Products Ordered**<Br>
products_ordered (id SERIAL PRIMARY KEY, order_id bigint REFERENCES orders(id) ON DELETE CASCADE, product_id bigint REFERENCES products(id) ON DELETE RESTRICT, quantity integer)
