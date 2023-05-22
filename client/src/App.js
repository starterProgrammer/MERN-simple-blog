import './App.css';

import { useEffect, useState } from 'react'

const BASE_URL = "http://localhost:3001/"
function App() {

  const [animals, setAnimals] = useState([])


  const [showAddForm, setShowAddForm] = useState(false)
  // Update
  const [showForm, setShowForm] = useState(false)
  const [newAnimal, setNewAnimal] = useState({ name: '', image: '', _id: '', type: '' })

  useEffect(() => {
    fetchAnimals()
  }, [])

  // Fetch Animals
  const fetchAnimals = () => {
    fetch(BASE_URL + 'animals').then((res) => res.json()).then((data) => { setAnimals(data); console.log(data); })
  }

  // Edit Animal Details
  const handelGetAnAnimalWithId = async (_id) => {
    const updatingAnimal = await fetch(BASE_URL + 'animal/get', {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        _id: _id
      })
    }).then(res => res.json())
    console.log(updatingAnimal)
    setNewAnimal(updatingAnimal)
    setShowForm(!showForm)
  }


  // Update animal 
  // Image should ::: https://bobbyhadz.com/images/global/book-cover.webp
  const handelUpdateAnimal = async (event) => {
    event.preventDefault()
    console.log(newAnimal)

    const updatedAnimal = await fetch(BASE_URL + 'animal/update', {
      method: "PUT",
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify({
        _id: newAnimal._id,
        name: newAnimal.name,
        image: newAnimal.image,
        type: newAnimal.type,
      })
    }).then(res => res.json())

    setAnimals(animals => animals.map(animal => {
      if (animal._id === updatedAnimal._id) {
        animal = updatedAnimal
      }

      return animal;
    }))

    setShowForm(!showForm)
    setNewAnimal({ name: '', image: '', _id: '', type: '' })
  }

  const handelAddAnimal = async (event) => {
    event.preventDefault()


    const addedAnimal = await fetch(BASE_URL + 'animal/new', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: newAnimal.name,
        image: newAnimal.image,
        type: newAnimal.type,
      })
    }).then(res => res.json())

    setAnimals([...animals, addedAnimal])
    setShowAddForm(!showAddForm)
    setNewAnimal({ name: '', image: '', _id: '', type: '' })

  }
  // Update NewAnimal With New Form Content
  const handelChange = (event) => {
    setNewAnimal({ ...newAnimal, [event.target.name]: event.target.value })
  }


  // Delete Animal 
  const handleDeleteAnimal = async (_id) => {
    const deletedAnimal = await fetch(BASE_URL + 'animal/delete', {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        _id: _id
      })
    }).then((res) => res.json())
    setAnimals(animals => animals.filter((item) => item._id !== deletedAnimal._id))
  }


  return (
    <div className="animals">
      {
        animals?.length >= 1 ?
          animals.map((animal) => {
            return (
              <div key={animal._id} className='anima-card'>
                <img src={animal.image} />
                <span>{animal.name}</span>
                <span>{animal.type}</span>

                <div className='btn-wrap'>
                  <span onClick={() => handelGetAnAnimalWithId(animal._id)}>Edit</span>
                  <span onClick={() => handleDeleteAnimal(animal._id)}>Delete</span>
                </div>
              </div>)
          }) : (<h1>The list is Empty</h1>)
      }

      {
        showForm &&
        <form onSubmit={handelUpdateAnimal} className='content-form'>
          <span onClick={() => setShowForm(!showForm)}>X</span>
          <input name="name" onChange={handelChange} value={newAnimal?.name} type="text" />
          <input name="type" onChange={handelChange} value={newAnimal?.type} type="text" />
          <input name="image" onChange={handelChange} value={newAnimal?.image} type="text" />

          <input type="submit" value="Update" />
        </form>
      }


      {/* Add New Item */}
      {
        showAddForm &&
        <form onSubmit={handelAddAnimal} className='content-form'>
          <span onClick={() => setShowAddForm(!showAddForm)}>X</span>
          <input placeholder='name' name="name" onChange={handelChange} value={newAnimal.name} type="text" />
          <input placeholder='type' name="type" onChange={handelChange} value={newAnimal.type} type="text" />
          <input placeholder='image' name="image" onChange={handelChange} value={newAnimal.image} type="text" />

          <input type="submit" value="Add" />
        </form>
      }


      <spna className="float-btn" onClick={() => setShowAddForm(!showAddForm)}>Add New Post</spna>

    </div >
  );
}

export default App;
