import React, { Component } from 'react';

class App extends Component {
    
    constructor(){
        super();
        this.state = {
            title: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

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
            this.setState({title: '', description: ''})
        })
        .catch(err => console.error(err));
        e.preventDefault();
        
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
                    
                </article>

            </section>
        </main>
        </React.Fragment>
        );
    }
}

export default App;