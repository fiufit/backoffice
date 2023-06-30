<p align="center">
  <img alt="App" src="https://github.com/fiufit/app/assets/86434696/82a49b69-d7bd-4f7d-9449-79b8b60335b1" height="200" />
</p>

# FiuFit: BackOffice

**Enlaces de utilidad**

[Entorno de desarrollo](https://web-danielovera.cloud.okteto.net/)

**Para levantar el repositorio de forma local, ejecutar los siguientes comandos:**

1. Clonar el proyecto
    ```
   git clone https://github.com/fiufit/backoffice.git
    ```
3. Instalación de dependencias:
   ```
   npm install
   ```
5. Correr el proyecto
   ```
   npm run dev
   ```

**Para visualizar el repositorio localmente:**

1. Levantar el repositorio
2. Abrir un navegador web
3. Colocar la url ```localhost:3000``` en el buscador

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
