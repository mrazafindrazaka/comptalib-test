## liste des endpoints:

### pour les sociétés (POST créer, PUT modifier, GET lister, DELETE supprimer):

POST /society  
PUT /society/:id  
GET /society  
DELETE /society/:id  

### pour les utilisateurs (POST créer, PUT modifier, GET lister, DELETE supprimer):

POST /user  
PUT /user/:id  
GET /user  
DELETE /user/:id  

### pour créer une liaison (Many-To-Many):

POST /usersociety { UserId, SocietyId }

Créer, modifier ou supprimer une société ou un utilisateur aura un effet de cascade
