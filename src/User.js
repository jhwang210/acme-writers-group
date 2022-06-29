import React, { Component } from 'react';
import axios from 'axios';

class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      stories: [] 
    };
  }
  async componentDidMount(){
    let response = await axios.get(`/api/users/${this.props.userId}`);
    this.setState({ user: response.data });
    response = await axios.get(`/api/users/${this.props.userId}/stories`);
    this.setState({ stories: response.data });

  }
  async componentDidUpdate(prevProps){
    if(prevProps.userId !== this.props.userId){
      let response = await axios.get(`/api/users/${this.props.userId}`);
      this.setState({ user: response.data });
      response = await axios.get(`/api/users/${this.props.userId}/stories`);
      this.setState({ stories: response.data });    
    }
  }
  async deleteStory( story ) {
    console.log(story);
    await axios.delete(`/api/stories/${story.id}`);
    const stories = this.state.stories.filter(_story => _story.id !== story.id );
    this.setState({ stories });
  }
  render(){
    const { user, stories } = this.state;
    const { deleteStory } = this;
    return (
      <div>
        Details for { user.name }
        <p>
          { user.bio }
        </p>
        <ul>
          {
            stories.map( story => {
              return (
                <li key={ story.id }>
                  { story.title }
                  <button onClick={() => deleteStory(story) }>Delete Story</button>
                  <p>
                  { story.body }
                  </p>
                </li>

              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default User;
