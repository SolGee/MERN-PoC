import React, { Component } from 'react';

class App extends Component {
    
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            //Aqui se guardan las tareas 
            tasks: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    //CREATE - POST
    addTask(e){
        fetch('./api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            window.M.toast({html: 'Task Saved'});
            //Limpiar el formulario
            this.setState({title: '', description: ''})
            //Imprime las tareas al momento después de enviarla al servidor 
            this.fetchTask();
        })
        .catch(err => console.error(err));
        e.preventDefault();
        
    }

    componentDidMount(){
       this.fetchTask(); 
    }   
    
    //READ - GET
    fetchTask(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            console.log('soy data',data);
            //Aquí indicas que se le reasignara a tasks como valor
            this.setState({tasks: data});
            console.log('soy tasks', this.state.tasks);
        })
        .catch(err => console.error(err));
    }

    //DELETE

    deleteTask(id){
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.M.toast({html: 'Task Deleted'});
            this.fetchTask();
        })

    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
        <React.Fragment>
        <header>
            <nav className="light-purple darken-4">
                <h1 className="container">
                    <a className="brand-logo" href="/">MERN Stack</a>
                </h1>
            </nav>
        </header>
        <main className="container">
            <section className="row">
                <article className="col s5">
                    <div className="card">
                        <div className="card-content">
                            <form onSubmit={this.addTask}>
                                <div className="row">
                                    <label className="input-field col s12">
                                        <input name="title" onChange={this.handleChange} type="text" placeholder="Task title" value={this.state.title}/>
                                    </label>
                                </div>
                                <div className="row">
                                    <label className="input-field col s12">
                                        <textarea name="description" onChange={this.handleChange} className="materialize-textarea" type="text" placeholder="Task Description" value={this.state.description}></textarea>
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-light darken-4">
                                    Send
                                </button>

                            </form>
                        </div>
                    </div>
                </article>
                <article className="col s7">
                    <table>
                        <thead>
                            <tr>
                                <th>Title:</th>
                                <th>Description:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {
                                    this.state.tasks.map(task => {
                                        return(
                                           <tr key={task._id}>
                                               <td>{task.title}</td>
                                               <td>{task.description}</td>
                                               <td>
                                                   <button className="btn btn-light darken-4">
                                                        <i className="material-icons">edit</i>
                                                   </button>
                                                   <button className="btn btn-light darken-4" style={{margin: '4px'}} onClick={() => {this.deleteTask(task._id)}}>
                                                        <i className="material-icons">delete</i>
                                                   </button>
                                               </td>
                                           </tr> 
                                        )
                                    })
                                }
                            </tr>
                        </tbody>
                    </table>
                </article>

            </section>
        </main>
        </React.Fragment>
        );
    }
}

export default App;