#TITULO
Agregado de Formularios de Registracion y Login

#BREVE DESCRIPCION

#En el presente desafio del curso de Coder House podemos ver como al proyecto de ecomerce comenzamos a implementar junto a mongoDB cookies y formularios de registracion y log out y login.  
Para el presente desafio debimos instalar las dependencias npm cookies-parser & npm login-store

#Agregamos Hasheo de contraseñas y passport register y passport login, para dichas implementaciones modificamos los siguientes las siguientes carpetas: 1- en la carpeta src agregamos los archivos passport-config y constant, 2-en el archivo de rotes modificamos el sessions.router.js, 3-dentro de DAO agregamos en mongomanager el archivo sessionmanager y en models el user.models, 4- dentro de controller se modifico el session.controller.

#Para la segunda practica integradora refactorice el codigo luego de hacer pruebas opte por seguir con el metodo session. Modificamos el archivo userModel para poder crear un carrito para los usuarios que se registren, ademas de qeu se vio mudificada la rita api/session ya que le agregamos un current para poder obtener informacion sobre el usuario que este logeado en ese momento.

#Continuamos desarrollando el proyecto y aplicamos la arquitectura por capas para crear un codigo mas prolijo y legible ademas de separar bien las responsabilidades de cada archivo y que no se superpongan.
Instalamos el dotenv y creamos la capa de service dentro de la arquitectura para los usuarios y para los productos.
