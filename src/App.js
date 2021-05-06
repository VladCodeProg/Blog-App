import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Home from './containers/Home/Home';
import PostPage from './containers/PostPage/PostPage';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import PostCreator from './containers/PostCreator/PostCreator';

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/post/:id" component={PostPage} />
				<Route path="/profile" component={ProfilePage} />
				<Route path="/create-post" component={PostCreator} />
			</Switch>
		</Layout>
	)
}

export default App