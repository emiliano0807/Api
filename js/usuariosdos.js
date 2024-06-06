const url='http://localhost:3000';
const url2='https://api-topicos-kra1.onrender.com/';
async function fetchUsers() {
    try {
        const response = await fetch(url);
        const users = await response.json();
        const usersDiv = document.getElementById('listaRegistros');
        usersDiv.innerHTML = ''; // Limpiar el contenido anterior

        users.forEach(usuarios => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user';
            userDiv.innerHTML = `
                <span id="user-${usuarios.ID}">${usuarios.ID}: ${usuarios.Nombre}</span>
                <button onclick="deleteUser(${usuarios.ID})">Eliminar</button>
                <button onclick="showEditUser(${usuarios.ID}, '${usuarios.Nombre}')">Editar</button>
            `;
            usersDiv.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}

async function addUser() {
    const nombre = document.getElementById('nombre').value;
    if (!nombre) return alert('Por favor ingrese un nombre');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Nombre })
        });
        if (response.ok) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario agregado con éxito",
                showConfirmButton: false,
                timer: 1500
            });
            fetchUsers();
            document.getElementById('nombre').value = ''; // Limpiar el campo de entrada
        } else {
            console.error('Error al agregar el usuario:', response.statusText);
        }
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
    }
}

async function deleteUser(ID) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ID })
        });
        if (response.ok) {
            fetchUsers();
        } else {
            console.error('Error al eliminar el usuario:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
}

function showEditUser(ID, currentName) {
    const newName = prompt('Ingrese el nuevo nombre:', currentName);
    if (newName && newName !== currentName) {
        editUser(ID, newName);
    }
}

async function editUser(ID, Nombre) {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ID, Nombre })
        });
        if (response.ok) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario editado con éxito",
                showConfirmButton: false,
                timer: 1500
            });
            fetchUsers();
        } else {
            console.error('Error al editar el usuario:', response.statusText);
        }
    } catch (error) {
        console.error('Error al editar el usuario:', error);
    }
}

// Inicializar la lista de usuarios al cargar la página
fetchUsers();

