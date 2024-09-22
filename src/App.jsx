
import './App.css';
import { HiMenu } from "react-icons/hi";
import { useState } from 'react';

function App() {

  const [isSidebarOpen, setisSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setisSidebarOpen(!isSidebarOpen)
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="div-header">
          <HiMenu className='icon-navbar' onClick={toggleSidebar} />
          <h1 className='logo-navbar'>VIEW NAME</h1>
        </div>
      </header>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <nav className='nav-sidebar'>
          <div>
            <ul className='lista-navbar'>
              <li className='li-sidebar'><a href="#seccion1" className='text-lista'>Home</a></li>
              <li className='li-sidebar'><a href="#seccion2" className='text-lista'>My Stories</a></li>
              <li className='li-sidebar'><a href="#seccion3" className='text-lista'>Settings</a></li>
              <li className='li-sidebar'><a href="#seccion3" className='text-lista'>My Proyects</a></li>
            </ul>
          </div>
          <div className='div-user'>
            <li className='lista-navbar'><a href="#seccion3" className='li-sidebar'>User Profile Link</a></li>
          </div>
        </nav>
      </aside>

      <main className="App-content">
        <section>
          <h2>Sección 1</h2>
          <p>Este es el contenido de la sección 1. Haz scroll para ver más contenido.</p>
        </section>
        <section>
          <h2>Sección 2</h2>
          <p>Este es el contenido de la sección 2. Aquí también puedes hacer scroll.</p>
        </section>
        <section>
          <h2>Sección 3</h2>
          <p>Este es el contenido de la sección 3. ¡Sigue haciendo scroll!</p>
        </section>
        <section>
          <h2>Sección 4</h2>
          <p>Este es el contenido de la sección 3. ¡Sigue haciendo scroll!</p>
        </section>    <section>
          <h2>Sección 5</h2>
          <p>Este es el contenido de la sección 3. ¡Sigue haciendo scroll!</p>
        </section>    <section>
          <h2>Sección 6</h2>
          <p>Este es el contenido de la sección 3. ¡Sigue haciendo scroll!</p>
        </section>    <section>
          <h2>Sección 7</h2>
          <p>Este es el contenido de la sección 3. ¡Sigue haciendo scroll!</p>
        </section>    <section>
          <h2>Sección 8</h2>
          <p>Este es el contenido de la sección 3. ¡Sigue haciendo scroll!</p>
        </section>    <section>
          <h2>Sección 9</h2>
          <p>Este es el contenido de la sección 3. ¡Sigue haciendo scroll!</p>
        </section>    <section>
          <h2>Sección 10</h2>
          <p>Este es el contenido de la sección 3. ¡Sigue haciendo scroll!</p>
        </section>
      </main>
    </div>

  );

}


export default App;
