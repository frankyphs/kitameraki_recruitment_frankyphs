import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <div className="sidebar-container">
          <h2>My Task Management</h2>
          <button>My Tasks</button>
          <button>Add Tasks</button>
        </div>
        <div className="feature-container">
          <h1>List of My Tasks</h1>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Task Name</th>
                  <th>Task Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Makan</td>
                  <td>Makan burger di mcd</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Tidur</td>
                  <td>Tidur siang di rumah</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
