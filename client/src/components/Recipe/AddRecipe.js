import React from 'react';

class  AddRecipe extends React.Component {


  state = {
    name: "",
    instructions: "",
    category: 'Breakfast',
    description: "",
    username:""
  };

  componentDidMount(){
    console.log(this.props)
  }
  handleChange = event=>{
    const { name, value } = event.target;
    this.setState({
      [name]:value
    });
  }
  render(){
    const { name, category, description, instructions} = this.state
    return (
    <div className="App">
      <h2 className="App">ADD Recipe</h2>
      <form className="form">
        <input type="text" name="name" placeholder="Recipe name" 
          value={ name }onChange={this.handleChange} />
        <select name="category" value={ category } onChange={this.handleChange}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
        </select>
        <input type="text" name="description" placeholder="Add Description"
          value={description} onChange={this.handleChange} />
        <textarea name="instructions" placeholder="Add instructions"
          value={instructions} onChange={this.handleChange} />
        <button type="submit" className="button-primary">Submit</button>
      </form>
    </div>
    )
  }
};

export default AddRecipe;