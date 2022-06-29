import React, { Component } from 'react';
import axios from 'axios';
const { faker } = require('@faker-js/faker');

class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      stories: [] 
    };
    this.deleteStory = this.deleteStory.bind(this);
    this.createStory = this.createStory.bind(this);
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
    await axios.delete(`/api/stories/${story.id}`);
    let response = await axios.get(`/api/users/${story.userId}/stories`);
    this.setState({ stories: response.data });
  }
  async createStory( userId ) {
    const story = {
      title: faker.random.words(5),
      body: faker.lorem.paragraphs(5),
      favorite: faker.datatype.boolean(),
      userId: userId
    }
    console.log(story);
    await axios.post(`/api/stories`, story);
    let response = await axios.get(`/api/users/${userId}/stories`);
    this.setState({ stories: response.data });
  }
  render(){
    const { user, stories } = this.state;
    const { deleteStory, createStory } = this;
    return (
      <div>
        Details for { user.name }
        <button onClick={() => createStory(user.id) }>Create A Story</button>
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
