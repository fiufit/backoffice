<p align="center">
  <img alt="App" src="https://firebasestorage.googleapis.com/v0/b/fiufit.appspot.com/o/fiufit-logo.png?alt=media&token=39f3ae3f-34d1-4fb3-96ca-8707adf2bc37" height="200" />
</p>

# FiuFit: BackOffice

[Entorno de desarrollo](https://web-danielovera.cloud.okteto.net/)

**Para levantar el repositorio de forma local, ejecutar los siguientes comandos:**

1. Clonar el proyecto
    `git clone https://github.com/fiufit/backoffice.git`
2. Instalación de dependencias:
   `npm install`
3. Correr el proyecto
   `npm run dev`

**Para visualizar el repositorio localmente:**

1. Levantar el repositorio
2. Abrir un navegador web
3. Colocar la url `localhost:3000` en el buscador

## Funcionalidades del sistema

### Administradores

- [x] Login de administradores
- [x] Registro de administradores

### Usuarios

- [x] Listar usuarios del sistema
- [x] Visualizar perfil del usuario
- [x] Bloquear usuario
- [ ] Listar transacciones
- [ ] Cargar Saldo

### Contenidos

- [x] Listado de entrenamientos
- [x] Visualizacion de plan de entrenamiento
- [x] Bloqueo de plan de entrenamiento
- [x] Aprobar solicitud de entrenador reconocido

### Servicios

- [ ] Listado de servicios
- [ ] Visualizacion de servicios
- [ ] Alta de servicio
- [ ] Baja de servicio
- [ ] Bloqueo de servicio

### Metricas

- [x] Métricas de usuarios

1. Métricas de nuevos usuarios utilizando mail y contraseña
2. Métricas de nuevos usuarios utilizando identidad federada
3. Métricas de login de usuarios utilizando mail y contraseña
4. Métricas de login de usuarios utilizando identidad federada
5. Métricas de usuarios bloqueados
6. Métricas de recupero de contraseña
7. Métricas de usuarios por zona geográfica

- [x] Métricas de contenido

1. Métricas de nuevos entrenamientos
2. Métricas de entrenamientos por tipo
3. Métricas de usuarios
4. Métricas de contenidos por usuario

- [ ] Métricas de transacciones

1. Métricas de aportes
