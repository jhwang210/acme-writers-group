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
    this.favorite = this.favorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
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
    await axios.post('/api/stories', story);
    let response = await axios.get(`/api/users/${userId}/stories`);
    this.setState({ stories: response.data });
  }
  async favorite( story ) {
    try {
      await axios.put(`/api/stories/${story.id}`, {favorite: true} );
      let response = await axios.get(`/api/users/${story.userId}/stories`);
      this.setState({ stories: response.data });
      console.log(story.favorite);
    }
    catch(ex){
      console.log(ex);
    }
  }
  async unfavorite( story ) {
    try {
      await axios.put(`/api/stories/${story.id}`, {favorite: false} );
      let response = await axios.get(`/api/users/${story.userId}/stories`);
      this.setState({ stories: response.data });
      console.log(story.favorite);
    }
    catch(ex){
      console.log(ex);
    }
  }
  render(){
    const { user, stories } = this.state;
    const { deleteStory, createStory, favorite, unfavorite } = this;
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
                  { story.favorite ?
                    <button onClick={ () => unfavorite(story) }>Unfavorite</button> :
                    <button onClick={ () => favorite(story) }>Favorite</button>
                  }
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
