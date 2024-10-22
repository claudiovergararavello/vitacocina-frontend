# VitaCocina
Portal web donde los usuarios podrán explorar una amplia variedad de recetas saludables y consejos culinarios adaptados a diferentes dietas y niveles de habilidad en la cocina. De esta manera se estará ayudando a los usuarios a perfeccionar sus habilidades y a comprender mejor los beneficios de los ingredientes que utilizan. Contamos con una versión pre-productiva para su revisión en el siguiente enlace [VitaCocina](http://vitacocina-webpage.s3-website-sa-east-1.amazonaws.com/).

# Última modificación
Este proyecto comenzó con la idea de utilizar ReactJS para el frontend, NodeJS para el backend y DynamoDB como base de datos. Sin embargo, a lo largo del desarrollo, se decidió optimizar la arquitectura combinando varias tecnologías de AWS. Para el backend, se reemplazó NodeJS con funciones Lambda integradas con API Gateway. Este cambio no solo incrementó la eficiencia en la gestión de las actualizaciones del backend, sino que también permitió una mayor unificación y simplificación de la lógica de negocio, aprovechando al máximo la escalabilidad y flexibilidad de los servicios serverless de AWS.

# Integrantes
Esteban Carrasco \
Rodrigo Vera \
Claudio Vergara 

# Instalación
Instrucciones paso a paso para instalar y ejecutar el proyecto en el entorno local.

### `npm install`
Instalación de librerías

### `npm start`
Ejecutar app en modo development.\
Abre [http://localhost:3000](http://localhost:3000) para mirar la app en tu navegador.

### `npm test`
Inicia el ejecutor de pruebas en el modo de vigilancia interactiva.\
Véase la sección sobre [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`
Construye la app para producción en el carpeta `build`.\
Agrupa correctamente los paquetes React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

