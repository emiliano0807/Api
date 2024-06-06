const url='http://localhost:3000';
const url2='https://api-topicos-kra1.onrender.com/';
async function fetchUsuarios() {
    const response = await fetch(url2);
    const usuario = await response.json();
    const listaRegistros = document.getElementById('listaRegistros');
    listaRegistros.innerHTML = '';

    usuario.forEach(usuarios => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${usuarios.ID}: ${usuarios.Nombre}`;
        
        //Boton eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.addEventListener('click', async () => {
            try {
                const response = await fetch(url2, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ID: usuarios.ID })
                });
                if (response.ok) {
                    alert('Usuario eliminado');
                    li.remove();
                } else {
                    const errorData = await response.json();
                    alert('Error al eliminar el usuario: ' + errorData.message);
                }
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                alert('Error al eliminar el usuario');
            }
        });
        li.appendChild(deleteBtn);
        listaRegistros.appendChild(li);

        // Botón editar
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.className = 'btn btn-warning btn-sm';
        editBtn.addEventListener('click', async () => {
        const newName = prompt('Nuevo nombre:', usuarios.Nombre);
            if (newName && newName !== usuarios.Nombre) {
                try {
                    const response = await fetch(url2, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ID: usuarios.ID, Nombre: newName })
                    });
                        if (response.ok) {
                            alert('Usuario editado');
                            li.textContent = `${usuarios.ID}: ${newName}`;
                            li.appendChild(deleteBtn);
                            li.appendChild(editBtn);
                            //li.appendChild(editTextBtn);
                        } else {
                            const errorData = await response.json();
                            alert('Error al editar el usuario: ' + errorData.message);
                        }
                } catch (error) {
                        console.error('Error al editar el usuario:', error);
                        alert('Error al editar el usuario');
                }
            }
        });
        li.appendChild(editBtn);

        // Botón editar texto
        const editTextBtn = document.createElement('button');
        editTextBtn.textContent = 'Editar Texto';
        editTextBtn.className = 'btn btn-info btn-sm';
        editTextBtn.addEventListener('click', () => {
        const newText = prompt('Nuevo texto:', li.textContent);
            if (newText) {
                li.textContent = newText;
                li.appendChild(deleteBtn);
                li.appendChild(editBtn);
                //li.appendChild(editTextBtn);
            }
        });
        //li.appendChild(editTextBtn);

        listaRegistros.appendChild(li);
        });
}
//Agregar usuarios
document.getElementById('agregarBtn').addEventListener('click', async () => {
    const Nombre = document.getElementById('nombre').value;
    const response = await fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Nombre })
    });
    const result = await response.json();
    if (response.ok) {
        Swal.fire({
            icon: "success",
            title: "Usuario Agregado",
            text:"se agrego a la base de datos",
            showConfirmButton: true,
            cancelButtonText: "No permitir",
            cancelButtonColor:"#FF6663",
            confirmButtonText:"Enterado",
            theme:"dark"
        });
        document.getElementById('id').value = '';
        document.getElementById('nombre').value = '';
        fetchUsuarios();
    } else {
        alert('Error al agregar el usuario: ' + result.message);
    }
});
document.getElementById('verUsuariosBtn').addEventListener('click', fetchUsuarios);
